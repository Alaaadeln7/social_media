import { useFormik } from "formik"
import * as Yup from "yup"

export default function UpdatePage() {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().min(3, "Must be at least 3 characters").required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
    }),
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
    },
  });
  return (
    <div>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-control">
            <label htmlFor="fullName">Full Name</label>
            <input onChange={formik.handleChange} value={formik.values.fullName} type="text" name="fullName" placeholder="Enter Full Name" className="input input-bordered w-full" />
            {formik.errors.fullName && formik.touched.fullName && <p className="text-red-500">{formik.errors.fullName}</p>}
          </div>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input onChange={formik.handleChange} value={formik.values.email} type="email" name="email" placeholder="Enter Email" className="input input-bordered w-full" />
            {formik.errors.email && formik.touched.email && <p className="text-red-500">{formik.errors.email}</p>}
          </div>
          <button type="submit" className="btn btn-primary">Update</button>
        </form>
      </div>
    </div>
  )
}
