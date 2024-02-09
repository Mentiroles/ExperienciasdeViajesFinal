import { useState } from "react";
import { postCommentsService } from "../../services/backend";
import useSingleRecommendation from "../../hooks/useSingleRecommendation";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Comments = ({ recommendationId }) => {
  const { recommendation, error, loading } =
    useSingleRecommendation(recommendationId);
  const [message, setMessage] = useState("");
  const { user, token } = useContext(AuthContext);

  const navigate = useNavigate();
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleComment = async (message) => {
    try {
      await postCommentsService(
        token,
        message,
        user.id,
        
        recommendation.recommendation.id,
        
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      navigate(`/recommendations/${recommendation.recommendation.id}`);
    }
  };
  const comments = recommendation.recommendation.comments;
  console.log(comments)
  return (
    <>
      <section>
        <div className="container mb-5 bg-light">
          <div className="row ">
            <h4>Comments</h4>

            {comments.map((comment) => (
              <div
                key={comment.id}
                className="d-flex align-items-center gap-3 mb-3">
                
                  <img
                    src={
                      !comment.photo
                        ? "https://i.imgur.com/vgqbOTn.jpeg"
                        : `http://localhost:3000/photos/${comment.userId}/${comment.photo}`
                    }
                    alt=""
                    className="rounded-circle"
                    width="40"
                    height="40"
                  />
                
                <p className="m-0">
                  {comment.nickName}: {comment.message}
                </p>
              </div>
            ))}
            <div className="w-100">
              <form id="algin-form">
                <div className="form-group">
                  <h4>Leave a comment</h4>
                  <label>Message</label>
                  <textarea
                    name="msg"
                    cols="30"
                    rows="5"
                    className="form-control"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}></textarea>
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    id="post"
                    className="btn btn-primary"
                    onClick={() => handleComment(message)}>
                    Post a comment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Comments;
