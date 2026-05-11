import { createContext, useContext, type ReactNode } from "react";
import { useAuth } from "../auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { create, list, remove, update } from "../../services/chat";
import type { Chat } from "../../utils/interfaces";

type ChatType = {
  chats: Chat[];
  mutateCreateMessage: any;
  isChatsLoading: boolean;
  handleDeleteChat: any;
  handleUpdateChat: any;
};

const ChatContext = createContext<ChatType | null>(null);

const useChatProvider = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { mutate: mutateCreateMessage } = useMutation({
    mutationKey: ["chats"],
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chats"],
      });
    },
  });

  const { mutate: mutateDeleteMessage } = useMutation({
    mutationKey: ["chats"],
    mutationFn: (chatId: string) => remove(chatId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chats"],
      });
    },
  });

  const { mutate: mutateUpdateMessage } = useMutation({
    mutationKey: ["chats"],
    mutationFn: ({ chatId, data }: { chatId: string; data: any }) =>
      update(chatId, { data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chats"],
      });
    },
  });

  const { data, isLoading: isChatsLoading } = useQuery({
    queryKey: ["chats", user?._id],
    queryFn: list,
    enabled: !!user?._id,
  });

  const chatsLists = data?.results?.chats ?? [];

  const handleDeleteChat = (chatId: string) => {
    mutateDeleteMessage(chatId);
  };

  const handleUpdateChat = (
    chatId: string,
    data: any,
    options?: {
      onSuccess?: (res: any) => void;
      onError?: (err: any) => void;
    },
  ) => {
    mutateUpdateMessage(
      { chatId, data },
      {
        onSuccess: options?.onSuccess,
        onError: options?.onError,
      },
    );
  };

  // console.log("chatsLists ", chatsLists);

  // console.log("user?._id ", user?._id);

  return {
    chats: chatsLists,
    mutateCreateMessage,
    handleDeleteChat,
    isChatsLoading,
    handleUpdateChat,
  };
};

export const ChatProviderContext = ({ children }: { children: ReactNode }) => {
  const chats = useChatProvider();
  return <ChatContext.Provider value={chats}>{children}</ChatContext.Provider>;
};

export const useChats = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChats must be used within a ChatProviderContext");
  }
  return context;
};
