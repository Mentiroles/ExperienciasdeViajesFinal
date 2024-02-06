import useSingleRecommendation from "../../hooks/useSingleRecommendation";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { deleteRecommendationService } from "../../services/backend";
import Comments from "../../components/Comments/Comments";
import { getLikeDislikeCount } from "../../services/backend";
import { useState, useEffect } from "react";
const ExpandedRecommendation = ({ recommendationId }) => {
  const { recommendation, error, loading } =
    useSingleRecommendation(recommendationId);

  const [likeCount, setLikeCount] = useState(0);
  const [DislikeCount, setDislikeCount] = useState(0);

  useEffect(() => {
    const fetchLikeDislikeCount = async () => {
      const counts = await getLikeDislikeCount(recommendationId);
      setLikeCount(counts.likeCount);
      setDislikeCount(counts.dislikeCount);
    };
    fetchLikeDislikeCount();
  }, [recommendationId]);

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
      <h2>{title}</h2>
      {photos.map((photo) => (
        <img
          src={`http://localhost:3000/photos/${photo}`}
          alt="Reco1"
          key={photo}
          className="img-thumbnail"
          style={{
            width: "300px",
            height: "300px",
            objectFit: "cover",
            objectPosition: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        />
      ))}
      <p>{description}</p>

      <p>{lean_in}</p>
      <p>Posted by: {nickName} </p>
      <div className="mb-3 d-flex justify-content-center align-items-center gap-3">
        {user && user.nickName === nickName ? (
          <>
            <Link
              to={`/edit-recommendations/${recommendation.recommendation.id}`}>
              <Button variant="primary">Editar</Button>
            </Link>
            <Button
              variant="danger"
              onClick={handleDelete}>
              Eliminar
            </Button>
          </>
        ) : (
          <>
            <Button variant="primary">Like {likeCount}</Button>
            <Button variant="primary">Dislike {DislikeCount}</Button>
          </>
        )}
      </div>
      <Comments />
    </div>
  );
};

export default ExpandedRecommendation;
