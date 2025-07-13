import React from "react";
import { View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import BookDetail from "../components/books/BookDetail";
import { useBookEnhancement } from "../hooks/useBookEnhancementResult";
import { BookDetailScreenRouteProp } from "../types/navigation";

const BookDetailScreen = () => {
  const route = useRoute<BookDetailScreenRouteProp>();
  const { book } = route.params || {};

  // Enhance book with Open Library data
  const { enhancedBook, isEnhancing, enhancementError, retryEnhancement } =
    useBookEnhancement(book);

  return (
    <View style={styles.container}>
      <BookDetail
        book={enhancedBook}
        isEnhancing={isEnhancing}
        enhancementError={enhancementError}
        onRetryEnhancement={retryEnhancement}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default BookDetailScreen;
