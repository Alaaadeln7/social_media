import { useFormik } from "formik";
import { validationForgetPasswordPage } from "../../utils/ValidationAuth";
import LazyImage from "../../components/LazyImage";
import forgetPasswordImage from "../../assets/forgot-password.png";
import { Loader2, Mail, MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../header/Logo";
import useAuth from "../../hooks/useAuth";
export default function ForgetPassword() {
  const { handleForgetPassword, forgetPasswordLoading } = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationForgetPasswordPage,
    onSubmit: (values) => {
      handleForgetPassword(values.email);
      console.log(values.email);
    },
  });
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white w-1/2 rounded-xl p-3 flex justify-center items-center flex-col space-y-6">
        <div className="flex justify-center items-center flex-col gap-3 w-full">
          <Logo />
          <div className="flex justify-center items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-error text-white"
            >
              <MoveLeft className="size-5" />
            </button>
            <h1 className="text-2xl font-bold">Forget Password</h1>
          </div>
        </div>
        <LazyImage
          className="size-20"
          src={forgetPasswordImage}
          alt={"forget password image"}
        />
        <div>
          <form
            className="flex flex-col gap-3 w-full"
            onSubmit={formik.handleSubmit}
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10 bg-transparent ${
                    formik.touched.email && formik.errors.email
                      ? "input-error"
                      : ""
                  }`}
                  placeholder="example@gmail.com"
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-error text-xs">{formik.errors.email}</p>
                )}
              </div>
            </div>
            <button
              disabled={forgetPasswordLoading}
              className="btn btn-primary w-full text-white"
              type="submit"
            >
              {forgetPasswordLoading ? (
                <>
                  <div className="flex justify-center items-center gap-2">
                    <Loader2 className="animate-spin size-5 text-black" />
                    <p className="text-sm text-black">processing...</p>
                  </div>
                </>
              ) : (
                "send code"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
