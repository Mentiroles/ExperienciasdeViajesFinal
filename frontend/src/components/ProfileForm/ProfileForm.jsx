import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { editProfileService } from "../../services/backend";
import { useNavigate } from "react-router-dom";

function ProfileForm() {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [error, setError] = useState("");

  const handleEditProfile = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      return;
    }
    let formData = new FormData();
    formData.append("photo", imageFile);
    formData.append("email", email);
    formData.append("nickName", nickName);
    formData.append("currentPassword", currentPassword);
    formData.append("newPassword", newPassword);
    try {
      await editProfileService(formData, token);
      navigate(`/user`);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  <h1>Edit Profile</h1>
                </Card.Title>
                <form onSubmit={handleEditProfile}>
                  <div>
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="New email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>New Nickname</label>
                    <input
                      type="text"
                      value={nickName}
                      autoComplete="nickName"
                      placeholder="New Nickname"
                      name="nickName"
                      id="nickName"
                      onChange={(e) => setNickName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      id="currentPassword"
                      placeholder="Current Password"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      placeholder="New Password"
                      autoComplete="new-password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Photo</label>
                    <input
                      type="file"
                      onChange={(e) => setImageFile(e.target.files[0])}
                    />
                  </div>
                  <div>
                    <Button
                      variant="primary"
                      type="submit">
                      Edit
                    </Button>
                  </div>
                </form>
                {error ? <p>{error.message}</p> : null}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ProfileForm;
