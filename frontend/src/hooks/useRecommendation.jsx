import { useState, useEffect } from "react";
import { getRecommendationsService } from "../services/backend";

const useRecommendation = () => {
  const [recommendationsData, setRecommendationsData] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingRecommendations = async () => {
      try {
        setLoading(true);
        const data = await getRecommendationsService();
        setRecommendationsData(data);
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