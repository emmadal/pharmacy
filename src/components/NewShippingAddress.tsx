import React, {useState, useEffect, useContext, useCallback} from 'react';
import {View, StyleSheet, Text, LogBox, Alert} from 'react-native';
import {TextInput, withTheme, Button, Switch} from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import {withTranslation} from 'react-i18next';
import {UserContext} from '../context';
import {AddressContext} from '../context';
import {addNewAddress, getMyAddress} from '../api';

const NewShippingAddress = ({t, theme}: any) => {
  const [district, setDistrict] = useState('');
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('');
  const [coords, setCoords] = useState({lat: 0, lng: 0, timestamp: 0});
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const {user}: any = useContext(UserContext);
  const {setAddress}: any = useContext(AddressContext);
  const {colors} = theme;

  LogBox.ignoreLogs(['Sending...']);

  // get Current position with longitude and latitude
  const getCurrentPosition = useCallback(() => {
    try {
      const options = {
        maximumAge: 3000,
        timeout: 10000,
        enableHighAccuracy: false,
      };
      Geolocation.getCurrentPosition(
        position => {
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
          setCity('');
          setDistrict('');
          setIsSwitchOn(false);
          return;
        }
      }
    } catch (error) {
      setLoading(false);
      return;
    }
  };

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={[styles.input]}
          autoCapitalize="none"
          mode="outlined"
          value={district}
          label={t('District')}
          onChangeText={text => setDistrict(text)}
          right={<TextInput.Icon name="map-pin" color={colors.primary} />}
        />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          mode="outlined"
          onChangeText={text => setCity(text)}
          value={city}
          label={t('City')}
          right={<TextInput.Icon name="map-o" color={colors.primary} />}
        />
        <View style={styles.deliveryChoice}>
          <Switch
            value={isSwitchOn}
            style={styles.switchChoice}
            onValueChange={onToggleSwitch}
            color={colors.warning}
          />
          <Text style={styles.deliverChoice}>
            {t('Define as main delivery address')}
          </Text>
        </View>
        <Button
          disabled={city.length && district.length > 5 ? false : true}
          labelStyle={{color: colors.white}}
          loading={loading}
          onPress={handleSubmit}
          style={styles.btn}
          mode="contained"
          theme={{roundness: 20}}>
          {t('Save Address')}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  form: {
    marginHorizontal: 25,
    marginTop: 10,
    justifyContent: 'center',
  },
  input: {
    marginVertical: 10,
  },
  btn: {
    padding: 4,
    justifyContent: 'center',
    alignSelf: 'center',
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

export default withTranslation()(withTheme(NewShippingAddress));
