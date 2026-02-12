import React from "react";
import { motion } from "framer-motion";
import { Shield, Map, HeartHandshake, Star, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Shield className="text-blue-500 dark:text-blue-400 w-10 h-10" />,
      titleKey: "trustSafetyTitle",
      descKey: "trustSafetyDesc",
    },
    {
      icon: <Map className="text-green-500 dark:text-green-400 w-10 h-10" />,
      titleKey: "mapFindingTitle",
      descKey: "mapFindingDesc",
    },
    {
      icon: <HeartHandshake className="text-pink-500 dark:text-pink-400 w-10 h-10" />,
      titleKey: "parentChoiceTitle",
      descKey: "parentChoiceDesc",
    },
    {
      icon: <Star className="text-yellow-500 dark:text-yellow-400 w-10 h-10" />,
      titleKey: "ratingTitle",
      descKey: "ratingDesc",
    },
    {
      icon: <Clock className="text-purple-500 dark:text-purple-400 w-10 h-10" />,
      titleKey: "supportTitle",
      descKey: "supportDesc",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-16 lg:px-24 bg-gray-50 dark:bg-[#0f172a] transition-colors duration-500">
     <div className="container">
       <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-12"
      >
        {t("featuresTitle")}
      </motion.h2>

      <div className="grid cursor-pointer gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="p-6 bg-white dark:bg-[#1e293b] rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 group"
          >
            <div className="flex items-center justify-center mb-4">{item.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 text-center mb-2">
              {t(item.titleKey)}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
              {t(item.descKey)}
            </p>
            <div className="mt-4 h-1 w-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all group-hover:w-full"></div>
          </motion.div>
        ))}
      </div>
     </div>
    </section>
  );
}
