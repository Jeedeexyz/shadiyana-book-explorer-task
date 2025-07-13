import { useState, useEffect } from 'react';
import { googleBooksApi } from '../services/GoogleBookApi';
import { Book } from '../types/Book';
import { useDebounce } from './useDebounce';

interface UseBookSearchResult {
  books: Book[];
  loading: boolean;
  error: string | null;
  searchBooks: (query: string) => void;
  clearResults: () => void;
}

/**
 * Custom hook for searching books with debouncing
 */
export const useBookSearch = (
  debounceDelay: number = 500,
): UseBookSearchResult => {
  const [query, setQuery] = useState<string>('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce the search query to avoid excessive API calls
  const debouncedQuery = useDebounce(query, debounceDelay);

  // Effect to perform search when debounced query changes
  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedQuery.trim()) {
        setBooks([]);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const results = await googleBooksApi.searchBooks({
          query: debouncedQuery,
          maxResults: 20,
          orderBy: 'relevance',
        });

        setBooks(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [debouncedQuery]);

  const searchBooks = (newQuery: string) => {
    setQuery(newQuery);
  };

  const clearResults = () => {
    setQuery('');
    setBooks([]);
    setError(null);
    setLoading(false);
  };

  return {
    books,
    loading,
    error,
    searchBooks,
    clearResults,
  };
};
