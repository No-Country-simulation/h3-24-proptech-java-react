import axios from "axios";

import { getData } from "../utils/saveDataLocalStore";
import { baseURL } from "../utils/constants";

export async function getCurrentUser() {
  try {
    const token = getData("token");

    if (!token) {
      throw new Error("No estás autenticado. Inicia sesión para continuar.");
    }

    const response = await axios.get(`${baseURL}/api/auth/check-login`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200 || !response.data) {
      throw new Error("Ocurrió un error. Intenta nuevamente..");
    }

    return response.data;
  } catch (error) {
    console.error("💥Error:", error);
    throw error;
  }
}

export async function getUserProfile(userId) {
  try {
    const token = getData("token");

    if (!token) {
      throw new Error("No estás autenticado. Inicia sesión para continuar.");
    }

    const response = await axios.get(
      `${baseURL}/api/users/${userId}/profiles`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200 || !response.data) {
      throw new Error("Ocurrió un error. Intenta nuevamente..");
    }

    return response.data;
  } catch (error) {
    console.error("💥Error:", error);
    throw error;
  }
}
