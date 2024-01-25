import useComments from "../../hooks/useComments"
import PropTypes from "prop-types"


const Comment = ({ comment }) => {
    
    const { error, loading } = useComments();
    
    const user = comment.user.nickName;
    const message = comment.message;

    if (loading) {
        return <div>Loading comments...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        
        <h3>{comment.message}</h3>
    )
}

Comment.propTypes = {
    Comment: PropTypes.object,
}

export default Comment
