import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MissionList from "@/components/MissionList";
import { GetRandomMission } from "@/apis/ChallengeAPI";

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [missionList, setMissionList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetRandomMission();
        console.log("랜덤 미션 목록: ", response);
        setMissionList(response);
      } catch (error) {
        console.error("Error fetching missions:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 h-screen flex justify-center">
      <div className="w-full max-w-md bg-white h-screen flex flex-col relative">
        <div className="p-3">
          <h1 className="text-2xl font-bold mb-2">Hello, Challenger!</h1>
          <h2 className="text-lg font-semibold mb-2">Recommended Challenges</h2>
        </div>

        <div className="overflow-y-auto px-3 mb-4">
          <MissionList missions={missionList} />
        </div>

        <div className="justify-center w-full max-w-md">
          <div className="h-[60px] flex items-center justify-center">
            <button
              onClick={() => navigate("/challenges")}
              className="cursor-pointer px-5 py-3 rounded-xl border border-sky-400 text-sky-500 font-semibold hover:bg-sky-100 transition"
            >
              Get New Challenge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
