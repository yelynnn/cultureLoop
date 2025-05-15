import React from "react";
import MissionBox from "./MissionBox";
import { MissionListProps } from "@/types/Mission";
import defaultImg from "/defaultImg.jpeg";
import { Skeleton } from "@/components/ui/skeleton";

const MissionList: React.FC<MissionListProps> = ({ missions = [] }) => {
  return (
    <div className="grid grid-cols-2 gap-4 pb-4">
      {missions.length > 0
        ? missions.map((mission, idx) => (
            <MissionBox
              key={idx}
              imageUrl={
                mission.images && mission.images.length > 0
                  ? mission.images[0]
                  : defaultImg
              }
              title={mission.title || `챌린지 ${idx + 1}`}
              start_date={mission.start_date || "2024.06.01"}
              end_date={mission.end_date || "2024.07.15"}
              challengeId={mission.challengeId}
            />
          ))
        : Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="flex flex-col space-y-3">
              <Skeleton className="w-full h-40 rounded-xl" />
            </div>
          ))}
    </div>
  );
};

export default MissionList;
