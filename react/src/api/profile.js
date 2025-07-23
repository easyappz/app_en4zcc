import { instance } from './axios';

export const getProfile = async () => {
  try {
    const response = await instance.get('/api/profile');
    return response.data;
  } catch (error) {
    throw error;
  }
};
