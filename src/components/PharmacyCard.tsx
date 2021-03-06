import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {withTheme, Card, Title} from 'react-native-paper';
import {withTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

const PharmacyCard = ({item, theme}: any) => {
  const navigation = useNavigation();
  const {colors} = theme;

  const goToDetails = () => navigation.navigate('Pharmacy', {item});

  return (
    <TouchableOpacity style={styles.container} onPress={goToDetails}>
      <Card style={[styles.card, {backgroundColor: colors.warning}]}>
        <Card.Cover source={{uri: item?.cover}} style={styles.image} />
        <Title style={styles.text}>{item?.name}</Title>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    height: 170,
    margin: 10,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 23,
    paddingLeft: 17,
    fontFamily: 'ProductSans-Bold',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default withTranslation()(withTheme(PharmacyCard));
