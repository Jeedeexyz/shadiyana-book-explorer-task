import { extractISBNFromBook } from './../utils/helpers/apiHelpers';
import { Book } from "@/types/Book";

interface OpenLibraryAuthor {
  key: string;
  name: string;
  bio?: string | { value: string };
}

interface OpenLibraryRatings {
  summary: {
    average: number;
    count: number;
  };
  counts: {
    '1': number;
    '2': number;
    '3': number;
    '4': number;
    '5': number;
  };
}

interface BookEnhancement {
  authorBio?: string;
  averageRating?: number;
  ratingsCount?: number;
}

class OpenLibraryApi {
  private baseUrl = 'https://openlibrary.org';

  /**
   * Get work information from ISBN
   */
  async getWorkFromISBN(isbn: string): Promise<{ workKey: string; authorKeys: string[] } | null> {
    try {
      console.log(`📚 Fetching work data for ISBN: ${isbn}`);
      const response = await fetch(`${this.baseUrl}/isbn/${isbn}.json`);
      
      if (!response.ok) {
        console.log(`ISBN lookup failed with status: ${response.status}`);
        return null;
      }

      const data = await response.json();
      
      // Check if works exist
      if (!data.works || data.works.length === 0) {
        console.log(`No works found for ISBN: ${isbn}`);
        return null;
      }
      
      const workKey = data.works[0].key;
      console.log(`✅ Found work key: ${workKey}`);
      
      // Get work details to find authors
      const workResponse = await fetch(`${this.baseUrl}${workKey}.json`);
      
      if (!workResponse.ok) {
        console.log(`Work details fetch failed with status: ${workResponse.status}`);
        return null;
      }
      
      const workData = await workResponse.json();
      
      // Check if authors exist
      if (!workData.authors || workData.authors.length === 0) {
        return {
          workKey,
          authorKeys: [],
        };
      }
      
      const authorKeys = workData.authors.map((author: any) => author.author.key);
      
      return {
        workKey,
        authorKeys,
      };

    } catch (error) {
      console.error('Error fetching work from ISBN:', error);
      return null;
    }
  }

  /**
   * Get author biography
   */
  async getAuthorBio(authorKey: string): Promise<string | null> {
    try {
      console.log(`👤 Fetching author bio for: ${authorKey}`);
      const response = await fetch(`${this.baseUrl}${authorKey}.json`);
      
      if (!response.ok) {
        console.log(`Author bio fetch failed with status: ${response.status}`);
        return null;
      }

      const data: OpenLibraryAuthor = await response.json();
      
      if (data.bio) {
        // Bio can be string or object with value property
        const bio = typeof data.bio === 'string' ? data.bio : data.bio.value;
        return bio;
      }
      return null;
    } catch (error) {
      console.error('Error fetching author bio:', error);
      return null;
    }
  }

  /**
   * Get ratings for a work
   */
  async getWorkRatings(workKey: string): Promise<{ rating: number; count: number } | null> {
    try {
      const response = await fetch(`${this.baseUrl}${workKey}/ratings.json`);
      
      if (!response.ok) {
        console.log(`Ratings fetch failed with status: ${response.status}`);
        return null;
      }

      const data: OpenLibraryRatings = await response.json();
      
      if (data.summary && data.summary.average > 0) {
        return {
          rating: data.summary.average,
          count: data.summary.count,
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching work ratings:', error);
      return null;
    }
  }


  /**
   * Enhance book with Open Library data
   */
  async enhanceBookData(book: Book): Promise<BookEnhancement> {
    const enhancement: BookEnhancement = {};

    try {
      console.log(`🔍 Starting enhancement for book: "${book.title}"`);
      
      // Extract ISBN from book data
      const isbn = extractISBNFromBook(book);
      
      if (!isbn) {
        console.log(`Enhancement stopped: No ISBN found for "${book.title}"`);
        return enhancement; // Return empty enhancement
      }

      // Get work and author keys
      const workData = await this.getWorkFromISBN(isbn);
      
      if (!workData) {
        console.log(`Enhancement stopped: No work data found for ISBN ${isbn}`);
        return enhancement; // Return empty enhancement - STOP HERE
      }

      const { workKey, authorKeys } = workData;
      console.log(`Work data found, proceeding with enhancement...`);

      // Only proceed with API calls if we have valid work data
      
      if (authorKeys.length > 0) {
        try {
          const authorBio = await this.getAuthorBio(authorKeys[0]);
          if (authorBio) {
            enhancement.authorBio = authorBio;
            console.log(`Author bio added to enhancement`);
          }
        } catch (error) {
          console.error('Failed to fetch author bio, continuing...', error);
          // Continue even if author bio fails
        }
      } else {
        console.log(`No author keys available, skipping author bio`);
      }

      // Fetch ratings
      try {
        const ratings = await this.getWorkRatings(workKey);
        if (ratings) {
          enhancement.averageRating = ratings.rating;
          enhancement.ratingsCount = ratings.count;
        }
      } catch (error) {
        console.error('Failed to fetch ratings, continuing...', error);
      }


      return enhancement;
      
    } catch (error) {
      console.error(`Error enhancing book data for "${book.title}":`, error);
      return enhancement; // Return empty enhancement on any error
    }
  }
}

export const openLibraryApi = new OpenLibraryApi();