import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-b from-indigo-800 to-purple-900 dark:from-gray-900 dark:to-gray-950 text-white py-12 px-6 sm:px-10 relative overflow-hidden">
      {/* Background pattern effect */}
      <div className="absolute inset-0 opacity-10 "></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
        {/* 1. Logo & intro */}
        <div>
          <Link
            to="/"
            className="text-3xl font-extrabold bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-400 bg-clip-text text-transparent"
          >
            Bog‘chaTop
          </Link>
          <p className="text-sm text-gray-200 mt-3 leading-relaxed dark:text-gray-400">
            {t("footer.intro")}
          </p>
        </div>

        {/* 2. Pages */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">{t("footer.pagesTitle")}</h3>
          <ul className="space-y-2 text-gray-200 dark:text-gray-400">
            <li>
              <Link to="/" className="hover:text-yellow-300 transition">{t("footer.home")}</Link>
            </li>
            <li>
              <Link to="/bogchalar" className="hover:text-yellow-300 transition">{t("footer.kindergartens")}</Link>
            </li>
            <li>
              <Link to="/tavsiyalar" className="hover:text-yellow-300 transition">{t("footer.recommendations")}</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-300 transition">{t("footer.about")}</Link>
            </li>
          </ul>
        </div>

        {/* 3. Contacts */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">{t("footer.contactTitle")}</h3>
          <ul className="space-y-3 text-gray-200 dark:text-gray-400">
            <li className="flex items-center gap-2">
              <Phone size={18} /> +998 90 123 45 67
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} /> info@bogchatop.uz
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={18} /> Toshkent, Amir Temur ko‘chasi 25
            </li>
          </ul>
        </div>

        {/* 4. Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">{t("footer.socialTitle")}</h3>
          <div className="flex items-center gap-5">
            <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition">
              <Youtube size={20} />
            </a>
          </div>
          <p className="mt-5 text-gray-300 text-sm">{t("footer.followUs")}</p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-white/20 mt-12 pt-5 text-center text-gray-200 dark:text-gray-400 text-sm">
        © {new Date().getFullYear()} <span className="font-semibold">Bog‘chaTop</span> — {t("footer.rights")}
      </div>
    </footer>
  );
};

export default Footer;
