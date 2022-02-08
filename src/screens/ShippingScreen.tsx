import React, {useContext, useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  Platform,
  SafeAreaView,
  FlatList,
  LogBox,
  PermissionsAndroid,
  Alert,
  Pressable,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {withTheme, FAB} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {withTranslation} from 'react-i18next';
import RenderShippingAddress from '../components/RenderShippingAddress';
import EmptyAddress from '../components/EmptyAddress';
import {UserContext, AddressContext} from '../context';
import {deleteAddress, getMyAddress} from '../api';
import Loader from '../components/Loader';

LogBox.ignoreLogs(['Sending...']);

const ShippingScreen = ({t, theme, navigation}: any) => {
  const {user}: any = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const {address, setAddress}: any = useContext(AddressContext);
  const {goBack} = useNavigation();
  const {colors} = theme;

  const requestLocationPermissionAndroid = useCallback(async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Pharmacy',
          message: t('Pharmacy App request to access to your location'),
          buttonNeutral: t('Ask Me Later'),
          buttonNegative: t('Cancel'),
          buttonPositive: t('OK'),
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return;
      } else {
        Alert.alert(t("You don't have rights to access your location"));
        goBack();
      }
    } catch (err) {
      console.warn(err);
    }
  }, [goBack, t]);

  const requestLocationPermissionIOS = useCallback(async () => {
    try {
      const granted = await Geolocation.requestAuthorization('whenInUse');
      if (granted === 'granted') {
        return;
      } else {
        Alert.alert(t("You don't have rights to access your location"));
        goBack();
      }
    } catch (err) {
      console.warn(err);
    }
  }, [goBack, t]);

  useEffect(() => {
    const checkLocation = async () =>
      Platform.OS === 'ios'
        ? await requestLocationPermissionIOS()
        : await requestLocationPermissionAndroid();
    checkLocation();
  }, [requestLocationPermissionAndroid, requestLocationPermissionIOS]);

  useEffect(() => {
    const getAddress = async () => {
      const res = await getMyAddress(user?.uid);
      if (res?.length) {
        setAddress(res.filter(item => item.userId === user?.uid));
      }
    };
    getAddress();
  }, [address, setAddress, user?.id, user?.uid]);

  const handleDelete = (e: any) => {
    Alert.alert(
      t('Address shipping deleting'),
      t('Do you want to delete ?'),
      [
        {
          text: t('Yes'),
          onPress: async () => {
            setLoading(!loading);
            const u = await deleteAddress(e?.id, e, e?.userId);
            if (u?.length === 0) {
              setLoading(false);
              setAddress([]);
              return;
            } else {
              setLoading(false);
              setAddress(u?.filter(x => x.userId === user?.id));
              return;
            }
          },
        },
        {
          text: t('No'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader loading={loading} />
      {address?.length ? (
        <FlatList
          data={address}
          renderItem={({item}) => (
            <Pressable onLongPress={() => handleDelete(item)}>
              <RenderShippingAddress item={item} />
            </Pressable>
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <EmptyAddress />
      )}
      <FAB
        color={colors.white}
        style={[styles.fab, {backgroundColor: colors.primary}]}
        uppercase={false}
        label={t('Add a new address')}
        small
        icon="plus"
        onPress={() => navigation.navigate('NewShipping')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 10,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  fab: {
    position: 'absolute',
    margin: 30,
    right: 0,
    bottom: 0,
  },
});

export default withTranslation()(withTheme(ShippingScreen));
