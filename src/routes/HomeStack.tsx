import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {withTranslation} from 'react-i18next';
import {withTheme} from 'react-native-paper';
import PharmacyScreen from '../screens/PharmacyScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const HomeStack = ({t}: any) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Pharmacy"
        component={PharmacyScreen}
        options={({route}) => ({
          headerTitle: t(`${route?.params?.item?.name}`),
          headerBackTitle: t('Back'),
        })}
      />
    </Stack.Navigator>
  );
};

export default withTranslation()(withTheme(HomeStack));
