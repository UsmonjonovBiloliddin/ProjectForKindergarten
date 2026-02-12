import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { MapPin, Star, Phone, Clock, Users, Check, Send, PencilLine, CheckCircle2 } from "lucide-react";
import Data_Service from "../Service/data.service";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80";

export default function KindergartenDetail() {
  const { id } = useParams();

  const [bookOpen, setBookOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const [kg, setKg] = useState(null);

  const [newReview, setNewReview] = useState({ name: "", text: "", rating: 0 });
  const [successMessage, setSuccessMessage] = useState(false);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      setErrorText("");
      const res = await Data_Service.Kinderdateil(id);
      console.log(res);
      
      setKg(res?.data || null);
    } catch (e) {
      setKg(null);
      setErrorText("Bog‘cha ma’lumotini yuklashda xatolik bo‘ldi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const gallery = useMemo(() => {
    const arr = Array.isArray(kg?.gallery) ? kg.gallery.filter(Boolean) : [];
    if (arr.length) return arr;
    return [kg?.image || FALLBACK_IMG];
  }, [kg]);

  const visibleReviews = useMemo(() => {
    const reviews = Array.isArray(kg?.reviews) ? kg.reviews : [];
    return showAll ? reviews : reviews.slice(0, 2);
  }, [kg, showAll]);

  const handleCall = () => {
    const phone = kg?.phone || "+998901234567";
    window.location.href = `tel:${phone}`;
  };

  const handleBook = () => setBookOpen(true);

  const handleRatingClick = (index) => {
    setNewReview((p) => ({ ...p, rating: index }));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text || newReview.rating === 0) {
      alert("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }
    // API’da review create yo‘q bo‘lsa, hozircha faqat UI feedback:
    setSuccessMessage(true);
    setNewReview({ name: "", text: "", rating: 0 });
    setTimeout(() => setSuccessMessage(false), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#071022] grid place-items-center text-gray-700 dark:text-gray-200">
        Yuklanmoqda...
      </div>
    );
  }

  if (!loading && errorText) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#071022] grid place-items-center px-4">
        <div className="max-w-md w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#041423] p-5 text-gray-800 dark:text-gray-200">
          <div className="font-semibold">{errorText}</div>
          <button
            onClick={fetchDetail}
            className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-full font-semibold"
          >
            Qayta urinish
          </button>
        </div>
      </div>
    );
  }

  if (!kg) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-[#071022] transition-colors duration-300 pb-28"
    >
      {/* HERO */}
      <header className="relative">
        <div className="w-full h-[420px] md:h-[520px] lg:h-[560px] rounded-b-3xl overflow-hidden relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={true}
            className="h-full"
          >
            {gallery.map((src, i) => (
              <SwiperSlide key={i}>
                <div className="w-full h-full">
                  <img src={src} alt={`${kg.name}-${i}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Hero Info Card */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 -mt-20 relative z-20">
          <div className="bg-white/90 dark:bg-[#041423]/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 md:p-8 flex flex-col lg:flex-row gap-6 items-start">
            {/* Left */}
            <div className="flex-shrink-0 w-full lg:w-1/2">
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white text-center lg:text-left">
                {kg.name}
              </h1>

              <div className="flex flex-wrap items-center gap-3 mt-3 justify-center lg:justify-start">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold shadow-sm">
                  <Star size={18} /> <span>{kg.rating || 0}</span>
                </div>

                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {(kg.reviews?.length || 0)} ta sharh
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <MapPin /> <span>{kg.location_address || `${kg.region}, ${kg.district}`}</span>
                </div>
              </div>

              <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed text-center lg:text-left">
                {kg.full_description || kg.short_description || "—"}
              </p>

              <div className="mt-4 flex flex-wrap gap-3 justify-center lg:justify-start">
                {(kg.features || []).slice(0, 4).map((f, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1 rounded-full bg-gray-100 dark:bg-[#0b2231] text-sm text-gray-700 dark:text-gray-200"
                  >
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-center sm:text-left">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Oyiga narx</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {Number(kg.price || 0).toLocaleString()} UZS
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Yosh</div>
                  <div className="font-semibold text-gray-800 dark:text-gray-200">{kg.ages || "—"}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#082532] border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <Phone className="text-green-500" />
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Telefon</div>
                      <button onClick={handleCall} className="font-medium text-gray-800 dark:text-gray-200">
                        {kg.phone || "—"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#082532] border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <Clock className="text-indigo-500" />
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Ish vaqti</div>
                      <div className="font-medium text-gray-800 dark:text-gray-200">
                        {kg.hours?.[0]?.time || "—"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-2 flex flex-col sm:flex-row gap-3 w-full">
                <button
                  onClick={handleBook}
                  className="w-full sm:flex-1 whitespace-nowrap bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-3 rounded-full font-semibold shadow-lg transition"
                >
                  Joy band qilish
                </button>

                <button
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/search/${encodeURIComponent(
                        kg.location_address || `${kg.region} ${kg.district} ${kg.name}`
                      )}`,
                      "_blank"
                    )
                  }
                  className="w-full sm:w-auto whitespace-nowrap px-4 py-3 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-transparent text-gray-700 dark:text-gray-200 font-medium hover:shadow-md transition"
                >
                  <MapPin className="inline-block mr-2" /> Xaritada ko‘rish
                </button>
              </div>

              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
                <strong>Sig‘im:</strong> {kg.capacity || "—"} — <strong>Manzil:</strong>{" "}
                {kg.region}, {kg.district}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-5 lg:px-12 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-8">
          {/* Full info */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-white dark:bg-[#061725] rounded-2xl shadow-md border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">To‘liq ma'lumot</h3>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {kg.full_description || kg.short_description || "—"}
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Xususiyatlar</h4>
                <ul className="space-y-2">
                  {(kg.features || []).map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-200">
                      <Check className="text-green-400 mt-1" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Ish vaqti</h4>
                <div className="text-gray-700 dark:text-gray-200">
                  {(kg.hours || []).map((h, i) => (
                    <div key={i} className="flex justify-between py-1">
                      <span>{h.day}</span>
                      <span className="font-medium">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Reviews (API’dan keladi) */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 bg-white dark:bg-[#061725] rounded-2xl shadow-md border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Ota-onalar fikrlari</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">{kg.reviews?.length || 0} ta fikr</div>
            </div>

            <div className="space-y-5 transition-all duration-300">
              {visibleReviews.length === 0 && (
                <div className="text-gray-600 dark:text-gray-300">Hozircha sharhlar yo‘q.</div>
              )}

              {visibleReviews.map((r, idx) => (
                <div
                  key={r.id ?? idx}
                  className="p-5 bg-white dark:bg-[#041423] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{r.name || "User"}</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          fill={i < (r.rating || 0) ? "#facc15" : "none"}
                          stroke={i < (r.rating || 0) ? "#facc15" : "#9ca3af"}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{r.text || r.comment || "—"}</p>
                </div>
              ))}
            </div>

            {kg.reviews?.length > 2 && (
              <div className="text-center mt-5">
                <button
                  onClick={() => setShowAll((prev) => !prev)}
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-md hover:scale-105 transition"
                >
                  {showAll ? "Yopish ↑" : "Barcha fikrlarni ko‘rish ↓"}
                </button>
              </div>
            )}
          </motion.div>
        </section>

        {/* Right */}
        <aside className="space-y-6">
          <div className="p-5 bg-white dark:bg-[#041423] rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Kontakt</h4>
            <div className="flex items-center gap-3">
              <Phone className="text-green-500" />
              <a href={`tel:${kg.phone || ""}`} className="font-medium text-gray-800 dark:text-gray-200">
                {kg.phone || "—"}
              </a>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <MapPin className="text-blue-400" />
              <div className="text-sm text-gray-600 dark:text-gray-300">{kg.location_address || "—"}</div>
            </div>

            <div className="mt-4">
              <button
                onClick={handleBook}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition"
              >
                Joy band qilish
              </button>
            </div>
          </div>

          <div className="p-5 bg-white dark:bg-[#041423] rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Mini galereya</h4>
            <div className="grid grid-cols-3 gap-2">
              {gallery.slice(0, 3).map((g, i) => (
                <img key={i} src={g} alt={`g-${i}`} className="w-full h-20 object-cover rounded-md" />
              ))}
            </div>
          </div>

          <div className="p-5 bg-white dark:bg-[#041423] rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Tez ma'lumot</h4>
            <ul className="text-gray-700 dark:text-gray-200 space-y-2">
              <li className="flex items-center gap-2"><Users /> <span>{kg.capacity || "—"} o‘rin</span></li>
              <li className="flex items-center gap-2"><Clock /> <span>{kg.hours?.[0]?.time || "—"}</span></li>
              <li className="flex items-center gap-2"><Check /> <span>{kg.ages || "—"}</span></li>
            </ul>
          </div>

          {/* Review form (hozircha UI) */}
          <div className="p-6 bg-white dark:bg-[#041423] rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              Izoh yozish <PencilLine className="inline-block size-4" />
            </h4>

            <form onSubmit={handleSubmitReview} className="space-y-3">
              <input
                type="text"
                placeholder="Ismingiz"
                value={newReview.name}
                onChange={(e) => setNewReview((p) => ({ ...p, name: e.target.value }))}
                className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-100"
              />

              <textarea
                rows="3"
                placeholder="Fikringizni yozing..."
                value={newReview.text}
                onChange={(e) => setNewReview((p) => ({ ...p, text: e.target.value }))}
                className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-100 resize-none"
              />

              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((index) => (
                  <Star
                    key={index}
                    size={26}
                    onClick={() => handleRatingClick(index)}
                    className="cursor-pointer transition-transform hover:scale-110"
                    fill={index <= newReview.rating ? "#facc15" : "none"}
                    stroke={index <= newReview.rating ? "#facc15" : "#9ca3af"}
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition"
              >
                <Send size={18} /> Yuborish
              </button>
            </form>

            {successMessage && (
              <div className="mt-4 flex items-center justify-center gap-2 text-green-600 font-medium animate-fadeIn">
                <CheckCircle2 className="size-5" />
                Fikr yuborildi!
              </div>
            )}
          </div>
        </aside>
      </main>

      {/* Floating CTA */}
      <div className="fixed right-5 bottom-6 z-50">
        <button
          onClick={handleBook}
          className="hidden md:inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl hover:scale-105 transition"
        >
          Joy band qilish
        </button>

        <button
          onClick={handleBook}
          className="md:hidden inline-flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl hover:scale-105 transition"
        >
          Joy band qilish
        </button>
      </div>

      <AnimateModal open={bookOpen} onClose={() => setBookOpen(false)} name={kg.name} />
    </motion.div>
  );
}

function AnimateModal({ open, onClose, name }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="relative z-20 w-[95%] sm:w-[560px] bg-white dark:bg-[#021622] rounded-2xl shadow-2xl p-6"
      >
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Joy band qilish — {name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          Iltimos, quyidagi ma'lumotlarni to'ldiring. Biz operator bilan tez orada bog'lanamiz.
        </p>

        <form className="mt-4 space-y-3">
          <input className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-100" placeholder="Ism familiya" />
          <input className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-100" placeholder="Telefon raqam" />
          <select className="w-full p-3 rounded-lg border dark:bg-gray-700 border-gray-200 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-100">
            <option>Tanlangan yosh guruhi</option>
            <option >2-3 yosh</option>
            <option>3-4 yosh</option>
            <option>4-5 yosh</option>
          </select>

          <div className="flex items-center gap-3 mt-2">
            <button
              type="button"
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-full font-semibold"
              onClick={() => {
                alert("Rahmat! Operator siz bilan tez orada bog'lanadi.");
                onClose();
              }}
            >
              Yuborish
            </button>
            <button type="button" className="px-4 dark:text-white py-3 rounded-full border" onClick={onClose}>
              Bekor
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
