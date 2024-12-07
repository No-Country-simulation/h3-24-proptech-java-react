import axios from 'axios';
import { baseURL } from '../utils/constants';

export async function sendMessage(message) {
  try {
    const { data } = await axios.get(
      `${baseURL}/api/faq/ask?question=${message}`
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error('💥Error:', error);
    throw error;
  }
}
