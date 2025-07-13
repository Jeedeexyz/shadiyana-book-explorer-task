import { Book, GoogleBookItem } from '../../types/Book';
import { getBestBookImage } from './imageHelpers';

/**
 * Helper function to get author names as a string - Enhanced for safety
 */
export const getAuthorsString = (authors?: string[] | string): string => {
  try {
    // Handle null/undefined
    if (!authors) return 'Unknown Author';
    
    // Handle string (single author)
    if (typeof authors === 'string') {
      const cleanAuthor = authors.trim();
      return cleanAuthor.length > 0 ? cleanAuthor : 'Unknown Author';
    }
    
    // Handle array
    if (Array.isArray(authors)) {
      // Filter out invalid authors
      const validAuthors = authors.filter((author: any) => 
        author && 
        typeof author === 'string' && 
        author.trim().length > 0
      );
      
      if (validAuthors.length === 0) return 'Unknown Author';
      if (validAuthors.length === 1) return validAuthors[0];
      if (validAuthors.length === 2) return validAuthors.join(' and ');
      return `${validAuthors.slice(0, -1).join(', ')} and ${validAuthors[validAuthors.length - 1]}`;
    }
    
    // Handle any other type
    return 'Unknown Author';
  } catch (error) {
    console.error('Error in getAuthorsString:', error);
    return 'Unknown Author';
  }
};

/**
 * Get formatted publication year - Enhanced for safety
 */
export const getPublicationYear = (publishedDate?: string): string => {
  try {
    if (!publishedDate || typeof publishedDate !== 'string') return '';
    
    const cleanDate = publishedDate.trim();
    if (!cleanDate) return '';
    
    // Try to parse as date
    const date = new Date(cleanDate);
    const year = date.getFullYear();
    
    // Validate year is reasonable
    const currentYear = new Date().getFullYear();
    if (!isNaN(year) && year >= 1000 && year <= currentYear + 10) {
      return year.toString();
    }
    
    // Try to extract year from string using regex
    const yearMatch = cleanDate.match(/\b(19|20)\d{2}\b/);
    if (yearMatch) {
      const extractedYear = parseInt(yearMatch[0]);
      if (extractedYear >= 1000 && extractedYear <= currentYear + 10) {
        return extractedYear.toString();
      }
    }
    
    return '';
  } catch (error) {
    console.error('Error getting publication year:', error);
    return '';
  }
};

/**
 * Format page count for display - Enhanced for safety
 */
export const formatPageCount = (pageCount?: number): string => {
  try {
    if (!pageCount || typeof pageCount !== 'number' || pageCount <= 0 || isNaN(pageCount)) {
      return '';
    }
    return `${pageCount} pages`;
  } catch (error) {
    console.error('Error formatting page count:', error);
    return '';
  }
};

/**
 * Get book categories as string - Enhanced for safety
 */
export const getCategoriesString = (categories?: string[]): string => {
  try {
    if (!categories || !Array.isArray(categories)) return '';
    
    const validCategories = categories.filter(category => 
      category && 
      typeof category === 'string' && 
      category.trim().length > 0
    );
    
    if (validCategories.length === 0) return '';
    
    // Show max 3 categories
    return validCategories.slice(0, 3).join(', ');
  } catch (error) {
    console.error('Error getting categories string:', error);
    return '';
  }
};

/**
 * Truncate text to specified length - Enhanced for safety
 */
export const truncateText = (text?: string, maxLength: number = 150): string => {
  try {
    if (!text || typeof text !== 'string') return '';
    
    const cleanText = text.trim();
    if (!cleanText) return '';
    
    if (maxLength <= 0) return cleanText;
    if (cleanText.length <= maxLength) return cleanText;
    
    // Find last space before maxLength to avoid cutting words
    const truncated = cleanText.substring(0, maxLength);
    const lastSpaceIndex = truncated.lastIndexOf(' ');
    
    if (lastSpaceIndex > maxLength * 0.8) {
      return truncated.substring(0, lastSpaceIndex).trim() + '...';
    }
    
    return truncated.trim() + '...';
  } catch (error) {
    console.error('Error truncating text:', error);
    return text || '';
  }
};

/**
 * Clean and format book description - Enhanced for safety
 */
export const formatDescription = (description?: string): string => {
  try {
    if (!description || typeof description !== 'string') return '';
    
    let cleanDescription = description.trim();
    if (!cleanDescription) return '';
    
    // Remove HTML tags if present
    cleanDescription = cleanDescription.replace(/<[^>]*>/g, '');
    
    // Remove extra whitespace and normalize
    cleanDescription = cleanDescription.replace(/\s+/g, ' ').trim();
    
    // Remove common unwanted patterns
    cleanDescription = cleanDescription.replace(/^\(.*?\)\s*/, ''); // Remove leading parentheses
    cleanDescription = cleanDescription.replace(/\s*\(.*?\)\s*$/, ''); // Remove trailing parentheses
    
    return cleanDescription;
  } catch (error) {
    console.error('Error formatting description:', error);
    return description || '';
  }
};

/**
 * Validate if book has essential data - Enhanced for safety
 */
export const isValidBook = (book: any): book is Book => {
  try {
    if (!book || typeof book !== 'object') {
      return false;
    }
    
    // Check required fields
    const hasId = book.id && typeof book.id === 'string' && book.id.trim().length > 0;
    const hasTitle = book.title && typeof book.title === 'string' && book.title.trim().length > 0;
    
    // Authors can be string or array
    const hasAuthors = book.authors && (
      (typeof book.authors === 'string' && book.authors.trim().length > 0) ||
      (Array.isArray(book.authors) && book.authors.length > 0 && 
      book.authors.some((author: any) => author && typeof author === 'string' && author.trim().length > 0))
    );
    
    if (!hasId || !hasTitle || !hasAuthors) {
      console.warn(' Book validation failed:', {
        hasId,
        hasTitle,
        hasAuthors,
        book: { 
          id: book.id, 
          title: book.title, 
          authors: book.authors 
        }
      });
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error validating book:', error);
    return false;
  }
};

/**
 * Convert Google Books API response to simplified Book interface - Enhanced for safety
 */
export const convertGoogleBookToBook = (googleBook: GoogleBookItem): Book => {
  try {
    if (!googleBook || !googleBook.id || !googleBook.volumeInfo) {
      throw new Error('Invalid Google Book data');
    }
    
    const { volumeInfo } = googleBook;
    
    return {
      id: googleBook.id,
      title: volumeInfo.title || 'Unknown Title',
      authors: volumeInfo.authors || ['Unknown Author'],
      description: formatDescription(volumeInfo.description),
      thumbnail: getBestBookImage(volumeInfo.imageLinks),
      publishedDate: volumeInfo.publishedDate || '',
      pageCount: volumeInfo.pageCount || 0,
      categories: volumeInfo.categories || [],
      language: volumeInfo.language || 'en',
      previewLink: volumeInfo.previewLink || '',
      infoLink: volumeInfo.infoLink || '',
      isEnhancing: false,
      industryIdentifiers: volumeInfo.industryIdentifiers || [],
      authorBio: '',
      ratingsCount: 0,
      averageRating: 0,
    };
  } catch (error) {
    console.error('Error converting Google Book:', error);
    
    // Return a minimal valid book object
    return {
      id: googleBook?.id || `fallback-${Date.now()}`,
      title: googleBook?.volumeInfo?.title || 'Unknown Title',
      authors: ['Unknown Author'],
      description: '',
      thumbnail: '',
      publishedDate: '',
      pageCount: 0,
      categories: [],
      language: 'en',
      previewLink: '',
      infoLink: '',
      isEnhancing: false,
      industryIdentifiers: [],
      authorBio: '',
      ratingsCount: 0,
      averageRating: 0,
    };
  }
};

/**
 * Sort books by publication date (newest first) - Enhanced for safety
 */
export const sortBooksByDate = (books: Book[]): Book[] => {
  try {
    if (!books || !Array.isArray(books)) return [];
    
    return books.sort((a, b) => {
      try {
        const dateA = a.publishedDate ? new Date(a.publishedDate).getTime() : 0;
        const dateB = b.publishedDate ? new Date(b.publishedDate).getTime() : 0;
        
        // Handle invalid dates
        const validDateA = isNaN(dateA) ? 0 : dateA;
        const validDateB = isNaN(dateB) ? 0 : dateB;
        
        return validDateB - validDateA;
      } catch {
        return 0; // Keep original order if comparison fails
      }
    });
  } catch (error) {
    console.error('Error sorting books by date:', error);
    return books || [];
  }
};

/**
 * Filter books by search query - Enhanced for safety
 */
export const filterBooksByQuery = (books: Book[], query: string): Book[] => {
  try {
    if (!books || !Array.isArray(books)) return [];
    if (!query || typeof query !== 'string') return books;
    
    const lowercaseQuery = query.toLowerCase().trim();
    if (!lowercaseQuery) return books;
    
    return books.filter(book => {
      try {
        if (!book) return false;
        
        // Check title
        const titleMatch = book.title && 
          typeof book.title === 'string' && 
          book.title.toLowerCase().includes(lowercaseQuery);
        
        // Check authors
        const authorMatch = book.authors && (
          (typeof book.authors === 'string' && (book.authors as string).toLowerCase().includes(lowercaseQuery)) ||
          (Array.isArray(book.authors) && book.authors.some((author: any) => 
            author && typeof author === 'string' && author.toLowerCase().includes(lowercaseQuery)
          ))
        );
        
        // Check categories
        const categoryMatch = book.categories && 
          Array.isArray(book.categories) && 
          book.categories.some(category => 
            category && typeof category === 'string' && category.toLowerCase().includes(lowercaseQuery)
          );
        
        return titleMatch || authorMatch || categoryMatch;
      } catch {
        return false; // Exclude book if filtering fails
      }
    });
  } catch (error) {
    console.error('Error filtering books by query:', error);
    return books || [];
  }
};

/**
 * Safe string validator
 */
export const safeString = (value: any, fallback: string = ''): string => {
  try {
    if (value === null || value === undefined) return fallback;
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return value.toString();
    return fallback;
  } catch {
    return fallback;
  }
};

/**
 * Safe number validator
 */
export const safeNumber = (value: any, fallback: number = 0): number => {
  try {
    if (value === null || value === undefined) return fallback;
    if (typeof value === 'number' && !isNaN(value)) return value;
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? fallback : parsed;
    }
    return fallback;
  } catch {
    return fallback;
  }
};