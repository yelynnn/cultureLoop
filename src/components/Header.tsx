import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { signUpWithGoogleToken } from "@/apis/SignupAPI";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const googleToken = await result.user.getIdToken();
      sessionStorage.setItem("googleToken", googleToken);

      const userData = await signUpWithGoogleToken(googleToken);

      const jwtToken = userData.token;
      localStorage.setItem("jwtToken", jwtToken);
      console.log("jwtToken: ", jwtToken);

      if (userData.isMember === 0) {
        navigate("/signup-count");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    window.location.reload();
  };

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-md z-50">
      <header className="flex justify-between bg-white shadow-md px-4 py-3 ">
        <span
          onClick={() => navigate("/")}
          className="cursor-pointer text-sky-500 font-bold text-xl text-left"
        >
          CultureLoop
        </span>
        {localStorage.getItem("jwtToken") ? (
          <button
            onClick={handleLogout}
            className="px-3 cursor-pointer flex items-center justify-center w-fit gap-x-1 border border-gray-300 rounded-md "
          >
            <span className="text-sm text-gray-600">LogOut</span>
          </button>
        ) : (
          <button
            onClick={handleGoogleLogin}
            className="px-3 cursor-pointer flex items-center justify-center w-fit gap-x-1 border border-gray-300 rounded-md "
          >
            <Icon icon="flat-color-icons:google" width="15" height="15" />
            <span className="text-sm text-gray-600">Login</span>
          </button>
        )}
      </header>
    </div>
  );
};

export default Header;
