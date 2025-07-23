import { instance } from './axios';

export const createPost = async (data) => {
  try {
    const response = await instance.post('/api/posts', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const response = await instance.get('/api/posts');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const likePost = async (id) => {
  try {
    const response = await instance.post(`/api/posts/${id}/like`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
