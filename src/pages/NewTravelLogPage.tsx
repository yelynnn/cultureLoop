import { GetDetailTravelLog } from "@/apis/TravelLogAPI";
import { TravelLogDetailProps } from "@/types/TravelLog";
import { onErrorImg } from "@/utils/ErrorImg";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function NewTravelLogPage() {
  const { logId } = useParams();

  const [logDetail, setLogDetail] = useState<TravelLogDetailProps>({
    date: "",
    journal: "",
    city: "",
    imageUrls: [],
    title: "",
    challenge_title: "",
  });

  useEffect(() => {
    const fetchMissions = async () => {
      if (!logId) {
        console.error("log ID is missing");
        return;
      }

      try {
        const data = await GetDetailTravelLog(logId);
        setLogDetail(data);
        console.log("log detail: ", data);
      } catch (error) {
        console.error("Error fetching missions:", error);
      }
    };

    fetchMissions();
  });

  return (
    <div className="max-w-md mx-auto p-4">
      {/* 이미지 */}
      <img
        src={logDetail.imageUrls[0]}
        alt="Travel Cover"
        className="bg-gray-200 w-full h-45 object-cover rounded-lg mb-4"
        onError={onErrorImg}
      />

      {/* 후기 제목 */}
      <h1 className="text-xl font-bold mb-1">{logDetail.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{logDetail.date}</p>

      {/* 미션 정보 */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          <strong className="text-gray-800">Mission:</strong>{" "}
          {logDetail.challenge_title}
        </p>
        <p className="text-sm text-gray-600">
          <strong className="text-gray-800">Location:</strong> {logDetail.city}
        </p>
      </div>

      {/* AI 설명글 */}
      <div className="bg-gray-100 rounded-lg p-4">
        <p className="text-sm text-gray-800">{logDetail.journal}</p>
      </div>
    </div>
  );
}

export default NewTravelLogPage;
