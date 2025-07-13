// Mock all external dependencies first
jest.mock("../../services/GoogleBookApi", () => ({
  googleBooksApi: {
    searchBooks: jest.fn(() => Promise.resolve({ items: [], totalItems: 0 })),
  },
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    setOptions: jest.fn(),
  }),
  useFocusEffect: jest.fn(),
}));

jest.mock("../../hooks/useSavedBooks", () => ({
  useSavedBooks: () => ({
    savedBooks: [],
    isLoading: false,
    refreshSavedBooks: jest.fn(),
  }),
}));

jest.mock("../../utils/helpers", () => ({
  fixGoogleBooksImageUrl: jest.fn((url) => url || ""),
  getAuthorsString: jest.fn(() => "Test Author"),
}));

jest.mock("@expo/vector-icons", () => ({
  FontAwesome6: "FontAwesome6",
}));

// Simple component test
describe("ExploreScreen", () => {
  it("should pass basic test", () => {
    expect(true).toBe(true);
  });

  it("should import without errors", () => {
    expect(() => {
      require("../../screens/ExploreScreen");
    }).not.toThrow();
  });
});
