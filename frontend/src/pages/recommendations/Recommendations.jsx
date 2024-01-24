import Recommendation from '../../components/Recommendation/Recommendation'
import useRecommendation from '../../hooks/useRecommendation'


const Recommendations = () => {
    const { recommendationsData } = useRecommendation();

    if (!recommendationsData) {
        return <div>No recommendations available.</div>;
    }

    return (
        <>
            <section>
                <ol>
                    {recommendationsData.map((recommendation) => {
                        return <Recommendation recommendation={recommendation} key={recommendation.id} />;
                    })}
                </ol>
            </section>
        </>
    );
}

export default Recommendations;
