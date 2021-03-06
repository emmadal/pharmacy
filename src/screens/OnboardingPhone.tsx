import React, {useState, useRef} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Text, withTheme, Button} from 'react-native-paper';
import {withTranslation} from 'react-i18next';
import PhoneInput from 'react-native-phone-number-input';

const OnboardingPhone = ({t, theme, navigation}: any) => {
  const [phoneValue, setPhoneValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const phoneInput = useRef<PhoneInput>(null);
  const {colors} = theme;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('Welcome to drug delivery app')}</Text>
      <PhoneInput
        ref={phoneInput}
        defaultValue={phoneValue}
        defaultCode="CI"
        layout="first"
        onChangeText={text => setPhoneValue(text)}
        containerStyle={styles.phoneInputStyle}
        onChangeFormattedText={text => setFormattedValue(text)}
        withShadow={true}
        autoFocus
      />
      <Button
        disabled={phoneInput?.current?.isValidNumber(phoneValue) ? false : true}
        labelStyle={[{color: colors.white}, styles.labelStyle]}
        onPress={() =>
          navigation.navigate('OnboardingUserName', {
            phoneNumber: formattedValue,
          })
        }
        style={styles.btn}
        mode="contained"
        theme={{roundness: 20}}>
        {t('Next')}
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
    marginHorizontal: 30,
    width: 'auto',
    marginTop: 15,
    fontFamily: 'ProductSans-Regular',
  },
  header: {
    textAlign: 'center',
    fontSize: 23,
    fontFamily: 'ProductSans-Bold',
  },
  btn: {
    width: Dimensions.get('window').width / 2,
    padding: 4,
    alignSelf: 'center',
    marginTop: 30,
  },
  labelStyle: {
    fontFamily: 'ProductSans-Medium',
    fontSize: 18,
  },
});

export default withTranslation()(withTheme(OnboardingPhone));
