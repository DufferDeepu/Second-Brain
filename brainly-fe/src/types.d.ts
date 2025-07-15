export interface Content {
  _id: string;
  title: string;
  link: string;
  type: 'youtube' | 'twitter' | 'text' | 'document' | 'link'; // Added document and link types
  userId: string;
  createdAt?: string;
  tags: string[];
}

export interface ContentInput {
  title: string;
  link: string;
  type: string;
}

export interface APIResponse<T> {
  message?: string;
  content?: T;
  hash?: string;
}

export interface ShareResponse {
  hash?: string;
  message?: string;
}