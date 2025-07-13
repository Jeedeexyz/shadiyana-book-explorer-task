import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import SearchBar from "../components/common/SearchBar";
import {
  SearchScreenNavigationProp,
  RootStackParamList,
} from "../types/navigation";
import { useBookSearch } from "../hooks/useBookSearch";
import { Book } from "../types/Book";
import {
  searchScreenStyles as styles,
  rem,
} from "../assets/styles/SearchScreen.Styles";
import LeftArrowIcon from "../components/icons/LeftArrowIcon";
import { FontAwesome6 } from "@expo/vector-icons";

type SearchScreenRouteProp = RouteProp<RootStackParamList, "Search">;

const SearchScreen = () => {
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const route = useRoute<SearchScreenRouteProp>();

  // Use the correct hook for book search with API and debouncing
  const { books, loading, error, searchBooks, clearResults } =
    useBookSearch(500);
  const [query, setQuery] = useState<string>("");

  // Handle search input with debouncing
  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.trim()) {
      searchBooks(text);
    } else {
      clearResults();
    }
  };

  // Navigate to book detail screen with selected book
  const handleBookPress = (book: Book) => {
    // Push BookDetail and then clean up the stack
    const from = route.params?.from || "Search";
    if (from === "Explore") {
      navigation.replace("BookDetail", { book, from: "Search" });
    } else {
      navigation.pop();
      navigation.navigate("BookDetail", { book, from: "Search" });
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  // Render individual book item with click functionality
  const renderBookItem = ({ item }: { item: Book }) => (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={() => handleBookPress(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.bookTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.bookAuthor} numberOfLines={1}>
        by {item.authors.join(", ")}
      </Text>
    </TouchableOpacity>
  );

  // Render loading state
  const renderLoading = () => (
    <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color="#2FB78E" />
      <Text style={styles.loadingText}>Searching books...</Text>
    </View>
  );

  // Render error state
  const renderError = () => (
    <View style={styles.centerContainer}>
      <FontAwesome6
        name="triangle-exclamation"
        size={rem(2)}
        color="#ff6b6b"
        iconStyle="solid"
      />
      <Text style={styles.errorText}>{error}</Text>
      <TouchableOpacity
        style={styles.retryButton}
        onPress={() => query && searchBooks(query)}
      >
        <Text style={styles.retryButtonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );

  // Render empty state
  const renderEmpty = () => (
    <View style={styles.centerContainer}>
      <FontAwesome6
        name="magnifying-glass"
        size={rem(2.5)}
        color="#ccc"
        iconStyle="solid"
      />
      <Text style={styles.emptyText}>
        {query
          ? "No books found for your search"
          : "Search for books by title, author, or keyword"}
      </Text>
      {query && (
        <Text style={styles.emptySubtext}>
          Try different keywords or check your spelling
        </Text>
      )}
    </View>
  );

  // Render content based on state
  const renderContent = () => {
    if (loading) {
      return renderLoading();
    }

    if (error) {
      return renderError();
    }

    if (books.length > 0) {
      return (
        <FlatList
          data={books}
          renderItem={renderBookItem}
          keyExtractor={(item: Book) => item.id}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      );
    }

    return renderEmpty();
  };

  return (
    <View style={styles.container}>
      {/* Header with back button and title */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          accessibilityLabel="Back"
          accessibilityHint="Go back to the previous screen"
          testID="backButton"
        >
          <View>
            <LeftArrowIcon size={rem(1.5)} color="#333" />
          </View>
        </TouchableOpacity>

        <Text style={styles.title}>Search Books</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search input */}
      <View style={styles.searchContainer}>
        <SearchBar query={query} onSearchChange={handleSearch} />
      </View>

      {/* Results area */}
      <View style={styles.resultsContainer}>{renderContent()}</View>
    </View>
  );
};

export default SearchScreen;
