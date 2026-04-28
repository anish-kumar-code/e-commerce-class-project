// src/utils/axios.js

import axios from "axios";

const Axios = axios.create({
    // baseURL: "http://localhost:5000", // backend local base url
    baseURL: "https://e-commerce-class-project.onrender.com", // backend live base url
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});


// 🔐 Request Interceptor -> Token Auto Attach
// Axios.interceptors.request.use(
//     (config) => {
//         const adminToken = localStorage.getItem("adminToken");
//         const userToken = localStorage.getItem("userToken");

//         if (adminToken) {
//             config.headers.Authorization = `Bearer ${adminToken}`;
//         }

//         if (userToken) {
//             config.headers.Authorization = `Bearer ${userToken}`;
//         }

//         return config;
//     },
//     (error) => Promise.reject(error)
// );


// ❌ Response Interceptor -> Common Error Handle
// Axios.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response) {
//             console.log("API Error:", error.response.data.message);
//         } else {
//             console.log("Server Not Responding");
//         }

//         return Promise.reject(error);
//     }
// );

export default Axios;