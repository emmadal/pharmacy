import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {withTheme, Button, TextInput} from 'react-native-paper';
import {withTranslation} from 'react-i18next';
import * as regex from '../hooks/regex';
import {register} from '../api';
import Loader from '../components/Loader';

const OnboardingUserName = ({t, theme, route}: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const {colors} = theme;

  const createAccount = async () => {
    try {
      setLoading(!loading);
      const userData = {
        email,
        password,
        fullName: name,
        phone: route.params.phoneNumber,
      };
      await register(userData);
    } catch (error: any) {
      console.log(error.message);
      setLoading(false);
      Alert.alert(t(`${error.message}`));
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={name}
        label={t('Full Name')}
        onChangeText={text => setName(text)}
        right={<TextInput.Icon name="user" color={colors.primary} />}
      />
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        label={t('Email')}
        onChangeText={text => setEmail(text)}
        right={<TextInput.Icon name="envelope" color={colors.primary} />}
      />
      <TextInput
        style={styles.input}
        maxLength={8}
        secureTextEntry={true}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoCapitalize="none"
        value={password}
        label={t('Password')}
        onChangeText={text => setPassword(text)}
        right={<TextInput.Icon name="lock" color={colors.primary} />}
      />
      <Button
        labelStyle={[{color: colors.white}, styles.labelStyle]}
        disabled={
          name.length >= 6 && password.length === 8 && regex.email.test(email)
            ? false
            : true
        }
        onPress={createAccount}
        style={styles.btn}
        mode="contained"
        theme={{roundness: 20}}>
        {t('Create Account')}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginHorizontal: 30,
    marginBottom: 20,
    backgroundColor: 'transparent',
  },

  header: {
    textAlign: 'center',
    fontSize: 20,
  },
  btn: {
    padding: 4,
    alignSelf: 'center',
    marginTop: 40,
  },
  error: {
    lineHeight: 30,
    height: 30,
    marginTop: 15,
  },
  labelStyle: {
    fontFamily: 'ProductSans-Medium',
    fontSize: 18,
  },
});

export default withTranslation()(withTheme(OnboardingUserName));
