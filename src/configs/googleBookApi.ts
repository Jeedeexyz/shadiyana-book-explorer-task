import Config from 'react-native-config';

// Google Books API configuration
export const API_CONFIG = {
  BASE_URL: 'https://www.googleapis.com/books/v1',
  ENDPOINTS: {
    VOLUMES: '/volumes',
  },
  DEFAULT_PARAMS: {
    maxResults: 20,
    printType: 'books',
    orderBy: 'relevance',
  },
  // Get API key from environment variables
  API_KEY: Config.GOOGLE_BOOKS_API_KEY,
};

// Search parameters interface
export interface SearchParams {
  query: string;
  maxResults?: number;
  startIndex?: number;
  orderBy?: 'newest' | 'relevance';
  printType?: 'all' | 'books' | 'magazines';
}

// Helper function to validate API key
export const isApiKeyConfigured = (): boolean => {
  return !!API_CONFIG.API_KEY && API_CONFIG.API_KEY.length > 0;
};