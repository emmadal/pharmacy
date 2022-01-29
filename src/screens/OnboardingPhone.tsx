import React, {useState, useRef} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Text, withTheme, Button} from 'react-native-paper';
import PhoneInput from 'react-native-phone-number-input';

const OnboardingPhone = ({theme, navigation}: any) => {
  const [phoneValue, setPhoneValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const phoneInput = useRef<PhoneInput>(null);
  const {colors} = theme;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to drug delivery app</Text>
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
        labelStyle={{color: colors.white}}
        onPress={() =>
          navigation.navigate('OnboardingUserName', {
            phoneNumber: formattedValue,
          })
        }
        style={styles.btn}
        mode="contained"
        theme={{roundness: 20}}>
        Next
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
  },
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  btn: {
    width: Dimensions.get('window').width / 2,
    padding: 4,
    alignSelf: 'center',
    marginTop: 30,
  },
});

export default withTheme(OnboardingPhone);
