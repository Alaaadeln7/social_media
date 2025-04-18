import EventsSection from "./EventsSection";
import MessagesSection from "./MessagesSection";

export default function RightSide() {
  return (
    <article className="fixed top-0 right-0 h-screen mt-20 sm:w-3/12 hidden xsm:hidden sm:flex md:hidden lg:flex rounded-xl flex-col gap-3">
      <div className="h-full overflow-y-auto p-4 custom-scrollbar">
        <MessagesSection />
        <EventsSection />
      </div>
    </article>
  );
}
