import React from 'react';
import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import {withTranslation} from 'react-i18next';
import {Headline, withTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const OrdinanceUpload = ({t, theme}: any) => {
  const {colors} = theme;
  return (
    <View style={styles.modalSubContent}>
      <TouchableOpacity style={styles.kycUploadField} onPress={() => ''}>
        <Icon name="cloud-upload-outline" color={colors.warning} size={80} />
        <Headline style={styles.title}>{t('Upload ordinance here !')}</Headline>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: 'ProductSans-Bold',
  },
  modalSubContent: {
    marginTop: 20,
  },
  kycUploadField: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderStyle: 'dashed',
    borderColor: '#e67e22',
    borderWidth: 2,
    width: Dimensions.get('window').width / 1.1,
    padding: 10,
  },
});

export default withTranslation()(withTheme(OrdinanceUpload));
