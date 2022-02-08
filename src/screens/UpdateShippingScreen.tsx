import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  LogBox,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {TextInput, withTheme, Switch} from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import {useNavigation} from '@react-navigation/native';
import {withTranslation} from 'react-i18next';
import {UserContext, AddressContext} from '../context';
import {updateAddress, getMyAddress, reverseGeocoding} from '../api';

LogBox.ignoreLogs(['Sending...']);

const UpdateShippingScreen = ({t, theme, route}: any) => {
  const {item} = route.params;
  const [neighborhood, setNeighborhood] = useState(item?.neighborhood ?? '');
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState(item?.city ?? '');
  const [district, setDistrict] = useState(item?.district ?? '');
  const [postalcode, setPostalCode] = useState(item?.postalcode ?? '');
  const [country, setCountry] = useState(item?.country ?? '');
  const [coords, setCoords] = useState({lat: 0, lng: 0, timestamp: 0});
  const [btnview, setBtnView] = useState(true);
  const [isSwitchOn, setIsSwitchOn] = useState(item?.defaultAddress);
  const {user}: any = useContext(UserContext);
  const {setAddress}: any = useContext(AddressContext);
  const {goBack} = useNavigation();
  const {colors} = theme;

  // get Current position with longitude and latitude
  const getCurrentPosition = useCallback(() => {
    try {
      const options = {
        maximumAge: 3000,
        timeout: 10000,
        enableHighAccuracy: false,
      };
      Geolocation.getCurrentPosition(
        async position => {
          const r = await reverseGeocoding(
            position.coords.latitude,
            position.coords.longitude,
          );
          const obj = JSON.parse(r);
          setCountry(obj.address.country);
          setCity(obj.address.city);
          setDistrict(obj.address.state);
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            timestamp: position.timestamp,
          });
        },
        error => {
          // See error code charts below.
          console.log(error.code);
          Alert.alert(error.message);
        },
        options,
      );
    } catch (err) {
      console.warn(err);
    }
  }, []);

  useEffect(() => getCurrentPosition(), [getCurrentPosition]);

  const handleSubmit = async () => {
    setLoading(!loading);
    try {
      const param = {
        district,
        city,
        country,
        postalcode,
        neighborhood,
        defaultAddress: isSwitchOn,
        updateAt: new Date().toISOString(),
      };
      const res = await getMyAddress(user?.uid);
      if (res?.length) {
        if (!isSwitchOn || isSwitchOn) {
          setLoading(false);
          const u = await updateAddress(item?.id, param, item?.userId);
          if (u?.length) {
            setAddress(u.filter(x => x.id === item?.id));
            setLoading(false);
            goBack();
          }
        } else {
          setLoading(false);
          Alert.alert(
            t(
              'A another main address is already exist. Please deactivate it and edit this address like main address',
            ),
          );
          return;
        }
      }
    } catch (err) {
      console.warn(err.message);
      setLoading(false);
      return;
    }
  };

  const fieldChecking = useCallback(() => {
    if (
      neighborhood.length >= 10 &&
      neighborhood.trim() &&
      (city.length && country.length && district.length) > 0
    ) {
      setBtnView(false);
    } else {
      setBtnView(true);
    }
  }, [city.length, country.length, district.length, neighborhood]);

  useEffect(() => fieldChecking(), [fieldChecking]);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        disabled
        mode="outlined"
        value={user?.fullName}
        label={t('Full Name')}
      />
      <TextInput
        style={styles.input}
        disabled
        mode="outlined"
        value={user?.phoneNumber}
        label={t('Phone number')}
      />
      <TextInput
        style={[styles.input]}
        autoCapitalize="none"
        mode="outlined"
        value={neighborhood}
        label={t('Neighborhood')}
        onChangeText={text => setNeighborhood(text)}
      />
      <TextInput
        style={[styles.input]}
        autoCapitalize="none"
        mode="outlined"
        value={postalcode}
        label={t('Postal code')}
        onChangeText={text => setPostalCode(text)}
      />
      <TextInput
        style={styles.input}
        disabled
        autoCapitalize="none"
        mode="outlined"
        value={city}
        label={t('City')}
      />
      <TextInput
        style={styles.input}
        disabled
        autoCapitalize="none"
        mode="outlined"
        value={district}
        label={t('District')}
      />
      <TextInput
        style={styles.input}
        disabled
        autoCapitalize="none"
        mode="outlined"
        value={country}
        label={t('Country')}
      />
      <View style={styles.deliveryChoice}>
        <Switch
          value={isSwitchOn}
          onValueChange={onToggleSwitch}
          color={colors.warning}
        />
        <Text style={styles.deliverChoice}>
          {t('Define as main delivery address')}
        </Text>
      </View>
      <TouchableOpacity
        disabled={btnview}
        onPress={handleSubmit}
        style={styles.btn}>
        <Text style={styles.btnText}>{t('Update Address')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  form: {
    marginHorizontal: 25,
    marginTop: 10,
    justifyContent: 'center',
  },
  input: {
    marginVertical: 8,
  },
  btn: {
    padding: 15,
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: '#44bd32',
  },
  btnText: {
    color: '#ffffff',
    alignSelf: 'center',
    fontSize: 17,
    fontFamily: 'ProductSans-Bold',
  },
  deliveryChoice: {
    flexDirection: 'row',
  },
  deliverChoice: {
    alignSelf: 'center',
    fontSize: 17,
    marginLeft: 15,
    fontFamily: 'ProductSans-Light',
  },
});

export default withTranslation()(withTheme(UpdateShippingScreen));
