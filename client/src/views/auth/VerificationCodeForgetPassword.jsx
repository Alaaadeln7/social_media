import { useFormik } from "formik";
import { validationCode } from "../../utils/ValidationAuth";
import Logo from "../header/Logo";
import useAuth from "../../hooks/useAuth";
import { Loader2 } from "lucide-react";
export default function VerificationCodeForgetPassword() {
  const {
    handleVerificationCodeForgetPassword,
    verifyForgetPasswordOTPLoading,
  } = useAuth();
  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: validationCode,
    onSubmit: (values) => {
      handleVerificationCodeForgetPassword({ otp: values.code });
      console.log(values.code);
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <Logo />
        <h2 className="text-2xl font-semibold text-center mb-4">Enter Code</h2>
        <p className="text-gray-600 text-center mb-6">
          Please enter the 6-digit code sent to your email.
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="code"
              maxLength="6"
              className={`w-full p-3 border  bg-transparent ${
                formik.touched.code && formik.errors.code
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg text-center text-lg tracking-widest`}
              placeholder="123456"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.code}
            />
            {formik.touched.code && formik.errors.code ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.code}</p>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700 transition"
            disabled={verifyForgetPasswordOTPLoading}
          >
            {verifyForgetPasswordOTPLoading ? (
              <span className="flex justify-center items-center gap-3">
                <Loader2 className="animate-spin" /> <p>Verifying...</p>
              </span>
            ) : (
              "Verify Code"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
