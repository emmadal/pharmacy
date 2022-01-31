import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {withTheme} from 'react-native-paper';
import {withTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Entypo';
import HomeScreen from '../screens/HomeScreen';
import OrderScreen from '../screens/OrderScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const Menu = ({t, theme}: any) => {
  const {colors} = theme;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { borderColor: 'transparent', height: 100},
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: t('Home'),
          tabBarLabelStyle: {
            fontSize: 18,
            fontFamily: 'ProductSans-Bold',
          },
          tabBarIcon: ({focused}) => (
            <Icon
              name="home"
              size={25}
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
            fontSize: 18,
            fontFamily: 'ProductSans-Bold',
          },
          tabBarIcon: ({focused}) => (
            <Icon
              name="shopping-cart"
              size={25}
              color={focused ? colors.primary : colors.placeholder}
            />
          ),
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.placeholder,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: t('Profile'),
          tabBarLabelStyle: {
            fontSize: 18,
            fontFamily: 'ProductSans-Bold',
          },
          tabBarIcon: ({focused}) => (
            <Icon
              name="user"
              size={25}
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

export default withTranslation()(withTheme(Menu));
