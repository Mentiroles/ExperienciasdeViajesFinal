import useRecommendation from "../../hooks/useRecommendation";

import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Recommendation = ({ recommendation }) => {
  const navigate = useNavigate();
  const { error, loading } = useRecommendation();
  const title = recommendation.title;
  const photo = `http://localhost:3000/photos/${recommendation.id}/${recommendation.photo}`;
  const user = recommendation.user.nickName;

  if (loading) {
    return <div>Loading recommendations...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const goToRecommendation = () => {
    navigate(`/recommendations/${recommendation.id}`);
  };

  return (
    <article title={title}>
      <div className="d-flex justify-content-center">
        <img
          src={photo}
          alt="recommendation"
          className="img-thumbnail "
          style={{
            width: "150px",
            height: "150px",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
      <div className="d-flex justify-content-center text-center mt-3 mb-3">
        <Card.Text className="mb-1 h5"> {user} </Card.Text>
      </div>
      <div className="d-flex justify-content-center">
        <Button
          onClick={goToRecommendation}
          variant="primary">
          Ver
        </Button>
      </div>
    </article>
  );
};

Recommendation.propTypes = {
  recommendation: PropTypes.object,
};

export default Recommendation;
