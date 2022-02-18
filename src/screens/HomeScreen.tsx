import React from 'react';
import {View, StyleSheet, Dimensions, Platform, FlatList} from 'react-native';
import {withTranslation} from 'react-i18next';
import {withTheme} from 'react-native-paper';
import PharmacyCard from '../components/PharmacyCard';
import {pharmacy} from '../data/pharmacy';
import {PharmacyTypes} from '../types';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={pharmacy}
        renderItem={({item}) => <PharmacyCard item={item} />}
        keyExtractor={(item: PharmacyTypes) => item.id}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:
      Platform.OS === 'ios' ? Dimensions.get('screen').height / 10 : 15,
  },
});

export default withTranslation()(withTheme(HomeScreen));
