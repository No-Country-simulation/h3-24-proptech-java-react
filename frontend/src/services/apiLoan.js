import axios from "axios";
import { baseURL } from "../utils/constants";

import { getData } from "../utils/saveDataLocalStore";

export async function loanSimulationApi(data) {
  try {
    const token = getData("token");

    if (!token) {
      console.warn("No token found, user is not logged in.");
      return null;
    }

    const response = await axios.post(`${baseURL}/api/loans/simulate`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("💥Error:", error.message);
    return null;
  }
}
