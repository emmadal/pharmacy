import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  LogBox,
} from 'react-native';
import {
  withTheme,
  Headline,
  Divider,
  Subheading,
  Button,
  Text,
} from 'react-native-paper';
import {withTranslation} from 'react-i18next';
import SlideImage from '../components/SlideImage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import OrdinanceUpload from '../components/OrdinanceUpload';

LogBox.ignoreLogs(['Sending...']);

const PharmacyScreen = ({t, theme, route}: any) => {
  const {item} = route.params;
  const [liked, setLiked] = useState(false);
  const {colors} = theme;

  const addToFavourite = () => setLiked(!liked);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <SafeAreaView style={styles.container}>
        <SlideImage CarouselItem={[item?.cover]} />
        <View style={styles.content}>
          <View style={styles.header}>
            <View>
              <Headline style={styles.title}>{item.name}</Headline>
              <Subheading style={styles.subtitle}>{item?.address}</Subheading>
            </View>
            <TouchableOpacity onPress={addToFavourite}>
              <Icon
                name={liked ? 'heart' : 'heart-outline'}
                size={40}
                color={colors.warning}
              />
            </TouchableOpacity>
          </View>
          <Divider />
          <View style={styles.descriptionContent}>
            <Headline style={styles.title}>{t('Pharmacy Details')}</Headline>
            <View style={styles.services}>
              <Icon size={25} name="email" color={colors.warning} />
              <Text style={styles.servicesText}>
                emmanueldalougou@gmail.com
              </Text>
            </View>
            <View style={styles.services}>
              <Icon size={25} name="phone" color={colors.warning} />
              <Text style={styles.servicesText}>
                {item?.phoneNumber} | {item?.phoneNumber}
              </Text>
            </View>
            <View style={styles.services}>
              <Icon size={25} name="doctor" color={colors.warning} />
              <Text style={styles.servicesText}>Dr AKOBE CATHERINE</Text>
            </View>
          </View>
          <Divider />
          <OrdinanceUpload />
          {/* <Button
            icon="stethoscope"
            labelStyle={{color: colors.white}}
            onPress={addToBasket}
            style={styles.btn}
            mode="contained"
            theme={{roundness: 20}}>
            {t('Ask doctor')}
          </Button> */}
        </View>
        <Button
          icon="send"
          labelStyle={{color: colors.white}}
          onPress={() => ''}
          style={styles.btn}
          mode="contained"
          theme={{roundness: 20}}>
          {t('Place order')}
        </Button>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: Platform.OS === 'ios' ? 20 : 15,
  },
  btn: {
    padding: 4,
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 15,
  },
  servicesContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  services: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  servicesText: {
    fontSize: 16,
    fontFamily: 'ProductSans-Regular',
    paddingLeft: 5,
  },
  title: {
    fontSize: 20,
    fontFamily: 'ProductSans-Bold',
  },
  subtitle: {
    fontFamily: 'ProductSans-Regular',
  },
  content: {
    padding: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 13,
  },
  descriptionContent: {
    marginTop: 10,
    marginBottom: 15,
  },
});

export default withTranslation()(withTheme(PharmacyScreen));
