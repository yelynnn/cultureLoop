import { Icon } from "@iconify/react/dist/iconify.js";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enUS } from "date-fns/locale";
import { SubmitHandler, useForm } from "react-hook-form";
import { TravelLogProps } from "@/types/TravelLog";
import { formatDate } from "@/utils/FormatDate";
import { PostNewTravelLog } from "@/apis/TravelLogAPI";
import { PulseLoader } from "react-spinners";

function CreateTravelLogPage() {
  const navigate = useNavigate();
  const { challengeId } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit } = useForm<TravelLogProps>();

  const saveImgFile = () => {
    const file = imgRef.current?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(file);
    };
  };

  const onSubmit: SubmitHandler<TravelLogProps> = async (data) => {
    setIsLoading(true);

    if (!challengeId) {
      console.error("Challenge ID is missing");
      return;
    }

    const travelLogData = {
      ...data,
      date: formatDate(selectedDate),
      challengeId,
    };
    console.log(travelLogData);
    if (imgFile) {
      try {
        const response = await PostNewTravelLog(travelLogData, imgFile);
        const logId = response.logId;
        console.log("logId: ", logId);
        navigate(`/journal/${logId}/detail`);
      } catch (error) {
        console.error("트레블 로그 생성 실패:", error);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Create your journal
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <label htmlFor="coverImage">
          {imgFile ? (
            <img
              src={URL.createObjectURL(imgFile)}
              alt="coverImg"
              className="cursor-pointer w-full h-45 mb-4 rounded-lg"
            />
          ) : (
            <div className="cursor-pointer flex-col gap-y-0.5 w-full h-45 bg-gray-100 border border-gray-300 rounded-lg flex justify-center items-center mb-4">
              <Icon
                icon="lineicons:upload-1"
                height="23"
                className="text-gray-400"
              />
              <span className="text-gray-400 text-sm">Add Cover Image</span>
            </div>
          )}
        </label>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="coverImage"
          onChange={saveImgFile}
          ref={imgRef}
          required
        />

        {/* 제목 */}
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          {...register("title")}
          placeholder="Enter title"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-sky-400"
          required
        />
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Date
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          locale={enUS}
          placeholderText="YYYY-MM-DD"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />

        {/* 후기 내용 */}
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          {...register("description")}
          rows={5}
          placeholder="Share your experience! We’ll help refine it."
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-6 resize-none focus:outline-none focus:ring-2 focus:ring-sky-400"
          required
        />

        {/* 제출 버튼 */}
        <button
          type="submit"
          className="cursor-pointer w-full py-3 bg-sky-500 text-white font-semibold rounded-md hover:bg-sky-600 transition"
          disabled={isLoading}
        >
          {isLoading ? (
            <PulseLoader size={6} color="#ffffff" />
          ) : (
            "Create with AI"
          )}{" "}
        </button>
      </form>
    </div>
  );
}

export default CreateTravelLogPage;
