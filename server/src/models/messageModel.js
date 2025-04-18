import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: false, default: "" },
    image: { type: String, required: false, default: "" },
    record: { type: String, required: false, default: "" },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Message = model("Message", messageSchema);
export default Message;
