import { PostPreference } from "@/apis/SignupAPI";
import { preferences } from "@/lib/data/PreferList";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PreferencePage: React.FC = () => {
  const [selected, setSelected] = React.useState<string[]>([]);
  const navigate = useNavigate();

  const togglePreference = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((p) => p !== item) : [...prev, item]
    );
  };

  useEffect(() => {
    console.log("preferences: ", selected);
  }, [selected]);

  const handleSubmitPrefer = async () => {
    try {
      await PostPreference(selected);
      navigate("/");
    } catch (error) {
      console.error("Error during preference submission:", error);
    }
  };

  return (
    <div className="h-full flex flex-col justify-between max-w-md mx-auto p-6">
      <div>
        <h1 className="text-2xl font-bold mb-3">
          What do you enjoy when traveling?
        </h1>
        <p className="text-sm text-gray-500 mb-5">
          You can choose multiple preferences.
        </p>

        <div className="grid grid-cols-3 gap-3">
          {preferences.map((pref) => (
            <button
              key={pref}
              onClick={() => togglePreference(pref)}
              className={`aspect-square flex justify-center items-center text-center px-2 py-2 text-sm rounded-lg border font-medium transition break-words ${
                selected.includes(pref)
                  ? "bg-sky-300 text-white border-sky-500"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              }`}
            >
              {pref}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmitPrefer}
        disabled={selected.length === 0}
        className={`cursor-pointer w-full py-3 rounded-xl font-semibold transition bg-sky-400 text-white hover:bg-sky-600`}
      >
        Sign up
      </button>
    </div>
  );
};

export default PreferencePage;
