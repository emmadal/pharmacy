import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {withTranslation} from 'react-i18next';
import {withTheme} from 'react-native-paper';
import ProfileScreen from '../screens/ProfileScreen';
import AboutScreen from '../screens/AboutScreen';
import ShippingScreen from '../screens/ShippingScreen';
import NewShippingScreen from '../screens/NewShippingScreen';
import UpdateShippingScreen from '../screens/UpdateShippingScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';

const Stack = createNativeStackNavigator();

const ProfileStack = ({t}: any) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileStack"
        component={ProfileScreen}
        options={{
          title: t('Profile'),
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          headerTitle: t('About'),
          headerBackTitle: t('Back'),
        }}
      />
      <Stack.Screen
        name="Shipping"
        component={ShippingScreen}
        options={{
          headerTitle: t('Shipping Address'),
          headerBackTitle: t('Back'),
        }}
      />
      <Stack.Screen
        name="NewShipping"
        component={NewShippingScreen}
        options={{
          headerTitle: t('Add a new address'),
          headerBackTitle: t('Back'),
        }}
      />
      <Stack.Screen
        name="UpdateShipping"
        component={UpdateShippingScreen}
        options={{
          headerTitle: t('Edit Shipping Address'),
          headerBackTitle: t('Back'),
        }}
      />
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{
          headerTitle: t('Orders history'),
          headerBackTitle: t('Back'),
        }}
      />
    </Stack.Navigator>
  );
};

export default withTranslation()(withTheme(ProfileStack));
