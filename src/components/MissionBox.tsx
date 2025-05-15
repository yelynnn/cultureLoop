import { MissionBoxProps } from "@/types/Mission";
import { onErrorImg } from "@/utils/ErrorImg";
import React from "react";
import { useNavigate } from "react-router-dom";

const MissionBox: React.FC<MissionBoxProps> = ({
  imageUrl,
  title,
  start_date,
  end_date,
  challengeId,
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/challenge/${challengeId}/detail`)}
      className="cursor-pointer rounded-xl overflow-hidden shadow-sm bg-white border"
    >
      <div className="w-full h-28 bg-gray-200">
        <img
          src={imageUrl}
          alt="missionImg"
          className="w-full h-full object-cover"
          onError={onErrorImg}
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold leading-snug line-clamp-1">
          {title}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {start_date} ~ {end_date}
        </p>
      </div>
    </div>
  );
};

export default MissionBox;
