import React from 'react';
import {View, StyleSheet} from 'react-native';
import {withTheme, Title, Paragraph} from 'react-native-paper';
import {withTranslation} from 'react-i18next';

const EmptyOrder = ({t, theme}: any) => {
  const {colors} = theme;
  return (
    <View style={styles.container}>
      <Title style={[styles._title, {color: colors.primary}]}>
        {t('There is no current order')}
      </Title>
      <Paragraph style={styles._paragraph}>
        {t('Your cart is empty. Please add a few items.')}
      </Paragraph>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  _title: {
    fontSize: 25,
    fontFamily: 'ProductSans-Bold',
  },
  _paragraph: {
    textAlign: 'center',
    fontFamily: 'ProductSans-Light',
  },
});

export default withTranslation()(withTheme(EmptyOrder));
