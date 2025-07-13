import { StyleSheet, Dimensions } from 'react-native';
import { fonts } from '../../utils/fonts';

// Responsive design setup
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const BASE_FONT_SIZE = screenWidth * 0.04;

// Helper functions for responsive sizing
const rem = (value: number) => BASE_FONT_SIZE * value;
const em = (value: number, baseFontSize: number = BASE_FONT_SIZE) =>
  baseFontSize * value;

export const exploreScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: rem(1),
    paddingTop: screenHeight * 0.02,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: rem(1.25),
    paddingHorizontal: rem(0.1),
  },

  title: {
    fontSize: rem(1.5),
    fontFamily: fonts.helvetica.regular,
    color: '#333',
    fontWeight: 'bold',
    lineHeight: em(1.2, rem(1.5)),
  },

  searchButton: {
    padding: rem(0.75),
    borderRadius: rem(1.25),
    backgroundColor: '#f8f8f8',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: rem(0.125),
    },
    shadowOpacity: 0.1,
    shadowRadius: rem(0.25),
    elevation: 2,
  },

  searchIcon: {
    fontSize: rem(1.25),
    color: '#2FB78E',
    fontFamily: fonts.helvetica.regular,
  },

  content: {
    flex: 1,
  },

  // Recent Reads Section
  recentReadsSection: {
    marginBottom: rem(2),
  },

  sectionHeader: {
    marginBottom: rem(1),
    paddingHorizontal: rem(0.25),
  },

  sectionTitle: {
    fontSize: rem(1.25),
    fontFamily: fonts.helvetica.regular,
    fontWeight: 'bold',
    color: '#333',
  },

  recentBooksList: {
    paddingHorizontal: rem(0.25),
    display: 'flex',
    gap: rem(1),
  },

  bookSeparator: {
    width: rem(1),
  },

  recentBookItem: {
    width: rem(7),
  },

  recentBookThumbnail: {
    width: rem(7),
    height: rem(10),
    borderRadius: rem(0.5),
    overflow: 'hidden',
    marginBottom: rem(0.5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: rem(0.125),
    },
    shadowOpacity: 0.2,
    shadowRadius: rem(0.25),
    elevation: 3,
    position: 'relative',
  },

  recentBookImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  recentBookPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  recentBookTitle: {
    fontSize: rem(0.75),
    fontFamily: fonts.helvetica.regular,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: rem(0.25),
    lineHeight: em(1.2, rem(0.75)),
  },

  recentBookAuthor: {
    fontSize: rem(0.625),
    fontFamily: fonts.helvetica.regular,
    color: '#666',
    lineHeight: em(1.2, rem(0.625)),
  },

  // Category Sections
  categorySection: {
    marginBottom: rem(2),
  },

  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: rem(1),
    paddingHorizontal: rem(0.25),
  },

  categoryTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  categoryIcon: {
    marginRight: rem(0.5),
  },

  categoryTitle: {
    fontSize: rem(1.125),
    fontFamily: fonts.helvetica.regular,
    fontWeight: 'bold',
    color: '#333',
  },

  categoryBooksList: {
    paddingHorizontal: rem(0.25),
    display: 'flex',
    gap: rem(1),
  },

  categoryBookItem: {
    width: rem(6),
  },

  categoryBookThumbnail: {
    width: rem(6),
    height: rem(8.5),
    borderRadius: rem(0.5),
    overflow: 'hidden',
    marginBottom: rem(0.5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: rem(0.125),
    },
    shadowOpacity: 0.15,
    shadowRadius: rem(0.25),
    elevation: 2,
  },

  categoryBookImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  categoryBookPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  categoryBookTitle: {
    fontSize: rem(0.7),
    fontFamily: fonts.helvetica.regular,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: rem(0.25),
    lineHeight: em(1.2, rem(0.7)),
  },

  categoryBookAuthor: {
    fontSize: rem(0.6),
    fontFamily: fonts.helvetica.regular,
    color: '#666',
    lineHeight: em(1.2, rem(0.6)),
  },

  // Loading and Error States
  categoryLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: rem(2),
  },

  loadingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: rem(1.5),
  },

  loadingText: {
    fontSize: rem(0.875),
    fontFamily: fonts.helvetica.regular,
    color: '#666',
    marginLeft: rem(0.5),
  },

  categoryError: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: rem(2),
    paddingHorizontal: rem(1),
  },

  errorText: {
    fontSize: rem(0.875),
    fontFamily: fonts.helvetica.regular,
    color: '#666',
    marginLeft: rem(0.5),
    marginRight: rem(0.5),
  },

  retryButton: {
    paddingVertical: rem(0.25),
    paddingHorizontal: rem(0.5),
  },

  retryText: {
    fontSize: rem(0.75),
    fontFamily: fonts.helvetica.regular,
    fontWeight: 'medium',
    color: '#2FB78E',
  },

  bottomSpacer: {
    height: rem(2),
  },
});