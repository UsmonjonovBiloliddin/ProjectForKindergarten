import {
  Building2,
  Users2,
  Star,
  ShieldCheck,
  HeartHandshake,
  Globe2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AboutUs() {
  const { t } = useTranslation();

  const stats = [
    { value: "120+", label: t("partnerKindergartens") },
    { value: "4500+", label: t("registeredParents") },
    { value: "98%", label: t("satisfiedUsers") },
  ];

  const cards = [
    {
      icon: <Building2 className="text-blue-600 dark:text-blue-400 w-7 h-7" />,
      bg: "bg-blue-100 dark:bg-blue-900/30",
      title: t("partnerKindergartens"),
      text: t("partnerKindergartensText"),
    },
    {
      icon: <Users2 className="text-green-600 dark:text-green-400 w-7 h-7" />,
      bg: "bg-green-100 dark:bg-green-900/30",
      title: t("ourTeam"),
      text: t("ourTeamText"),
    },
    {
      icon: <Star className="text-yellow-600 dark:text-yellow-400 w-7 h-7" />,
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
      title: t("ratingSystem"),
      text: t("ratingSystemText"),
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-[#030b18] dark:via-[#041423] dark:to-[#030b18] py-20 px-6 transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-4xl font-extrabold text-gray-800 dark:text-white mb-6 tracking-tight">
          {t("whoWeAre")}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed text-base sm:text-lg">
          {t("aboutUsText")}
        </p>
      </div>

      {/* Stats Section */}
      <div className="flex flex-wrap justify-center gap-10 mb-20">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="text-center bg-white/80 dark:bg-white/5 backdrop-blur-md px-8 py-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400">
              {stat.value}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 font-medium mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Cards Section */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {cards.map((item, i) => (
          <div
            key={i}
            className="bg-white dark:bg-[#06192e] shadow-xl rounded-2xl p-8 hover:-translate-y-2 hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700"
          >
            <div
              className={`flex items-center justify-center w-14 h-14 ${item.bg} rounded-full mx-auto mb-4`}
            >
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* Mission Section */}
      <div className="max-w-5xl mx-auto mt-20 bg-white dark:bg-[#041423] p-10 rounded-3xl shadow-md border border-gray-100 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 opacity-10 rotate-12">
          <Globe2 className="w-40 h-40 text-blue-400" />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="flex-shrink-0">
            <ShieldCheck className="w-20 h-20 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
              {t("ourMission")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              {t("ourMissionText")}
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-20">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          {t("readyToChoose")}
        </h3>
        <Link to="/kindergartens">
          <button className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-3 rounded-full text-lg font-medium transition-all shadow-md hover:shadow-lg">
            {t("viewKindergartens")}
          </button>
        </Link>
      </div>

      {/* Footer phrase */}
      <div className="text-center mt-16 text-gray-500 dark:text-gray-400 text-sm">
        <HeartHandshake className="w-5 h-5 inline-block mr-1 text-pink-500 dark:text-pink-400" />
        {t("footerPhrase")}
      </div>
    </section>
  );
}
