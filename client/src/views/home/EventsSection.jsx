import { Calendar, EllipsisVertical, Pencil } from "lucide-react";
import useEvents from "../../hooks/useEvents";
import formatDate from "../../utils/formateDate";
import { Link } from "react-router-dom";
export default function EventsSection() {
  const { events } = useEvents();

  const printEvents = events?.map((item) => (
    <div key={item._id}>
      <li className="flex gap-3 my-3">
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
    </div>
  ));

  return (
    events?.length > 0 && (
      <article className="bg-base-100 rounded-xl mt-4">
        <header className="flex justify-between items-center px-3">
          <h1 className="text-2xl font-bold">Events</h1>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <EllipsisVertical className="size-5 " />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <Link
                  to={"/events"}
                  className="btn btn-ghost text-start hover:bg-blue-50 flex justify-end"
                >
                  <span className="font-semibold">create</span>
                  <Pencil className="size-5 text-blue-500" />
                </Link>
              </li>
              <li>
                <Link className="flex justify-end btn btn-link" to={"/events"}>
                  show more
                </Link>
              </li>
            </ul>
          </div>
        </header>
        <div className="divider m-0"></div>
        <div className="p-4 py-0">{printEvents}</div>
      </article>
    )
  );
}
