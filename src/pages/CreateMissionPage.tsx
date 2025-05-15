import React, { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CreateMissionProps } from "@/types/Mission";
import { SearchLocation } from "@/components/SearchLocation";
import useLocationStore from "@/stores/location";
import { PostChallenge } from "@/apis/ChallengeAPI";
import { formatDate } from "@/utils/FormatDate";
import { PulseLoader } from "react-spinners";

const CreateMissionPage: React.FC = () => {
  const { selectedArea } = useLocationStore();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const imgRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<CreateMissionProps>();

  const saveImgFile = () => {
    const file = imgRef.current?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(file);
    };
  };

  const onSubmit: SubmitHandler<CreateMissionProps> = async (data) => {
    setIsLoading(true);
    const missionData = {
      ...data,
      city: selectedArea?.value || null,
      start_date: formatDate(startDate),
      end_date: formatDate(endDate),
    };
    console.log(missionData);
    if (imgFile) {
      try {
        const response = await PostChallenge(missionData, imgFile);
        const challengeId = response.challengeId;
        console.log("responseId: ", challengeId);
        navigate(`/challenge/${challengeId}/detail`);
      } catch (error) {
        console.error("미션 생성 실패:", error);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center text-sky-500">
        Create New Mission
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* 미션 제목 */}
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            type="text"
            {...register("title")}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            placeholder="Enter mission title"
            required
          />
        </div>

        {/* 위치 */}
        <div>
          <label className="block text-sm font-medium mb-1">Location *</label>
          <SearchLocation />
        </div>

        {/* 미션 기간 */}
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              Start Date *
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="YYYY-MM-DD"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div className="pb-2 text-gray-500">~</div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">End Date *</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="YYYY-MM-DD"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* 혜택 */}
        <div>
          <label className="block text-sm font-medium mb-1">Reward</label>
          <input
            type="text"
            {...register("reward")}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            placeholder="e.g., Discount coupon"
          />
        </div>

        {/* 설명 */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Description *
          </label>
          <textarea
            {...register("description")}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            rows={4}
            placeholder="Describe the mission..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Image *</label>
          <div className="flex gap-x-3 items-baseline">
            {imgFile ? (
              <img
                src={URL.createObjectURL(imgFile)}
                alt="missionImg"
                className="w-20 h-20"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-200 flex justify-center items-center">
                <Icon
                  icon="la:image"
                  width="40"
                  height="40"
                  className="text-white"
                />
              </div>
            )}
            <label
              className=" h-fit cursor-pointer px-2 rounded-xl border border-gray-400 text-gray-500 font-semibold hover:bg-sky-100 transition"
              htmlFor="MissionImg"
            >
              Upload
            </label>
            <input
              className="hidden"
              type="file"
              accept="image/*"
              id="MissionImg"
              name="MissionImg"
              onChange={saveImgFile}
              ref={imgRef}
              required
            />
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <PulseLoader size={6} color="#ffffff" />
            ) : (
              "Create with AI"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateMissionPage;
