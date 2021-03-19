import {DefaultTheme, configureFonts} from 'react-native-paper';
import DefaultStyles from './DefaultStyles';

const fontConfig = {
  ios: {
    regular: {
      fontFamily: DefaultStyles.fonts.regular,
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: DefaultStyles.fonts.regular,
      fontWeight: 'normal',
    },
    light: {
      fontFamily: DefaultStyles.fonts.regular,
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: DefaultStyles.fonts.regular,
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: DefaultStyles.fonts.regular,
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: DefaultStyles.fonts.regular,
      fontWeight: 'normal',
    },
    light: {
      fontFamily: DefaultStyles.fonts.regular,
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: DefaultStyles.fonts.regular,
      fontWeight: 'normal',
    },
  },
};

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
  mode: 'adaptive',
  dark: false,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: DefaultStyles.colors.primary,
    accent: DefaultStyles.colors.accent,
  },
};

export default theme;
