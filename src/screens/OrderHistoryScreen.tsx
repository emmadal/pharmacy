import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  SafeAreaView,
  LogBox,
} from 'react-native';
import {Text, Card, withTheme, DataTable, Divider} from 'react-native-paper';
import {withTranslation} from 'react-i18next';
import {orders} from '../data/orders';

LogBox.ignoreLogs(['Sending...']);

const OrderHistoryScreen = ({t, theme}: any) => {
  const {colors} = theme;
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      {orders.map(item => (
        <TouchableOpacity key={item.id} style={styles.cardOrderHistory}>
          <Card>
            <Card.Content>
              <Text style={styles.orderHistoryTitle}>
                {t('Ordered on ')}
                {item.orderDate}
              </Text>
              <View style={styles.orderStatusContainer}>
                <Text>
                  {t('Order')} #{item.orderId}
                </Text>
                <Text
                  style={[
                    styles.orderStatus,
                    {
                      color:
                        item.status === 'Pending'
                          ? colors.danger
                          : item.status === 'Delivered'
                          ? colors.primary
                          : item.status === 'Accepted'
                          ? colors.warning
                          : colors.placeholder,
                    },
                  ]}>
                  {t(item.status)}
                </Text>
              </View>
              <DataTable>
                <DataTable.Header style={styles.tableHead}>
                  <DataTable.Title>{t('Items')}</DataTable.Title>
                  <DataTable.Title numeric>{t('Qte')}</DataTable.Title>
                  <DataTable.Title numeric>{t('Amount')}</DataTable.Title>
                </DataTable.Header>
                {item.drugs.map(drug => (
                  <SafeAreaView key={drug.id}>
                    <DataTable.Row style={styles.tableHead}>
                      <DataTable.Cell>
                        <View>
                          <Text style={styles.tableCell}>{drug.name}</Text>
                        </View>
                      </DataTable.Cell>
                      <DataTable.Cell numeric style={styles.tableCell}>
                        <View>
                          <Text style={styles.tableCell}>{drug.qte}</Text>
                        </View>
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        <View>
                          <Text style={styles.tableCell}>${drug.price}</Text>
                        </View>
                      </DataTable.Cell>
                    </DataTable.Row>
                  </SafeAreaView>
                ))}
                <Divider
                  style={[styles.divider, {borderColor: colors.placeholder}]}
                />
              </DataTable>
              <View style={styles.paymentContainer}>
                <Text style={styles.paymentText}>{t(item.paymentMethod)}</Text>
                <Text style={[styles.paymentTotal, {color: colors.warning}]}>
                  $20.00
                </Text>
              </View>
              <Text>{t('Thank you for your order. Good recovery !')}</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    paddingHorizontal: 18,
  },
  orderHistoryTitle: {
    fontWeight: 'bold',
  },
  orderStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  cardOrderHistory: {
    marginVertical: 13,
  },
  orderStatus: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  paymentText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  paymentTotal: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  divider: {
    borderWidth: 0.8,
  },
  tableHead: {
    borderBottomColor: 'transparent',
  },
  tableCell: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  paymentContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
});

export default withTranslation()(withTheme(OrderHistoryScreen));
