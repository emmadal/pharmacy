import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {withTranslation} from 'react-i18next';
import {withTheme} from 'react-native-paper';
import OnboardingUserName from '../screens/OnboardingUserName';
import OnboardingPhone from '../screens/OnboardingPhone';
import Onboarding from '../screens/Onboarding';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator();

const OnboardingScreen = ({t}: any) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{
          headerRight: () => null,
          headerLeft: () => null,
          headerTitle: () => null,
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="OnboardingPhone"
        component={OnboardingPhone}
        options={{
          headerTitle: t('Phone number'),
          headerBackTitle: t('Back'),
        }}
      />
      <Stack.Screen
        name="OnboardingUserName"
        component={OnboardingUserName}
        options={{
          headerTitle: t('User details'),
          headerBackTitle: t('Back'),
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerTitle: t('Login'),
          headerBackTitle: t('Back'),
        }}
      />
    </Stack.Navigator>
  );
};

export default withTranslation()(withTheme(OnboardingScreen));
