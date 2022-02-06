import React from 'react';
import {Text, StyleSheet, Alert, Platform, View, Pressable} from 'react-native';
import {useTheme, Card, Caption} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

const Item = ({item}) => {
  const {colors} = useTheme();

  const onPressFunction = () => {
    Alert.alert('What do you want', 'select one of these options', [
      {
        text: 'Select as default address',
        onPress: () => {},
      },
      {
        text: 'Delete address',
        onPress: () => console.log('address deleted'),
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  return (
    <Pressable
      onLongPress={onPressFunction}
      style={styles.cardAddressContainer}>
      <Card
        style={[
          styles.cardAddres,
          {borderColor: item.default ? colors.warning : colors.surface},
        ]}>
        <Card.Content style={styles.cardContent}>
          {item.defaultAddress ? (
            <Icon name="checkcircle" color={colors.warning} size={25} />
          ) : null}
          <View>
            <Text style={[styles.addressRoad, {color: colors.placeholder}]}>
              {item.district}
            </Text>
            <Caption style={styles.addressCity}>{item.city}</Caption>
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  );
};

const RenderShippingAddress = ({item}) => {
  return <Item item={item} />;
};

const styles = StyleSheet.create({
  cardAddressContainer: {
    marginHorizontal: 13,
    paddingHorizontal: 5,
    paddingTop: Platform.OS === 'ios' ? 20 : 10,
  },
  cardAddres: {
    borderRadius: 40,
    borderWidth: 2,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressRoad: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  addressCity: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default RenderShippingAddress;
