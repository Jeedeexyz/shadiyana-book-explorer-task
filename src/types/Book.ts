

// Google Books API response structure
export interface GoogleBooksResponse {
    kind: string;
    totalItems: number;
    items: GoogleBookItem[];
  }
  
  // Individual book item from Google Books API
  export interface GoogleBookItem {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: VolumeInfo;
    saleInfo: SaleInfo;
    accessInfo: AccessInfo;
  }
  
  // Main book information
  export interface VolumeInfo {
    title: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    industryIdentifiers?: IndustryIdentifier[];
    readingModes?: ReadingModes;
    pageCount?: number;
    printType?: string;
    categories?: string[];
    averageRating?: number;
    ratingsCount?: number;
    maturityRating?: string;
    allowAnonLogging?: boolean;
    contentVersion?: string;
    panelizationSummary?: PanelizationSummary;
    imageLinks?: ImageLinks;
    language?: string;
    previewLink?: string;
    infoLink?: string;
    canonicalVolumeLink?: string;
    subtitle?: string;
  }
  
  // Book identifiers (ISBN, etc.)
  export interface IndustryIdentifier {
    type: string;
    identifier: string;
  }
  
  // Reading format availability
  export interface ReadingModes {
    text: boolean;
    image: boolean;
  }
  
  // Book cover images
  export interface ImageLinks {
    smallThumbnail?: string;
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
    extraLarge?: string;
  }
  
  // Panelization information
  export interface PanelizationSummary {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
  }
  
  // Sale and pricing information
  export interface SaleInfo {
    country: string;
    saleability: string;
    isEbook: boolean;
    listPrice?: Price;
    retailPrice?: Price;
    buyLink?: string;
    offers?: Offer[];
  }
  
  // Price information
  export interface Price {
    amount: number;
    currencyCode: string;
  }
  
  // Special offers
  export interface Offer {
    finskyOfferType: number;
    listPrice: Price;
    retailPrice: Price;
  }
  
  // Access and availability information
  export interface AccessInfo {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: EpubInfo;
    pdf: PdfInfo;
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
  }
  
  // EPUB format information
  export interface EpubInfo {
    isAvailable: boolean;
    acsTokenLink?: string;
    downloadLink?: string;
  }
  
  // PDF format information
  export interface PdfInfo {
    isAvailable: boolean;
    acsTokenLink?: string;
    downloadLink?: string;
  }
  
  // Simplified book interface for app usage
  export interface Book {
    id: string;
    title: string;
    authors: string[];
    description?: string;
    thumbnail?: string;
    publishedDate?: string;
    pageCount?: number;
    categories?: string[];
    averageRating?: number;
    language?: string;
    previewLink?: string;
    infoLink?: string;
  authorBio?: string;
  ratingsCount?: number;
    isEnhancing?: boolean;
    industryIdentifiers?: IndustryIdentifier[];
  }

  export interface BookEnhancement {
    authorBio?: string;
    averageRating?: number;
    ratingsCount?: number;
  }
  
  



