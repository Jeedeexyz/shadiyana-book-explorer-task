import React from "react";
import { render } from "@testing-library/react-native";
import SearchScreen from "../../screens/SearchScreen";

// Mock navigation
const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: mockGoBack,
  }),
  useRoute: () => ({
    params: { from: "Explore" },
  }),
}));

// Mock useBookSearch hook with simple return
jest.mock("../../hooks/useBookSearch", () => ({
  useBookSearch: () => ({
    books: [],
    loading: false,
    error: null,
    searchBooks: jest.fn(),
    clearResults: jest.fn(),
  }),
}));

// Mock SearchBar
jest.mock("../../components/common/SearchBar", () => {
  const { View } = require("react-native");
  return () => <View testID="search-bar" />;
});

// Mock LeftArrowIcon
jest.mock("../../components/icons/LeftArrowIcon", () => {
  const { View } = require("react-native");
  return () => <View testID="left-arrow" />;
});

// Mock styles
jest.mock("../../assets/styles/SearchScreen.Styles", () => ({
  searchScreenStyles: {
    container: {},
    header: {},
    backButton: {},
    title: {},
    searchContainer: {},
    resultsContainer: {},
    centerContainer: {},
    emptyText: {},
    emptySubtext: {},
  },
  rem: jest.fn((value) => value * 16),
}));
// Mock helpers
jest.mock("../../utils/helpers", () => ({
  getAuthorsString: jest.fn(() => "Test Author"),
  safeString: jest.fn((value) => value || ""),
}));

describe("SearchScreen", () => {
  it("should render without crashing", () => {
    const { getByTestId } = render(<SearchScreen />);
    expect(getByTestId("backButton")).toBeTruthy();
  });

  it("should render search components", () => {
    const { getByTestId } = render(<SearchScreen />);
    expect(getByTestId("search-bar")).toBeTruthy();
    expect(getByTestId("left-arrow")).toBeTruthy();
  });

  it("should render empty state message", () => {
    const { getByText } = render(<SearchScreen />);
    expect(getByText("Search for books by title, author, or keyword")).toBeTruthy();
  });
});
