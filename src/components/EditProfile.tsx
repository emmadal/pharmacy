import React, {useState, useContext} from 'react';
import {View, StyleSheet, LogBox, Alert} from 'react-native';
import {TextInput, withTheme, Button} from 'react-native-paper';
import {withTranslation} from 'react-i18next';
import {UserContext} from '../context';
import {updateProfile} from '../api';

LogBox.ignoreLogs(['Sending...']);

const EditProfile = ({t, theme}: any) => {
  const {user, setUser}: any = useContext(UserContext);
  const [fullName, setFullName] = useState(user?.fullName);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber ?? '');
  const [loading, setLoading] = useState(false);
  const {colors} = theme;

  const handleSubmit = async () => {
    setLoading(!loading);
    try {
      if (fullName.length && phoneNumber.length) {
        const doc = await updateProfile(user, {fullName, phoneNumber});
        if (doc) {
          setUser(doc);
          setLoading(false);
        }
      }
    } catch (error: any) {
      Alert.alert(t('Operation cancelled'));
      setLoading(false);
      return;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          disabled
          value={user?.email}
          label={t('Email')}
          right={<TextInput.Icon name="envelope" color={colors.primary} />}
        />
        <TextInput
          style={styles.input}
          maxLength={17}
          autoCapitalize="none"
          value={fullName}
          label={t('Full Name')}
          onChangeText={text => setFullName(text)}
          right={<TextInput.Icon name="user-o" color={colors.primary} />}
        />
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          autoCapitalize="none"
          value={phoneNumber}
          label={t('Phone number')}
          onChangeText={text => setPhoneNumber(text)}
          right={<TextInput.Icon name="phone" color={colors.primary} />}
        />
        <Button
          disabled={phoneNumber.length && fullName.length >= 5 ? false : true}
          loading={loading}
          labelStyle={{color: colors.white}}
          onPress={handleSubmit}
          style={styles.btn}
          mode="contained"
          theme={{roundness: 20}}>
          {t('Update profile')}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  form: {
    marginHorizontal: 15,
    marginTop: 10,
  },
  input: {
    marginVertical: 10,
  },
  img: {
    alignSelf: 'center',
  },
  btn: {
    padding: 4,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default withTranslation()(withTheme(EditProfile));
