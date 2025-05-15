import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function RootLayout() {
  return (
    <div className="min-h-screen flex justify-center bg-gray-100">
      {/* 중앙 고정된 앱 화면 */}
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16 pb-20 px-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* ❗ fixed는 부모 밖에서, 중앙 정렬 */}
      <Navbar />
    </div>
  );
}

export default RootLayout;
