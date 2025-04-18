import { useFormik } from "formik";
import { useState } from "react";
import useEvents from "../../hooks/useEvents";
import MainButtonLoader from "../../components/MainButtonLoader";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import * as Yup from "yup";
export default function EventFrom() {
  const [showDate, setShowDate] = useState(false);
  const { handleCreateEvent, createEventLoading } = useEvents();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Event is required"),
      description: Yup.string(),
      date: Yup.date().required("Date is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("Event Data:", values);
      handleCreateEvent(values);
      resetForm();
    },
  });
  return (
    <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
      {formik.touched.title && formik.errors.title ? (
        <div className="text-red-500 alert text-center animate-pulse">
          ** {formik.errors.title} **
        </div>
      ) : null}
      <div className="form-control">
        <label
          htmlFor="title"
          className="font-semibold text-sm text-start mb-2"
        >
          Event Name
        </label>
        <input
          type="text"
          placeholder="Type title"
          className="input input-bordered p-2 rounded-lg w-full"
          id="title"
          name="title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
      </div>
      <div className="form-control">
        <label
          htmlFor="description"
          className="font-semibold text-sm text-start mb-2"
        >
          Description
        </label>
        <textarea
          type="text"
          placeholder="Type description"
          className="textarea input-bordered p-2 rounded-lg w-full"
          id="description"
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        ></textarea>
      </div>
      {formik.values.date && (
        <p className="text-sm text-gray-600 mt-2">
          Selected Date: {formik.values.date.toDateString()}
        </p>
      )}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setShowDate(!showDate)}
          className="btn btn-primary text-white"
        >
          Pick a date
        </button>

        <button
          disabled={createEventLoading}
          type="submit"
          className="btn btn-primary text-white"
        >
          {createEventLoading ? <MainButtonLoader /> : "Add event"}
        </button>
      </div>
      {showDate && (
        <div className="flex flex-col items-center justify-center bg-gray-100 p-3 rounded-lg">
          <Calendar
            onChange={(date) => {
              formik.setFieldValue("date", date);
              setShowDate(false);
            }}
            value={formik.values.date}
            className="react-calendar"
          />
        </div>
      )}
    </form>
  );
}
