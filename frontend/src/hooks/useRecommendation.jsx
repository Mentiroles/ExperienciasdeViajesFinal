import { useState, useEffect } from "react";
import { getRecommendationsService } from "../services/backend";
import { getRecommendationByCountryIdService } from "../services/backend";
const useRecommendation = () => {
  const [recommendationsData, setRecommendationsData] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingRecommendations = async () => {
      try {
        setLoading(true);
        if( window.location.pathname.split("/").pop() === `recommendations?location=${num}` ){
          const data = await getRecommendationByCountryIdService();
          setRecommendationsData(data);
        }else{
          const data = await getRecommendationsService();
          setRecommendationsData(data);
        }
       
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    loadingRecommendations();
  }, []);
  


  return { recommendationsData, error, loading };
};

export default useRecommendation;
