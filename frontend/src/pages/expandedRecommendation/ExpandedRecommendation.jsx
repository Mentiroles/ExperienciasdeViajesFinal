import LikeButton from "../../components/LikeButton/LikeButton"
import Recommendation from "../../components/Recommendation/Recommendation"
import Comments from "../../components/Comments/Comments"
import CommentForm from "../../components/CommentForm/CommentForm"
import useRecommendation from "../../hooks/useRecommendation"
import { useLocation } from "react-router-dom"




const ExpandedRecommendation = () => {
    const { recommendationsData } = useRecommendation();
    const { pathname } = useLocation();
  
    const recommendation = recommendationsData.find((recommendation) => recommendation.id === pathname.split("/")[2]);
  
    return (
      <div>
        {recommendation && (
          <Recommendation recommendation={recommendation} key={recommendation.id}/>
          
        )}
      </div>
      
    );
  };
  

export default ExpandedRecommendation


