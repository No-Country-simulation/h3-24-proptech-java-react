import axios from "axios";
import { baseURL } from "../utils/constants";

import { getData } from "../utils/saveDataLocalStore";

export async function loanSimulationApi(data) {
  try {
    const token = getData("token");

    if (!token) {
      throw new Error("No estás autenticado. Inicia sesión para continuar.");
    }

    const response = await axios.post(`${baseURL}/api/loans/simulate`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200 || !response.data) {
      throw new Error(
        "Ocurrió un error al procesar la simulación. Intenta nuevamente.."
      );
    }

    return response.data;
  } catch (error) {
    console.error("💥Error:", error);
    throw error;
  }
}
