import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Slice/Auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const profileRef = useRef();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth)
  
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
  }, [user]);

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  const Logout = () => {
    profileOpen && setProfileOpen(false);
    dispatch(logout());
  };

  const links = [
    { name: t("home"), path: "/" },
    { name: t("kindergartens"), path: "/kindergartens" },
    { name: t("recommendations"), path: "/recommendations" },
    { name: t("aboutUs"), path: "/aboutUs" },
    { name: t("contactUs"), path: "/contactUs" },
    { name: t("AIchat"), path: "/AIchat" },
  ];

 

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-white shadow-md dark:bg-gray-900" : "bg-white dark:bg-gray-900"
      }`}
    >
     <div className="container">
       <div className="mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-10 py-2">
        
        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent flex items-center gap-2"
        >
          <img
            src="/kok-logo-vf-03.png"
            alt="BogchaTop"
            className="w-[200px] rounded-xl"
          />
        </Link>

        {/* DESKTOP LINKS */}
        <ul className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `relative text-[14px] font-medium transition duration-300 after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-green-600 after:to-green-400 after:left-0 after:-bottom-1 after:rounded-full hover:after:w-full ${
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

        {/* DESKTOP RIGHT SIDE */}
        <div className="hidden lg:flex items-center gap-5 relative">
          
          {/* THEME */}
          <button
            onClick={toggleTheme}
            className="cursor-pointer p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {dark ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-gray-400" size={20} />}
          </button>

          {/* LANGUAGE */}
          <div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 px-3 py-2 rounded-xl">
            <Globe className="text-gray-400 dark:text-white" size={18} />
            <select
              value={i18n.language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="bg-transparent text-gray-700 dark:text-white text-sm focus:outline-none"
            >
              <option className="bg-white dark:bg-gray-800" value="uz">O‘zbekcha</option>
              <option className="bg-white dark:bg-gray-800" value="ru">Русский</option>
            </select>
          </div>

          {/* LOGIN / REG */}
          <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 font-medium">
            {t("login")}
          </Link>

          <Link
            to="/register"
            className=" bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-[1.05] transition"
          >
            {t("register")}
          </Link>

          {/* PROFILE */}
          {
            user?  <div className="relative" ref={profileRef}>
            <button
              className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-medium text-sm hover:scale-105 transition-all"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              {user?.username?.slice(0, 2)}
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 flex flex-col gap-2 origin-top-right z-50"
                >
                  <div className="text-gray-800 dark:text-gray-100 font-medium">
                    {user?.username}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</div>

                  <button onClick={Logout} className="mt-2 w-full py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition">
                    {t("logout")}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>:""
          }
        </div>

        {/* MOBILE BUTTON */}
        <button className="lg:hidden text-gray-700 dark:text-gray-300" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="lg:hidden fixed top-[70px] left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-xl border-t border-gray-200 dark:border-gray-700"
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

              {/* MOBILE LANGUAGE */}
              <div className="w-[150px] flex items-center gap-3 bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-lg">
                <Globe size={20} className="text-gray-700 dark:text-white" />
                <select
                  value={i18n.language}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="bg-transparent w-full text-gray-800 dark:text-white text-sm"
                >
                  <option className="bg-white dark:bg-gray-800" value="uz">O‘zbekcha</option>
                  <option className="bg-white dark:bg-gray-800" value="ru">Русский</option>
                </select>
              </div>

              {/* MOBILE DARK MODE */}
              <button
                onClick={toggleTheme}
                className="w-[150px] flex items-center justify-center gap-3 bg-gray-200 dark:bg-gray-800 py-3 rounded-lg text-gray-900 dark:text-white font-medium"
              >
                {dark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
                {dark ? "Light mode" : "Dark mode"}
              </button>

            </ul>
          </motion.div>
        )}
      </AnimatePresence>
     </div>
    </motion.nav>
  );
};

export default Navbar;
