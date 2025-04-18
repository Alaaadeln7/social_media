import { Pencil, Trash2, X } from "lucide-react";
import formatDate from "../../utils/formateDate";
import useEvents from "../../hooks/useEvents";
import MainButtonLoader from "../../components/MainButtonLoader";

export default function SingleEventModal({
  setOpenEvent,
  event,
  setOpenUpdateEventModal,
}) {
  const { handleDeleteEvent, deleteEventLoading } = useEvents();
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <button
          onClick={() => setOpenEvent(false)}
          className="btn btn-outline btn-error btn-circle "
        >
          <X className="size-5" />
        </button>
        <h1 className="text-2xl font-bold">{event.title}</h1>
        <p>{event.description}</p>
        <p>{formatDate(event.date)}</p>
        <div className="modal-action">
          <button
            className="btn btn-info"
            onClick={() => setOpenUpdateEventModal(event)}
          >
            <Pencil className="size-5 text-base-200" />
          </button>
          <button
            disabled={deleteEventLoading}
            className="btn btn-error"
            onClick={() => {
              handleDeleteEvent(event._id);
              setOpenEvent(false);
            }}
          >
            {deleteEventLoading ? (
              <MainButtonLoader />
            ) : (
              <Trash2 className="size-5 text-base-200" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
