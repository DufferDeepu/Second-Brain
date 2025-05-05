// api/index.ts
import axios from 'axios';

// Base URL for all API requests
const API_URL = 'http://localhost:3000/api/v1';

// Simple type definitions
interface Content {
  _id: string;
  title: string;
  link: string;
  type: string;
  userId: string;
  tags: string[];
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

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // Add correct type to config.headers
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Authentication API functions
export const authAPI = {
  // Sign in function
  signin: async (username: string, password: string): Promise<string> => {
    const response = await api.post<{ token: string }>('/signin', { username, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return token;
  },
  
  // Sign up function
  signup: async (username: string, password: string): Promise<APIResponse<void>> => {
    const response = await api.post<APIResponse<void>>('/signup', { username, password });
    return response.data;
  },
};

// Content API functions
export const contentAPI = {
  // Get content list
  getContents: async (type?: string): Promise<Content[]> => {
    const response = await api.get<{ content: Content[] }>('/content');
    return response.data.content || [];
  },
  
  // Add new content
  addContent: async (content: ContentInput): Promise<APIResponse<void>> => {
    const response = await api.post<APIResponse<void>>('/content', content);
    return response.data;
  },
  
  // Delete content
  deleteContent: async (contentId: string): Promise<APIResponse<void>> => {
    const response = await api.post<APIResponse<void>>('/delete', { contentId });
    return response.data;
  },
};

// Sharing API functions
export const sharingAPI = {
  // Share brain function
  shareBrain: async (share: boolean): Promise<ShareResponse> => {
    const response = await api.post<ShareResponse>('/brain/share', { share });
    return response.data;
  },
  
  // Share content function
  shareContent: async (contentId: string): Promise<ShareResponse> => {
    // Generate a shareable link for individual content
    const brainShareResponse = await api.post<ShareResponse>('/brain/share', { share: true });
    return brainShareResponse.data;
  }
};