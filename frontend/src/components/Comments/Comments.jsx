import useComments from "../../hooks/useComments"
import Comment from "../Comment/Comment"


const Comments = () => {
    const { commentsData } = useComments();

    return (
        <>
           <section>
                <ol>
                    {commentsData.map((comment) => {
                        return <Comment comment={comment} key={comment.id} />;
                    })}
                </ol>
            </section>
        </>
    )
}   

export default Comments