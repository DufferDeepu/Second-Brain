// api/index.ts
import axios from 'axios';

// Base URL for all API requests from your .env file
// This should be: VITE_API_URL=https://brainly-backend-e9y7.onrender.com
const API_URL = import.meta.env.VITE_API_URL;

// --- Type Definitions ---
interface Content {
  _id: string;
  title: string;
  link: string;
  type: 'youtube' | 'twitter' | 'text' | 'document' | 'link';
  userId: string;
  tags: string[];
  createdAt?: string;
}

interface ContentInput {
  title: string;
  link: string;
  type: string;
}

interface APIResponse<T> {
  message: string;
  data?: T;
}

interface ShareResponse {
  hash?: string;
  message?: string;
}

// --- Axios Configuration ---

// Create an axios instance with the base URL.
const api = axios.create({
  baseURL: API_URL,
});

// Use an interceptor to automatically add the auth token to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- API Functions ---

// Authentication API functions
export const authAPI = {
  signin: async (username: string, password: string): Promise<string> => {
    // Corrected path to match your backend
    const response = await api.post<{ token: string }>('/api/v1/signin', { username, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return token;
  },
  
  signup: async (username: string, password: string): Promise<APIResponse<void>> => {
    // Corrected path to match your backend
    const response = await api.post<APIResponse<void>>('/api/v1/signup', { username, password });
    return response.data;
  },
};

// Content API functions
export const contentAPI = {
  getContents: async (): Promise<Content[]> => {
    // Corrected path to match your backend
    const response = await api.get<{ content: Content[] }>('/api/v1/content');
    return response.data.content || [];
  },
  
  addContent: async (content: ContentInput): Promise<APIResponse<void>> => {
    // Corrected path to match your backend
    const response = await api.post<APIResponse<void>>('/api/v1/content', content);
    return response.data;
  },
  
  deleteContent: async (contentId: string): Promise<APIResponse<void>> => {
    // Corrected path to match your backend
    const response = await api.post<APIResponse<void>>('/api/v1/delete', { contentId });
    return response.data;
  },
};

// Sharing API functions
export const sharingAPI = {
  updateBrainSharing: async (share: boolean): Promise<ShareResponse> => {
    // Corrected path to match your backend
    const response = await api.post<ShareResponse>('/api/v1/brain/share', { share });
    return response.data;
  },
};