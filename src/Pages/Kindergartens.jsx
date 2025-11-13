// src/pages/KindergartensPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Star, Grid, List, Trash2, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

// MOCK ma'lumotlar: bog‘chalar ro‘yxati
const MOCK = [
  {
    id: 1,
    name: "Sunny Kids Montessori",
    region: "Toshkent",
    district: "Yunusobod",
    type: "xususiy",
    programs: ["Montessori", "Ingliz tili"],
    languages: ["english", "uzbek"],
    price: 750000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80",
    short: "Ijodiy va xavfsiz muhit — Montessori uslubi + ingliz tili."
  },
  {
    id: 2,
    name: "Smart Start Preschool",
    region: "Toshkent",
    district: "Chilonzor",
    type: "montessori",
    programs: ["Montessori"],
    languages: ["russian", "uzbek"],
    price: 520000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1610484826967-09c5720778c5?auto=format&fit=crop&w=1200&q=80",
    short: "Montessori metodikasi, kichik guruhlar va individual yondashuv."
  },
  {
    id: 3,
    name: "Happy Steps",
    region: "Samarqand",
    district: "Registon",
    type: "davlat",
    programs: ["Davlat"],
    languages: ["uzbek"],
    price: 300000,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=1200&q=80",
    short: "Davlat dasturi asosida, ishonchli tarbiyachilar."
  },
  {
    id: 4,
    name: "Little Stars Academy",
    region: "Toshkent",
    district: "Mirzo Ulug'bek",
    type: "xususiy",
    programs: ["Bilingual"],
    languages: ["english", "russian"],
    price: 950000,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80",
    short: "Premium sharoit, ikki tilli dastur va kreativ mashg‘ulotlar."
  },
  {
    id: 5,
    name: "Nurli Yulduz",
    region: "Fargona",
    district: "Marg'ilon",
    type: "davlat",
    programs: ["Davlat"],
    languages: ["uzbek"],
    price: 280000,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
    short: "Mahalliy an’anaga mos dastur, hamyonbop narx."
  },
];

// Filter parametrlari
const ALL_TYPES = [
  { id: "xususiy", label: "Xususiy" },
  { id: "davlat", label: "Davlat" },
  { id: "montessori", label: "Montessori" }
];

const ALL_PROGRAMS = [
  { id: "Montessori", label: "Montessori" },
  { id: "Ingliz tili", label: "Ingliz tili" },
  { id: "Bilingual", label: "Bilingual" }
];

const ALL_LANGS = [
  { id: "english", label: "English" },
  { id: "russian", label: "Русский" },
  { id: "uzbek", label: "O‘zbek" }
];

export default function KindergartensPage() {
  const { t } = useTranslation();

  // UI state
  const [displayMode, setDisplayMode] = useState("list"); // 'grid' yoki 'list'
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Filter form state
  const [form, setForm] = useState({
    region: "",
    district: "",
    minPrice: "",
    maxPrice: "",
    types: new Set(),
    programs: new Set(),
    languages: new Set(),
  });

  // Qo‘llanilgan filterlar (Apply bosilganda)
  const [applied, setApplied] = useState({ ...form });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 350);
    return () => clearTimeout(t);
  }, [search]);

  const toggleSet = (setObj, key, value) => {
    const copy = new Set(setObj[key]);
    if (copy.has(value)) copy.delete(value);
    else copy.add(value);
    setForm((s) => ({ ...s, [key]: copy }));
  };

  const clearForm = () => {
    setForm({
      region: "",
      district: "",
      minPrice: "",
      maxPrice: "",
      types: new Set(),
      programs: new Set(),
      languages: new Set(),
    });
  };

  const applyFilters = () => {
    setApplied({ ...form });
    const el = document.getElementById("results");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const results = useMemo(() => {
    return MOCK.filter((k) => {
      if (debouncedSearch) {
        const q = debouncedSearch.toLowerCase();
        if (!(k.name.toLowerCase().includes(q) || k.short.toLowerCase().includes(q))) return false;
      }
      if (applied.region && k.region !== applied.region) return false;
      if (applied.district && k.district !== applied.district) return false;
      if (applied.minPrice && k.price < Number(applied.minPrice)) return false;
      if (applied.maxPrice && k.price > Number(applied.maxPrice)) return false;
      if (applied.types.size > 0 && !applied.types.has(k.type)) return false;
      if (applied.programs.size > 0) {
        const haveProg = [...applied.programs].some((p) => k.programs.includes(p));
        if (!haveProg) return false;
      }
      if (applied.languages.size > 0) {
        const haveLang = [...applied.languages].some((l) => k.languages.includes(l));
        if (!haveLang) return false;
      }
      return true;
    });
  }, [applied, debouncedSearch]);

  const regions = useMemo(() => Array.from(new Set(MOCK.map((m) => m.region))), []);
  const districtsByRegion = useMemo(() => {
    const map = {};
    MOCK.forEach((m) => {
      if (!map[m.region]) map[m.region] = new Set();
      map[m.region].add(m.district);
    });
    Object.keys(map).forEach((k) => (map[k] = Array.from(map[k])));
    return map;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-[#071022] dark:to-[#031326] transition-colors">
      <div className="mx-auto px-4 max-[500px]:px-4 sm:px-8 md:px-12 lg:px-20 py-4">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
              {t("headerTitle")}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">
              {t("headerDesc")}
            </p>
          </div>

          {/* Search va Display toggle */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center bg-white dark:bg-[#04202a] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 shadow-sm w-full md:w-[420px] focus-within:ring-2 focus-within:ring-indigo-300">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="ml-3 w-full bg-transparent outline-none text-gray-800 dark:text-gray-100 text-sm sm:text-base"
                aria-label="Search kindergartens"
              />
            </div>

            <div className="flex items-center gap-2 ml-1">
              <button
                title={t("gridView")}
                onClick={() => setDisplayMode("grid")}
                className={`p-2 rounded-lg transition shadow-sm ${displayMode === "grid" ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white" : "bg-white dark:bg-[#04202a] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"}`}
                aria-pressed={displayMode === "grid"}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                title={t("listView")}
                onClick={() => setDisplayMode("list")}
                className={`p-2 rounded-lg transition shadow-sm ${displayMode === "list" ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white" : "bg-white dark:bg-[#04202a] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"}`}
                aria-pressed={displayMode === "list"}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar + Main */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/95 dark:bg-[#021824]/95 backdrop-blur-md border border-gray-100 dark:border-gray-700 rounded-2xl p-5 shadow sticky top-20"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{t("filters")}</h3>
                </div>
                <button onClick={() => { clearForm(); setApplied({ ...form }); }} title={t("clear")} className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-300 flex items-center gap-1">
                  <Trash2 className="inline w-4 h-4" /> <span className="hidden sm:inline">{t("clear")}</span>
                </button>
              </div>

              {/* Region */}
              <div className="mb-4">
                <label className="block text-sm text-gray-500 mb-2">{t("region")}</label>
                <select
                  value={form.region}
                  onChange={(e) => setForm((s) => ({ ...s, region: e.target.value, district: "" }))}
                  className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#041e26] text-gray-800 dark:text-gray-100 text-sm"
                >
                  <option value="">{t("all")}</option>
                  {regions.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              {/* District */}
              <div className="mb-4">
                <label className="block text-sm text-gray-500 mb-2">{t("district")}</label>
                <select
                  value={form.district}
                  onChange={(e) => setForm((s) => ({ ...s, district: e.target.value }))}
                  className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#041e26] text-gray-800 dark:text-gray-100 text-sm"
                >
                  <option value="">{t("all")}</option>
                  {(form.region ? districtsByRegion[form.region] || [] : Array.from(new Set(MOCK.map(m => m.district)))).map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              {/* Price */}
              <div className="mb-4">
                <label className="block text-sm text-gray-500 mb-2">{t("pricePerMonth")}</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={form.minPrice}
                    onChange={(e) => setForm((s) => ({ ...s, minPrice: e.target.value }))}
                    placeholder={t("min")}
                    className="w-1/2 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#041e26] text-gray-800 dark:text-gray-100 text-sm"
                  />
                  <input
                    type="number"
                    value={form.maxPrice}
                    onChange={(e) => setForm((s) => ({ ...s, maxPrice: e.target.value }))}
                    placeholder={t("max")}
                    className="w-1/2 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#041e26] text-gray-800 dark:text-gray-100 text-sm"
                  />
                </div>
              </div>

              {/* Types */}
              <div className="mb-4">
                <label className="block text-sm text-gray-500 mb-2">{t("type")}</label>
                <div className="flex flex-wrap gap-2">
                  {ALL_TYPES.map((tItem) => {
                    const active = form.types.has(tItem.id);
                    return (
                      <button
                        key={tItem.id}
                        onClick={() => toggleSet(form, "types", tItem.id)}
                        className={`px-3 py-1 rounded-full border text-sm transition ${active ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow" : "bg-transparent border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"}`}
                        aria-pressed={active}
                      >
                        {t(tItem.label)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Programs */}
              <div className="mb-4">
                <label className="block text-sm text-gray-500 mb-2">{t("program")}</label>
                <div className="flex flex-wrap gap-2">
                  {ALL_PROGRAMS.map((p) => {
                    const active = form.programs.has(p.id);
                    return (
                      <button
                        key={p.id}
                        onClick={() => toggleSet(form, "programs", p.id)}
                        className={`px-3 py-1 rounded-full border text-sm transition ${active ? "bg-gradient-to-r from-green-400 to-teal-500 text-white shadow" : "bg-transparent border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"}`}
                        aria-pressed={active}
                      >
                        {t(p.label)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Languages */}
              <div className="mb-4">
                <label className="block text-sm text-gray-500 mb-2">{t("language")}</label>
                <div className="flex flex-wrap gap-2">
                  {ALL_LANGS.map((l) => {
                    const active = form.languages.has(l.id);
                    return (
                      <button
                        key={l.id}
                        onClick={() => toggleSet(form, "languages", l.id)}
                        className={`px-3 py-1 rounded-full border text-sm transition ${active ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow" : "bg-transparent border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"}`}
                        aria-pressed={active}
                      >
                        {t(l.label)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Apply & Reset */}
              <div className="mt-3 flex gap-2">
                <button
                  onClick={applyFilters}
                  className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow hover:opacity-95 transition"
                >
                  {t("apply")}
                </button>
                <button
                  onClick={() => { clearForm(); setApplied({ ...form }); }}
                  className="px-4 py-2 rounded-xl bg-transparent border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
                >
                  {t("reset")}
                </button>
              </div>
            </motion.div>
          </aside>

          {/* Main content */}
          <main id="results" className="lg:col-span-8">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-300">{t("results")}: <span className="font-semibold">{results.length}</span></div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{t("sortBy")}: <em>{t("ratingDescs")}</em></div>
            </div>

            <div className={displayMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 gap-6" : "flex flex-col gap-6"}>
              <AnimatePresence>
                {results.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 bg-white dark:bg-[#041423] rounded-2xl border border-gray-100 dark:border-gray-700 text-center">
                    <p className="text-gray-600 dark:text-gray-300">{t("noResults")}</p>
                  </motion.div>
                )}

                {results.sort((a, b) => b.rating - a.rating).map((k) => (
                  <motion.article
                    key={k.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className={`bg-white dark:bg-[#041423] rounded-2xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col ${displayMode === "list" ? "md:flex-row" : ""}`}
                  >
                    {/* Image + Rating */}
                    <div className={`${displayMode === "list" ? "md:w-1/3" : ""} relative`}>
                      <img src={k.image} alt={k.name} className="w-full h-56 md:h-full object-cover" />
                      <div className="absolute left-3 top-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 text-black text-sm font-semibold shadow-sm">
                        <Star className="w-4 h-4 text-yellow-400" /> <span>{k.rating}</span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">{k.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 mt-1">
                              <MapPin className="w-4 h-4 text-indigo-500" /> <span>{k.region}, {k.district}</span>
                            </div>
                          </div>

                          <div className="text-right hidden sm:block">
                            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{k.price.toLocaleString()} {t("perMonth")}</div>
                          </div>
                        </div>

                        <p className="mt-3 text-gray-700 dark:text-gray-200">{k.short}</p>

                        <div className="mt-3 flex flex-wrap gap-2 items-center">
                          <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-[#072933] text-sm text-gray-700 dark:text-gray-200">
                            {k.type === "xususiy" ? t("private") : k.type === "davlat" ? t("state") : k.type}
                          </span>
                          {k.programs.map((p) => <span key={p} className="px-3 py-1 rounded-full bg-transparent border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200">{t(p)}</span>)}
                          {k.languages.map((l) => <span key={l} className="px-3 py-1 rounded-full bg-transparent border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200">{ALL_LANGS.find((a) => a.id === l)?.label || l}</span>)}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-3">
                        <Link to={`/kindergartendetail`} className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow hover:scale-[1.02] transition">{t("details")}</Link>
                        <button onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(k.region + " " + k.district + " " + k.name)}`, "_blank")} className="px-3 py-2 rounded-xl bg-transparent border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#072933] transition">{t("viewOnMap")}</button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
