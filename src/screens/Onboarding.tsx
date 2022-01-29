import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {Button, withTheme} from 'react-native-paper';

const Onboarding = ({theme, navigation}: any) => {
  const {colors} = theme;
  return (
    <View style={styles.container}>
      <Button
        labelStyle={{color: colors.white}}
        mode="contained"
        onPress={() => navigation.navigate('Login')}
        style={styles.btn}
        theme={{roundness: 20}}>
        Login
      </Button>
      <Button
        labelStyle={{color: colors.white}}
        onPress={() => navigation.navigate('OnboardingPhone')}
        style={styles.btn}
        mode="contained"
        theme={{roundness: 20}}>
        Signup
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  btn: {
    width: Dimensions.get('window').width / 1.5,
    justifyContent: 'center',
    padding: 3,
    alignSelf: 'center',
    marginVertical: 25,
  },
});

export default withTheme(Onboarding);
