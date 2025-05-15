import { CreateMissionProps, MissionStatusProps } from "@/types/Mission";
import { axiosInstance } from "./AxiosInstance";

const PostChallenge = async (
  challengeData: CreateMissionProps,
  imageFile: File
) => {
  const formData = new FormData();

  // challenge 데이터를 JSON으로 변환 후 Blob으로 감싸기
  const challengeBlob = new Blob([JSON.stringify(challengeData)], {
    type: "application/json",
  });

  formData.append("challenge", challengeBlob);

  if (imageFile) {
    formData.append("images", imageFile);
  }

  try {
    const response = await axiosInstance.post(
      "/challenge/community",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("챌린지 생성 성공");
    return response.data;
  } catch (error) {
    console.error("Error during challenge creation:", error);
    throw error;
  }
};

const GetCityMission = async (city: string) => {
  try {
    const response = await axiosInstance.get(`/challenge/random-challenge`, {
      params: { city },
    });
    console.log("지역 챌린지 가져오기 성공");
    return response.data.challenges;
  } catch (error) {
    console.error("Error during getting city challenge:", error);
    throw error;
  }
};

const GetRandomMission = async () => {
  try {
    const response = await axiosInstance.get("/challenge");
    console.log("랜덤 챌린지 가져오기 성공");
    return response?.data;
  } catch (error) {
    console.error("Error during getting random challenge:", error);
    throw error;
  }
};

const GetOngoingMission = async () => {
  try {
    const response = await axiosInstance.get(`/users/me/ongoing`);
    console.log("진행 중인 챌린지 가져오기 성공");
    return response.data.challenges;
  } catch (error) {
    console.error("Error during getting my ongoing challenge:", error);
    throw error;
  }
};

const GetAchievedMission = async () => {
  try {
    const response = await axiosInstance.get(`/users/me/completed`);
    console.log("성공한 챌린지 가져오기 성공");
    return response.data.challenges;
  } catch (error) {
    console.error("Error during getting my achieved challenge:", error);
    throw error;
  }
};

const GetDetailMission = async (challengeId: string) => {
  try {
    const response = await axiosInstance.get(`/challenge`, {
      params: {
        challengeId,
      },
    });
    console.log("챌린지 상세정보 가져오기 성공");
    return response.data;
  } catch (error) {
    console.error("Error during getting challenge detail:", error);
    throw error;
  }
};

const PostChangeStatus = async (missionStatus: MissionStatusProps) => {
  try {
    const response = await axiosInstance.post(
      `/challenge/user-challenge`,
      missionStatus
    );
    console.log("챌린지 상태 변경 성공");
    return response;
  } catch (error) {
    console.error("Error during changing status:", error);
    throw error;
  }
};

const PostCancelStatus = async (challengeId: string) => {
  try {
    const response = await axiosInstance.post(`/challenge/cancel`, {
      challengeId: challengeId,
    });
    console.log("챌린지 취소 성공");
    return response;
  } catch (error) {
    console.error("Error during canceling status:", error);
    throw error;
  }
};

const GetRewardsList = async () => {
  try {
    const response = await axiosInstance.get(`/users/me/rewards`);
    console.log("rewards 목록 가져오기 성공");
    return response.data.rewards;
  } catch (error) {
    console.error("Error during getting my rewards list:", error);
    throw error;
  }
};

const GetBadgesList = async () => {
  try {
    const response = await axiosInstance.get(`/users/me/badges`);
    console.log("badges 목록 가져오기 성공");
    return response.data;
  } catch (error) {
    console.error("Error during getting my badges list:", error);
    throw error;
  }
};

export {
  PostChallenge,
  GetCityMission,
  GetRandomMission,
  GetOngoingMission,
  GetAchievedMission,
  GetDetailMission,
  PostChangeStatus,
  GetRewardsList,
  PostCancelStatus,
  GetBadgesList,
};
