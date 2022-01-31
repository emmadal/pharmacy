import React, {useState, useContext} from 'react';
import {View, StyleSheet, LogBox} from 'react-native';
import {TextInput, withTheme, Button} from 'react-native-paper';
import {withTranslation} from 'react-i18next';
import {UserContext} from '../context';

LogBox.ignoreLogs(['Sending...']);

const EditProfile = ({t, theme}: any) => {
  const {user}: any = useContext(UserContext);
  const [name, setName] = useState(user?.fullName);
  const [phone, setPhone] = useState(user?.phoneNumber ?? '');
  const [loading, setLoading] = useState(false);
  const {colors} = theme;

  const handleSubmit = () => setLoading(!loading);

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
          autoCapitalize="none"
          value={name}
          label={t('Full Name')}
          onChangeText={text => setName(text)}
          right={<TextInput.Icon name="user-o" color={colors.primary} />}
        />
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          autoCapitalize="none"
          value={phone}
          label={t('Phone number')}
          onChangeText={text => setPhone(text)}
          right={<TextInput.Icon name="phone" color={colors.primary} />}
        />
        <Button
          disabled={phone.length && name.length > 5 ? false : true}
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
