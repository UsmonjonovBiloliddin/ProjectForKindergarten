// src/Service/api.js
import axios from "axios";

export default axios.create({
  baseURL: "https://bogcha-x9p4.onrender.com",
  headers: { accept: "application/json" },
});
