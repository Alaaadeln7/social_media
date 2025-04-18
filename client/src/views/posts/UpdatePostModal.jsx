import { useFormik } from "formik";
import * as yup from "yup";
import { X } from "lucide-react";
import usePosts from "../../hooks/usePosts";
import toast from "react-hot-toast";
import MainButtonLoader from "../../components/MainButtonLoader";

export default function UpdatePostModal({
  setOpenUpdateModal,
  content,
  postId,
}) {
  const { handleUpdatePost, updatePostLoading } = usePosts();

  const formik = useFormik({
    initialValues: {
      content: content || "",
    },
    validationSchema: yup.object().shape({
      content: yup
        .string()
        .min(3, "Must be at least 3 characters")
        .required("You must write something"),
    }),
    onSubmit: async (values) => {
      let res = await handleUpdatePost({
        content: values.content,
        postId: postId,
      });

      if (res?.data) {
        toast.success("Post updated successfully");
        setOpenUpdateModal(false);
      }
    },
  });

  return (
    <div className="modal modal-open">
      <div className="modal-box space-y-4">
        <div className="flex justify-end">
          <button
            onClick={() => setOpenUpdateModal(false)}
            className="btn btn-sm btn-circle btn-ghost"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <h3 className="text-lg font-bold text-center">Update Post</h3>

          {formik.touched.content && formik.errors.content && (
            <p className="text-red-500 text-sm text-center animate-pulse">
              ** {formik.errors.content} **
            </p>
          )}
          <input
            name="content"
            type="text"
            placeholder="Update your post"
            className="input input-bordered w-full"
            onChange={formik.handleChange}
            value={formik.values.content}
          />

          <div className="flex justify-center">
            <button
              disabled={updatePostLoading}
              type="submit"
              className="btn btn-primary w-full"
            >
              {updatePostLoading ? <MainButtonLoader /> : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
