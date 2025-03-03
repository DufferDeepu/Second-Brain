// api/index.ts
import axios from 'axios';
import { Content, ContentInput, APIResponse, ShareResponse } from '../src/types';

const API_URL = 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  signin: async (username: string, password: string) => {
    const response = await api.post<{ token: string }>('/signin', { username, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return token;
  },
  signup: async (username: string, password: string) => {
    const response = await api.post<APIResponse<void>>('/signup', { username, password });
    return response.data;
  },
};

export const contentAPI = {
  getContents: async (type?: string) => {
    const response = await api.get<{ content: Content[] }>('/content');
    return response.data.content || [];
  },
  addContent: async (content: ContentInput) => {
    const response = await api.post<APIResponse<void>>('/content', content);
    return response.data;
  },
  deleteContent: async (contentId: string) => {
    const response = await api.post<APIResponse<void>>('/delete', { contentId });
    return response.data;
  },
};

export const sharingAPI = {
  shareBrain: async (share: boolean) => {
    const response = await api.post<ShareResponse>('/brain/share', { share });
    return response.data;
  },
  shareContent: async (contentId: string) => {
    // Generate a shareable link for individual content
    const brainShareResponse = await api.post<ShareResponse>('/brain/share', { share: true });
    return brainShareResponse.data;
  }
};