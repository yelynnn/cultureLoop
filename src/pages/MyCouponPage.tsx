import React, { useEffect, useState } from "react";
import { Gift } from "lucide-react";
import { GetRewardsList } from "@/apis/ChallengeAPI";
import { RewardProps } from "@/types/Mission";

const MyCouponPage: React.FC = () => {
  const [rewards, setRewards] = useState<RewardProps[]>([]);
  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const data = await GetRewardsList();
        setRewards(data);
        console.log("rewards: ", data);
      } catch (error) {
        console.error("Error fetching rewards:", error);
      }
    };

    fetchMissions();
  }, []);
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-5 text-yellow-800 flex items-center gap-2">
        <Gift className="w-6 h-6 text-yellow-600" />
        My Coupons
      </h1>

      <div className="space-y-4">
        {rewards.map((reward, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 bg-yellow-50 border border-yellow-100 rounded-xl px-4 py-3 shadow-sm hover:bg-yellow-100 transition"
          >
            <Gift className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-semibold text-yellow-800">
              {reward.reward}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCouponPage;
