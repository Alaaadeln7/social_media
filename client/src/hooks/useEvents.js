import { useMemo } from "react";
import { useCreateEventMutation, useDeleteEventMutation, useGetEventsQuery, useUpdateEventMutation } from "../app/api/eventsApiSlice"
import { toast } from "react-hot-toast";
export default function useEvents() {
  const { data: data, isLoading: getEventsLoading } = useGetEventsQuery();
  const [createEvent, { isLoading: createEventLoading }] = useCreateEventMutation();
  const [deleteEvent, { isLoading: deleteEventLoading }] = useDeleteEventMutation();
  const [updateEvent, { isLoading: updateEventLoading }] = useUpdateEventMutation();
  const events = useMemo(() => data?.data?.events, [data]);
  const handleCreateEvent = async (data) => {
    const res = await createEvent(data);
    if (res?.data) {
      toast.success("Event created successfully");
    }
  }
  const handleDeleteEvent = async (eventId) => {
    const res = await deleteEvent(eventId);
    if (res?.data) {
      toast.success("Event deleted successfully");
    }
  }
  const handleUpdateEvent = async (data) => {
    const res = await updateEvent(data);
    if (res?.data) {
      toast.success("Event updated successfully");
    }
  }
  return {
    events,
    getEventsLoading,
    handleCreateEvent,
    createEventLoading,
    handleDeleteEvent,
    deleteEventLoading,
    handleUpdateEvent,
    updateEventLoading
  }
}
