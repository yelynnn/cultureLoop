import { GetBadgesList } from "@/apis/ChallengeAPI";
import { BadgeProps } from "@/types/Mission";
import { useEffect, useState } from "react";

function MyBadgePage() {
  const [badges, setBadges] = useState<BadgeProps>({ badges: [] });

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const data = await GetBadgesList();
        setBadges(data);
        console.log("badges: ", data);
      } catch (error) {
        console.error("Error fetching rewards:", error);
      }
    };

    fetchMissions();
  }, []);
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-5 text-yellow-800 flex items-center gap-2">
        <span className="text-yellow-500">⭐</span>
        My Badges
      </h1>
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-3">
          {badges.badges.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`sticker-${idx}`}
              className="w-20 h-20"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyBadgePage;
