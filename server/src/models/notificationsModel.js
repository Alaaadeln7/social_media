import { Schema, model } from "mongoose"


const userNotificationsSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: [{ type: Schema.Types.ObjectId, ref: "Notification", required: false }],
}, { timestamps: true });

const UserNotifications = model("UserNotifications", userNotificationsSchema);
export default UserNotifications;