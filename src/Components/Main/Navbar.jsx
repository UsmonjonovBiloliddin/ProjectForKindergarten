import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const profileRef = useRef();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    document.documentElement.classList.add("dark");

    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  const links = [
    { name: t("home"), path: "/" },
    { name: t("kindergartens"), path: "/kindergartens" },
    { name: t("recommendations"), path: "/recommendations" },
    { name: t("aboutUs"), path: "/aboutUs" },
    { name: t("contactUs"), path: "/contactUs" },
  ];

  const user = {
    firstName: "Biloliddin",
    lastName: "Usmonjonov",
    email: "bilol@example.com",
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-white shadow-md dark:bg-gray-900" : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-10 py-2">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent flex items-center gap-2"
        >
          <img
            src="https://www.marbleskidsmuseum.org/assets/2455/kok-logo-vf-03-2024081401285203.png"
            alt="BogchaTop"
            className="w-[200px] rounded-xl"
          />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `relative text-[16px] font-medium transition duration-300 after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-green-600 after:to-green-400 after:left-0 after:-bottom-1 after:rounded-full hover:after:w-full ${
                    isActive
                      ? "text-green-600 dark:text-green-400 after:w-full"
                      : "text-gray-700 dark:text-white hover:text-green-600 dark:hover:text-green-400"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Side (Desktop) */}
        <div className="hidden lg:flex items-center gap-5 relative">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="cursor-pointer p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {dark ? (
              <Sun className="text-yellow-400" size={20} />
            ) : (
              <Moon className="text-gray-600" size={20} />
            )}
          </button>

          {/* Language selector */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 px-3 py-1.5 rounded-xl border border-gray-300 dark:border-gray-600 shadow-sm hover:shadow-md transition-all duration-200 relative">
            <Globe size={18} className="text-indigo-500 dark:text-indigo-300" />
            <select
              value={i18n.language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="bg-transparent text-gray-700 dark:text-white text-sm font-medium focus:outline-none cursor-pointer appearance-none"
            >
              <option value="uz" className="bg-white dark:bg-gray-800 text-gray-700 dark:text-white">
                O‘zbekcha
              </option>
              <option value="ru" className="bg-white dark:bg-gray-800 text-gray-700 dark:text-white">
                Русский
              </option>
            </select>
          </div>

          {/* Login/Register */}
          <Link
            to="/login"
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 font-medium"
          >
            {t("login")}
          </Link>
          <Link
            to="/register"
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-[1.05] transition"
          >
            {t("register")}
          </Link>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-medium text-sm hover:scale-105 transition-all"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              {user.firstName[0]}
              {user.lastName[0]}
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 20, y: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 20, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 flex flex-col gap-2 origin-top-right z-50"
                >
                  <div className="text-gray-800 dark:text-gray-100 font-medium">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                  <button className="mt-2 w-full py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition">
                    {t("logout") || "Chiqish"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Button */}
        <button
          className="lg:hidden text-gray-700 dark:text-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="lg:hidden fixed top-[70px] left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl shadow-lg border-t border-gray-200 dark:border-gray-700"
          >
            <ul className="flex flex-col items-center gap-5 py-7 px-6 sm:px-10">
              {links.map((link) => (
                <li key={link.path} className="w-full text-center">
                  <NavLink
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block w-full text-[17px] sm:text-[18px] font-medium py-2 rounded-lg transition ${
                        isActive
                          ? "text-indigo-600 bg-indigo-50 dark:bg-gray-800"
                          : "text-gray-700 dark:text-gray-300 hover:text-indigo-500"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
