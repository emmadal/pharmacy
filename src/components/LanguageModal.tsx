import React, {useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, TouchableOpacity} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {withTheme, Title, Portal, Modal} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {withTranslation} from 'react-i18next';
import {LocaleContext} from '../context';

const LanguageModal = ({t, theme, isModal, setIsModal}: any) => {
  const {colors} = theme;
  const {locale, setLocale}: any = useContext(LocaleContext);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: t('English'), value: 'en'},
    {label: t('French'), value: 'fr'},
  ]);

  useEffect(() => {
    AsyncStorage.setItem('@locale', `${locale}`).then(() => {
      AsyncStorage.getItem('@locale').then((e: any) => {
        setLocale(e);
      });
    });
  }, [locale, setLocale]);

  const onPressLanguage = (e: any) => setLocale(e);

  return (
    <Portal>
      <Modal
        contentContainerStyle={styles.containerStyle}
        visible={isModal}
        dismissable={false}
        overlayAccessibilityLabel="close modal">
        <TouchableOpacity
          onPress={() => setIsModal(!isModal)}
          style={styles.closeIcon}>
          <Icon name="close" size={25} color={colors.black} />
        </TouchableOpacity>
        <Title>{t('Please choose your language')}</Title>
        <DropDownPicker
          open={open}
          value={locale}
          items={items}
          setOpen={setOpen}
          setValue={setLocale}
          setItems={setItems}
          onChangeValue={itemValue => onPressLanguage(itemValue)}
          containerStyle={styles.pickerStyle}
          translation={{
            PLACEHOLDER: t('Language'),
          }}
        />
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {},
  containerStyle: {
    backgroundColor: 'white',
    padding: 25,
    marginHorizontal: 10,
  },
  modalContent: {
    marginTop: 20,
    padding: 15,
  },
  closeIcon: {
    alignSelf: 'flex-end',
  },
  pickerStyle: {
    marginTop: 20,
  },
  modalSubContent: {
    paddingHorizontal: 0,
    paddingTop: 30,
  },
});

export default withTranslation()(withTheme(LanguageModal));
