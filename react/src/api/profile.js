import instance from './axios';

export const getProfile = async () => {
  try {
    const response = await instance.get('/api/profile');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (data) => {
  try {
    const response = await instance.patch('/api/profile', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
