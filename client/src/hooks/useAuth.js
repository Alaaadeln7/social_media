import toast from "react-hot-toast";
import * as yup from "yup";
import { useFormik } from "formik";

import {
  useCheckAuthQuery,
  useCreateBioMutation,
  useForgetPasswordMutation,
  useLoginMutation,
  useRegisterMutation,
  useUpdatePasswordMutation,
  useUpdateProfileImageMutation,
  useVerifyForgetPasswordOTPMutation,
  useVerifyOTPMutation,
} from "../app/api/authApiSlice";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const navigate = useNavigate();
  const { data: user, isLoading: userLoading } = useCheckAuthQuery();
  const [register, { isLoading: registerLoading }] = useRegisterMutation();
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [verifyCode, { isLoading: verifyCodeLoading }] = useVerifyOTPMutation();
  const [forgetPassword, { isLoading: forgetPasswordLoading }] =
    useForgetPasswordMutation();
  const [updatePassword, { isLoading: updatePasswordLoading }] =
    useUpdatePasswordMutation();
  const [
    verifyForgetPasswordOTP,
    { isLoading: verifyForgetPasswordOTPLoading },
  ] = useVerifyForgetPasswordOTPMutation();
  const [createBio, { isLoading: createBioLoading }] = useCreateBioMutation();
  const [updateProfileImage, { isLoading: updateProfileImageLoading }] =
    useUpdateProfileImageMutation();
  // Handlers
  const handleRegister = async (formData) => {
    try {
      const response = await register(formData);

      if (response?.error) {
        toast.error(response.error.data?.message || "Email already exists");
        return;
      }

      if (response?.data) {
        navigate("/verify-code");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  const handleVerifyCode = async (formData) => {
    try {
      const response = await verifyCode(formData);

      if (response?.error) {
        toast.error(response.error.data?.message || "Invalid OTP");
        return;
      }

      if (response?.data) {
        navigate("/");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong!");
    }
  };

  const handleForgetPassword = async (email) => {
    try {
      const response = await forgetPassword(email);
      if (response?.error) {
        console.error(response.error);
        toast.error(response.error.data?.message || "Invalid OTP");
        return;
      }

      if (response?.data) {
        navigate("/verify-code-forget-password");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong!");
    }
  };
  const handleVerificationCodeForgetPassword = async (formData) => {
    try {
      const response = await verifyForgetPasswordOTP(formData);

      if (response?.error) {
        toast.error(response.error.data?.message || "Invalid OTP");
        return;
      }

      if (response?.data) {
        navigate("/reset-password");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong!");
    }
  };
  const handleUpdatePassword = async (formData) => {
    try {
      const response = await updatePassword(formData);

      if (response?.error) {
        toast.error(response.error.data?.message || "Invalid OTP");
        return;
      }

      if (response?.data) {
        toast.success("Password updated successfully");
        navigate("/login");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong!");
    }
  };
  const handleLogin = async (formData) => {
    try {
      const response = await login(formData);
      if (response?.error) {
        toast.error(response.error.data?.message || "Invalid credentials");
        return;
      }
      if (response?.data) {
        navigate("/");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong!");
    }
  };
  const handleCreateBio = async (formData) => {
    try {
      const response = await createBio(formData);

      if (response?.error) {
        toast.error(response.error.data?.message || "Invalid OTP");
        return;
      }

      if (response?.data) {
        toast.success("Bio created successfully");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong!");
    }
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfileImage({ avatar: base64Image });
      toast.success("updating successfully");
    };
  };
  const formikCreateBio = useFormik({
    initialValues: {
      bio: "",
    },
    validationSchema: yup.object().shape({
      bio: yup
        .string()
        .required("Bio is required")
        .min(3, "Bio must be at least 3 characters"),
    }),
    onSubmit: (values, { resetForm }) => {
      handleCreateBio(values);
      resetForm();
    },
  });
  return {
    user,
    navigate,
    userLoading,
    register,
    handleRegister,
    handleVerifyCode,
    registerLoading,
    verifyCodeLoading,
    handleForgetPassword,
    forgetPasswordLoading,
    handleVerificationCodeForgetPassword,
    verifyForgetPasswordOTPLoading,
    handleUpdatePassword,
    updatePasswordLoading,
    handleLogin,
    loginLoading,
    handleCreateBio,
    createBioLoading,
    updateProfileImageLoading,
    handleImageUpload,
    formikCreateBio,
  };
}
