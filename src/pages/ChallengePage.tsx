import { GetCityMission } from "@/apis/ChallengeAPI";
import MissionList from "@/components/MissionList";
import { SearchLocation } from "@/components/SearchLocation";
import useLocationStore from "@/stores/location";
import { useEffect, useState } from "react";

function ChallengePage() {
  const { selectedArea } = useLocationStore();
  const [missionList, setMissionList] = useState([]);

  useEffect(() => {
    setMissionList([]);
    const fetchMissions = async () => {
      if (selectedArea?.value) {
        try {
          const data = await GetCityMission(selectedArea.value);
          setMissionList(data);
          console.log(data);
        } catch (error) {
          console.error("Error fetching missions:", error);
        }
      }
    };

    fetchMissions();
  }, [selectedArea]);

  return (
    <div>
      <div className="px-6 fixed top-13 left-1/2 transform -translate-x-1/2 py-6 h-20 bg-white w-full max-w-md">
        <SearchLocation />
      </div>
      <div className="pt-20 overflow-y-auto px-3 mb-4">
        {selectedArea?.value ? (
          <MissionList missions={missionList} />
        ) : (
          <div className="w-full h-full bg-white"></div>
        )}
      </div>
    </div>
  );
}

export default ChallengePage;
