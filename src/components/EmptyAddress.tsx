import React from 'react';
import {View, StyleSheet} from 'react-native';
import {withTheme, Title, Paragraph} from 'react-native-paper';
import {withTranslation} from 'react-i18next';

const EmptyAddress = ({t, theme}: any) => {
  const {colors} = theme;
  return (
    <View style={styles.container}>
      <Title style={[styles._title, {color: colors.primary}]}>
        {t("We're waiting for your address")}
      </Title>
      <Paragraph style={styles._paragraph}>
        {t('Let us pack something special for you.')}
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
    fontWeight: 'bold',
  },
  _paragraph: {
    textAlign: 'center',
  },
});

export default withTranslation()(withTheme(EmptyAddress));
