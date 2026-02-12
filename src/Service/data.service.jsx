import { m } from "framer-motion";
import AIChat from "../Pages/AIChat";
import axios from "./api";

const Data_Service = {
  GetKinder: async () => {
    const response = await axios.get("https://bogcha-x9p4.onrender.com/api/kindergartens");
    console.log(response);
    
    return response;
  },

  Kinderdateil: async (id) => {
    const response = await axios.get(`https://bogcha-x9p4.onrender.com/api/kindergartens/${id}`);
    return response;
  },
  AIChat: async (massage) => {
    const response = await axios.get("https://bogcha-x9p4.onrender.com/api/chat", {
        body: JSON.stringify({
            message:massage
        }),
    });
    return response;
  },

};

export default Data_Service;
