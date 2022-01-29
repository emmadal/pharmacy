import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Text, withTheme, Button, TextInput} from 'react-native-paper';
import * as regex from '../hooks/regex';

const Login = ({theme}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {colors} = theme;
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Welcome to drug delivery app!</Text>
        <Text style={styles.subtitle}>Connect you to start</Text>
      </View>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        label="Email"
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
        label="Password"
        onChangeText={text => setPassword(text)}
        right={<TextInput.Icon name="lock" color={colors.primary} />}
      />
      <Button
        disabled={
          password.length === 8 && regex.email.test(email) ? false : true
        }
        labelStyle={[{color: colors.white}, styles.labelStyle]}
        onPress={() => ''}
        style={styles.btn}
        mode="contained"
        theme={{roundness: 20}}>
        Login
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

export default withTheme(Login);
