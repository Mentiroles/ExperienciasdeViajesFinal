import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { editRecommendationService } from "../../services/backend";
import Button from "react-bootstrap/Button";
import useSingleRecommendation from "../../hooks/useSingleRecommendation";
import { useNavigate } from "react-router-dom";
const EditReco = ({ recommendationId }) => {
  const { recommendation, error, loading } =
    useSingleRecommendation(recommendationId);
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [locationId, setLocationId] = useState("");
  const [setError] = useState("");

  if (!user) {
    return <div>You must be logged in</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      await editRecommendationService(
        title,
        category,
        description,
        locationId,
        token
      );
      navigate("/recommendations/" + recommendation.recommendation.id);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <Form className="w-75 mx-auto mt-5">
        <Form.Group className="mb-3">
          <Form.Label className="mb-3">Edit title</Form.Label>
          <Form.Control
            type="text"
            placeholder={recommendation.recommendation.title}
            required
            className="mb-3"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            name="title"
            id="title"
          />
        </Form.Group>
        <Form.Group>
          <Form.Select
            className="mb-3"
            aria-label="Default select example"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            name="category"
            id="category">
            <option>Select your category</option>
            <option value="1">Beach</option>
            <option value="2">Historic</option>
            <option value="3">Nature</option>
          </Form.Select>
          <Form.Control
            as="textarea"
            rows={3}
            className="mb-3"
            placeholder={recommendation.recommendation.description}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            name="description"
            id="description"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="mb-3">Edit the country</Form.Label>

          <Form.Control
            type="text"
            placeholder={recommendation.location.name}
            required
            className="mb-3"
            onChange={(e) => setLocationId(e.target.value)}
            value={locationId}
            name="locationId"
            id="locationId"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Upload more photos from the trip!</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Link onClick={handleEdit}>
          <Button
            variant="primary"
            type="submit">
            Edit!
          </Button>
        </Link>
      </Form>
    </>
  );
};

export default EditReco;
