import {Platform, Dimensions} from 'react-native';
import DefaultStyles from '../styles/DefaultStyles';

const Screen = Dimensions.get('window');
export const SCREEN_WIDTH = Screen.width;
export const SCREEN_HEIGHT = Screen.height;
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isWeb = Platform.OS === 'web';

export const logErrorWithMessage = (message, errorSource) => {
  if (__DEV__) {
    console.log(message, errorSource);
  }
};

export const defaultNavOptions = {
  headerStyle: {
    backgroundColor: isAndroid ? DefaultStyles.colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: DefaultStyles.fonts.bold,
  },
  headerBackTitleStyle: {
    fontFamily: DefaultStyles.fonts.medium,
  },
  headerTintColor: isAndroid
    ? DefaultStyles.colors.white
    : DefaultStyles.colors.primary,
};
