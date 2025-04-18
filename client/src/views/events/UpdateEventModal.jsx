import { useFormik } from "formik";
import * as Yup from "yup";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { X } from "lucide-react";
import { useState } from "react";
import useEvents from "../../hooks/useEvents";
import MainButtonLoader from "../../components/MainButtonLoader";

export default function UpdateEventModal({ event, setOpenUpdateEventModal }) {
  const [showDate, setShowDate] = useState(false);
  const { handleUpdateEvent, updateEventLoading } = useEvents();

  const formik = useFormik({
    initialValues: {
      title: event.title || "",
      description: event.description || "",
      date: new Date(event.date) || new Date(),
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Event title is required"),
      description: Yup.string().optional(),
      date: Yup.date().required("Date is required"),
    }),
    onSubmit: (values) => {
      handleUpdateEvent({ eventId: event._id, values });
      setOpenUpdateEventModal(false);
    },
  });

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <button
          onClick={() => setOpenUpdateEventModal(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
        >
          <X />
        </button>

        <h2 className="text-xl font-bold mb-4">Update Event</h2>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div className="form-control">
            <label htmlFor="title" className="font-semibold text-sm">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="input input-bordered w-full"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="description" className="font-semibold text-sm">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="textarea input-bordered w-full"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setShowDate(!showDate)}
              className="btn btn-outline"
            >
              Pick Date
            </button>

            <button
              type="submit"
              disabled={updateEventLoading}
              className="btn btn-primary text-white"
            >
              {updateEventLoading ? <MainButtonLoader /> : "Update"}
            </button>
          </div>

          {showDate && (
            <div className="mt-3">
              <Calendar
                onChange={(date) => {
                  formik.setFieldValue("date", date);
                  setShowDate(false);
                }}
                value={formik.values.date}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
