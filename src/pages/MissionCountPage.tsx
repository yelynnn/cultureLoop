import { PostCount } from "@/apis/SignupAPI";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MissionCountPage() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  const handleSubmitCount = async () => {
    try {
      await PostCount(count);
      navigate("/signup-prefer");
    } catch (error) {
      console.error("Error during preference submission:", error);
    }
  };

  return (
    <div className="h-full flex flex-col justify-between max-w-md mx-auto p-6">
      {/* 상단 콘텐츠 */}
      <div>
        <h1 className="text-2xl font-bold mb-3">
          How many to explore in each region?
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Specify the number of challenges you'd like to explore in each region.
        </p>
        <div className="flex items-end gap-2 mb-2">
          <input
            type="number"
            id="challengeCount"
            name="challengeCount"
            min="1"
            placeholder="e.g., 10"
            required
            onChange={(event) => setCount(Number(event.target.value))}
            className="w-28 border-b-2 border-gray-300 text-center focus:outline-none focus:border-sky-400 text-sm py-2 placeholder:text-left"
          />
          <span className="text-sm text-gray-500">challenges</span>
        </div>
      </div>
      {/* 하단 버튼 */}
      <button
        onClick={handleSubmitCount}
        disabled={count === 0}
        className="cursor-pointer w-full py-3 rounded-xl font-semibold bg-sky-400 text-white hover:bg-sky-600 transition"
      >
        Next
      </button>
    </div>
  );
}

export default MissionCountPage;
