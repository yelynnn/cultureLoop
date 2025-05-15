import { JournalProps } from "@/types/TravelLog";
import { onErrorImg } from "@/utils/ErrorImg";
import React from "react";
import { useNavigate } from "react-router-dom";

const JournalBox: React.FC<JournalProps> = ({
  imageUrls,
  title,
  date,
  logId,
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/journal/${logId}/detail`)}
      className="cursor-pointer rounded-xl overflow-hidden shadow-sm bg-white border"
    >
      <div className="w-full h-28 bg-gray-200">
        <img
          src={
            imageUrls && imageUrls.length > 0
              ? imageUrls[0]
              : "https://your-image-url.com/sample.jpg"
          }
          alt="journalImg"
          className="w-full h-full object-cover"
          onError={onErrorImg}
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold leading-snug line-clamp-1">
          {title}
        </h3>
        <p className="text-xs text-gray-500 mt-1">{date}</p>
      </div>
    </div>
  );
};

export default JournalBox;
