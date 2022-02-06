import React, {useRef, useContext, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Platform,
  SafeAreaView,
  ScrollView,
  FlatList,
  LogBox,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import RBSheet from 'react-native-raw-bottom-sheet';
import {withTheme, FAB} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {withTranslation} from 'react-i18next';
import NewShippingAddress from '../components/NewShippingAddress';
import RenderShippingAddress from '../components/RenderShippingAddress';
import EmptyAddress from '../components/EmptyAddress';
import {UserContext, AddressContext} from '../context';
import {getMyAddress} from '../api';

LogBox.ignoreLogs(['Sending...']);

const ShippingScreen = ({t, theme}: any) => {
  const refRBSheet = useRef();
  const {user}: any = useContext(UserContext);
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
        setAddress([
          ...res.filter(item => item.id === user?.uid),
          ...address.filter(item => item.id === user?.id),
        ]);
      }
    };
    getAddress();
  }, [address, setAddress, user?.id, user?.uid]);

  return (
    <SafeAreaView style={styles.container}>
      {address ? (
        <FlatList
          data={address}
          renderItem={RenderShippingAddress}
          keyExtractor={item => item.timestamp}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <EmptyAddress />
      )}
      <RBSheet
        animationType="slide"
        height={350}
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <NewShippingAddress />
        </ScrollView>
      </RBSheet>
      <FAB
        color={colors.white}
        style={[styles.fab, {backgroundColor: colors.primary}]}
        uppercase={false}
        label={t('Add a new address')}
        small
        icon="home"
        onPress={() => refRBSheet.current.open()}
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
    margin: 50,
    right: 0,
    bottom: 0,
  },
});

export default withTranslation()(withTheme(ShippingScreen));
