# BookExplorer

BookExplorer is a modern React Native app for discovering, searching, and managing books. It integrates with Google Books and Open Library APIs to provide rich book details, ratings, and author information. Users can search for books, view detailed information, save books to their reading list, and track their read books.

---

## Features

- **Book Search:** Search for books using the Google Books API with debounced queries.
- **Book Details:** View detailed information, including author bio, ratings, and descriptions, enhanced with Open Library data.
- **Reading List:** Save books to your personal reading list and track your reading progress.
- **Recent Reads:** Quickly access and continue reading recently viewed books.
- **Responsive UI:** Clean, mobile-friendly design with custom fonts and adaptive layouts.
- **Offline Support:** Saved books are stored locally for offline access.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Android Studio](https://developer.android.com/studio) for device emulation

### Installation

1. **Clone the repository:**
   ```
   cd book-explorer
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and add your Google Books API key if required.

4. **Start the development server:**
   ```sh
   npm start
   ```

5. **Run on device or emulator:**
   - Use the Expo Go app or an emulator to preview the app.

---

## Project Structure

- `src/components/` – Reusable UI components (BookDetail, StarRating, SearchBar, etc.)
- `src/screens/` – Main app screens (ExploreScreen, SearchScreen, BookDetailScreen)
- `src/services/` – API integrations (GoogleBooksApi, OpenLibraryApi, BookService)
- `src/hooks/` – Custom React hooks for state and data management
- `src/assets/styles/` – Centralized and responsive style definitions
- `src/types/` – TypeScript type definitions
- `src/utils/helpers/` – Utility and helper functions

---

## Scripts

- `npm start` – Start Expo development server
-  `npm run android` – Run on Android device/emulator
- `npm run ios` – Run on iOS device/emulator
- `npm test` – Run unit tests with Jest

---

## Testing

- Uses [Jest](https://jestjs.io/) and [@testing-library/react-native](https://testing-library.com/docs/react-native-testing-library/intro/) for unit and component testing.
- Test files are located in `src/__tests__/`.

---

## Configuration

- **API Keys:**  
  Set your Google Books API key in the `.env` file as `GOOGLE_BOOKS_API_KEY`.
- **Fonts:**  
  Custom fonts are loaded via Expo and configured in `app.json`.

---
