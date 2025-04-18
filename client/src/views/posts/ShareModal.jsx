import { X } from "lucide-react";
import LazyImage from "../../components/LazyImage";
import { useFormik } from "formik";

export default function ShareModal({
  author,
  image,
  content,
  setOpenShareModal,
}) {
  const formik = useFormik({
    initialValues: {
      shareText: "",
    },
    onSubmit: (values) => {
      console.log(values.shareText);
    },
  });
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full modal modal-open bg-black bg-opacity-50 flex justify-center items-center">
      <div className="modal-box felx justify-center items-center bg-white rounded-xl p-5">
        <h1 className="text-2xl font-bold">share post</h1>
        <button
          onClick={() => setOpenShareModal(false)}
          className="btn btn-ghost flex justify-end"
        >
          <X />
        </button>
        <form action="" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            placeholder="add you edit"
            className="input flex justify-end my-3 w-full"
            value={formik.values.shareText}
            onChange={formik.handleChange}
            name="shareText"
          />
        </form>
        <div className="divider"></div>
        <div>
          <div className="flex gap-3 items-center">
            <LazyImage
              className="w-10 h-10 rounded-full object-cover"
              src={author?.avatar}
              alt={author?.fullName}
            />
            <div className="flex flex-col items-start">
              <h1 className="font-semibold text-md line-clamp-1">
                {author?.fullName}
              </h1>
              <p>3m ago</p>
            </div>
          </div>
          <p className="text-start my-3">{content}</p>
          {image && <LazyImage src={image} alt="post image" />}
        </div>
        <div className="modal-action">
          <form onSubmit={formik.handleSubmit}>
            <button type="submit" className="btn btn-primary">
              share
            </button>
          </form>
          <button
            onClick={() => setOpenShareModal(false)}
            className="btn btn-neutral"
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
}
