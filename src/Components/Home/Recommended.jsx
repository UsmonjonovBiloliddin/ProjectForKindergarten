import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const kindergartens = [
  {
    id: 1,
    nameKey: "sunnyKidsName",
    locationKey: "sunnyKidsLocation",
    descriptionKey: "sunnyKidsDescription",
    image:
      "https://images.squarespace-cdn.com/content/v1/5dc17fb1ec2adb4b064a8036/1574274669158-VJ29AGERNKZTY8TEFW41/164358167-hands-wallpapers.jpg",
  },
  {
    id: 2,
    nameKey: "happyNestName",
    locationKey: "happyNestLocation",
    descriptionKey: "happyNestDescription",
    image:
      "https://images.squarespace-cdn.com/content/v1/5dc17fb1ec2adb4b064a8036/1574274669158-VJ29AGERNKZTY8TEFW41/164358167-hands-wallpapers.jpg",
  },
  {
    id: 3,
    nameKey: "littleStarsName",
    locationKey: "littleStarsLocation",
    descriptionKey: "littleStarsDescription",
    image:
      "https://images.squarespace-cdn.com/content/v1/5dc17fb1ec2adb4b064a8036/1574274669158-VJ29AGERNKZTY8TEFW41/164358167-hands-wallpapers.jpg",
  },
];

export default function RecommendedKindergarten() {
  const { t } = useTranslation();

  return (
    <section className="py-12 sm:py-14 md:py-16 bg-gray-50 dark:bg-[#0d1117] transition-colors duration-300">
      <div className="mx-auto px-6 sm:px-10 md:px-16 lg:px-20 max-w-10xl">
        {/* Title + Navigation */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 sm:mb-10 gap-5">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
              {t("recommendedKindergartenTitle")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
              {t("recommendedKindergartenSubtitle")}
            </p>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <button className="swiper-prev w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full 
              bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md sm:shadow-lg hover:scale-110 hover:shadow-2xl active:scale-95 transition-all duration-300">
              <ChevronLeft size={24} className="sm:size-[26px]" />
            </button>
            <button className="swiper-next w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full 
              bg-gradient-to-r from-purple-600 to-indigo-500 text-white shadow-md sm:shadow-lg hover:scale-110 hover:shadow-2xl active:scale-95 transition-all duration-300">
              <ChevronRight size={24} className="sm:size-[26px]" />
            </button>
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-next",
            prevEl: ".swiper-prev",
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop
          className="rounded-2xl shadow-xl"
        >
          {kindergartens.map((garden) => (
            <SwiperSlide key={garden.id}>
              <div className="relative h-[380px] sm:h-[400px] md:h-[420px] rounded-2xl overflow-hidden group">
                <img
                  src={garden.image}
                  alt={t(garden.nameKey)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                <div className="absolute bottom-0 left-0 p-5 sm:p-7 md:p-8 text-white z-10 max-w-xl">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                    {t(garden.nameKey)}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base opacity-90 mb-1">
                    📍 {t(garden.locationKey)}
                  </p>
                  <p className="text-sm sm:text-base md:text-lg opacity-95">
                    {t(garden.descriptionKey)}
                  </p>
                  <Link to={"/kindergartendetail"}>
                    <button className="mt-4 sm:mt-5 cursor-pointer bg-white text-black px-5 sm:px-6 py-2.5 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300">
                      {t("recommendedKindergartenDetails")}
                    </button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
