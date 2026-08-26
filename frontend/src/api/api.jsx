import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8001",
});


export const sendMessage = async (message) => {

  const response = await API.post("/chat", {
    message,
  });

  return response.data.response;
};


export const uploadLog = async (file) => {

  const formData = new FormData();

  formData.append("file", file);

  const response = await API.post(
    "/analyze-log",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};