import AsyncStorage from '@react-native-async-storage/async-storage';
import { Book } from '../types/Book';

export interface SavedBook extends Book {
  savedAt: string; // ISO string timestamp
  readProgress?: number; // 0-100 percentage
  lastReadAt?: string; // ISO string timestamp
}

class BookStorageService {
  private static instance: BookStorageService;
  private readonly STORAGE_KEY = '@BookExplorer:savedBooks';

  static getInstance(): BookStorageService {
    if (!BookStorageService.instance) {
      BookStorageService.instance = new BookStorageService();
    }
    return BookStorageService.instance;
  }

  /**
   * Save a book to reading list
   */
  async saveBook(book: Book): Promise<void> {
    try {
      const savedBooks = await this.getSavedBooks();
      
      // Check if book already exists
      const existingIndex = savedBooks.findIndex(savedBook => savedBook.id === book.id);
      
      const savedBook: SavedBook = {
        ...book,
        savedAt: new Date().toISOString(),
        readProgress: 0,
        lastReadAt: new Date().toISOString(),
      };

      if (existingIndex >= 0) {
        // Update existing book (preserve read progress)
        savedBooks[existingIndex] = {
          ...savedBook,
          readProgress: savedBooks[existingIndex].readProgress || 0,
        };
      } else {
        // Add new book to the beginning
        savedBooks.unshift(savedBook);
      }

      await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(savedBooks));
      console.log('Book saved successfully:', book.title);
    } catch (error) {
      console.error('Error saving book:', error);
      throw new Error('Failed to save book');
    }
  }

  /**
   * Get all saved books
   */
  async getSavedBooks(): Promise<SavedBook[]> {
    try {
      const savedBooksJson = await AsyncStorage.getItem(this.STORAGE_KEY);
      if (savedBooksJson) {
        const books = JSON.parse(savedBooksJson) as SavedBook[];
        // Sort by most recently saved
        return books.sort((a, b) => 
          new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
        );
      }
      return [];
    } catch (error) {
      console.error('Error getting saved books:', error);
      return [];
    }
  }

  /**
   * Remove a book from saved list
   */
  async removeBook(bookId: string): Promise<void> {
    try {
      const savedBooks = await this.getSavedBooks();
      const filteredBooks = savedBooks.filter(book => book.id !== bookId);
      await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredBooks));
      console.log('Book removed successfully:', bookId);
    } catch (error) {
      console.error('Error removing book:', error);
      throw new Error('Failed to remove book');
    }
  }

  /**
   * Check if a book is already saved
   */
  async isBookSaved(bookId: string): Promise<boolean> {
    try {
      const savedBooks = await this.getSavedBooks();
      return savedBooks.some(book => book.id === bookId);
    } catch (error) {
      console.error('Error checking if book is saved:', error);
      return false;
    }
  }

  /**
   * Update read progress for a book
   */
  async updateReadProgress(bookId: string, progress: number): Promise<void> {
    try {
      const savedBooks = await this.getSavedBooks();
      const bookIndex = savedBooks.findIndex(book => book.id === bookId);
      
      if (bookIndex >= 0) {
        savedBooks[bookIndex] = {
          ...savedBooks[bookIndex],
          readProgress: Math.max(0, Math.min(100, progress)),
          lastReadAt: new Date().toISOString(),
        };
        
        await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(savedBooks));
        console.log('Read progress updated:', bookId, progress);
      }
    } catch (error) {
      console.error('Error updating read progress:', error);
    }
  }

  /**
   * Get recently read books (sorted by lastReadAt)
   */
  async getRecentlyReadBooks(limit: number = 10): Promise<SavedBook[]> {
    try {
      const savedBooks = await this.getSavedBooks();
      return savedBooks
        .filter(book => book.lastReadAt)
        .sort((a, b) => 
          new Date(b.lastReadAt!).getTime() - new Date(a.lastReadAt!).getTime()
        )
        .slice(0, limit);
    } catch (error) {
      console.error('Error getting recently read books:', error);
      return [];
    }
  }

  /**
   * Clear all saved books
   */
  async clearAllBooks(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.STORAGE_KEY);
      console.log('All saved books cleared');
    } catch (error) {
      console.error('Error clearing saved books:', error);
      throw new Error('Failed to clear saved books');
    }
  }
}

export const bookStorageService = BookStorageService.getInstance();