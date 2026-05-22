import { API_BASE_URL } from "../config/api";

const BASE_URL = `${API_BASE_URL}/mentor`;

export const sendMessageToMentor = async (message) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "AI Mentor failed");
  }

  return data;
};
