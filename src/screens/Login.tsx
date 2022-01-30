import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Alert} from 'react-native';
import {Text, withTheme, Button, TextInput} from 'react-native-paper';
import {withTranslation} from 'react-i18next';
import * as regex from '../hooks/regex';
import {login} from '../api';
import {UserContext} from '../context';
import Loader from '../components/Loader';

const Login = ({t, theme}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {setUser} = useContext(UserContext);
  const {colors} = theme;

  const handleLogin = async () => {
    try {
      setLoading(!loading);
      const res = await login({email, password});
      if (res) {
        setUser(res);
      }
    } catch (error: any) {
      setLoading(false);
      if (error.code === 'auth/user-not-found') {
        Alert.alert(t('There is no user record with these identifiers'));
      }
      if (error.code === 'auth/wrong-password') {
        Alert.alert(t('The password or email is invalid'));
      }
    }
  };

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <View>
        <Text style={styles.title}>{t('Welcome to drug delivery app')}</Text>
        <Text style={styles.subtitle}>{t('Connect you to start')}</Text>
      </View>
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
        disabled={
          password.length === 8 && regex.email.test(email) ? false : true
        }
        labelStyle={[{color: colors.white}, styles.labelStyle]}
        onPress={handleLogin}
        style={styles.btn}
        mode="contained"
        theme={{roundness: 20}}>
        {t('Login')}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  phoneInputStyle: {
    alignSelf: 'center',
    marginTop: 15,
  },
  title: {
    textAlign: 'center',
    fontSize: 23,
    fontFamily: 'ProductSans-Bold',
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 15,
    fontFamily: 'ProductSans-Light',
  },
  btn: {
    width: Dimensions.get('window').width / 1.5,
    padding: 4,
    alignSelf: 'center',
    marginTop: 35,
  },
  input: {
    marginHorizontal: 30,
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  labelStyle: {
    fontFamily: 'ProductSans-Medium',
    fontSize: 18,
  },
});

export default withTranslation()(withTheme(Login));
