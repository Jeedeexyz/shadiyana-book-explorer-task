import { ImageLinks } from '../../types/Book';

/**
 * Fix Google Books image URL for better compatibility
 */
export const fixGoogleBooksImageUrl = (url?: string): string | undefined => {
  if (!url) return undefined;
  
  let cleanUrl = url.trim();
  if (!cleanUrl) return undefined;
  
  try {
    // Simply replace http with https
    if (cleanUrl.startsWith('http://')) {
      cleanUrl = cleanUrl.replace('http://', 'https://');
    }
    
    return cleanUrl;
    
  } catch (error) {
    console.warn('Error fixing image URL:', cleanUrl, error);
    return undefined;
  }
};



/**
 * Get best available image from Google Books
 */
export const getBestBookImage = (imageLinks?: ImageLinks): string | undefined => {
  if (!imageLinks) return undefined;
  
  // Prefer larger images first
  const image = imageLinks.extraLarge || 
                imageLinks.large || 
                imageLinks.medium || 
                imageLinks.thumbnail || 
                imageLinks.small || 
                imageLinks.smallThumbnail;
  
  return fixGoogleBooksImageUrl(image);
};
