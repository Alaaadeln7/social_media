import { useFormik } from "formik";
import { X } from "lucide-react";
import * as yup from "yup";
import useAuth from "../../hooks/useAuth";
import MainButtonLoader from "../../components/MainButtonLoader";
export default function CreateBioModal({ setOpenCreateBioModal, bio }) {
  const { createBioLoading, handleCreateBio } = useAuth();
  const formik = useFormik({
    initialValues: {
      bio: bio || "",
    },
    validationSchema: yup.object().shape({
      bio: yup
        .string()
        .required("Bio is required")
        .min(3, "Bio must be at least 3 characters")
        .max(100, "bio must be less than 100 characters"),
    }),
    onSubmit: (values, { resetForm }) => {
      handleCreateBio(values);
      resetForm();
      setOpenCreateBioModal(false);
    },
  });
  return (
    <>
      <div className="modal modal-open" role="dialog">
        <div className="modal-box">
          <div className="mt-4 w-full">
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-3 w-full"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Edit Bio</h2>
                <button
                  className="btn btn-ghost"
                  onClick={() => setOpenCreateBioModal(false)}
                >
                  <X />
                </button>
              </div>
              {formik.errors.bio && formik.touched.bio && (
                <p className="text-red-500 alert animate-pulse font-serif font-semibold">
                  {formik.errors.bio}
                </p>
              )}
              <textarea
                placeholder="Write your bio..."
                onChange={formik.handleChange}
                value={formik.values.bio}
                className={`input input-bordered w-full bg-gray-100 p-2 rounded-lg h-20
              ${
                formik.errors.bio &&
                formik.touched.bio &&
                "border-red-500 placeholder:text-red-500"
              }`}
                name="bio"
              ></textarea>
            </form>
          </div>
          <div className="modal-action">
            <form action="" onSubmit={formik.handleSubmit}>
              <button className="btn btn-primary w-full" type="submit">
                {createBioLoading ? <MainButtonLoader /> : "Save Bio"}
              </button>
            </form>
            <button
              onClick={() => setOpenCreateBioModal(false)}
              className="btn btn-neutral"
            >
              Close!
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
