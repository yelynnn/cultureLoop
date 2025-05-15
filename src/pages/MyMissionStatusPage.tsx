import { GetAchievedMission, GetOngoingMission } from "@/apis/ChallengeAPI";
import { GetMyTravelLogs } from "@/apis/TravelLogAPI";
import JournalList from "@/components/JournalList";
import MissionList from "@/components/MissionList";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function MyMissionStatusPage() {
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [isJournal, setIsJournal] = useState(false);

  const title =
    location.pathname === "/missions/ongoing"
      ? "Ongoing Missions"
      : location.pathname === "/missions/achieved"
      ? "Achieved Missions"
      : location.pathname === "/my-journals"
      ? "My Journals"
      : "Missions";

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (title === "Achieved Missions") {
          data = await GetAchievedMission();
        } else if (title === "Ongoing Missions") {
          data = await GetOngoingMission();
        } else if (title === "My Journals") {
          data = await GetMyTravelLogs();
          setIsJournal(true);
        } else {
          data = [];
        }
        setItems(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching missions:", error);
      }
    };

    fetchData();
  }, [title]);

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-sky-500 tracking-tight">
          {title}
        </h1>
      </div>
      <div className="overflow-y-auto mb-4">
        {isJournal === false ? (
          <MissionList missions={items} />
        ) : (
          <JournalList journals={items} />
        )}
      </div>
    </div>
  );
}

export default MyMissionStatusPage;
