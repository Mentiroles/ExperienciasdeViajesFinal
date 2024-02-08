import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import {
  getRecommendationsCountService,
  getLikesCountService,
} from "../../services/backend";
import { Link } from "react-router-dom";

function Profile() {
  let { user, token } = useContext(AuthContext);
  console.log(token)
  console.log(user)

  
  const [recommendationsCount, setRecommendationsCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  

  useEffect(() => {
    const fetchLikesCount = async () => {
      try {
        if (user) { const count = await getLikesCountService(user.id);
          setLikesCount(count);}
      
      } catch (error) {
        console.error(error);
      }
    };
    fetchLikesCount();
  }, [user]);

  useEffect(() => {
    const fetchRecommendationsCount = async () => {
      try {
        if (user) {   const count = await getRecommendationsCountService(user.id);
          setRecommendationsCount(count);}
          
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecommendationsCount();
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <Container className="container py-5">
        <Row className="justify-content-center align-items-center h-100">
          <Col
            lg="9"
            xl="7">
            <Card className="border-0 mb-4 p-4 w-100">
              <Card.Title className="d-flex align-items-center mx-auto">
                <div
                  className="ms-4 mt-5 d-flex flex-column"
                  style={{ width: "150px" }}>
                  <Image
                    src={`http://localhost:3000/photos/${user.id}/${user.photo}`}
                    alt="Profile photo"
                    className="img-thumbnail rounded-circle "
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                  <Card.Text className="text-center mb-1 mt-md-4 fw-bold text-black">
                    {" "}
                    {user.nickName}{" "}
                  </Card.Text>
                  <Link to={`/user/${user.id}`}>
                    <Button
                      type="button"
                      className="btn btn-info btn-xs glyphicon glyphicon-edit">
                      Edit
                    </Button>
                  </Link>
                </div>
              </Card.Title>
              <div className="p-4 text-black">
                <div className="d-flex justify-content-center text-center mb-3 ">
                  <div className="px-3">
                    <Card.Text
                      className="mb-1 h5"
                      data-testid="posts-count">
                      {recommendationsCount}
                    </Card.Text>
                    <Card.Text className="small text-muted mb-0">
                      Posts
                    </Card.Text>
                  </div>
                  <div>
                    <Card.Text className="mb-1 h5">{likesCount}</Card.Text>
                    <Card.Text className="small text-muted mb-0">
                      Likes
                    </Card.Text>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Profile;
