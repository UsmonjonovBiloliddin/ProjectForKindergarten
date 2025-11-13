import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../Components/Main/Navbar";
import Home from "../Pages/Home";
import KindergartenDetail from "../Pages/KindergartenDetail";
import Kindergartens from "../Pages/Kindergartens";
import Footer from "../Components/Main/Footer";
import Recommendations from "../Pages/Recommendations";
import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function App() {
  const [changeLang, setChangeLang] = "uz";
  const { i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(changeLang);
  }, [changeLang]);

  return (
    <Router>
      <Navbar changeLanguage={setChangeLang} />
      <div className="pt-19 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kindergartendetail" element={<KindergartenDetail />} />
          <Route path="/kindergartens" element={<Kindergartens />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
