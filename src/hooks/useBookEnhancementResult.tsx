import { useState, useEffect, useCallback } from 'react';
import { openLibraryApi } from '../services/OpenLibraryApi';
import { Book } from '../types/Book';

interface UseBookEnhancementResult {
  enhancedBook: Book;
  isEnhancing: boolean;
  enhancementError: string | null;
  retryEnhancement: () => void;
}

export const useBookEnhancement = (
  initialBook: Book,
): UseBookEnhancementResult => {
  const [enhancedBook, setEnhancedBook] = useState<Book>(initialBook);
  const [isEnhancing, setIsEnhancing] = useState<boolean>(false);
  const [enhancementError, setEnhancementError] = useState<string | null>(null);

  const enhanceBook = useCallback(async () => {
    if (!initialBook || !initialBook.id) {
      console.log('No initial book or ID provided');
      return;
    }

    setIsEnhancing(true);
    setEnhancementError(null);

    try {
      const enhancement = await openLibraryApi.enhanceBookData(initialBook);

      // Always update the book, even if enhancement is empty
      setEnhancedBook(prev => {
        if (prev.id === initialBook.id) {
          const updatedBook = {
            ...prev,
            ...enhancement,
          };
          console.log('Updated book with enhancement:', {
            title: updatedBook.title,
            authorBio: updatedBook.authorBio ? 'Present' : 'Not present',
            averageRating: updatedBook.averageRating,
            ratingsCount: updatedBook.ratingsCount,
          });
          return updatedBook;
        }
        return prev;
      });
    } catch (error) {
      console.error('=== ENHANCEMENT FAILED ===');
      console.error('Error:', error);
      setEnhancementError('Failed to load book information');

      // Ensure we still have the original book data
      setEnhancedBook(prev => {
        if (prev.id === initialBook.id) {
          return prev; // Keep existing data
        }
        return initialBook; // Fallback to initial book
      });
    } finally {
      setIsEnhancing(false);
    }
  }, [initialBook]);

  // Retry function that can be called manually
  const retryEnhancement = useCallback(() => {
    console.log('Retrying enhancement...');
    enhanceBook();
  }, [enhanceBook]);

  useEffect(() => {
    console.log('=== BOOK CHANGED ===');
    console.log('New book:', initialBook.title, 'ID:', initialBook.id);

    // Always set the initial book immediately (preserves previous data)
    setEnhancedBook(initialBook);
    setEnhancementError(null);

    // Start enhancement in background
    enhanceBook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialBook.id, enhanceBook]);

  // Also update enhanced book if initial book changes (but same ID)
  useEffect(() => {
    if (initialBook && enhancedBook.id === initialBook.id) {
      setEnhancedBook(prev => ({
        ...initialBook,
        ...prev,
        id: initialBook.id,
        title: initialBook.title,
        authors: initialBook.authors,
        thumbnail: initialBook.thumbnail,
        description: initialBook.description,
        publishedDate: initialBook.publishedDate,
      }));
    }
  }, [initialBook, enhancedBook.id]);

  return {
    enhancedBook,
    isEnhancing,
    enhancementError,
    retryEnhancement,
  };
};
