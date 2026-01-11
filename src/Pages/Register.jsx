// src/pages/Register.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, User, Lock, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Auth_Service from "../Service/auth_service";
import { useDispatch, useSelector } from "react-redux";
import { signUserErorr, signUserStart, signUsersucces } from "../Slice/Auth";
import { useSelect } from "@react-three/drei";
import { toast } from "react-toastify";

export default function Register() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {isloading} = useSelector((state) => state.auth)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(signUserStart());
    try {
      const responce = await Auth_Service.userRegister(form);
      dispatch(signUsersucces());
      toast.success("Ro'yxatdan muvaffaqiyatli o'tdingiz!");
      navigate("/login")
    } catch (error) {
      dispatch(signUserErorr(error.response.data.detail));
    }
  };

  return (
    <div className="flex items-center justify-center mt-[-50px] min-h-screen bg-gray-50 dark:bg-[#0d1117] transition-colors duration-500 px-3 sm:px-4 xs:px-2">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md xs:max-w-[90%] rounded-2xl shadow-xl bg-[#f8fafc]/90 dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 p-6 xs:p-4"
      >
        <h2 className="text-2xl xs:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center flex items-center justify-center gap-2">
          <UserPlus size={22} className="text-blue-500" /> {t("registerTitle")}
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Username */}
          <div className="relative">
            <User
              className="absolute left-3 top-3 text-gray-400 dark:text-gray-500"
              size={20}
            />
            <input
              required
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder={t("placeholderUsername")}
              className="w-full pl-10 pr-4 py-2.5 xs:py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/90 dark:bg-[#0d1117] text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 outline-none text-sm xs:text-xs"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail
              className="absolute left-3 top-3 text-gray-400 dark:text-gray-500"
              size={20}
            />
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder={t("placeholderEmail")}
              className="w-full pl-10 pr-4 py-2.5 xs:py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/90 dark:bg-[#0d1117] text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 outline-none text-sm xs:text-xs"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock
              className="absolute left-3 top-3 text-gray-400 dark:text-gray-500"
              size={20}
            />
            <input
              required
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder={t("placeholderPassword")}
              className="w-full pl-10 pr-4 py-2.5 xs:py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/90 dark:bg-[#0d1117] text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 outline-none text-sm xs:text-xs"
            />
          </div>

          {/* Register button */}
          <button
            type="submit"
            className="w-full py-2 mt-4 xs:py-1 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm xs:text-xs"
          >
            <UserPlus size={18} /> {isloading ? t("Loading") : t("registerTitle")}
          </button>
        </form>

        {/* Google */}
        <div className="mt-6 xs:mt-4">
          <button className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100/70 dark:bg-[#1c2128] hover:bg-gray-200 dark:hover:bg-[#21262d] text-gray-700 dark:text-gray-200 rounded-xl py-2 xs:py-1 font-medium flex items-center justify-center gap-2 transition-all duration-300 text-sm xs:text-xs">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            {t("registerGoogle")}
          </button>
        </div>

        {/* Login link */}
        <p className="text-center text-sm xs:text-xs text-gray-500 dark:text-gray-400 mt-5 xs:mt-3">
          {t("registerHaveAccount")}{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            {t("loginTitle")}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
