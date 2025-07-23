import { instance } from './axios';

export const getProfile = async () => {
  try {
    const response = await instance.get('/api/profile');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (updatedData) => {
  try {
    const response = await instance.patch('/api/profile', updatedData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
