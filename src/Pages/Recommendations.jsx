import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const RecommendationsPage = () => {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    location: "",
    type: "",
    language: "",
    method: "",
  });

  const [age, setAge] = useState("");
  const [recommended, setRecommended] = useState([]);

  const regions = [
    "Toshkent",
    "Samarqand",
    "Farg‘ona",
    "Namangan",
    "Andijon",
    "Buxoro",
    "Xorazm",
    "Qashqadaryo",
    "Surxondaryo",
    "Jizzax",
    "Sirdaryo",
    "Navoiy",
    "Qoraqalpog‘iston",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const mockRecommendations = [
      {
        name: "Sunny Kids Montessori",
        location: "Toshkent, Mirzo Ulug‘bek tumani",
        rating: 4.8,
        price: "1 200 000 so‘m / oy",
        type: "Xususiy",
        age: "4–6 yosh",
        image:
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80", // random rasm
      },
      {
        name: "SmartSteps",
        location: "Toshkent, Chilonzor",
        rating: 4.6,
        price: "900 000 so‘m / oy",
        type: "Davlat",
        age: "3–5 yosh",
        image:
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
      },
      {
        name: "HappyLand",
        location: "Samarqand, Registon",
        rating: 4.9,
        price: "1 500 000 so‘m / oy",
        type: "Xususiy",
        age: "5–7 yosh",
        image:
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
      },
    ];

    setRecommended(mockRecommendations);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {t("findBestKindergarten")}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl space-y-6"
        >
          {/* Farzandingiz yoshi */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              {t("childAge")}
            </label>
            <select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">{t("select")}</option>
              <option value="3-5">3–5 yosh</option>
              <option value="4-6">4–6 yosh</option>
              <option value="5-7">5–7 yosh</option>
            </select>
          </div>

          {/* Joylashuv */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              {t("location")}
            </label>
            <select
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">{t("selectRegion")}</option>
              {regions.map((region, i) => (
                <option key={i} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          {/* Bog‘cha turi */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              {t("kindergartenType")}
            </label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">{t("select")}</option>
              <option value="xususiy">{t("private")}</option>
              <option value="davlat">{t("state")}</option>
            </select>
          </div>

          {/* O‘qitish tili */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              {t("teachingLanguage")}
            </label>
            <select
              value={form.language}
              onChange={(e) => setForm({ ...form, language: e.target.value })}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">{t("select")}</option>
              <option value="uzbek">{t("uzbek")}</option>
              <option value="russian">{t("russian")}</option>
              <option value="english">{t("english")}</option>
            </select>
          </div>

          {/* Ta’lim uslubi */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              {t("educationMethod")}
            </label>
            <select
              value={form.method}
              onChange={(e) => setForm({ ...form, method: e.target.value })}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">{t("select")}</option>
              <option value="montessori">Montessori</option>
              <option value="steam">STEAM</option>
              <option value="classic">{t("classic")}</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-semibold hover:scale-105 transition-all shadow-lg"
          >
            {t("getRecommendation")}
          </button>
        </form>

        {recommended.length > 0 && (
          <div className="mt-10 space-y-4 animate-fadeIn">
            <h3 className="text-2xl font-semibold text-center mb-6">
              {t("recommendedKindergartens")}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommended.map((rec, i) => (
                <Link to={'/kindergartendetail'}>
                      <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer overflow-hidden border border-transparent"
                >
                  {/* Rasm */}
                  <div className="h-40 w-full overflow-hidden">
                    <img
                      src={rec.image} // har bir bog'cha objectida image URL bo'lishi kerak
                      alt={rec.name}
                      className="w-full h-full object-cover rounded-t-2xl"
                    />
                  </div>

                  {/* Matn qismi */}
                  <div className="p-5">
                    <h4 className="text-lg font-bold mb-1 text-indigo-600 dark:text-indigo-400">
                      {rec.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {rec.location}
                    </p>
                    <p className="mt-2 flex items-center">
                      <span className="font-semibold text-gray-800 dark:text-gray-100 mr-2">
                        {t("rating")}:
                      </span>
                      <span className="text-yellow-400 dark:text-yellow-300">
                        ⭐ {rec.rating}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {rec.price}
                    </p>
                    <p className="text-sm mt-2 italic text-gray-500 dark:text-gray-400">
                      {rec.age}
                    </p>
                  </div>
                </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationsPage;
