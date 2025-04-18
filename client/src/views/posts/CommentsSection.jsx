import Comment from "./Comment";
import CommentInput from "./CommentInput";

export default function CommentsSection(props) {
  const { comments, postId } = props;
  const printComments = comments.map((comment) => (
    <Comment key={comment._id} comment={comment} />
  ));
  return (
    <div className="mt-10">
      {printComments}
      <CommentInput postId={postId} />
    </div>
  );
}
