import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {withTheme} from 'react-native-paper';
import {withTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Entypo';
import HomeScreen from '../screens/HomeScreen';
import OrderScreen from '../screens/OrderScreen';
import ProfileStack from './ProfileStack';
import {Platform} from 'react-native';

const Tab = createBottomTabNavigator();

const MenuTab = ({t, theme}: any) => {
  const {colors} = theme;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderColor: 'transparent',
          height: Platform.OS === 'ios' ? 77 : 55,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: t('Home'),
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 16,
            fontFamily: 'ProductSans-Bold',
          },
          tabBarIcon: ({focused}) => (
            <Icon
              name="home"
              size={20}
              color={focused ? colors.primary : colors.placeholder}
            />
          ),
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.placeholder,
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrderScreen}
        options={{
          title: t('Orders'),
          tabBarLabelStyle: {
            fontSize: 16,
            fontFamily: 'ProductSans-Bold',
          },
          tabBarIcon: ({focused}) => (
            <Icon
              name="shopping-cart"
              size={20}
              color={focused ? colors.primary : colors.placeholder}
            />
          ),
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.placeholder,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 16,
            fontFamily: 'ProductSans-Bold',
          },
          tabBarIcon: ({focused}) => (
            <Icon
              name="user"
              size={20}
              color={focused ? colors.primary : colors.placeholder}
            />
          ),
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.placeholder,
        }}
      />
    </Tab.Navigator>
  );
};

export default withTranslation()(withTheme(MenuTab));
