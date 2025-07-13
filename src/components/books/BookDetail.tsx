import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BookDetailScreenNavigationProp } from "../../types/navigation";
import { Book } from "../../types/Book";
import StarRating from "./StarRating";
import { useSavedBooks } from "../../hooks/useSavedBooks";
import {
  bookDetailStyles as styles,
  rem,
} from "../../assets/styles/BookDetails.styles";
import {
  getAuthorsString,
  getPublicationYear,
  formatDescription,
  safeString,
  safeNumber,
} from "../../utils/helpers/bookHelpers";
import { fixGoogleBooksImageUrl } from "../../utils/helpers/imageHelpers";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import { FontAwesome6 } from "@expo/vector-icons";

interface BookDetailProps {
  book?: Book;
  isEnhancing?: boolean;
  enhancementError?: string | null;
  onRetryEnhancement?: () => void;
}

const BookDetail: React.FC<BookDetailProps> = ({
  book,
  isEnhancing = false,
  enhancementError = null,
  onRetryEnhancement = () => {},
}) => {
  const navigation = useNavigation<BookDetailScreenNavigationProp>();
  const { saveBook, removeBook, isBookSaved } = useSavedBooks();
  const [isProcessing, setIsProcessing] = useState(false);

  const displayBook = useMemo(() => {
    if (!book) {
      return {
        id: "",
        title: "Unknown Title",
        authors: ["Unknown Author"],
        thumbnail: "",
        description: "",
        authorBio: "",
        publishedDate: "",
        averageRating: 0,
        ratingsCount: 0,
        pageCount: 0,
        categories: [],
        language: "en",
        previewLink: "",
        infoLink: "",
        isEnhancing: false,
        industryIdentifiers: [],
      };
    }

    return {
      id: safeString(book.id),
      title: safeString(book.title, "Unknown Title"),
      authors: book.authors || ["Unknown Author"],
      thumbnail: safeString(book.thumbnail),
      description: safeString(book.description),
      authorBio: safeString(book.authorBio),
      publishedDate: safeString(book.publishedDate),
      averageRating: safeNumber(book.averageRating),
      ratingsCount: safeNumber(book.ratingsCount),
      pageCount: safeNumber(book.pageCount),
      categories: book.categories || [],
      language: safeString(book.language, "en"),
      previewLink: safeString(book.previewLink),
      infoLink: safeString(book.infoLink),
      isEnhancing: book.isEnhancing || false,
      industryIdentifiers: book.industryIdentifiers || [],
    };
  }, [book]);

  // Check if current book is already saved
  const bookAlreadySaved = useMemo(() => {
    try {
      return book && book.id ? isBookSaved(book.id) : false;
    } catch (error) {
      console.error("Error checking if book is saved:", error);
      return false;
    }
  }, [book, isBookSaved]);

  console.log(
    "BookDetail rendered with book:",
    JSON.stringify(displayBook, null, 2)
  );

  // Function to handle book action (save or remove)
  const handleBookAction = async () => {
    try {
      if (!book || !book.id) {
        console.warn("No valid book data available");
        return;
      }

      setIsProcessing(true);

      if (bookAlreadySaved) {
        // Show confirmation dialog before removing
        Alert.alert(
          "Remove Book",
          `Are you sure you want to remove "${displayBook.title}" from your library?`,
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => {
                setIsProcessing(false);
              },
            },
            {
              text: "Remove",
              style: "destructive",
              onPress: async () => {
                try {
                  await removeBook(book.id);
                  console.log("Book removed successfully:", book.title);
                } catch (error) {
                  console.error("Failed to remove book:", error);
                  Alert.alert(
                    "Error",
                    "Failed to remove book from your library. Please try again."
                  );
                } finally {
                  setIsProcessing(false);
                }
              },
            },
          ],
          { cancelable: true, onDismiss: () => setIsProcessing(false) }
        );
      } else {
        // Save the book
        await saveBook(book);
        console.log("Book saved successfully:", book.title);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Failed to process book action:", error);
      Alert.alert(
        "Error",
        "Failed to save book to your library. Please try again."
      );
      setIsProcessing(false);
    }
  };

  // Handle navigation back
  const handleBackPress = () => {
    try {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate("Explore");
      }
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  // Handle search navigation
  const handleSearchPress = () => {
    try {
      navigation.navigate("Search", { from: "BookDetail" });
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  // Get button text based on state
  const getButtonText = () => {
    if (isProcessing) {
      return bookAlreadySaved ? "Removing..." : "Saving...";
    }
    return bookAlreadySaved ? "Remove from Read" : "Read Book";
  };

  // Get button icon based on state
  const getButtonIcon = () => {
    if (isProcessing) {
      return null; // Will show ActivityIndicator instead
    }
    return bookAlreadySaved ? "trash" : "check";
  };

  if (isEnhancing) {
    return (
      <View style={styles.loadingErrorContainer}>
        <ActivityIndicator size="large" color="#2FB78E" />
        <Text style={styles.loadingText}>Loading book details...</Text>
      </View>
    );
  }

  const renderError = () => (
    <View style={styles.centerContainer}>
      <FontAwesome6
        name="triangle-exclamation"
        size={rem(2)}
        color="#ff6b6b"
        iconStyle="solid"
      />
      <Text style={styles.errorText}>
        {enhancementError || "An error occurred while loading book details"}
      </Text>
      <TouchableOpacity style={styles.retryButton} onPress={onRetryEnhancement}>
        <Text style={styles.retryButtonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );

  if (enhancementError) {
    return <View style={styles.container}>{renderError()}</View>;
  }

  // Safe value extraction using helper functions
  const thumbnailUrl = fixGoogleBooksImageUrl(displayBook.thumbnail);
  const bookTitle = displayBook.title;
  const authorText = getAuthorsString(displayBook.authors);
  const descriptionText = formatDescription(displayBook.description);
  const authorBioText = formatDescription(displayBook.authorBio) || "";
  const publicationYear = getPublicationYear(displayBook.publishedDate);

  return (
    <View style={styles.container}>
      {/* Top navigation bar with back and search buttons */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <View>
            <LeftArrowIcon size={rem(1.5)} color="#333" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleSearchPress}
        >
          <FontAwesome6
            name="magnifying-glass"
            size={rem(1.25)}
            style={styles.icon}
            iconStyle="solid"
          />
        </TouchableOpacity>
      </View>

      {/* Scrollable content area */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Book cover image */}
        <View style={styles.imageContainer}>
          {thumbnailUrl ? (
            <Image
              source={{ uri: thumbnailUrl }}
              style={styles.bookImage}
              onError={(error) => {
                console.warn(
                  "Book image failed to load:",
                  error.nativeEvent.error
                );
              }}
              onLoad={() => {
                console.log("Book image loaded successfully");
              }}
            />
          ) : (
            <View style={styles.placeholderImage}>
              <FontAwesome6
                name="book"
                size={rem(2.5)}
                color="#ccc"
                iconStyle="solid"
              />
            </View>
          )}
        </View>

        {/* Book title */}
        <Text style={styles.bookTitle}>{bookTitle}</Text>

        {/* Author name */}
        <Text style={styles.bookAuthor}>{authorText}</Text>

        {/* Book Published Year */}
        {publicationYear && (
          <Text style={styles.bookAuthor}>Published in {publicationYear}</Text>
        )}

        {/* Book rating */}
        {displayBook.averageRating > 0 && (
          <View style={styles.ratingContainer}>
            {isEnhancing ? (
              <View style={styles.ratingLoading}>
                <ActivityIndicator size="small" color="#2FB78E" />
                <Text style={styles.loadingText}>Loading ratings...</Text>
              </View>
            ) : (
              <StarRating
                rating={displayBook.averageRating}
                starSize={rem(1)}
                reviewCount={displayBook.ratingsCount}
              />
            )}
          </View>
        )}

        {/* About the author section */}
        {authorBioText && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeading}>About Author</Text>
            </View>
            <Text style={styles.sectionDescription}>{authorBioText}</Text>
          </View>
        )}

        {/* Book overview section */}
        {descriptionText && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>Overview</Text>
            <Text style={styles.sectionDescription}>{descriptionText}</Text>
          </View>
        )}

        {/* Extra space before bottom button */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Fixed Action button at bottom */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={[
            styles.readButton,
            bookAlreadySaved && styles.readButtonSaved,
            isProcessing && styles.readButtonDisabled,
          ]}
          onPress={handleBookAction}
          disabled={isProcessing || !book || !book.id}
        >
          {isProcessing ? (
            <ActivityIndicator
              size="small"
              color="#fff"
              style={styles.buttonIcon}
            />
          ) : (
            <FontAwesome6
              name={getButtonIcon()!}
              size={rem(1.125)}
              color="#fff"
              style={styles.buttonIcon}
              iconStyle="solid"
            />
          )}
          <Text style={styles.readButtonText}>{getButtonText()}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookDetail;
