import EventsSection from "./EventsSection";
import EventFrom from "./EventFrom";
export default function Events() {
  return (
    <div className="mt-20 flex justify-center items-center flex-col">
      <header className="my-3">
        <h1 className="text-3xl font-bold">Events</h1>
      </header>
      <article className="bg-base-100 rounded-xl p-5 shadow-lg">
        <EventFrom />
      </article>
      <article className="w-full">
        <EventsSection />
      </article>
    </div>
  );
}
