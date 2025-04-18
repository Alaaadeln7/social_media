import { useEffect, useState } from "react";
import {
  AtSign,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import authImage from "../../assets/authImagePage.png";
import toast from "react-hot-toast";
import { validationSignupPage } from "../../utils/ValidationAuth";
import useAuth from "../../hooks/useAuth";
import LazyImage from "../../components/LazyImage";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { handleRegister, registerLoading } = useAuth();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      username: "",
    },
    validationSchema: validationSignupPage,
    onSubmit: async (values) => {
      handleRegister(values);
    },
  });

  useEffect(() => {
    const { fullName, email, password } = formik.errors;
    if (formik.touched.fullName && fullName) toast.error(fullName);
    if (formik.touched.email && email) toast.error(email);
    if (formik.touched.password && password) toast.error(password);
  }, [formik.errors, formik.touched]);

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-100" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10 bg-transparent border-base-100 text-base-100 ${
                    formik.touched.fullName &&
                    formik.errors.fullName &&
                    "border-red-500"
                  }`}
                  placeholder={
                    formik.touched.fullName && formik.errors.fullName
                      ? `${formik.errors.fullName}`
                      : "Full name"
                  }
                  id="fullName"
                  name="fullName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullName}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-100" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10 bg-transparent border-base-100 text-base-100 ${
                    formik.touched.email &&
                    formik.errors.email &&
                    "border-red-500"
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
                <span className="label-text font-medium">username</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <AtSign className="size-5 text-base-100" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10 bg-transparent border-base-100 text-base-100 ${
                    formik.touched.username &&
                    formik.errors.username &&
                    "border-red-500"
                  }`}
                  placeholder="username"
                  id="username"
                  name="username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-100" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10 bg-transparent border-base-100 text-base-100 ${
                    formik.touched.password &&
                    formik.errors.password &&
                    "border-red-500"
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
                    <EyeOff className="size-5 text-base-100" />
                  ) : (
                    <Eye className="size-5 text-base-100" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full text-white"
              disabled={registerLoading}
            >
              {registerLoading ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-200 space-x-1">
              <span>Already have an account?</span>
              <Link to="/login" className="link link-primary">
                Login
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
