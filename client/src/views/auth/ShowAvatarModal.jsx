import { X } from "lucide-react";
import LazyImage from "../../components/LazyImage";

export default function ShowAvatarModal({ avatar, setShowAvatar }) {
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <button
          onClick={() => setShowAvatar(false)}
          className="btn btn-outline btn-error "
        >
          <X className="size-5" />
        </button>
        <div className="mt-6 flex items-center justify-center">
          <LazyImage
            src={avatar}
            alt="profile avatar"
            className="max-h-[70vh] rounded-lg object-contain"
          />
        </div>
      </div>
    </div>
  );
}
