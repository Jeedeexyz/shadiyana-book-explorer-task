import { StyleSheet, Dimensions } from 'react-native';
import { fonts } from '../../utils/fonts';

// Responsive design setup
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const BASE_FONT_SIZE = screenWidth * 0.04;

// Helper functions for responsive sizing
const rem = (value: number) => BASE_FONT_SIZE * value;
const em = (value: number, baseFontSize: number = BASE_FONT_SIZE) =>
  baseFontSize * value;

export const searchScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: rem(1),
    paddingTop: screenHeight * 0.02,
  },

  // Header Section
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: rem(1.25),
    paddingHorizontal: rem(0.1),
  },

  backButton: {
    padding: rem(0.5),
    fontSize: rem(1.5),
  },

  backIcon: {
    fontSize: rem(1.375),
    color: '#333',
    fontFamily: fonts.helvetica.regular,
  },

  title: {
    fontSize: rem(1.125),
    fontFamily: fonts.helvetica.regular,
    color: '#333',
    flex: 1,
    textAlign: 'center',
    lineHeight: em(1.2, rem(1.125)),
  },

  placeholder: {
    width: rem(2.5),
  },

  // Search Section
  searchContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: rem(1),
  },

  // Results Section
  resultsContainer: {
    flex: 1,
  },

  list: {
    flex: 1,
  },

  listContent: {
    paddingBottom: rem(2),
  },

  // Book Item Styles
  bookItem: {
    paddingVertical: rem(0.5),
    paddingHorizontal: rem(1),
    marginVertical: rem(0.1),
    borderRadius: rem(0.75),
  },

  bookTitle: {
    fontSize: rem(1),
    fontFamily: fonts.roboto.regular,
    color: '#2FB78E',
    marginBottom: rem(0.25),
    lineHeight: em(1.3, rem(1)),
    fontWeight: '600',
  },

  bookAuthor: {
    fontSize: rem(0.875),
    color: '#495057',
    fontFamily: fonts.roboto.regular,
    lineHeight: em(1.2, rem(0.875)),
    marginBottom: rem(0.125),
  },

  bookYear: {
    fontSize: rem(0.75),
    color: '#6c757d',
    fontFamily: fonts.roboto.regular,
    marginBottom: rem(0.0625),
  },

  bookPages: {
    fontSize: rem(0.75),
    color: '#6c757d',
    fontFamily: fonts.roboto.regular,
  },

  // State Container Styles
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: rem(2),
  },

  // Loading State
  loadingText: {
    fontSize: rem(1),
    color: '#666',
    marginTop: rem(1),
    fontFamily: fonts.roboto.regular,
  },

  // Error State
  errorText: {
    fontSize: rem(1),
    color: '#dc3545',
    textAlign: 'center',
    marginTop: rem(1),
    marginBottom: rem(1.5),
    fontFamily: fonts.roboto.regular,
    lineHeight: em(1.4, rem(1)),
  },

  retryButton: {
    backgroundColor: '#2FB78E',
    paddingHorizontal: rem(1.5),
    paddingVertical: rem(0.75),
    borderRadius: rem(0.5),
    shadowColor: '#2FB78E',
    shadowOffset: {
      width: 0,
      height: rem(0.125),
    },
    shadowOpacity: 0.3,
    shadowRadius: rem(0.25),
    elevation: 2,
  },

  retryButtonText: {
    color: '#fff',
    fontSize: rem(0.875),
    fontFamily: fonts.roboto.regular,
    fontWeight: '600',
  },

  // Empty State
  emptyText: {
    fontSize: rem(1.125),
    color: '#6c757d',
    textAlign: 'center',
    marginTop: rem(1),
    fontFamily: fonts.roboto.regular,
    fontWeight: 'medium',
    lineHeight: em(1.4, rem(1.125)),
  },

  emptySubtext: {
    fontSize: rem(0.875),
    color: '#adb5bd',
    textAlign: 'center',
    marginTop: rem(0.5),
    fontFamily: fonts.roboto.regular,
    lineHeight: em(1.4, rem(0.875)),
  },
});

// Export responsive helper functions for use in component
export { rem, em };