import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import MyMission from "@/components/Profile/MyMission";
import { useNavigate } from "react-router-dom";
import { GetUserProfile } from "@/apis/SignupAPI";
import { ProfileData } from "@/types/User";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetUserProfile();
        console.log("사용자 profile 정보: ", response);
        setProfile(response);
      } catch (error) {
        console.error("Error fetching missions:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="flex items-center mb-6 space-x-4 relative">
        <div className="relative">
          {profile ? (
            <img
              src={profile?.picture}
              alt="profileImg"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <Skeleton className="w-16 h-16 rounded-full" />
          )}
        </div>
        <div>
          {profile ? (
            <p className="font-semibold text-base line-clamp-1">
              {profile?.name}
            </p>
          ) : (
            <Skeleton className="w-[120px] h-[20px] rounded-full" />
          )}
          {profile ? (
            <p className="text-sm text-gray-500">{profile?.email}</p>
          ) : (
            <Skeleton className="w-[160px] h-[16px] rounded-full mt-2" />
          )}
        </div>
      </div>
      {/* 쿠폰 & 배지 */}
      <div className="flex justify-between gap-4 mb-6">
        <button
          onClick={() => navigate("/my-coupon")}
          className="cursor-pointer flex-1 border rounded-xl py-3 flex flex-col items-center hover:bg-gray-50"
        >
          <div className="text-2xl">🏷️</div>
          <span className="mt-1 font-medium">Coupon</span>
        </button>
        <button
          onClick={() => navigate("/my-badge")}
          className="cursor-pointer flex-1 border rounded-xl py-3 flex flex-col items-center hover:bg-gray-50"
        >
          <div className="text-2xl">⭐</div>
          <span className="mt-1 font-medium">Badge</span>
        </button>
      </div>

      {/* 미션 목록 */}
      <MyMission />
      <div className="h-[60px] mt-5 flex items-center justify-center">
        <button
          onClick={() => navigate("/create-mission")}
          className="cursor-pointer px-5 py-3 rounded-xl border border-sky-400 text-sky-500 font-semibold hover:bg-sky-100 transition"
        >
          Create Your Mission
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
