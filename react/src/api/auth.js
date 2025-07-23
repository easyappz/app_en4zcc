import instance from './axios';

export const register = async (data) => {
  try {
    const response = await instance.post('/api/register', data);
    const { token } = response.data;
    localStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (data) => {
  try {
    const response = await instance.post('/api/login', data);
    const { token } = response.data;
    localStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    throw error;
  }
};
