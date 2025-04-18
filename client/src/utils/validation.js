import * as yup from "yup";
export const validationComment = yup.object({
  comment: yup.string().min(2, "Must be at least 2 characters").required("Required"),
});
export const validationCreatePost = yup.object().shape({
  text: yup.string().required("you must write something"),
  privacy: yup.string().required("you must choose privacy"),
}); 