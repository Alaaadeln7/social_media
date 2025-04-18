import { Schema, model } from "mongoose";

const friendSchema = Schema({
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  relation: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

const Friend = model("Friend", friendSchema);
export default Friend;
