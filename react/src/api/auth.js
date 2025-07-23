import { instance } from './axios';

export async function registerUser(data) {
  try {
    const response = await instance.post('/api/register', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export async function loginUser(data) {
  try {
    const response = await instance.post('/api/login', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}
