import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

export const LightTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: '#44bd32',
    accent: '#f5f6fa',
    warning: '#e67e22',
    danger: '#EA2027',
    white: '#ffffff',
  },
};
export const DarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: '#44bd32',
    accent: '#f5f6fa',
    warning: '#e67e22',
    danger: '#c0392b',
    white: '#ffffff',
  },
};
