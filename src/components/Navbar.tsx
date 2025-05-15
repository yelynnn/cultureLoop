import { useNavigate, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useState } from "react";
import NoAuthModal from "./NoAuthModal";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem("jwtToken");

  const navItems = [
    { name: "Home", path: "/", icon: "material-symbols:home-rounded" },
    {
      name: "Challenges",
      path: "/challenges",
      icon: "line-md:heart",
    },
    { name: "Profile", path: "/profile", icon: "mdi:account-circle" },
  ];

  const handleProfileClick = () => {
    if (!token) {
      setIsModalOpen(true);
    } else {
      navigate("/profile");
    }
  };

  return (
    <>
      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t shadow-md flex justify-around py-2 z-50">
        {navItems.map(({ name, path, icon }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={name}
              onClick={
                name === "Profile" ? handleProfileClick : () => navigate(path)
              }
              className="cursor-pointer flex flex-col items-center text-xs font-medium"
            >
              <Icon
                icon={icon}
                width="24"
                height="24"
                className={`mb-1 transition ${
                  isActive ? "text-sky-500" : "text-gray-400"
                }`}
              />
              <span className={isActive ? "text-sky-500" : "text-gray-600"}>
                {name}
              </span>
            </button>
          );
        })}
      </nav>
      <NoAuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default Navbar;
