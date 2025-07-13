import { StyleSheet, Dimensions } from 'react-native';
import { fonts } from '../../utils/fonts';

// Get device screen size to make app look good on all phones
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Standard font size that adjusts to screen size
const BASE_FONT_SIZE = screenWidth * 0.04;

// Helper functions to make sizes responsive
const rem = (value: number) => BASE_FONT_SIZE * value;
const em = (value: number, baseFontSize: number = BASE_FONT_SIZE) =>
  baseFontSize * value;

export const bookDetailStyles = StyleSheet.create({
  loadingErrorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: rem(1),
    paddingTop: screenHeight * 0.02,
    paddingBottom: rem(0.25),
    backgroundColor: '#fff',
    zIndex: 1,
  },

  backButton: {
    padding: rem(0.5),
    borderRadius: rem(1.25),
    fontSize: rem(1.5),
  },

  headerButton: {
    padding: rem(0.5),
    borderRadius: rem(1.25),
  },

  backIcon: {
    fontSize: rem(1.5),
    color: '#333',
    fontFamily: fonts.helvetica.regular,
  },

  icon: {
    color: '#333',
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: rem(1.25),
    paddingBottom: screenHeight * 0.07,
    alignItems: 'center',
  },

  imageContainer: {
    width: screenWidth * 0.5,
    height: screenHeight * 0.35,
    borderRadius: rem(0.75),
    overflow: 'hidden',
    marginBottom: rem(1),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: rem(0.25),
    },
    shadowOpacity: 0.3,
    shadowRadius: rem(0.29),
    elevation: 8,
  },

  bookImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  ratingContainer: {
    alignItems: 'center',
    marginBottom: rem(1.5),
    paddingHorizontal: rem(1),
  },

  bookTitle: {
    fontSize: rem(1.125),
    fontFamily: fonts.helvetica.regular,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: em(0.5, rem(1.125)),
    paddingHorizontal: rem(1),
    lineHeight: em(1.2, rem(1.125)),
    width: screenWidth * 0.9,
    flexWrap: 'wrap',
    alignSelf: 'center',
  },

  bookAuthor: {
    fontSize: rem(1),
    fontFamily: fonts.helvetica.regular,
    color: '#666',
    textAlign: 'center',
    marginBottom: rem(0.5),
    lineHeight: em(1.2, rem(1)),
    width: screenWidth * 0.85,
    flexWrap: 'wrap',
    alignSelf: 'center',
  },

  sectionContainer: {
    width: '95%',
    marginBottom: rem(1.5),
    paddingHorizontal: rem(1),
  },

  sectionHeading: {
    fontSize: rem(1.125),
    fontFamily: fonts.helvetica.regular,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: rem(0.75),
    lineHeight: em(1.2, rem(1.125)),
  },

  sectionDescription: {
    fontSize: rem(0.875),
    fontFamily: fonts.helvetica.regular,
    color: '#555',
    lineHeight: em(1.5, rem(0.875)),
    textAlign: 'justify',
  },

  bottomSpacer: {
    height: rem(4),
  },

  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: rem(1),
    paddingTop: rem(1),
    paddingBottom: screenHeight * 0.06,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  readButton: {
    backgroundColor: '#55D4AE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: rem(1),
    paddingHorizontal: rem(1.5),
    borderRadius: rem(0.75),
    shadowColor: '#2FB78E',
    shadowOffset: {
      width: 0,
      height: rem(0.25),
    },
    shadowOpacity: 0.3,
    shadowRadius: rem(0.375),
    elevation: 3,
    width: '95%',
  },

  readButtonSaved: {
    backgroundColor: '#28a745', // Green for saved
  },

  readButtonDisabled: {
    opacity: 0.7,
  },

  buttonIcon: {
    marginRight: rem(0.5),
  },

  readButtonText: {
    fontSize: rem(1.125),
    fontFamily: fonts.helvetica.regular,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: em(1.2, rem(1.125)),
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rem(0.75),
  },

  loadingSpinner: {
    marginLeft: rem(0.5),
  },

  ratingLoading: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  loadingText: {
    fontSize: rem(0.875),
    color: '#666',
    marginLeft: rem(0.5),
    fontFamily: fonts.helvetica.regular,
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: rem(2),
  },

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
});

// Export responsive helper functions for use in component
export { rem, em };