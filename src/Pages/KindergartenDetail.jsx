import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  MapPin,
  Star,
  Phone,
  Clock,
  Users,
  Check,
  Send,
  PencilLine,
  CheckCircle2,
} from "lucide-react";

/*
  KindergartenDetail.jsx
  - Premium detail page for a single kindergarten.
  - Uses TailwindCSS classes and expects `darkMode: "class"` in tailwind.config.
  - Requires: framer-motion, swiper, lucide-react installed.
*/

const mock = {
  id: "k1",
  name: "Sunny Kids Kindergarten",
  rating: 4.9,
  reviewsCount: 128,
  location: "Toshkent, Yunusobod tumani, Bobur ko'chasi 12",
  phone: "+998 90 123 45 67",
  pricePerMonth: 350000,
  ages: "2–5 yosh",
  capacity: 30,
  hours: [
    { day: "Dushanba–Juma", time: "08:00 — 18:00" },
    { day: "Shanba", time: "09:00 — 13:00" },
  ],
  features: [
    "Uyali tibbiy xodim",
    "3 ta ovqat (nonushta, tushlik, kechki)",
    "Transport xizmati (qo‘shimcha)",
    "Ingliz tili darslari",
    "Montessori materiallar",
  ],
  gallery: [
    "https://images.squarespace-cdn.com/content/v1/5dc17fb1ec2adb4b064a8036/1574274669158-VJ29AGERNKZTY8TEFW41/164358167-hands-wallpapers.jpg",
    "https://images.squarespace-cdn.com/content/v1/5dc17fb1ec2adb4b064a8036/1574274669158-VJ29AGERNKZTY8TEFW41/164358167-hands-wallpapers.jpg",
    "https://images.squarespace-cdn.com/content/v1/5dc17fb1ec2adb4b064a8036/1574274669158-VJ29AGERNKZTY8TEFW41/164358167-hands-wallpapers.jpg",
  ],
  description:
    "Sunny Kids — mehribon pedagoglar, xavfsiz muhit va ijodiy o‘yinlarga asoslangan ta'lim. Biz har bir bolaning o‘z qobiliyatlarini topishi va rivojlantirishini maqsad qilganmiz. Kundalik harakatlar, kichik guruh darslari va individual yondashuv mavjud.",
  reviews: [
    {
      id: 1,
      name: "Shahnoza",
      text: "O‘g‘lim uchun juda mos. Tarbiyachilar mehribon, ovqatlar ham hamyonbop va sog‘lom.",
      rating: 5,
    },
    {
      id: 2,
      name: "Oybek",
      text: "Xizmat yaxshi, transport tizimi ishonchli. Tavsiya qilaman!",
      rating: 4.5,
    },
  ],
};

export default function KindergartenDetail() {
  const [bookOpen, setBookOpen] = useState(false);

  const [showAll, setShowAll] = useState(false);

  const reviews = [
    {
      id: 1,
      name: "Madina Karimova",
      rating: 5,
      text: "Bog‘cha juda yaxshi, o‘qituvchilar mehribon va e’tiborli. Farzandim bu yerda o‘zini uyidagidek his qiladi!",
    },
    {
      id: 2,
      name: "Jasur Abduvaliyev",
      rating: 4,
      text: "O‘g‘limni bu yerga berganimdan juda xursandman. Faqat joy biroz torroq, lekin sharoitlar yaxshi.",
    },
    {
      id: 3,
      name: "Nilufar To‘xtayeva",
      rating: 5,
      text: "Ingliz tili darslari juda sifatli o‘tiladi. Rahmat sizlarga!",
    },
    {
      id: 4,
      name: "Azamat Rasulov",
      rating: 5,
      text: "Farzandim har kuni bog‘chaga borishni intiqlik bilan kutadi. Juda ijobiy muhit!",
    },
  ];

  const visibleReviews = showAll ? reviews : reviews.slice(0, 2);

  const handleCall = () => {
    window.location.href = "tel:+998901234567";
  };

  const handleBook = () => {
    // Darhol example - ochiladigan modal yoki page redirect
    setBookOpen(true);
  };

  useEffect(() => {
     window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [newReview, setNewReview] = useState({
    name: "",
    text: "",
    rating: 0,
  });

  const [successMessage, setSuccessMessage] = useState(false);

  const handleRatingClick = (index) => {
    setNewReview((p) => ({ ...p, rating: index }));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (!newReview.name || !newReview.text || newReview.rating === 0) {
      alert("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    // 🔹 Fikr yuborilgan holatda
    setSuccessMessage(true);

    // 🔹 Formani tozalash
    setNewReview({ name: "", text: "", rating: 0 });

    // 🔹 Xabar 3 soniyadan keyin yo‘qoladi
    setTimeout(() => setSuccessMessage(false), 3000);
  };
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
            className="h-full"
          >
            {mock.gallery.map((src, i) => (
              <SwiperSlide key={i}>
                <div className="w-full h-full">
                  <img
                    src={src}
                    alt={`${mock.name}-${i}`}
                    className="w-full h-full object-cover transform transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Hero Info Card */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 -mt-20 relative z-20">
  <div className="
    bg-white/90 dark:bg-[#041423]/90 backdrop-blur-md 
    rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 
    p-4 sm:p-6 md:p-8 
    flex flex-col lg:flex-row gap-6 items-start lg:items-start
  ">
    
    {/* Left Column */}
    <div className="flex-shrink-0 w-full lg:w-1/2">
      <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white text-center lg:text-left">
        {mock.name}
      </h1>

      <div className="flex flex-wrap items-center gap-3 mt-3 justify-center lg:justify-start">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold shadow-sm">
          <Star size={18} /> <span>{mock.rating}</span>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-300">
          {mock.reviewsCount} ta sharh
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <MapPin /> <span>{mock.location}</span>
        </div>
      </div>

      <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed text-center lg:text-left">
        {mock.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-3 justify-center lg:justify-start">
        {mock.features.slice(0, 4).map((f, idx) => (
          <div
            key={idx}
            className="px-3 py-1 rounded-full bg-gray-100 dark:bg-[#0b2231] text-sm text-gray-700 dark:text-gray-200"
          >
            {f}
          </div>
        ))}
      </div>
    </div>

    {/* Right Column */}
    <div className="w-full lg:w-1/2 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-center sm:text-left">
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Oyiga narx</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {mock.pricePerMonth.toLocaleString()} UZS
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Yosh</div>
          <div className="font-semibold text-gray-800 dark:text-gray-200">
            {mock.ages}
          </div>
        </div>
      </div>

      {/* Contact & Working Hours */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#082532] border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Phone className="text-green-500" />
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Telefon</div>
              <Link onClick={handleCall} to={`tel:${mock.phone}`}>
                <div className="font-medium text-gray-800 dark:text-gray-200">{mock.phone}</div>
              </Link>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#082532] border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Clock className="text-indigo-500" />
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Ish vaqti</div>
              <div className="font-medium text-gray-800 dark:text-gray-200">
                {mock.hours[0].time}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-2 flex flex-col sm:flex-row gap-3 w-full">
        <button
          onClick={handleBook}
          className="
            w-full sm:flex-1 whitespace-nowrap
            bg-gradient-to-r from-indigo-600 to-purple-600 
            hover:from-indigo-700 hover:to-purple-700 
            text-white px-5 py-3 rounded-full font-semibold 
            shadow-lg transition
          "
        >
          Joy band qilish
        </button>

        <button
          onClick={() =>
            window.open(
              `https://www.google.com/maps/search/${encodeURIComponent(mock.location)}`,
              "_blank"
            )
          }
          className="
            w-full sm:w-auto whitespace-nowrap
            px-4 py-3 rounded-full 
            border border-gray-200 dark:border-gray-700 
            bg-white dark:bg-transparent 
            text-gray-700 dark:text-gray-200 
            font-medium hover:shadow-md transition
          "
        >
          <MapPin className="inline-block mr-2" /> Xaritada ko‘rish
        </button>
      </div>

      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
        <strong>Sig‘im:</strong> {mock.capacity} o‘rin —{" "}
        <strong>Qabul:</strong> haftaning barcha kunlari
      </div>
    </div>
  </div>
</div>

      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-5 lg:px-12 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Details + schedule + features */}
        <section className="lg:col-span-2 space-y-8">
          {/* Full description */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-white dark:bg-[#061725] rounded-2xl shadow-md border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              To‘liq ma'lumot
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {mock.description}
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                  Xususiyatlar
                </h4>
                <ul className="space-y-2">
                  {mock.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-gray-700 dark:text-gray-200"
                    >
                      <Check className="text-green-400 mt-1" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                  Ish vaqti
                </h4>
                <div className="text-gray-700 dark:text-gray-200">
                  {mock.hours.map((h, i) => (
                    <div key={i} className="flex justify-between py-1">
                      <span>{h.day}</span>
                      <span className="font-medium">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 bg-white dark:bg-[#061725] rounded-2xl shadow-md border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Ota-onalar fikrlari
              </h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {mock.reviews.length} ta fikr
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Ota-onalar fikrlari
              </h3>

              <div className="space-y-5 transition-all duration-300">
                {visibleReviews.map((r) => (
                  <div
                    key={r.id}
                    className="p-5 bg-white dark:bg-[#041423] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {r.name}
                      </h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            fill={i < r.rating ? "#facc15" : "none"}
                            stroke={i < r.rating ? "#facc15" : "#9ca3af"}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {r.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Show more button */}
              <div className="text-center mt-5">
                <button
                  onClick={() => setShowAll((prev) => !prev)}
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-md hover:scale-105 transition"
                >
                  {showAll ? "Yopish ↑" : "Barcha fikrlarni ko‘rish ↓"}
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Right: Contact card + small gallery */}
        <aside className="space-y-6">
          <div className="p-5 bg-white dark:bg-[#041423] rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              Kontakt
            </h4>
            <div className="flex items-center gap-3">
              <Phone className="text-green-500" />
              <a
                href={`tel:${mock.phone}`}
                className="font-medium text-gray-800 dark:text-gray-200"
              >
                {mock.phone}
              </a>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <MapPin className="text-blue-400" />
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {mock.location}
              </div>
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
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              Mini galereya
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {mock.gallery.slice(0, 3).map((g, i) => (
                <img
                  key={i}
                  src={g}
                  alt={`g-${i}`}
                  className="w-full h-20 object-cover rounded-md"
                />
              ))}
            </div>
          </div>

          <div className="p-5 bg-white dark:bg-[#041423] rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              Tez ma'lumot
            </h4>
            <ul className="text-gray-700 dark:text-gray-200 space-y-2">
              <li className="flex items-center gap-2">
                <Users /> <span>{mock.capacity} o‘rin</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock /> <span>{mock.hours[0].time}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check /> <span>Qonuniy ro‘yxat</span>
              </li>
            </ul>
          </div>
          <div className="p-6 bg-white dark:bg-[#041423] rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              Izoh yozish <PencilLine className="inline-block size-4" />
            </h4>

            <form onSubmit={handleSubmitReview} className="space-y-3">
              <input
                type="text"
                placeholder="Ismingiz"
                value={newReview.name}
                onChange={(e) =>
                  setNewReview((p) => ({ ...p, name: e.target.value }))
                }
                className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-100"
              />

              <textarea
                rows="3"
                placeholder="Fikringizni yozing..."
                value={newReview.text}
                onChange={(e) =>
                  setNewReview((p) => ({ ...p, text: e.target.value }))
                }
                className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-100 resize-none"
              />

              {/* ⭐ Yulduzcha baho tanlash */}
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

            {/* ✅ Tasdiq xabari */}
            {successMessage && (
              <div className="mt-4 flex items-center justify-center gap-2 text-green-600 font-medium animate-fadeIn">
                <CheckCircle2 className="size-5" />
                Fikr yuborildi!
              </div>
            )}
          </div>
        </aside>
      </main>

      {/* Sticky floating CTA (bottom-right on mobile / desktop) */}
      <div className="fixed right-5 bottom-6 z-50">
        <button
          onClick={handleBook}
          className="hidden md:inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl hover:scale-105 transition"
        >
          Joy band qilish
        </button>

        {/* Mobile floating */}
        <button
          onClick={handleBook}
          className="md:hidden inline-flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl hover:scale-105 transition"
        >
          Joy band qilish
        </button>
      </div>

      {/* Simple booking modal */}
      <AnimateModal
        open={bookOpen}
        onClose={() => setBookOpen(false)}
        name={mock.name}
      />
    </motion.div>
  );
}

/* ---------- Simple modal component ---------- */
function AnimateModal({ open, onClose, name }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="relative z-20 w-[95%] sm:w-[560px] bg-white dark:bg-[#021622] rounded-2xl shadow-2xl p-6"
      >
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          Joy band qilish — {name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          Iltimos, quyidagi ma'lumotlarni to'ldiring. Biz operator bilan tez
          orada bog'lanamiz.
        </p>

        <form className="mt-4 space-y-3">
          <input
            className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-100"
            placeholder="Ism familiya"
          />
          <input
            className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-100"
            placeholder="Telefon raqam"
          />
          <select className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-100">
            <option>Tanlangan yosh guruhi</option>
            <option>2-3 yosh</option>
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
            <button
              type="button"
              className="px-4 py-3 rounded-full border"
              onClick={onClose}
            >
              Bekor
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
