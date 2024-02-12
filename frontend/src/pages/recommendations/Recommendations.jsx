import Recommendation from "../../components/Recommendation/Recommendation";
import useRecommendation from "../../hooks/useRecommendation";
import "./Recommendations.css";

const Recommendations = () => {
  const { recommendationsData } = useRecommendation();

  if (!recommendationsData || recommendationsData.length === 0) {
    return (
      <div className="text-center mt-5 mb-5 text-primary h3">
        No recommendations with those filters found!
      </div>
    );
  }
  return (
    <>
      <section className="fondo">
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
