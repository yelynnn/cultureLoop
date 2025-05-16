import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { stickers } from "@/lib/data/Stickers";
import {
  GetDetailMission,
  PostCancelStatus,
  PostChangeStatus,
} from "@/apis/ChallengeAPI";
import { MissionDetailProps, MissionStatusProps } from "@/types/Mission";
import { onErrorImg } from "@/utils/ErrorImg";
import NoAuthModal from "@/components/NoAuthModal";

const MissionDetailPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("jwtToken");
  const [selectedSteps, setSelectedSteps] = React.useState<number[]>([]);
  const [status, setStatus] = React.useState<"start" | "ongoing" | "achieved">(
    "start"
  );
  const [open, setOpen] = React.useState(false);
  const [openSticker, setOpenSticker] = React.useState(false);
  const [rewardSticker, setRewardSticker] = React.useState<string | undefined>(
    undefined
  );
  const [missionDetail, setMissionDetail] = useState<MissionDetailProps>({
    title: "",
    city: "",
    host: "",
    start_date: "",
    end_date: "",
    reward: "",
    cultural_background: "",
    checklist: [],
    images: [],
    mission_status: "",
  });

  const navigate = useNavigate();
  const { challengeId } = useParams();

  useEffect(() => {
    const fetchMissions = async () => {
      if (!challengeId) {
        console.error("Challenge ID is missing");
        return;
      }

      try {
        const data = await GetDetailMission(challengeId);
        setMissionDetail(data);
        if (data.mission_status === "ongoing") {
          setStatus("ongoing");
        } else if (data.mission_status === "completed") {
          setStatus("achieved");
        } else {
          setStatus("start");
        }

        console.log("challenge detail: ", data);
      } catch (error) {
        console.error("Error fetching missions:", error);
      }
    };

    fetchMissions();
  }, [challengeId]);

  const buttonText = {
    start: "Start Challenge",
    ongoing: "Ongoing...",
    achieved: "Achieved!",
  };

  const handleChangeStatus = async () => {
    if (!token) {
      setIsModalOpen(true);
    } else {
      const isCompleted =
        status === "start" ? "false" : status === "achieved" ? "true" : "false";

      const data: MissionStatusProps = {
        challengeId: challengeId!,
        isCompleted: isCompleted,
        file: rewardSticker,
      };
      if (status !== "ongoing") {
        try {
          const response = await PostChangeStatus(data);
          console.log("response 값:", response);
          if (status === "start") {
            setStatus("ongoing");
          }
        } catch (error) {
          console.error("Error while changing status", error);
        }
      } else if (status === "ongoing") setOpen(true);
    }
  };

  const handleCancel = async () => {
    if (!challengeId) {
      console.error("Challenge ID is missing");
      return;
    }
    try {
      await PostCancelStatus(challengeId);
      setStatus("start");
    } catch (error) {
      console.error("Error while giving up mission", error);
    }
  };

  const handleToggle = (idx: number) => {
    setSelectedSteps((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleAchieve = () => {
    setStatus("achieved");
    setOpen(false);
    const randomSticker = stickers[Math.floor(Math.random() * stickers.length)];
    setRewardSticker(randomSticker);
    setOpenSticker(true);
  };

  const handleGetSticker = () => {
    setOpenSticker(false);
    handleChangeStatus();
  };

  useEffect(() => {
    if (status === "achieved") {
      setSelectedSteps([0, 1, 2]);
    } else if (status === "start") {
      setSelectedSteps([]);
    }
  }, [status]);

  useEffect(() => {
    console.log("status:", status);
  }, [status]);

  return (
    <div className="w-full max-w-md mx-auto bg-white min-h-screen flex flex-col overflow-y-auto">
      {/* 이미지 */}
      <img
        src={missionDetail.images[0]}
        alt={missionDetail.title}
        className="w-full h-50 object-cover bg-gray-200 rounded-md mt-2"
        onError={onErrorImg}
      />

      {/* 콘텐츠 */}
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-1">{missionDetail.title}</h1>
        <p className="text-sm text-gray-600 mb-1">{missionDetail.city}</p>
        {missionDetail.host && (
          <p className="text-xs text-gray-500">
            <strong>Hosted by </strong> {missionDetail.host}
          </p>
        )}
        <p className="text-xs text-gray-500 mb-4">
          {missionDetail.start_date} ~ {missionDetail.end_date}
        </p>
        {missionDetail.reward && (
          <div className="border rounded-lg p-3 mb-4 bg-yellow-50">
            <h2 className="text-sm font-semibold mb-1 text-yellow-800">
              Reward
            </h2>
            <p className="text-sm text-yellow-700">{missionDetail.reward}</p>
          </div>
        )}

        <div className="border rounded-lg p-3 mb-4">
          <h2 className="text-sm font-semibold mb-1">Cultural Background</h2>
          <p className="text-sm text-gray-700">
            {missionDetail.cultural_background}
          </p>
        </div>

        {/* 체크박스 */}
        <div className="space-y-2">
          {missionDetail.checklist.map((step, idx) => (
            <div key={idx} className="flex items-start space-x-4">
              <input
                type="checkbox"
                checked={selectedSteps.includes(idx)}
                onChange={() => handleToggle(idx)}
                className="rounded-b-full form-checkbox text-sky-300 mt-1"
              />
              <span className="text-sm">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 고정 버튼 */}
      <div className="p-4">
        <button
          onClick={handleChangeStatus}
          disabled={status === "achieved"}
          className={`cursor-pointer w-full py-3 rounded-xl font-semibold transition ${
            status === "achieved"
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-sky-400 text-white hover:bg-sky-600"
          }`}
        >
          {buttonText[status]}
        </button>
        {status === "ongoing" && (
          <button
            onClick={handleCancel}
            className={`cursor-pointer w-full py-3 rounded-xl mt-3 font-semibold transition bg-gray-400 text-white`}
          >
            Give Up
          </button>
        )}
        {status === "achieved" && (
          <button
            onClick={() => navigate(`/challenge/${challengeId}/create-journal`)}
            className={`cursor-pointer w-full py-3 rounded-xl mt-3 font-semibold transition bg-sky-400 text-white hover:bg-sky-600`}
          >
            Write Travel Journal!
          </button>
        )}
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Complete this challenge?</AlertDialogTitle>
            <AlertDialogDescription>
              You’ve completed all the steps.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setStatus("ongoing")}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleAchieve} className="bg-sky-400">
              Mark as Achieved
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={openSticker} onOpenChange={setOpenSticker}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>🎉 Challenge Complete!</AlertDialogTitle>
            <AlertDialogDescription className="text-sm">
              You’ve earned a new sticker badge!
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* 스티커 미리보기 */}
          {rewardSticker && (
            <div className="flex justify-center py-1">
              <img
                src={rewardSticker}
                alt="Sticker Reward"
                className="w-24 h-24"
              />
            </div>
          )}

          <AlertDialogFooter>
            <div className="w-full text-center">
              <AlertDialogAction
                onClick={handleGetSticker}
                className="bg-sky-400 inline-block"
              >
                Got it!
              </AlertDialogAction>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <NoAuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default MissionDetailPage;
