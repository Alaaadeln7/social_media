import { Schema, model } from "mongoose"

const notificationSchema = new Schema({
  notifcator: { type: Schema.ObjectId, ref: "User", required: false }, // the user who make the notification
  type: { type: String, required: true }, // add friend , share post , add group , welcome message
  text: { type: String, required: true }, // the note content
  seen: { type: Boolean, default: false }, // the user make it true to
}, { timestamps: true });

const Notification = model("Notification", notificationSchema);
export default Notification;