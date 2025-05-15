import dayjs from "dayjs";

  export const formatDate = (date: Date | null): string => {
    if (date === null) return "";
    return dayjs(date).format("YYYY-MM-DD");
  };