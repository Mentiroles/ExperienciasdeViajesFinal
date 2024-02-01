import useSingleRecommendation from "../../hooks/useSingleRecommendation";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { deleteRecommendationService } from "../../services/backend";
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
  const nickName = recommendation.user.nickName;

  const photos = `http://localhost:3000/photos/${recommendation.photos[4]}`;

  if (!recommendation) {
    return <div>No recommendation found</div>;
  }

  const handleDelete = async () => {
    try {
      await deleteRecommendationService(token);
    } catch (error) {
      console.log(error);
    } finally {
      Navigate("/");
    }
  };

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <img
        src={photos}
        alt="Reco1"
        className="img-thumbnail"
        style={{
          width: "150px",
          height: "150px",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      <p>{lean_in}</p>
      <p>Posted by: {nickName} </p>
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
      ) : user ? (
        <Button
          variant="primary"
          onClick={() => handleComment()}>
          Comentar
        </Button>
      ) : (
        <Link to="/register">
          <Button variant="primary">Registrarse</Button>
        </Link>
      )}
    </div>
  );
};

export default ExpandedRecommendation;
