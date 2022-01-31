import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {LogBox, Platform, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Menu from './src/routes/Menu';
import {LightTheme, DarkTheme} from './src/themes';
import OnboardingScreen from './src/routes/OnboardingScreen';
import {UserContext, ThemeContext} from './src/context';
import auth from '@react-native-firebase/auth';
import {getProfile} from './src/api';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  const [isThemeDark, setIsThemeDark] = useState(false);
  const [user, setUser] = useState();

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
        <NavigationContainer theme={theme}>
          <UserContext.Provider value={{setUser, user}}>
            {!user ? <OnboardingScreen /> : <Menu />}
          </UserContext.Provider>
        </NavigationContainer>
      </ThemeContext.Provider>
    </PaperProvider>
  );
};

export default App;
