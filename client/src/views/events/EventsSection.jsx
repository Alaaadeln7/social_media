import { Calendar } from "lucide-react";
import useEvents from "../../hooks/useEvents";
import EventItemSkeleton from "../../components/skeletons/eventItemSkeleton";
import formatDate from "../../utils/formateDate";
import UpdateEventModal from "./UpdateEventModal";
import { useState } from "react";
import SingleEventModal from "./SingleEventModal";
export default function EventsSection() {
  const [openUpdateEventModal, setOpenUpdateEventModal] = useState(null);

  const [activeEvent, setActiveEvent] = useState(null);
  // const [openEvent, setOpenEvent] = useState(false);
  const { events, eventsLoading } = useEvents();
  const printEvents = events?.map((item) => (
    <>
      <li
        onClick={() => setActiveEvent(item)}
        key={item._id}
        className="flex items-start gap-3 my-3"
      >
        <Calendar className="size-5" />
        <div className="flex flex-col items-start text-left">
          <h1 className="font-semibold ">{item.title}</h1>
          {item.description && (
            <p className="line-clamp-1">{item.description}</p>
          )}
          <p className="text-sm italic">{formatDate(item.date)}</p>
        </div>
      </li>
      <div className="divider"></div>
    </>
  ));
  return (
    <div className="bg-base-100 w-full rounded-xl p-3 mt-4 px-5">
      <ul>{eventsLoading ? <EventItemSkeleton /> : printEvents}</ul>
      {!eventsLoading && events?.length === 0 && (
        <p className="text-center text-gray-500">No Events</p>
      )}
      {activeEvent && (
        <SingleEventModal
          event={activeEvent}
          setOpenEvent={() => setActiveEvent(null)}
          setOpenUpdateEventModal={setOpenUpdateEventModal}
        />
      )}

      {openUpdateEventModal && (
        <UpdateEventModal
          event={openUpdateEventModal}
          setOpenUpdateEventModal={setOpenUpdateEventModal}
        />
      )}
    </div>
  );
}
