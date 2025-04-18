import { Schema, model } from "mongoose";

const groupSchema = Schema(
  {
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    name: { type: String, required: true },
    image: { type: String, required: false, default: "" },
    admins: [{ type: Schema.Types.ObjectId, ref: "User" }],
    description: { type: String, required: false, default: "" },
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  },
  { timestamps: true }
);

const Group = model("Group", groupSchema);
export default Group;
