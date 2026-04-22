import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight, Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Data_Service from "../../Service/data.service";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80";

// ── Skeleton ──────────────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="h-[380px] sm:h-[420px] rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
  );
}

export default function RecommendedKindergarten() {
  const { t } = useTranslation();
  const [list,    setList]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await Data_Service.GetKinder();
        const data = Array.isArray(res?.data) ? res.data : [];

        // Top 6 by rating
        const top = [...data]
          .sort((a, b) => (b.rating || 0) - (a.rating || 0))
          .slice(0, 6);

        setList(top);
      } catch (e) {
        setError("Ma'lumot yuklanmadi");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="py-12 sm:py-14 md:py-16 bg-gray-50 dark:bg-[#0d1117] transition-colors duration-300">
      <div className="container">
        <div className="mx-auto px-6 sm:px-10 md:px-16 lg:px-20">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-5">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                {t("recommendedKindergartenTitle")}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm sm:text-base">
                {t("recommendedKindergartenSubtitle")}
              </p>
            </div>

            {!loading && list.length > 1 && (
              <div className="flex items-center gap-3">
                <button className="swiper-rec-prev w-11 h-11 flex items-center justify-center rounded-full
                  bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg
                  hover:scale-110 active:scale-95 transition-all duration-200">
                  <ChevronLeft size={22} />
                </button>
                <button className="swiper-rec-next w-11 h-11 flex items-center justify-center rounded-full
                  bg-gradient-to-r from-purple-600 to-indigo-500 text-white shadow-lg
                  hover:scale-110 active:scale-95 transition-all duration-200">
                  <ChevronRight size={22} />
                </button>
              </div>
            )}
          </div>

          {/* Loading */}
          {loading && <Skeleton />}

          {/* Error */}
          {!loading && error && (
            <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
              {error}
            </div>
          )}

          {/* Swiper */}
          {!loading && !error && list.length > 0 && (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              slidesPerView={1}
              navigation={{ nextEl: ".swiper-rec-next", prevEl: ".swiper-rec-prev" }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={list.length > 1}
              className="rounded-2xl shadow-xl"
            >
              {list.map((kg) => (
                <SwiperSlide key={kg.id}>
                  <div className="relative h-[380px] sm:h-[420px] rounded-2xl overflow-hidden group">
                    {/* Image */}
                    <img
                      src={kg.image || FALLBACK_IMG}
                      alt={kg.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={e => { e.target.src = FALLBACK_IMG; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    {/* Rating badge */}
                    {kg.rating && (
                      <div className="absolute top-4 right-4 flex items-center gap-1.5
                        bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/25">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-white font-bold text-sm">{Number(kg.rating).toFixed(1)}</span>
                      </div>
                    )}

                    {/* Type badge */}
                    {kg.type && (
                      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold text-white
                        bg-indigo-600/80 backdrop-blur-sm border border-white/20 capitalize">
                        {kg.type}
                      </div>
                    )}

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white z-10">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-2 leading-snug">
                        {kg.name}
                      </h3>

                      {(kg.location_address || kg.region) && (
                        <p className="flex items-center gap-1.5 text-white/75 text-sm mb-2">
                          <MapPin size={14} />
                          {kg.location_address || `${kg.region}${kg.district ? ", " + kg.district : ""}`}
                        </p>
                      )}

                      {kg.price && (
                        <p className="text-white/70 text-sm mb-4">
                          💰 {Number(kg.price).toLocaleString()} UZS / oy
                        </p>
                      )}

                      {kg.short_description && (
                        <p className="text-white/85 text-sm sm:text-base mb-5 line-clamp-2">
                          {kg.short_description}
                        </p>
                      )}

                      <Link to={`/kindergartendetail/${kg.id}`}>
                        <button className="cursor-pointer bg-white text-gray-900 px-6 py-2.5 rounded-full
                          font-semibold text-sm hover:bg-indigo-50 transition-all duration-300 shadow-lg">
                          {t("recommendedKindergartenDetails")} →
                        </button>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* Empty */}
          {!loading && !error && list.length === 0 && (
            <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
              Hozircha ma'lumot yo'q
            </div>
          )}
        </div>
      </div>
    </section>
  );
}