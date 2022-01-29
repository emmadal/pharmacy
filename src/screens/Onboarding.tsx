import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {withTranslation} from 'react-i18next';
import {Button, withTheme} from 'react-native-paper';

const Onboarding = ({t, theme, navigation}: any) => {
  const {colors} = theme;
  return (
    <View style={styles.container}>
      <Button
        labelStyle={[{color: colors.white}, styles.labelStyle]}
        mode="contained"
        onPress={() => navigation.navigate('Login')}
        style={styles.btn}
        theme={{roundness: 20}}>
        {t('Sign In')}
      </Button>
      <Button
        labelStyle={[{color: colors.white}, styles.labelStyle]}
        onPress={() => navigation.navigate('OnboardingPhone')}
        style={styles.btn}
        mode="contained"
        theme={{roundness: 20}}>
        {t('Sign Up')}
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
  labelStyle: {
    fontFamily: 'ProductSans-Medium',
    fontSize: 18,
  },
});

export default withTranslation()(withTheme(Onboarding));
