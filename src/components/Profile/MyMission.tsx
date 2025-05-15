import React from "react";
import { useNavigate } from "react-router-dom";

function MyMission() {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">My Missions</h2>
      <div className="border rounded-xl divide-y">
        <button
          onClick={() => navigate("/missions/ongoing")}
          className="cursor-pointer w-full text-left px-4 py-3 flex justify-between items-center hover:bg-gray-50"
        >
          <span>Ongoing</span>
          <span>›</span>
        </button>
        <button
          onClick={() => navigate("/missions/achieved")}
          className="cursor-pointer w-full text-left px-4 py-3 flex justify-between items-center hover:bg-gray-50"
        >
          <span>Achieved</span>
          <span>›</span>
        </button>
        <button
          onClick={() => navigate("/my-journals")}
          className="cursor-pointer w-full text-left px-4 py-3 flex justify-between items-center hover:bg-gray-50"
        >
          <span>Travel Journals</span>
          <span>›</span>
        </button>
      </div>
    </div>
  );
}

export default MyMission;
