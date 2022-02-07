import React, {useState, useEffect, useContext, useCallback} from 'react';
import {View, StyleSheet, Text, LogBox, Alert} from 'react-native';
import {TextInput, withTheme, Button, Switch} from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import {withTranslation} from 'react-i18next';
import {UserContext, AddressContext} from '../context';
import {addNewAddress, getMyAddress, reverseGeocoding} from '../api';

LogBox.ignoreLogs(['Sending...']);

const NewShippingScreen = ({t, theme}: any) => {
  const [neighborhood, setNeighborhood] = useState('');
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [postalcode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [codecountry, setCodeCountry] = useState('');
  const [coords, setCoords] = useState({lat: 0, lng: 0, timestamp: 0});
  const [btnview, setBtnView] = useState(true);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const {user}: any = useContext(UserContext);
  const {setAddress}: any = useContext(AddressContext);
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
          setCodeCountry(obj.address.country_code);
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
        id: user?.uid,
        district,
        city,
        country,
        code_country: codecountry,
        postal_code: postalcode,
        neighborhood,
        defaultAddress: isSwitchOn,
        latitude: coords.lat,
        longitude: coords.lng,
        timestamp: new Date().getTime(),
      };
      const res = await getMyAddress(user?.uid);
      if (res) {
        const exist = res.some(item => item.defaultAddress === true);
        if (exist && isSwitchOn) {
          setLoading(false);
          Alert.alert(
            t(
              'A another main address is already added. Please deactivate it and add this new address like main address',
            ),
          );
          return;
        } else {
          await addNewAddress(user?.uid, param);
          const r = await getMyAddress(user?.uid);
          if (r?.length) {
            setAddress(r.filter(item => item.id === user?.uid));
          }
          setLoading(false);
          setNeighborhood('');
          setPostalCode('');
          setIsSwitchOn(false);
          return;
        }
      }
    } catch (error) {
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
      <Button
        disabled={btnview}
        labelStyle={{color: colors.white}}
        loading={loading}
        onPress={handleSubmit}
        style={styles.btn}
        mode="contained"
        theme={{roundness: 20}}>
        {t('Save Address')}
      </Button>
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
    padding: 4,
    justifyContent: 'center',
    marginVertical: 10,
  },
  deliveryChoice: {
    flexDirection: 'row',
  },
  deliverChoice: {
    alignSelf: 'center',
    fontSize: 15,
    marginLeft: 15,
  },
});

export default withTranslation()(withTheme(NewShippingScreen));
