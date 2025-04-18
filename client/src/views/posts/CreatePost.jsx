import LazyImage from "../../components/LazyImage";
import {
  AtSign,
  Hash,
  Image,
  Paperclip,
  Radio,
  Send,
  Smile,
  X,
} from "lucide-react";
import { useFormik } from "formik";
import { useCallback, useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import usePosts from "../../hooks/usePosts";
import { validationCreatePost } from "../../utils/validation";
export default function CreatePost() {
  const { user } = useAuth();
  const { handleCreatePost } = usePosts();
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      text: "",
      privacy: "",
    },
    validationSchema: validationCreatePost,
    onSubmit: (values, { resetForm }) => {
      handleCreatePost({ content: values.text, image: imagePreview });
      toast.success("Post created successfully");
      resetForm();
      removeImage();
    },
  });
  const handleInputChange = (e) => {
    const { value } = e.target;
    formik.setFieldValue("text", value);
  };

  const handleImageChange = useCallback(async (e) => {
    const file = e.target.files[0];
    if (
      file &&
      file.type.startsWith("image/") &&
      file.size <= 2 * 1024 * 1024
    ) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        toast.error("Failed to compress image");
      }
    } else {
      toast.error("Invalid file. Please select an image under 2MB.");
    }
  }, []);
  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  return (
    <>
      <article className="bg-base-100 p-3 rounded-xl">
        {formik.touched.text && formik.errors.text && (
          <p className="text-red-500 text-sm alert animate-pulse mb-4 flex justify-center">
            ** {formik.errors.text} **
          </p>
        )}
        <div className="flex gap-4">
          <LazyImage
            className="w-10 h-10 rounded-full object-cover"
            src={user?.avatar}
            alt={user?.fullName}
          />
          <form className="flex w-full gap-4" onSubmit={formik.handleSubmit}>
            <div className="flex p-2 input input-bordered w-full bg-base-200">
              <input
                className="bg-transparent outline-none border-none w-full"
                type="text"
                placeholder="What's on your mind?"
                name="text"
                onChange={handleInputChange}
                value={formik.values.text}
              />
              <span>
                <Smile />
              </span>
            </div>

            <button
              type="submit"
              className="btn bg-primary-outline text-primary  border-none hover:text-base-100 hover:bg-primary/90 w-3/12"
            >
              <Send className="size-5 text-primary" />
              <p className="hidden sm:block md:hidden xsm:hidden lg:block">
                share post
              </p>
            </button>
          </form>
        </div>
        <div>
          {imagePreview && (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-80 h-80 object-fill rounded-lg border border-base-200"
              />
              <button
                onClick={removeImage}
                className="absolute top-0 left-0 flex justify-center items-center w-10 h-10 bg-gray-300 rounded-full"
              >
                <X className="size-5 text-black" />
              </button>
            </div>
          )}
        </div>
        <div className="divider"></div>
        <div className="flex justify-between">
          <ul className="flex justify-center items-center gap-4">
            <li>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              <button
                type="button"
                className="text-green-400 flex items-center gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <Image size={20} />
                <span className="hidden sm:block md:hidden lg:block xsm:hidden">
                  Photo/Video
                </span>
              </button>
            </li>
            <li>
              <button className="flex items-center gap-2 text-sm">
                <Paperclip className="text-orange-600 size-5" />

                <span className="hidden sm:block md:hidden lg:block xsm:hidden">
                  attachment
                </span>
              </button>
            </li>
            <li>
              <button className="flex items-center gap-2 text-sm">
                <Radio className="text-red-600 size-5" />

                <span className="hidden sm:block md:hidden lg:block xsm:hidden">
                  Live
                </span>
              </button>
            </li>
            <li>
              <button className="flex items-center gap-2 text-sm">
                <Hash className="text-green-600 size-5" />
                <span className="hidden sm:block md:hidden lg:block xsm:hidden">
                  hashtag
                </span>
              </button>
            </li>
            <li>
              <button className="flex items-center gap-2 text-sm">
                <AtSign className="text-b-600 size-5" />
                <span className="hidden sm:block md:hidden lg:block xsm:hidden">
                  mention
                </span>
              </button>
            </li>
          </ul>
          <form onSubmit={formik.handleSubmit}>
            <select
              value={formik.values.privacy}
              onChange={formik.handleChange}
              className="bg-transparent outline-none border-none"
              name="privacy"
            >
              <option value={"privacy"}>Privacy</option>
              <option value={"public"}>Public</option>
              <option value={"friends"}>Friends</option>
              <option value={"onlyMe"}>Only Me</option>
            </select>
          </form>
        </div>
      </article>
    </>
  );
}
