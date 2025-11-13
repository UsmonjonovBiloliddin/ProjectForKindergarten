import { Link } from "react-router-dom";
import { t , } from "i18next";
import { useEffect, useState } from "react";
export default function Hero() {
const [language, setLanguage] = useState(localStorage.getItem("i18nextLng"));
  
useEffect(() => {
    const storedLang = localStorage.getItem("i18nextLng");
    if (storedLang) {
      setLanguage(storedLang);
    }
  }, [language]);
console.log(language);

  return (
    <header className="relative w-full min-h-[600px] bg-white dark:bg-gray-900 overflow-hidden py-10 md:py-16 transition-colors duration-500">
      {/* Kontent */}
      <div className="relative z-10 mx-auto px-6 sm:px-10 md:px-14 lg:px-20 grid grid-cols-1 md:grid-cols-[60%_40%] items-center gap-10 md:gap-12 ">
        {/* Chap tomon – text */}
        <div className="text-center w-full md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
            {t("titleStart")} {""}
            <span className="text-indigo-600 dark:text-indigo-400">
              {t("titleHighlight")}{" "}
            </span>
            {t("titleEnd")}
          </h1>

          <p className="mt-5 text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto md:mx-0">
            {t("description")}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <Link to="/kindergartens">
              <button className="cursor-pointer w-full sm:w-auto px-7 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-400 transition-transform duration-200 hover:scale-[1.03] shadow-md">
                {t("kindergartensButton")}
              </button>
            </Link>

            <Link to="/contactUs">
              <button className="cursor-pointer w-full sm:w-auto px-7 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 font-semibold hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200">
                {t("contactButton")}
              </button>
            </Link>
          </div>
        </div>

        {/* O‘ng tomon – bolacha rasmi */}
        <div className="flex justify-center md:justify-center items-center">
          <img
            src="/sticker.webp"
            alt={t("imageAlt")}
            className="w-[150px] mt-[50px] object-contain animate-[float_4s_ease-in-out_infinite]"
          />
        </div>
      </div>

      {/* Oddiy "float" animatsiya */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </header>
  );
}
