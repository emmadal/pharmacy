import React, {useContext, useRef, useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  ScrollView,
  LogBox,
  Alert,
} from 'react-native';
import {
  withTheme,
  Paragraph,
  Avatar,
  Title,
  Subheading,
  Card,
  Divider,
  Switch,
} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Entypo';
import {withTranslation} from 'react-i18next';
import RBSheet from 'react-native-raw-bottom-sheet';
import {UserContext, ThemeContext} from '../context';
import {logout, updateProfile, uploadFile} from '../api';
import EditProfile from '../components/EditProfile';
import Loader from '../components/Loader';
import LanguageModal from '../components/LanguageModal';

LogBox.ignoreLogs(['Sending...']);

const ProfileScreen = ({t, theme}: any) => {
  const {colors} = theme;
  const refRBSheet = useRef();
  const [loading, setLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const {user, setUser}: any = useContext(UserContext);
  const {toggleTheme, isThemeDark}: any = useContext(ThemeContext);

  const handleLogout = useCallback(() => {
    logout().then(() => setUser(null));
  }, [setUser]);

  const handleUploadImage = async () => {
    try {
      const pic = await launchImageLibrary({mediaType: 'photo'});
      setLoading(!loading);
      if (pic.assets) {
        const photoURL = await uploadFile({
          uri: pic?.assets[0].uri,
          fileName: pic?.assets[0].fileName,
        });
        if (photoURL) {
          const doc = await updateProfile(user, {photoURL});
          setUser(doc);
          setLoading(false);
        }
      } else {
        Alert.alert(t('Operation cancelled'));
        setLoading(false);
        return;
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getFirstLetterOfName = () => {
    const matches = user?.fullName.match(/\b(\w)/g);
    return matches.join('');
  };

  const handleLanguage = () => setIsModal(!isModal);

  return (
    <ScrollView
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <Loader loading={loading} />
      <LanguageModal isModal={isModal} setIsModal={setIsModal} />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleUploadImage}>
          {user?.photoURL ? (
            <Avatar.Image
              size={80}
              source={{
                uri: user?.photoURL,
              }}
            />
          ) : (
            <Avatar.Text
              color={colors.white}
              size={80}
              label={getFirstLetterOfName()}
            />
          )}
        </TouchableOpacity>
        <View style={styles.userNameContainer}>
          <Title style={styles.userName}>{user?.fullName}</Title>
          <Subheading>{user?.phoneNumber}</Subheading>
          <TouchableOpacity onPress={() => refRBSheet?.current?.open()}>
            <Subheading style={{color: colors.primary}}>
              {t('Edit profile')}
            </Subheading>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <TouchableOpacity onPress={() => ''}>
          <Card style={styles.profileCard}>
            <Card.Content>
              <Icon name="heart" size={25} color={colors.warning} />
              <Title style={styles.cardTitle}>19</Title>
              <Paragraph>{t('Favourites lists')}</Paragraph>
            </Card.Content>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => ''}>
          <Card style={styles.profileCard}>
            <Card.Content>
              <Icon name="shopping-cart" size={25} color={colors.warning} />
              <Title style={styles.cardTitle}>19</Title>
              <Paragraph>{t('Total orders')}</Paragraph>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </View>
      <Divider />
      <View style={styles.optionView}>
        <TouchableOpacity style={styles.optionContainer}>
          <Title style={styles.titleOptions}>
            <Icon name="credit-card" size={25} color={colors.placeholder} />
            {'  '}
            {t('Payment methods')}
          </Title>
          <Icon
            color={colors.warning}
            style={styles.iconOptions}
            name="chevron-right"
            size={20}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionContainer} onPress={() => ''}>
          <Title style={styles.titleOptions}>
            <Icon name="location-pin" size={25} color={colors.placeholder} />
            {'  '}
            {t('Shipping address')}
          </Title>
          <Icon
            color={colors.warning}
            style={styles.iconOptions}
            name="chevron-right"
            size={20}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={handleLanguage}>
          <Title style={styles.titleOptions}>
            <Icon name="globe" size={25} color={colors.placeholder} />
            {'  '}
            {t('Language')}
          </Title>
          <Icon
            color={colors.warning}
            style={styles.iconOptions}
            name="chevron-right"
            size={20}
          />
        </TouchableOpacity>
        <Divider />
        <View style={styles.optionContainer}>
          <Title style={styles.titleOptions}>
            <Icon name="moon" size={25} color={colors.placeholder} />
            {'  '}
            {t('Dark mode')}
          </Title>
          <Switch
            color={colors.warning}
            value={isThemeDark}
            onValueChange={toggleTheme}
          />
        </View>
        <Divider />
        <TouchableOpacity style={styles.optionContainer} onPress={handleLogout}>
          <Title style={styles.titleOptions}>
            <Icon name="remove-user" size={25} color={colors.placeholder} />
            {'  '}
            {t('Logout')}
          </Title>
          <Icon name="log-out" size={25} color={colors.warning} />
        </TouchableOpacity>
      </View>
      <RBSheet
        animationType="slide"
        height={400}
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <EditProfile />
        </ScrollView>
      </RBSheet>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 40 : 30,
    paddingHorizontal: 20,
  },
  optionView: {
    marginBottom: 40,
  },
  modal: {
    marginHorizontal: 10,
  },
  optionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 17,
  },
  titleOptions: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  iconOptions: {
    alignSelf: 'center',
    marginTop: 5,
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 30,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  profileCard: {
    borderRadius: 20,
    width: Dimensions.get('window').width / 2.4,
  },
  userNameContainer: {
    marginLeft: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  subHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default withTranslation()(withTheme(ProfileScreen));
