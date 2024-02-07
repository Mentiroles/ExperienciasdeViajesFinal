import { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import useSingleRecommendation from "../../hooks/useSingleRecommendation";
import {
  likeRecommendation,
  dislikeRecommendation,
} from "../../services/backend";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function LikeButton() {
  const { token, user } = useContext(AuthContext);
  const { recommendation, error, loading } = useSingleRecommendation();
  const [userHasLiked, setUserHasLiked] = useState(
    recommendation?.recommendation?.isLikedByCurrentUser || false
  );
  const [likeCount, setLikeCount] = useState(
    recommendation?.recommendation?.likeCount || 0
  );

  useEffect(() => {
    setUserHasLiked(
      recommendation?.recommendation?.isLikedByCurrentUser || false
    );
    setLikeCount(recommendation?.recommendation?.likeCount || 0);
  }, [recommendation]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleLike = async () => {
    try {
      if (!userHasLiked) {
        await likeRecommendation(token);
        setLikeCount(likeCount + 1);
        setUserHasLiked(true);
      } else {
        await dislikeRecommendation(token);
        setLikeCount(likeCount - 1);
        setUserHasLiked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {user ? (
        <Button
          variant={userHasLiked ? "danger" : "primary"}
          onClick={handleLike}>
          {userHasLiked ? `Dislike (${likeCount})` : `Like (${likeCount})`}
        </Button>
      ) : (
        <Link to="/login">
          <Button variant="primary">Log in to like</Button>
        </Link>
      )}
    </div>
  );
}

export default LikeButton;