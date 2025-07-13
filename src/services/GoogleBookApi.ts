import { convertGoogleBookToBook, hasISBN } from '../utils/helpers';
import { API_CONFIG, SearchParams, isApiKeyConfigured } from '../configs/googleBookApi';
import { GoogleBooksResponse, Book, } from '../types/Book';

class GoogleBooksApi {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    
    // Log API key status (remove in production)
    if (__DEV__) {
      console.log('Google Books API Key configured:', isApiKeyConfigured());
    }
  }



  /**
   * Build query string from search parameters
   */
  private buildQueryString(params: SearchParams): string {
    const searchParams = new URLSearchParams();
    
    // Add the search query
    searchParams.append('q', params.query);
    
    // Add optional parameters
    searchParams.append('maxResults', (params.maxResults || API_CONFIG.DEFAULT_PARAMS.maxResults).toString());
    searchParams.append('printType', params.printType || API_CONFIG.DEFAULT_PARAMS.printType);
    searchParams.append('orderBy', params.orderBy || API_CONFIG.DEFAULT_PARAMS.orderBy);
    
    if (params.startIndex) {
      searchParams.append('startIndex', params.startIndex.toString());
    }

    // Add API key if available
    if (API_CONFIG.API_KEY) {
      searchParams.append('key', API_CONFIG.API_KEY);
    }

    return searchParams.toString();
  }

  /**
   * Search for books using Google Books API - Returns only books with ISBN
   */
  async searchBooks(params: SearchParams): Promise<Book[]> {
    try {
      if (!params.query.trim()) {
        return [];
      }

      // Check if API key is configured
      if (!isApiKeyConfigured()) {
        console.warn('Google Books API key not configured. Rate limits may apply.');
      }

      const queryString = this.buildQueryString(params);
      const url = `${this.baseUrl}${API_CONFIG.ENDPOINTS.VOLUMES}?${queryString}`;

      if (__DEV__) {
        console.log('Fetching from URL:', url.replace(API_CONFIG.API_KEY || '', 'API_KEY_HIDDEN'));
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // Handle specific error codes
        if (response.status === 403) {
          throw new Error('API key invalid or quota exceeded. Please check your configuration.');
        } else if (response.status === 429) {
          throw new Error('Too many requests. Please try again later.');
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      const data: GoogleBooksResponse = await response.json();

      // Convert Google Books format to our app's Book format
      if (data.items && data.items.length > 0) {
        const allBooks = data.items.map(convertGoogleBookToBook);
        
        // Filter books to only include those with ISBN numbers
        const booksWithISBN = allBooks.filter(book => hasISBN(book));
        
        if (__DEV__) {
          console.log(`📚 Total books found: ${allBooks.length}`);
          console.log(`📖 Books with ISBN: ${booksWithISBN.length}`);
          console.log(`🔢 Filtered out: ${allBooks.length - booksWithISBN.length} books without ISBN`);
        }
        
        return booksWithISBN;
      }

      return [];
    } catch (error) {
      console.error('Error fetching books:', error);
      
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Failed to fetch books. Please try again.');
      }
    }
  }

  /**
   * Get book details by ISBN (alternative search method)
   */
  async searchByISBN(isbn: string): Promise<Book[]> {
    try {
      const cleanISBN = isbn.replace(/[-\s]/g, ''); // Remove hyphens and spaces
      
      const searchParams: SearchParams = {
        query: `isbn:${cleanISBN}`,
        maxResults: 1,
        orderBy: 'relevance'
      };

      return await this.searchBooks(searchParams);
    } catch (error) {
      console.error('Error searching by ISBN:', error);
      throw error;
    }
  }

  /**
   * Enhanced search with better ISBN filtering
   */
  async searchBooksEnhanced(params: SearchParams): Promise<Book[]> {
    try {
      // Increase maxResults to account for filtering
      const enhancedParams: SearchParams = {
        ...params,
        maxResults: (params.maxResults || 10) * 2 // Get more results to filter
      };

      const books = await this.searchBooks(enhancedParams);
      
      // Return only the requested number of books with ISBN
      return books.slice(0, params.maxResults || 10);
    } catch (error) {
      console.error('Error in enhanced search:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const googleBooksApi = new GoogleBooksApi();