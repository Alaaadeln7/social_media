import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { useFormik } from "formik";

// import AuthImagePattern from "../../components/AuthImagePattern";
import { validationLoginPage } from "../../utils/ValidationAuth";
// import useAuth from "../../hooks/useAuth";
import LazyImage from "../../components/LazyImage";
import authImage from "../../assets/authImagePage.png";
import useAuth from "../../hooks/useAuth";
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const { handleLogin, loginLoading } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationLoginPage,
    onSubmit: async (values) => {
      handleLogin(values);
      console.log(values);
    },
  });

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="bg-base-100 flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            {formik.touched.email && formik.errors.email && (
              <p className="text-error text-sm flex justify-center alert animate-pulse">
                {formik.errors.email}
              </p>
            )}
            {formik.touched.password && formik.errors.password && (
              <p className="text-error text-sm flex justify-center alert animate-pulse">
                {formik.errors.password}
              </p>
            )}
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
              </div>
            </div>

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
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loginLoading}
            >
              {loginLoading ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </button>
            <p className="text-base-content/60">
              <Link to="/forget-password" className="link link-primary">
                Forget Password
              </Link>
            </p>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Create account{" "}
              <Link to="/signup" className="link link-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <LazyImage
        className="h-screen w-full hidden sm:block"
        src={authImage}
        alt={"auth image"}
      />
    </div>
  );
}
