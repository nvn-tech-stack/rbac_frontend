import { formatDistanceToNow, format } from "date-fns";

export const getStatusStyle = (status: string) => {
  const baseStyle = {
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: 900,
  };

  if (status === "active") {
    return {
      ...baseStyle,
      backgroundColor: "green",
      color: "white",
    };
  } else if (status === "inactive") {
    return {
      ...baseStyle,
      backgroundColor: "red",
      color: "white",
    };
  } else if (status === "pending") {
    return {
      ...baseStyle,
      backgroundColor: "blue",
      color: "white",
    };
  }
};

export const formatDateTime = (date: any) =>
  formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });

export const fullDateTimeFormat = (date: any) => {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) return "-";

  return format(parsedDate, "dd MMM yyyy, hh:mm a");
};

export const dateFormat = (date: any) => {
  if (!date) return "-";
  return format(new Date(date), "yyyy-MM-dd");
};

export const timeFormat = (date: any) => {
  if (!date) return "-";
  return format(new Date(date), "HH:mm:ss");
};

export const twelveHourTimeFormat = (date: any) => {
  if (!date) return "-";
  return format(new Date(date), "hh:mm a");
};
