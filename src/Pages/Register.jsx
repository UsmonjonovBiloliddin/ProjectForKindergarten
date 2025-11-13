// src/pages/Register.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, User, Lock, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Register() {
  const { t } = useTranslation();

  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center mt-[-50px] min-h-screen bg-gray-50 dark:bg-[#0d1117] transition-colors duration-500 px-3">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md rounded-2xl shadow-xl bg-[#f8fafc]/90 dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 sm:p-8"
      >
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center flex items-center justify-center gap-2">
          <UserPlus size={22} className="text-blue-500" /> {t("registerTitle")}
        </h2>

        <form className="space-y-5">
          {/* Username */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder={t("placeholderUsername")}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/90 dark:bg-[#0d1117] text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 outline-none text-sm"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder={t("placeholderEmail")}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/90 dark:bg-[#0d1117] text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 outline-none text-sm"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder={t("placeholderPassword")}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/90 dark:bg-[#0d1117] text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 outline-none text-sm"
            />
          </div>

          {/* Register button */}
          <button
            type="submit"
            className="w-full py-2 mt-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
          >
            <UserPlus size={18} /> {t("registerButton")}
          </button>
        </form>

        {/* Google */}
        <div className="mt-6">
          <button
            className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100/70 dark:bg-[#1c2128] hover:bg-gray-200 dark:hover:bg-[#21262d] text-gray-700 dark:text-gray-200 rounded-xl py-2 font-medium flex items-center justify-center gap-2 transition-all duration-300 text-sm"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            {t("registerGoogle")}
          </button>
        </div>

        {/* Login link */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-5">
          {t("registerHaveAccount")}{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            {t("loginTitle")}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
