import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {withTheme, Card, Title} from 'react-native-paper';
import {withTranslation} from 'react-i18next';

const PharmacyCard = ({item, theme}: any) => {
  const {colors} = theme;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => console.log(item)}>
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
