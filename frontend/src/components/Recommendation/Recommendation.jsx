import useRecommendation from "../../hooks/useRecommendation";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";

const Recommendation = ({ recommendation }) => {
    const { error, loading } = useRecommendation();
    const title = recommendation.title;
    const photo = `http://localhost:3000/photos/${recommendation.id}/${recommendation.photo}`;
    const description = recommendation.description;
    const created_at = recommendation.created_at;
    const user = recommendation.user.nickName;
    

  if (loading) {
    return <div>Loading recommendations...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
    }
    
  return (
      <article title={title}>
        <Link to={`/recommendations/${recommendation.id}`} className="text-decoration-none text-black">
            <div className="d-flex justify-content-center">
                <img src={photo} alt="recommendation" className="img-thumbnail " style={{ width: '150px', height: '150px', objectFit: 'cover', objectPosition: 'center'   }} />
            </div>
        </Link>
        <div className="d-flex justify-content-center">
            <Card.Text className="text-center mb-1 mt-md-4 fw-bold text-black">  {user} </Card.Text>
        </div>
        <div className="d-flex justify-content-center">
            <Card.Text className="text-center mb-1 mt-md-4 fw-bold text-black">  {created_at} </Card.Text>
        </div>
        <div className="d-flex justify-content-center">
            <Card.Text className="text-center mb-1 mt-md-4 fw-bold text-black">  {description} </Card.Text>
          </div>
      </article>
  );
}

Recommendation.propTypes = {
  recommendation: PropTypes.object,
}

export default Recommendation;
