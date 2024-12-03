import axios from 'axios';

import { getData } from '../utils/saveDataLocalStore';
import { baseURL } from '../utils/constants';

export async function getCurrentUser() {
  try {
    const token = getData('token');

    if (!token) {
      console.warn('No token found, user is not logged in.');
      return null;
    }

    const response = await axios.get(`${baseURL}/api/auth/check-login`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    console.error('💥Error:', error.message);
    return null;
  }
}

export async function getUserProfile(userId) {
  try {
    const token = getData('token');

    if (!token) {
      console.warn('No token found, user is not logged in.');
      return null;
    }

    const response = await axios.get(
      `${baseURL}/api/users/${userId}/profiles`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('💥Error:', error.message);
    return null;
  }
}
