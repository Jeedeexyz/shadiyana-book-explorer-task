import { Book, IndustryIdentifier } from '../../types/Book';

/**
 * Extract ISBN from Google Books data
 */
export const extractISBNFromBook = (book: Book): string | null => {
  const industryIdentifiers = book.industryIdentifiers;
  
  if (!industryIdentifiers || industryIdentifiers.length === 0) {
    console.log(`No industry identifiers found for book: ${book.title}`);
    return null;
  }

  // Prefer ISBN_13, fallback to ISBN_10
  const isbn13 = industryIdentifiers.find((id: IndustryIdentifier) => id.type === 'ISBN_13');
  const isbn10 = industryIdentifiers.find((id: IndustryIdentifier) => id.type === 'ISBN_10');
  
  const isbn = isbn13?.identifier || isbn10?.identifier || null;
  
  if (isbn) {
    console.log(`Found ISBN for "${book.title}": ${isbn}`);
  } else {
    console.log(`No valid ISBN found for book: ${book.title}`);
  }
  
  return isbn;
};

/**
 * Get ISBN numbers from a book
 */
export const getBookISBNs = (book: Book): { isbn10?: string; isbn13?: string } => {
  if (!book.industryIdentifiers) {
    return {};
  }

  const isbn10 = book.industryIdentifiers.find(id => id.type === 'ISBN_10')?.identifier;
  const isbn13 = book.industryIdentifiers.find(id => id.type === 'ISBN_13')?.identifier;

  return { isbn10, isbn13 };
};




/**
 * Check if a book has ISBN number (for API filtering)
 */
export const hasISBN = (book: Book): boolean => {
  if (!book.industryIdentifiers || book.industryIdentifiers.length === 0) {
    return false;
  }

  // Check for ISBN_10 or ISBN_13
  return book.industryIdentifiers.some(identifier => 
    identifier.type === 'ISBN_10' || identifier.type === 'ISBN_13'
  );
};


