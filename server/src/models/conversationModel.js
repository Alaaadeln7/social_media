import { Schema, model } from "mongoose";
const conversationSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],

  },
  { timestamps: true }
);

const Conversation = model("Conversation", conversationSchema);
export default Conversation;
