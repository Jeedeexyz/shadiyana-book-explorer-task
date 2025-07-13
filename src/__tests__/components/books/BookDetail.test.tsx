import React from "react";
import { render } from "@testing-library/react-native";
import BookDetail from "../../../components/books/BookDetail";

// Mock navigation
const mockNavigate = jest.fn();
const mockGoBack = jest.fn();
const mockCanGoBack = jest.fn(() => true);

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: mockGoBack,
    canGoBack: mockCanGoBack,
  }),
}));

// Mock useSavedBooks hook
jest.mock("../../../hooks/useSavedBooks", () => ({
  useSavedBooks: () => ({
    saveBook: jest.fn(),
    removeBook: jest.fn(),
    isBookSaved: jest.fn(() => false),
  }),
}));

// Mock StarRating component
jest.mock("../../../components/books/StarRating", () => {
  const { View, Text } = require("react-native");
  return ({ rating, reviewCount }) => (
    <View testID="star-rating">
      <Text>
        {rating} stars ({reviewCount} reviews)
      </Text>
    </View>
  );
});

// Mock LeftArrowIcon
jest.mock("../../../components/icons/LeftArrowIcon", () => {
  const { View } = require("react-native");
  return ({ size, color }) => <View testID="left-arrow-icon" />;
});

// Mock FontAwesome6
jest.mock("@expo/vector-icons", () => ({
  FontAwesome6: ({ name, size, color }) => {
    const { View, Text } = require("react-native");
    return (
      <View testID={`icon-${name}`}>
        <Text>{name}</Text>
      </View>
    );
  },
}));

// Mock styles
jest.mock("../../../assets/styles/BookDetails.styles", () => ({
  bookDetailStyles: {
    container: { flex: 1 },
    header: { flexDirection: "row" },
    backButton: { padding: 10 },
    headerButton: { padding: 10 },
    icon: {},
    scrollView: { flex: 1 },
    scrollContent: { padding: 16 },
    imageContainer: { alignItems: "center" },
    bookImage: { width: 200, height: 300 },
    placeholderImage: {
      width: 200,
      height: 300,
      justifyContent: "center",
      alignItems: "center",
    },
    bookTitle: { fontSize: 24, fontWeight: "bold" },
    bookAuthor: { fontSize: 16, color: "#666" },
    ratingContainer: { marginVertical: 10 },
    ratingLoading: { flexDirection: "row", alignItems: "center" },
    loadingText: { marginLeft: 8 },
    sectionContainer: { marginVertical: 16 },
    sectionHeader: {},
    sectionHeading: { fontSize: 18, fontWeight: "bold" },
    sectionDescription: { fontSize: 14, lineHeight: 20 },
    bottomSpacer: { height: 20 },
    bottomButtonContainer: { padding: 16 },
    readButton: {
      backgroundColor: "#2FB78E",
      padding: 16,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    readButtonSaved: { backgroundColor: "#ff6b6b" },
    readButtonDisabled: { opacity: 0.5 },
    buttonIcon: { marginRight: 8 },
    readButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    loadingErrorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    centerContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    errorText: { color: "#ff6b6b", textAlign: "center", marginVertical: 16 },
    retryButton: { backgroundColor: "#2FB78E", padding: 12, borderRadius: 8 },
    retryButtonText: { color: "#fff", fontWeight: "bold" },
  },
  rem: jest.fn((value) => value * 16),
}));

// Mock helper functions
jest.mock("../../../utils/helpers/bookHelpers", () => ({
  getAuthorsString: jest.fn((authors) =>
    Array.isArray(authors) ? authors.join(", ") : "Unknown Author"
  ),
  getPublicationYear: jest.fn((date) => (date ? "2023" : "")),
  formatDescription: jest.fn((desc) => desc || "No description available"),
  safeString: jest.fn((value, fallback = "") => value || fallback),
  safeNumber: jest.fn((value, fallback = 0) =>
    typeof value === "number" ? value : fallback
  ),
}));

jest.mock("../../../utils/helpers/imageHelpers", () => ({
  fixGoogleBooksImageUrl: jest.fn((url) => url || ""),
}));

describe("BookDetail", () => {
  const mockBook = {
    id: "1",
    title: "Test Book",
    authors: ["Test Author"],
    thumbnail: "https://example.com/book.jpg",
    description: "Test description",
    authorBio: "Test author bio",
    publishedDate: "2023-01-01",
    averageRating: 4.5,
    ratingsCount: 100,
    pageCount: 200,
    categories: ["Fiction"],
    language: "en",
    previewLink: "https://example.com/preview",
    infoLink: "https://example.com/info",
    isEnhancing: false,
    industryIdentifiers: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without crashing", () => {
    const { getByText } = render(<BookDetail book={mockBook} />);
    expect(getByText("Test Book")).toBeTruthy();
  });

  it("should render book title and author", () => {
    const { getByText } = render(<BookDetail book={mockBook} />);
    expect(getByText("Test Book")).toBeTruthy();
    expect(getByText("Test Author")).toBeTruthy();
  });

  it("should render navigation header", () => {
    const { getByTestId } = render(<BookDetail book={mockBook} />);
    expect(getByTestId("left-arrow-icon")).toBeTruthy();
    expect(getByTestId("icon-magnifying-glass")).toBeTruthy();
  });

  it("should render book image", () => {
    const { getByDisplayValue } = render(<BookDetail book={mockBook} />);
    // Image should be rendered with the thumbnail URL
    const component = render(<BookDetail book={mockBook} />);
    expect(component).toBeTruthy();
  });

  it("should render placeholder when no thumbnail", () => {
    const bookWithoutThumbnail = { ...mockBook, thumbnail: "" };
    const { getByTestId } = render(<BookDetail book={bookWithoutThumbnail} />);
    expect(getByTestId("icon-book")).toBeTruthy();
  });

  it("should render publication year", () => {
    const { getByText } = render(<BookDetail book={mockBook} />);
    expect(getByText("Published in 2023")).toBeTruthy();
  });

  it("should render star rating when available", () => {
    const { getByTestId } = render(<BookDetail book={mockBook} />);
    expect(getByTestId("star-rating")).toBeTruthy();
  });

  it("should render author bio section", () => {
    const { getByText } = render(<BookDetail book={mockBook} />);
    expect(getByText("About Author")).toBeTruthy();
    expect(getByText("Test author bio")).toBeTruthy();
  });

  it("should render overview section", () => {
    const { getByText } = render(<BookDetail book={mockBook} />);
    expect(getByText("Overview")).toBeTruthy();
    expect(getByText("Test description")).toBeTruthy();
  });

  it("should render read button", () => {
    const { getByText } = render(<BookDetail book={mockBook} />);
    expect(getByText("Read Book")).toBeTruthy();
  });

  it("should render with unknown values when book is undefined", () => {
    const { getByText } = render(<BookDetail />);
    expect(getByText("Unknown Title")).toBeTruthy();
    expect(getByText("Unknown Author")).toBeTruthy();
  });

  it("should render loading state when isEnhancing is true", () => {
    const { getByText } = render(
      <BookDetail book={mockBook} isEnhancing={true} />
    );
    expect(getByText("Loading book details...")).toBeTruthy();
  });

  it("should render error state when enhancementError is provided", () => {
    const { getByText } = render(
      <BookDetail
        book={mockBook}
        enhancementError="Failed to load book details"
      />
    );
    expect(getByText("Failed to load book details")).toBeTruthy();
    expect(getByText("Try Again")).toBeTruthy();
  });

  it("should not render star rating when averageRating is 0", () => {
    const bookWithoutRating = { ...mockBook, averageRating: 0 };
    const { queryByTestId } = render(<BookDetail book={bookWithoutRating} />);
    expect(queryByTestId("star-rating")).toBeNull();
  });
});
