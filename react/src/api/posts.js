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

export const unlikePost = async (id) => {
  try {
    const response = await instance.delete(`/api/posts/${id}/like`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addComment = async (id, text) => {
  try {
    const response = await instance.post(`/api/posts/${id}/comment`, { text });
    return response.data;
  } catch (error) {
    throw error;
  }
};
