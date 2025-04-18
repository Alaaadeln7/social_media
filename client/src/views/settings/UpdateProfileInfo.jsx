import { useFormik } from "formik";
// import { useUpdateInfoMutation } from "../../app/api/authApiSlice";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

export default function UpdateProfileInfo() {
  const { user } = useAuth();
  // const [updateProfile, { isLoading }] = useUpdateInfoMutation();
  const formik = useFormik({
    initialValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        // await updateProfile(values).unwrap();
        toast.success("Profile updated");
      } catch (error) {
        toast.error(error?.data?.message || "An error occurred");
        console.error(error?.data?.message);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium ">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            className="input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm]"
          />
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary mt-8 w-full"
        // disabled={isLoading}
      >
        {/* {isLoading ? ( */}
        {/* <span className="loading loading-spinner"></span> */}
        {/* ) : ( */}
        Update
        {/* )} */}
      </button>
    </form>
  );
}
