import { TravelLogProps } from "@/types/TravelLog";
import { axiosInstance } from "./AxiosInstance";

const GetMyTravelLogs = async () => {
  try {
    const response = await axiosInstance.get(`users/me/logs`);

    console.log("내 트래블 로그 가져오기 성공");
    return response.data.logs;
  } catch (error) {
    console.error("Error during getting my travel logs:", error);
    throw error;
  }
};

const PostNewTravelLog = async (
  TravelLogData: TravelLogProps,
  imageFile: File
) => {
  const formData = new FormData();

  const travelLogBlob = new Blob([JSON.stringify(TravelLogData)], {
    type: "application/json",
  });

  formData.append("log", travelLogBlob);

  if (imageFile) {
    formData.append("images", imageFile);
  }
  try {
    const response = await axiosInstance.post("/log/generate", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("트래블 로그 생성 성공");
    return response.data;
  } catch (error) {
    console.error("Error while travel log creation:", error);
    throw error;
  }
};

const GetDetailTravelLog = async (logId: string) => {
  try {
    const response = await axiosInstance.get(`/log`, {
      params: {
        logId,
      },
    });
    console.log("트레블 로그 상세정보 가져오기 성공");
    return response.data;
  } catch (error) {
    console.error("Error during getting travel log detail:", error);
    throw error;
  }
};

export { GetMyTravelLogs, PostNewTravelLog, GetDetailTravelLog };
