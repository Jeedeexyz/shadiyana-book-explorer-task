import { Platform } from 'react-native';

export const fonts = {
  // Helvetica family
  helvetica: {
    regular: Platform.select({
      ios: 'Helvetica',
      android: 'Helvetica-Regular',
    }),
  },

  // Roboto family
  roboto: {
    regular: Platform.select({
      ios: 'Roboto-Regular',
      android: 'Roboto-Regular',
    }),
  },
};

// For backward compatibility, you can also export shortcuts
export const helvetica = fonts.helvetica;
export const roboto = fonts.roboto;
