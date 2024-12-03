import axios from "axios";
import { baseURL } from "../utils/constants";
import { getData } from "../utils/saveDataLocalStore";

export async function startVerificationApi() {
  try {
    const token = getData("token");

    if (!token) {
      console.warn("No token found, user is not logged in.");
      return null;
    }

    const response = await axios.post(
      `${baseURL}/api/veriff/session`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data;

    console.log(data);

    return data;
  } catch (error) {
    console.error("💥Error:", error.message);
    return null;
  }
}
