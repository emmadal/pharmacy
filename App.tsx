import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {LogBox, StatusBar, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuTab from './src/routes/MenuTab';
import OnboardingStack from './src/routes/OnboardingStack';
import {LightTheme, DarkTheme} from './src/themes';
import {UserContext, ThemeContext, LocaleContext} from './src/context';
import auth from '@react-native-firebase/auth';
import {getProfile} from './src/api';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  const [isThemeDark, setIsThemeDark] = useState(false);
  const [locale, setLocale] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    AsyncStorage.getItem('@locale').then((value: any) => {
      setLocale(value);
    });
  }, [locale]);

  if (Platform.OS === 'ios') {
    Icon.loadFont();
  }

  useEffect(() => {
    AsyncStorage.getItem('@isThemeDark').then((value: any) => {
      setIsThemeDark(JSON.parse(value));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('@isThemeDark', `${isThemeDark}`);
  }, [isThemeDark]);

  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [isThemeDark, toggleTheme],
  );

  // Handle user state changes
  const onAuthStateChanged = u => {
    getProfile(u?.uid).then(e => setUser(e));
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Choose theme
  let theme = isThemeDark ? DarkTheme : LightTheme;

  return (
    <PaperProvider
      theme={theme}
      settings={{icon: props => <Icon {...props} />}}>
      <StatusBar
        backgroundColor={Platform.OS === 'ios' ? 'transparent' : '#44bd32'}
        barStyle={isThemeDark ? 'light-content' : 'default'}
        networkActivityIndicatorVisible={true}
      />
      <ThemeContext.Provider value={preferences}>
        <LocaleContext.Provider value={{locale, setLocale}}>
          <NavigationContainer theme={theme}>
            <UserContext.Provider value={{setUser, user}}>
              {!user ? <OnboardingStack /> : <MenuTab />}
            </UserContext.Provider>
          </NavigationContainer>
        </LocaleContext.Provider>
      </ThemeContext.Provider>
    </PaperProvider>
  );
};

export default App;
