import React, {useState, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, LogBox} from 'react-native';
import {TextInput, withTheme, Button, Avatar} from 'react-native-paper';
import {withTranslation} from 'react-i18next';
import {UserContext} from '../context';

LogBox.ignoreLogs(['Sending...']);

const EditProfile = ({t, theme}: any) => {
  const {user} = useContext(UserContext);
  const [name, setName] = useState(user?.fullName);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [phone, setPhone] = useState(user?.phoneNumber ?? '');
  const [loading, setLoading] = useState(false);
  const {colors} = theme;

  const secureTextEntry = () => setSecure(!secure);
  const handleSubmit = () => setLoading(!loading);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TouchableOpacity style={styles.img}>
          <Avatar.Image
            size={80}
            source={{
              uri: 'https://c6oxm85c.cloudimg.io/width/700/png-lossless.fgaussian0.foil1/https://az617363.vo.msecnd.net/imgmodels/models/MD10004352/large-1469788720-2318efb4af494297475f048c7f775d9a.jpg',
            }}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          disabled
          value={email}
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
          textContentType="oneTimeCode"
          autoCapitalize="none"
          value={phone}
          label={t('Phone number')}
          onChangeText={text => setPhone(text)}
          right={<TextInput.Icon name="phone" color={colors.primary} />}
        />
        <TextInput
          style={styles.input}
          maxLength={8}
          secureTextEntry={true}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoCapitalize="none"
          value={password}
          label={t('New password')}
          onChangeText={text => setPassword(text)}
          right={
            <TextInput.Icon
              name={secure ? 'eye-slash' : 'eye'}
              color={colors.primary}
              onPress={secureTextEntry}
            />
          }
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
    marginBottom: 30,
  },
});

export default withTranslation()(withTheme(EditProfile));
