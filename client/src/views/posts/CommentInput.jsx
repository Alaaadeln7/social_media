import { useFormik } from "formik";
import { validationComment } from "../../utils/validation";
import { Send } from "lucide-react";
import { useCreateCommentMutation } from "../../app/api/postsApiSlice";
import MainButtonLoader from "../../components/MainButtonLoader";
export default function CommentInput(props) {
  const { postId } = props;
  const [createComment, { isLoading }] = useCreateCommentMutation();
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: validationComment,
    onSubmit: async (values, { resetForm }) => {
      console.log(values.comment);
      await createComment({
        content: values.comment,

        postId,
      }).unwrap();
      resetForm();
    },
  });
  return (
    <form
      className="flex gap-3 py-3 px-2 w-full"
      onSubmit={formik.handleSubmit}
    >
      <div className="form-control w-full">
        <input
          type="text"
          placeholder="add a comment"
          className="input input-bordered bg-base-100"
          name="comment"
          onChange={formik.handleChange}
          value={formik.values.comment}
        />
      </div>
      <button
        disabled={isLoading}
        type="submit"
        className="btn btn-primary rounded-full"
      >
        {isLoading ? (
          <MainButtonLoader />
        ) : (
          <Send className="size-5 text-base-100" />
        )}
      </button>
    </form>
  );
}
