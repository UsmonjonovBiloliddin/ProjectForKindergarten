import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ContactUs() {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-[#020b16] dark:via-[#041423] dark:to-[#03101f] py-20 px-6 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-4 tracking-tight">
            {t("contactUsTitle")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            {t("contactUsText")}
          </p>
        </div>

        {/* Contact Section */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="bg-white dark:bg-[#0b1d33] shadow-xl rounded-3xl p-8 flex flex-col justify-between border border-gray-100 dark:border-gray-700 transition-all hover:shadow-2xl hover:-translate-y-1">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                {t("contactInfo")}
              </h2>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <Mail className="text-blue-600 dark:text-blue-400 w-6 h-6" />
                  <p className="text-gray-700 dark:text-gray-300">info@bogcha.uz</p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="text-blue-600 dark:text-blue-400 w-6 h-6" />
                  <p className="text-gray-700 dark:text-gray-300">+998 (90) 123-45-67</p>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="text-blue-600 dark:text-blue-400 w-6 h-6" />
                  <p className="text-gray-700 dark:text-gray-300">
                    Toshkent shahri, Chilonzor tumani, 5-mavze
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="text-blue-600 dark:text-blue-400 w-6 h-6" />
                  <p className="text-gray-700 dark:text-gray-300">
                    Dush–Shan: 9:00 — 18:00
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md">
              <iframe
                title="location"
                className="w-full h-64"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.739093951285!2d69.24007351542586!3d41.29949587927227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8bcb5b3d0e4b%3A0xa35aebdbcb33f951!2sTashkent%20City!5e0!3m2!1sen!2s!4v1699999999999"
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-[#0b1d33] shadow-xl rounded-3xl p-8 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-2xl hover:-translate-y-1">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              {t("contactForm")}
            </h2>
            <form className="space-y-5">
              <input
                type="text"
                placeholder={t("yourName")}
                className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
              <input
                type="email"
                placeholder={t("yourEmail")}
                className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
              <textarea
                rows="4"
                placeholder={t("yourMessage")}
                className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-100 resize-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              ></textarea>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-all"
              >
                <Send size={18} /> {t("sendMessage")}
              </button>
            </form>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
            {t("orContactDirectly")}
          </p>
          <a
            href="mailto:info@bogcha.uz"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            info@bogcha.uz
          </a>
        </div>
      </div>
    </section>
  );
}
