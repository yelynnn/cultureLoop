import axios from "axios";
import { axiosInstance } from "./AxiosInstance";

const signUpWithGoogleToken = async (googleToken: string) => {
  try {
    const axiosInstance = axios.create({
      baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${googleToken}`,
      },
    });

    const response = await axiosInstance.post("/auth/signup");
    console.log("회원가입여부", response.data.isMember);
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
};

const PostPreference = async (preferList: string[]) => {
  console.log("선호도 목록: ", preferList);

  try {
    const response = await axiosInstance.post("/users/me/preference", {
      preference: preferList,
    });
    console.log("선호도 조사 성공");
    return response.data;
  } catch (error) {
    console.error("Error during set preference:", error);
    throw error;
  }
};

const PostCount = async (count: number) => {
  console.log("미션 수: ", count);

  try {
    const response = await axiosInstance.post("/users/me/count", count);
    console.log("미션 수 조사 성공");
    return response.data;
  } catch (error) {
    console.error("Error during set count:", error);
    throw error;
  }
};

const GetUserProfile = async () => {
  try {
    const response = await axiosInstance.get("/users/me");
    console.log("사용자 프로필 받아오기 성공");
    return response.data;
  } catch (error) {
    console.error("Error during getting user profile:", error);
    throw error;
  }
};

export { signUpWithGoogleToken, PostPreference, PostCount, GetUserProfile };
