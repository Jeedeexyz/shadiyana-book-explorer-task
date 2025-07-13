import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ExploreScreenNavigationProp } from "../types/navigation";
import { useSavedBooks } from "../hooks/useSavedBooks";
import { SavedBook } from "../services/BookService";
import { googleBooksApi } from "../services/GoogleBookApi";
import { Book } from "../types/Book";
import { exploreScreenStyles as styles } from "../assets/styles/ExploreScreen.styles";
import { fixGoogleBooksImageUrl, getAuthorsString } from "../utils/helpers";
import { FontAwesome6 } from "@expo/vector-icons";

// Book categories to display
const BOOK_CATEGORIES: {
  id: string;
  title: string;
  query: string;
  icon: "book-open" | "heart" | "globe";
}[] = [
  {
    id: "fiction",
    title: "Popular Fiction",
    query: "subject:fiction",
    icon: "book-open",
  },
  {
    id: "romance",
    title: "Romance",
    query: "subject:romance",
    icon: "heart",
  },
  {
    id: "history",
    title: "History",
    query: "subject:history",
    icon: "globe",
  },
];

interface CategoryBooks {
  [key: string]: {
    books: Book[];
    loading: boolean;
    error: string | null;
  };
}

const ExploreScreen = () => {
  const navigation = useNavigation<ExploreScreenNavigationProp>();
  const { savedBooks, isLoading, refreshSavedBooks } = useSavedBooks();
  const [categoryBooks, setCategoryBooks] = useState<CategoryBooks>({});

  useFocusEffect(
    useCallback(() => {
      refreshSavedBooks();
    }, [refreshSavedBooks])
  );

  // Filter recently read books with null checks
  const recentlyReadBooks = savedBooks
    .filter((book) => book && book.lastReadAt && book.id && book.title)
    .sort(
      (a, b) =>
        new Date(b.lastReadAt!).getTime() - new Date(a.lastReadAt!).getTime()
    )
    .slice(0, 5);

  // Load books for a specific category
  const loadCategoryBooks = async (categoryId: string, query: string) => {
    setCategoryBooks((prev) => ({
      ...prev,
      [categoryId]: {
        books: [],
        loading: true,
        error: null,
      },
    }));

    try {
      const books = await googleBooksApi.searchBooks({
        query,
        maxResults: 10,
        orderBy: "relevance",
      });

      // Filter out invalid books
      const validBooks = books.filter(
        (book) =>
          book &&
          book.id &&
          book.title &&
          book.authors &&
          Array.isArray(book.authors) &&
          book.authors.length > 0
      );

      setCategoryBooks((prev) => ({
        ...prev,
        [categoryId]: {
          books: validBooks,
          loading: false,
          error: null,
        },
      }));

      console.log(
        `Loaded ${validBooks.length}/${books.length} valid books for ${categoryId}`
      );
    } catch (error) {
      console.error(`Error loading ${categoryId} books:`, error);
      setCategoryBooks((prev) => ({
        ...prev,
        [categoryId]: {
          books: [],
          loading: false,
          error: "Failed to load books",
        },
      }));
    }
  };

  // Load all categories on component mount
  useEffect(() => {
    const loadAllCategories = async () => {
      // Load categories with a small delay to avoid hitting rate limits
      for (let i = 0; i < BOOK_CATEGORIES.length; i++) {
        const category = BOOK_CATEGORIES[i];
        setTimeout(() => {
          loadCategoryBooks(category.id, category.query);
        }, i * 500); // 500ms delay between requests
      }
    };

    loadAllCategories();
  }, []);

  // Navigate to search screen
  const handleSearchPress = () => {
    try {
      navigation.navigate("Search", { from: "Explore" });
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  // Navigate to book detail with validation
  const handleBookPress = (book: Book | SavedBook) => {
    try {
      // Validate book before navigation
      if (!book || !book.id || !book.title) {
        console.error("Invalid book data:", book);
        return;
      }

      navigation.navigate("BookDetail", { book, from: "Explore" });
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  // Safe render for recent books
  const renderRecentBook = ({ item }: { item: SavedBook }) => {
    // Validate item
    if (!item || !item.id || !item.title) {
      return null;
    }

    // Safe author text
    const authorText = getAuthorsString(item.authors) || "Unknown Author";

    return (
      <TouchableOpacity
        style={styles.recentBookItem}
        onPress={() => handleBookPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.recentBookThumbnail}>
          {item.thumbnail ? (
            <Image
              source={{ uri: fixGoogleBooksImageUrl(item.thumbnail) }}
              style={styles.recentBookImage}
              onError={() => console.warn("Image failed to load")}
            />
          ) : (
            <View style={styles.recentBookPlaceholder}>
              <FontAwesome6
                name="book"
                size={20}
                color="#ccc"
                iconStyle="solid"
              />
            </View>
          )}
        </View>

        <Text style={styles.recentBookTitle} numberOfLines={2}>
          {item.title || "Unknown Title"}
        </Text>
        <Text style={styles.recentBookAuthor} numberOfLines={1}>
          {authorText}
        </Text>
      </TouchableOpacity>
    );
  };

  // Safe render for category books
  const renderCategoryBook = ({ item }: { item: Book }) => {
    // Validate item
    if (!item || !item.id || !item.title) {
      return null;
    }

    // Safe author text
    const authorText = getAuthorsString(item.authors) || "Unknown Author";

    return (
      <TouchableOpacity
        style={styles.categoryBookItem}
        onPress={() => handleBookPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.categoryBookThumbnail}>
          {item.thumbnail ? (
            <Image
              source={{ uri: fixGoogleBooksImageUrl(item.thumbnail) }}
              style={styles.categoryBookImage}
              onError={() => console.warn("Image failed to load")}
            />
          ) : (
            <View style={styles.categoryBookPlaceholder}>
              <FontAwesome6
                name="book"
                size={18}
                color="#ccc"
                iconStyle="solid"
              />
            </View>
          )}
        </View>

        <Text style={styles.categoryBookTitle} numberOfLines={2}>
          {item.title || "Unknown Title"}
        </Text>
        <Text style={styles.categoryBookAuthor} numberOfLines={1}>
          {authorText}
        </Text>
      </TouchableOpacity>
    );
  };

  // Render category section
  const renderCategorySection = (category: (typeof BOOK_CATEGORIES)[0]) => {
    const categoryData = categoryBooks[category.id];

    if (!categoryData) return null;

    return (
      <View key={category.id} style={styles.categorySection}>
        <View style={styles.categoryHeader}>
          <View style={styles.categoryTitleContainer}>
            <FontAwesome6
              name={category.icon}
              size={16}
              color="#2FB78E"
              solid
              style={styles.categoryIcon}
            />
            <Text style={styles.categoryTitle}>
              {category.title || "Unknown Category"}
            </Text>
          </View>
        </View>

        {categoryData.loading ? (
          <View style={styles.categoryLoading}>
            <ActivityIndicator size="small" color="#2FB78E" />
            <Text style={styles.loadingText}>
              Loading {(category.title || "books").toLowerCase()}...
            </Text>
          </View>
        ) : categoryData.error ? (
          <View style={styles.categoryError}>
            <FontAwesome6
              name="triangle-exclamation"
              size={16}
              color="#ff6b6b"
              iconStyle="solid"
            />
            <Text style={styles.errorText}>
              {categoryData.error || "An error occurred"}
            </Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => loadCategoryBooks(category.id, category.query)}
            >
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : categoryData.books.length > 0 ? (
          <FlatList
            data={categoryData.books}
            renderItem={renderCategoryBook}
            keyExtractor={(item, index) => item?.id || `book-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryBooksList}
            removeClippedSubviews={false}
          />
        ) : (
          <View style={styles.categoryLoading}>
            <Text style={styles.loadingText}>No books found</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearchPress}
          accessibilityLabel="Search"
        >
          <FontAwesome6
            name="magnifying-glass"
            style={styles.searchIcon}
            iconStyle="solid"
          />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Recent Reads Section */}
        {!isLoading && recentlyReadBooks.length > 0 && (
          <View style={styles.recentReadsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Continue Reading</Text>
            </View>
            <FlatList
              data={recentlyReadBooks}
              renderItem={renderRecentBook}
              keyExtractor={(item, index) => item?.id || `recent-${index}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.recentBooksList}
              removeClippedSubviews={false}
            />
          </View>
        )}

        {/* Loading state for recent reads */}
        {isLoading && (
          <View style={styles.loadingSection}>
            <ActivityIndicator size="small" color="#2FB78E" />
            <Text style={styles.loadingText}>Loading your books...</Text>
          </View>
        )}

        {/* Category Sections */}
        {BOOK_CATEGORIES.map(renderCategorySection)}

        {/* Bottom spacing */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

export default ExploreScreen;
