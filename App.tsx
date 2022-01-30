import React, {useState} from 'react';
import {LogBox, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Menu from './src/routes/Menu';
import {LightTheme, DarkTheme} from './src/themes';
import OnboardingScreen from './src/routes/OnboardingScreen';
import {UserContext} from './src/context';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  const [isThemeDark, setIsThemeDark] = useState(false);
  const [user, setUser] = useState(null);

  if (Platform.OS === 'ios') {
    Icon.loadFont();
  }

  let theme = isThemeDark ? DarkTheme : LightTheme;

  return (
    <PaperProvider
      theme={theme}
      settings={{icon: props => <Icon {...props} />}}>
      <NavigationContainer theme={theme}>
        <UserContext.Provider value={{setUser, user}}>
          {user === null ? <OnboardingScreen /> : <Menu />}
        </UserContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
