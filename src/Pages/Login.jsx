// src/pages/Login.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Auth_Service from "../Service/auth_service";
import { useDispatch, useSelector } from "react-redux";
import { signUsersucces, signUserStart, signUserErorr } from "../Slice/Auth";
import { toast } from "react-toastify";
export default function Login() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { isloading, error } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(signUserStart());
    try {
      const responce = await Auth_Service.userLogin(
        `grant_type=password&username=${form.email}&password=${form.password}&scope=&client_id=string&client_secret=********`
      );
      localStorage.setItem("token", responce.data.access_token);
      const user = await Auth_Service.getUser(responce.data.access_token);
      toast.success("Ro'yxatdan muvaffaqiyatli o'tdingiz!");
      dispatch(signUsersucces(user.data));
      navigate("/");
    } catch (error) {
      console.log(error);
      
      dispatch(signUserErorr(error.response.data.detail));
    }
  };

  return (
    <div className="flex items-center justify-center mt-[-60px] min-h-screen bg-gray-50 dark:bg-[#0d1117] transition-colors duration-500 px-3">
       <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md rounded-2xl shadow-xl bg-[#f8fafc]/90 dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 p-6 sm:p-8"
      >
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center flex items-center justify-center gap-2">
          <LogIn size={22} className="text-blue-500" /> {t("loginTitle")}
        </h2>
        <h3 className="text-red-700 text-center  py-3 ">
          {error ? error : ""}
        </h3>
        <form className="space-y-5" onSubmit={handleLogin}>
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
              placeholder={t("emailPlaceholder")}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/90 dark:bg-[#0d1117] text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 outline-none"
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
              placeholder={t("passwordPlaceholder")}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/90 dark:bg-[#0d1117] text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 outline-none"
            />
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full py-2 mt-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <LogIn size={18} /> {isloading ? t("loading") : t("login")}
          </button>
        </form>

        {/* Google */}
        <div className="mt-6">
          <button className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100/70 dark:bg-[#1c2128] hover:bg-gray-200 dark:hover:bg-[#21262d] text-gray-700 dark:text-gray-200 rounded-xl py-2 font-medium flex items-center justify-center gap-2 transition-all duration-300">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            {t("loginGoogle")}
          </button>
        </div>

        {/* Register link */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-5">
          {t("noAccount")}{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            {t("registerLink")}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
