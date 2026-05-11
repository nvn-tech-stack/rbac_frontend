import { createContext, useContext } from "react";
import { useAuth } from "../auth";
import {
  getNotificationByUser,
  updateNotificationByUser,
} from "../../services/notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type NotificationContextType = {
  notifications: any[];
  isLoading: boolean;
  handleReadNotifications: (id: string) => void;
  hasUnread: boolean;
};

export const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  isLoading: false,
  handleReadNotifications: () => {},
  hasUnread: false,
});

const useNotificationProvider = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["notifications", user?._id],
    queryFn: () => {
      if (user?._id) {
        return getNotificationByUser(user._id);
      }
    },
    enabled: !!user?._id,
    refetchInterval: 1000,
  });

  const { mutate: updateNotification } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateNotificationByUser(id, { data }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });

  const notificationsList = notifications?.results?.notifications || [];

  const handleReadNotifications = (id: string) => {
    updateNotification({ id, data: { is_read: true } });
  };
  const hasUnread = notificationsList.some((n: any) => n.is_read === false);

  return {
    notifications: notificationsList,
    isLoading,
    handleReadNotifications,
    hasUnread,
  };
};

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const notification = useNotificationProvider();

  return (
    <NotificationContext.Provider value={notification}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
};
