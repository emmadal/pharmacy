import React, {useState, useEffect} from 'react';
import {LogBox, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Menu from './src/routes/Menu';
import {LightTheme, DarkTheme} from './src/themes';
import OnboardingScreen from './src/routes/OnboardingScreen';
import {UserContext} from './src/context';
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

  // Handle user state changes
  const onAuthStateChanged = u => {
    getProfile(u?.uid).then(e => setUser(e));
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  let theme = isThemeDark ? DarkTheme : LightTheme;

  return (
    <PaperProvider
      theme={theme}
      settings={{icon: props => <Icon {...props} />}}>
      <NavigationContainer theme={theme}>
        <UserContext.Provider value={{setUser, user}}>
          {!user ? <OnboardingScreen /> : <Menu />}
        </UserContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
