import React from 'react';
import {StyleSheet, Platform, SafeAreaView} from 'react-native';
import {withTheme} from 'react-native-paper';
import {withTranslation} from 'react-i18next';
import EmptyOrder from '../components/EmptyOrder';

const OrderScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <EmptyOrder />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 10,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
});

export default withTranslation()(withTheme(OrderScreen));
