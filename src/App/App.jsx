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
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUsersucces } from "../Slice/Auth";
import Auth_Service from "../Service/auth_service";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AIChat from "../Pages/AIChat";
export default function App() {
  const [changeLang, setChangeLang] = "uz";
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    i18n.changeLanguage(changeLang);
  }, [changeLang]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      async function userget() {
        const user = await Auth_Service.getUser(token);
        dispatch(signUsersucces(user?.data));
      }
      userget();
    } else {
      localStorage.removeItem("token");
    }
  }, []);

  return (
    <Router>
      <Navbar changeLanguage={setChangeLang} />
      <div className="pt-19 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kindergartendetail/:id" element={<KindergartenDetail />} />
          <Route path="/kindergartens" element={<Kindergartens />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/AIchat"element={<AIChat />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer
        position="top-right"
        className="my-toast"
        toastClassName="toast-body"
      />
    </Router>
  );
}
