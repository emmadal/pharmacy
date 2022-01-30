import React, {useContext, useRef, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  ScrollView,
  LogBox,
} from 'react-native';
import {
  withTheme,
  Paragraph,
  Avatar,
  Title,
  Subheading,
  Card,
  Divider,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import {withTranslation} from 'react-i18next';
import RBSheet from 'react-native-raw-bottom-sheet';
import {UserContext} from '../context';
import {logout} from '../api';

LogBox.ignoreLogs(['Sending...']);

const ProfileScreen = ({t, theme}: any) => {
  const {colors} = theme;
  const refRBSheet = useRef();
  const {user, setUser} = useContext(UserContext);

  const handleLogout = useCallback(() => {
    logout().then(() => setUser(null));
  }, [setUser]);

  return (
    <ScrollView
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Avatar.Image
            size={100}
            source={{
              uri: 'https://c6oxm85c.cloudimg.io/width/700/png-lossless.fgaussian0.foil1/https://az617363.vo.msecnd.net/imgmodels/models/MD10004352/large-1469788720-2318efb4af494297475f048c7f775d9a.jpg',
            }}
          />
        </TouchableOpacity>
        <View style={styles.userNameContainer}>
          <Title style={styles.userName}>{user?.fullName}</Title>
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
        <TouchableOpacity style={styles.optionContainer}>
          <Title style={styles.titleOptions}>
            <Icon name="lock" size={25} color={colors.placeholder} />
            {'  '}
            {t('Privacy')}
          </Title>
          <Icon
            color={colors.warning}
            style={styles.iconOptions}
            name="chevron-right"
            size={20}
          />
        </TouchableOpacity>
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
        height={450}
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
          {/* <EditProfile /> */}
        </ScrollView>
      </RBSheet>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 30 : 20,
    paddingHorizontal: 20,
  },
  optionView: {
    marginBottom: 40,
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
