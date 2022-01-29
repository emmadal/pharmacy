import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingUserName from '../screens/OnboardingUserName';
import OnboardingPhone from '../screens/OnboardingPhone';
import Onboarding from '../screens/Onboarding';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator();

const OnboardingScreen = () => {
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
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name="OnboardingUserName"
        component={OnboardingUserName}
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        // options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default OnboardingScreen;
