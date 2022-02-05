import i18n from 'i18next';
import {NativeModules, Platform} from 'react-native';
import {initReactI18next} from 'react-i18next';
import * as en from '../locales/en.json';
import * as fr from '../locales/fr.json';

const resources = {en: {translation: en}, fr: {translation: fr}};

const getLocale = (): string => {
  let deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;
  return deviceLanguage.replace(/_US/g, '');
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: getLocale(),
  fallbackLng: getLocale(),
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
