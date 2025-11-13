import { motion } from "framer-motion";
import { Baby, School, Globe, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const categories = [
  {
    id: 1,
    titleKey: "stateKindergartenTitle",
    descKey: "stateKindergartenDesc",
    icon: <School size={34} />,
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: 2,
    titleKey: "privateKindergartenTitle",
    descKey: "privateKindergartenDesc",
    icon: <Baby size={34} />,
    color: "from-pink-500 to-purple-500",
  },
  {
    id: 3,
    titleKey: "montessoriTitle",
    descKey: "montessoriDesc",
    icon: <Brain size={34} />,
    color: "from-amber-500 to-orange-500",
  },
  {
    id: 4,
    titleKey: "englishProgramTitle",
    descKey: "englishProgramDesc",
    icon: <Globe size={34} />,
    color: "from-green-500 to-teal-500",
  },
];

const Categories = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-6xl mx-auto px-5 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-10"
        >
          {t("categoriesTitle")}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, index) => (
            <Link to={"/kindergartens"} key={cat.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`p-6 rounded-2xl bg-gradient-to-r ${cat.color} text-white shadow-lg hover:shadow-2xl transition`}
              >
                <div className="flex justify-center mb-4">{cat.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{t(cat.titleKey)}</h3>
                <p className="text-sm opacity-90">{t(cat.descKey)}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
