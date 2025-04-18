import { useRef, useState } from "react";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import useChat from "../../hooks/useChat";
import LazyImage from "../../components/LazyImage";

export default function MessageInput({
  conversationId,
  receiver,
  handleTyping,
  handleStopTyping,
}) {
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { handleSendMessage, sendMessageLoading } = useChat();

  const formik = useFormik({
    initialValues: { text: "" },
    validationSchema: yup.object({
      text: yup
        .string()
        .test("text-or-image", "Message cannot be empty", function (value) {
          return String(value).trim() || imagePreview;
        }),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await handleSendMessage({
          content: values.text,
          image: imagePreview,
          conversationId,
          receiver: receiver?._id,
        });
        console.log(receiver?._id);
        resetForm();
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select a valid image file");
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-4 fixed left-30 bottom-0 w-full z-50 bg-base-100 sm:w-10/12">
      {imagePreview && (
        <div className="mb-3">
          <div className="relative w-fit">
            <LazyImage
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 rounded-lg object-cover border"
            />
            <button
              onClick={removeImage}
              type="button"
              className="absolute -top-2 -right-2 bg-base-100 text-red-500 hover:bg-red-100 w-6 h-6 flex items-center justify-center rounded-full shadow"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          className="flex-1 input input-bordered rounded-full input-sm sm:input-md"
          placeholder="Type a message..."
          name="text"
          value={formik.values.text}
          onChange={formik.handleChange}
          onKeyDown={handleTyping}
          onBlur={handleStopTyping}
        />

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        <button
          type="button"
          className="btn btn-ghost btn-circle hidden sm:flex bg-base-300"
          onClick={() => fileInputRef.current?.click()}
        >
          <Image
            size={20}
            className={`${imagePreview && "text-emerald-500"}`}
          />
        </button>

        <button
          type="submit"
          className="btn btn-primary btn-circle"
          disabled={
            sendMessageLoading || (!formik.values.text.trim() && !imagePreview)
          }
        >
          <Send className="w-5 h-5 text-base-100" />
        </button>
      </form>
    </div>
  );
}
