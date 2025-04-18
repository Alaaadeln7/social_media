import { Schema, model } from "mongoose";

const eventsSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  events: [
    {
      date: { type: Date, required: true },
      title: { type: String, required: true },
      description: { type: String },
      isDone: { type: Boolean, default: false },
    }
  ]
}, { timestamps: true });

const Event = model("Event", eventsSchema);
export default Event