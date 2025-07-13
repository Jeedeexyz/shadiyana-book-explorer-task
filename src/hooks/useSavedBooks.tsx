import { useState, useEffect, useCallback } from 'react';
import { bookStorageService, SavedBook } from '../services/BookService';
import { Book } from '../types/Book';

interface UseSavedBooksResult {
  savedBooks: SavedBook[];
  isLoading: boolean;
  error: string | null;
  saveBook: (book: Book) => Promise<void>;
  removeBook: (bookId: string) => Promise<void>;
  isBookSaved: (bookId: string) => boolean;
  updateReadProgress: (bookId: string, progress: number) => Promise<void>;
  refreshSavedBooks: () => Promise<void>;
  clearAllBooks: () => Promise<void>;
}

export const useSavedBooks = (): UseSavedBooksResult => {
  const [savedBooks, setSavedBooks] = useState<SavedBook[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadSavedBooks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const books = await bookStorageService.getSavedBooks();
      setSavedBooks(books);
    } catch (err) {
      setError('Failed to load saved books');
      console.error('Error loading saved books:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveBook = useCallback(
    async (book: Book) => {
      try {
        setError(null);
        await bookStorageService.saveBook(book);
        await loadSavedBooks(); // Refresh the list
      } catch (err) {
        setError('Failed to save book');
        throw err;
      }
    },
    [loadSavedBooks],
  );

  const removeBook = useCallback(
    async (bookId: string) => {
      try {
        setError(null);
        await bookStorageService.removeBook(bookId);
        await loadSavedBooks(); // Refresh the list
      } catch (err) {
        setError('Failed to remove book');
        throw err;
      }
    },
    [loadSavedBooks],
  );

  const isBookSaved = useCallback(
    (bookId: string): boolean => {
      return savedBooks.some(book => book.id === bookId);
    },
    [savedBooks],
  );

  const updateReadProgress = useCallback(
    async (bookId: string, progress: number) => {
      try {
        setError(null);
        await bookStorageService.updateReadProgress(bookId, progress);
        await loadSavedBooks(); // Refresh the list
      } catch (err) {
        setError('Failed to update read progress');
        throw err;
      }
    },
    [loadSavedBooks],
  );

  const clearAllBooks = useCallback(async () => {
    try {
      setError(null);
      await bookStorageService.clearAllBooks();
      await loadSavedBooks(); // Refresh the list
    } catch (err) {
      setError('Failed to clear books');
      throw err;
    }
  }, [loadSavedBooks]);

  const refreshSavedBooks = useCallback(async () => {
    await loadSavedBooks();
  }, [loadSavedBooks]);

  useEffect(() => {
    loadSavedBooks();
  }, [loadSavedBooks]);

  return {
    savedBooks,
    isLoading,
    error,
    saveBook,
    removeBook,
    isBookSaved,
    updateReadProgress,
    refreshSavedBooks,
    clearAllBooks,
  };
};
