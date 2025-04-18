import { useState } from "react";
import { useFormik } from "formik";
import LazyImage from "../../components/LazyImage";
import resetPasswordImage from "../../assets/reset-password.png";
import Logo from "../header/Logo";
import { Eye, EyeOff, Lock } from "lucide-react";
import { validationResetPassword } from "../../utils/ValidationAuth";
import useAuth from "../../hooks/useAuth";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { handleUpdatePassword } = useAuth();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationResetPassword,
    onSubmit: (values) => {
      handleUpdatePassword({ newPassword: values.password });
      console.log("New Password:", { newPassword: values.password });
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <Logo />
        <h2 className="text-2xl font-semibold text-center mb-4">
          Reset Password
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Enter a new password to reset your account.
        </p>
        <LazyImage
          className="size-20 mx-auto"
          src={resetPasswordImage}
          alt="reset password image"
        />

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="size-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className={`input input-bordered w-full pl-10 bg-transparent ${
                  formik.touched.password && formik.errors.password
                    ? "input-error"
                    : ""
                }`}
                placeholder="**********"
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="size-5 text-base-content/40" />
                ) : (
                  <Eye className="size-5 text-base-content/40" />
                )}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-error text-xs mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Confirm Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="size-5 text-base-content/40" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`input input-bordered w-full pl-10 bg-transparent ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "input-error"
                    : ""
                }`}
                placeholder="**********"
                id="confirmPassword"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="size-5 text-base-content/40" />
                ) : (
                  <Eye className="size-5 text-base-content/40" />
                )}
              </button>
            </div>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-error text-xs mt-1">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700 transition disabled:opacity-50"
            disabled={!formik.isValid || !formik.dirty}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
