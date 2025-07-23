import { instance } from './axios';

export async function getUserProfile() {
  try {
    const response = await instance.get('/api/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export async function updateUserProfile(data) {
  try {
    const response = await instance.patch('/api/profile', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}
