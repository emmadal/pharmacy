import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme, Title, Badge} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {UserContext} from '../context';

const Item = ({item}: any) => {
  const {colors} = useTheme();
  const {user}: any = useContext(UserContext);
  const {t} = useTranslation();
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View style={styles.cardAddressContainer}>
        {item.defaultAddress ? (
          <Badge style={styles.badge} size={25}>
            {t('Default')}
          </Badge>
        ) : null}
        <View style={styles.userDetailContainer}>
          <Icon
            name="map-marker-radius-outline"
            size={45}
            color={colors.primary}
            style={styles.icon}
          />
          <View style={styles.userDetail}>
            <Title style={styles.userDetailName}>{user?.fullName}</Title>
            <Text style={styles.userDetailName}>{user?.phoneNumber}</Text>

            <View style={styles.address}>
              <Text style={styles.neighborhood}>{item?.neighborhood}</Text>
              <Text style={styles.neighborhood}>
                {item?.city}, {item?.district},{' '}
                {`${item?.codecountry}`.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => navigation.navigate('UpdateShipping', {item})}>
          <Icon
            name="pencil"
            size={25}
            color={colors.primary}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const RenderShippingAddress = ({item}: any) => {
  return <Item item={item} />;
};

const styles = StyleSheet.create({
  cardAddressContainer: {
    marginHorizontal: 12,
    backgroundColor: '#ffffff',
    marginVertical: 10,
    padding: 10,
  },
  address: {
    marginTop: 5,
  },
  userDetailContainer: {
    flexDirection: 'row',
  },
  icon: {
    alignSelf: 'flex-start',
  },
  userDetail: {
    marginLeft: 7,
  },
  userDetailName: {
    fontFamily: 'ProductSans-Light',
  },
  editBtn: {
    alignSelf: 'flex-end',
  },
  neighborhood: {
    fontFamily: 'ProductSans-Bold',
    fontSize: 15,
    paddingVertical: 5,
  },
  badge: {
    fontFamily: 'ProductSans-Bold',
  },
});

export default RenderShippingAddress;
