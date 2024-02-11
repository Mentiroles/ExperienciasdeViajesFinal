import useSingleRecommendation from "../../hooks/useSingleRecommendation";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { deleteRecommendationService } from "../../services/backend";
import Comments from "../../components/Comments/Comments";
import LikeButton from "../../components/LikeButton/LikeButton";
import Carousel from "react-bootstrap/Carousel";
import "./ExpandedRecommendation.css";

const ExpandedRecommendation = ({ recommendationId }) => {
  const { recommendation, error, loading } =
    useSingleRecommendation(recommendationId);

  const Navigate = useNavigate();

  const { user, token } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { title, description, lean_in } = recommendation.recommendation;
  const nickName = recommendation.recommendation.user.nickName;

  const photos = recommendation.recommendation.photos;

  if (!recommendation) {
    return <div>No recommendation found</div>;
  }

  const handleDelete = async () => {
    try {
      await deleteRecommendationService(token);
    } catch (error) {
      console.log(error);
    } finally {
      Navigate("/recommendations");
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <h2 className="text-center mt-5 mb-5 text-primary"> {title}</h2>
      <div className="mb-3 d-flex justify-content-center align-items-center gap-3">
        {user && user.nickName === nickName ? (
          <>
            <Link
              to={`/edit-recommendations/${recommendation.recommendation.id}`}>
              <Button variant="primary">Editar</Button>
            </Link>
            <Button
              className="bi bi-trash text-danger"
              onClick={handleDelete}
              variant="danger">
              Delete
            </Button>
          </>
        ) : (
          <></>
        )}
      </div>
      <Carousel
        slide={false}
        className="mx-auto">
        {photos.map((photo) => (
          <Carousel.Item key={photo}>
            <img
              src={`http://localhost:3000/photos/${photo}`}
              alt="Recommendation"
              style={{
                height: "400px",
                width: "400px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <p className="text-center mt-5 mb-5 ">{description}</p>

      <i>{lean_in}</i>
      <p className="text-center mt-5 mb-5">Posted by: {nickName} </p>

      <div className="mb-3 d-flex justify-content-center align-items-center gap-3">
        {user && user.nickName === nickName ? (
          <>
            <LikeButton />
          </>
        ) : (
          <LikeButton />
        )}
      </div>

      <Comments />
    </div>
  );
};

export default ExpandedRecommendation;
