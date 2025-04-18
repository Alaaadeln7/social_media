import toast from "react-hot-toast";
import {
  useCreateConversationMutation,
  useSendMessageMutation,
} from "../app/api/chatApiSlice";
export default function useChat() {
  const [createConversation, { isLoading: createConversationLoading }] =
    useCreateConversationMutation();
  const [sendMessage, { isLoading: sendMessageLoading }] =
    useSendMessageMutation();
  const handleSendMessage = async (data) => {
    try {
      await sendMessage(data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleCreateConversation = async (data) => {
    const res = await createConversation(data);
    if (res.data) {
      toast.success("Conversation created successfully");
    }
  };

  return {
    handleCreateConversation,
    createConversationLoading,
    handleSendMessage,
    sendMessageLoading,
  };
}
