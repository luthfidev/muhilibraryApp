import React, {Component} from 'react';
import {Text, View, SafeAreaView, StyleSheet} from 'react-native';
import {Header} from 'react-native-elements';
import Icon from 'react-native-ionicons';
export default class AllTransactions extends Component {
  navigateProses = () => {
    this.props.navigation.navigate('proses');
  };
  render() {
    return (
      <SafeAreaView style={TransactionStyle.container}>
        <Header
          leftComponent={
            <Icon
              name="arrow-back"
              color="#fff"
              onPress={this.navigateProses}
            />
          }
          centerComponent={{
            text: 'All Transaction',
            style: {color: '#fff'},
          }}
        />
        <View>
          <Text> textInComponent </Text>
        </View>
      </SafeAreaView>
    );
  }
}

const TransactionStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
});
