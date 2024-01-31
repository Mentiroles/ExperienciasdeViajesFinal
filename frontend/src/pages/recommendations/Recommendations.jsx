import Recommendation from "../../components/Recommendation/Recommendation";
import useRecommendation from "../../hooks/useRecommendation";
import { Link } from "react-router-dom";
const Recommendations = () => {
  const { recommendationsData } = useRecommendation();

  if (!recommendationsData) {
    return <div>No recommendations available.</div>;
  }

  return (
    <>
      <section>
        <h1>Recomendaciones</h1>
        <Link to="/create-recommendation">
          <button
            type="button"
            className="btn btn-primary">
            Crear recomendacion
          </button>
        </Link>
        <ol>
          {recommendationsData.map((recommendation) => (
            <Recommendation
              recommendation={recommendation}
              key={recommendation.id}
            />
          ))}
        </ol>
      </section>
    </>
  );
};

export default Recommendations;
