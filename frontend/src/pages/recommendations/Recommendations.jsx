import Recommendation from "../../components/Recommendation/Recommendation";
import useRecommendation from "../../hooks/useRecommendation";
import "./Recommendations.css";

const Recommendations = () => {
  const { recommendationsData } = useRecommendation();

  if (!recommendationsData) {
    return <div>No recommendations available.</div>;
  }
  return (
    <>
      <section>
        <h2 className="text-center mt-5 mb-5 text-primary">Recommendations</h2>
        <div
          className="recommendation-list"
          style={{ marginTop: "-100px" }}>
          {recommendationsData.map((recommendation) => (
            <Recommendation
              recommendation={recommendation}
              key={recommendation.id}
              className="recommendation"
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Recommendations;
