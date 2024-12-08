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

export async function loanApplicationApi({
  userDni,
  profileId,
  data,
  loanSimulation,
}) {
  try {
    console.log("dataaa", userDni, profileId, data, loanSimulation);

    const token = getData("token");

    if (!token) {
      throw new Error("No estás autenticado. Inicia sesión para continuar.");
    }

    ////////////////////////////
    // Crear un prestamo

    const { requestedAmount, termMonths } = loanSimulation;

    const loanResponse = await axios.post(
      `${baseURL}/api/loans/create`,
      { requestedAmount, termMonths },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (loanResponse.status !== 200 || !loanResponse.data) {
      throw new Error(
        "Ocurrió un error en crear el prestamo. Intenta nuevamente.."
      );
    }

    ////////////////////////////
    // Enviar los otros datos

    const profileResponse = await axios.put(
      `${baseURL}/api/users/${userDni}/profiles/${profileId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (profileResponse.status !== 200 || !profileResponse.data) {
      throw new Error(
        "Ocurrió un error al actualizar el perfil. Intenta nuevamente."
      );
    }

    ////////////////////////////

    return { loan: loanResponse.data, profile: profileResponse.data };
  } catch (error) {
    console.error("💥Error:", error);
    throw error;
  }
}

////////////////////////////

export async function pendingQuotasApi(loanId) {
  try {
    const token = getData("token");

    if (!token) {
      throw new Error("No estás autenticado. Inicia sesión para continuar.");
    }

    const response = await axios.get(
      `${baseURL}/api/payments/pending?loanId=${loanId}`,
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
