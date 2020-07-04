import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header} from 'react-native-elements';
import Icon from 'react-native-ionicons';
export default class History extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
  }
  updateSearch = (search) => {
    this.setState({search});
  };

  /*   keyExtractor = (item) => String(item.id);
  renderItem = ({item}) => (
    <ListItem
      title={`${item.firstName}`}
      subtitle={item.job}
      bottomDivider={true}
    />
  ); */

  navigateAllTransactions = () => {
    this.props.navigation.navigate('alltransactions');
  };

  render() {
    return (
      <View style={detailBookStyle.container}>
        <Header
          centerComponent={{
            text: 'Transaction',
            style: {color: '#fff'},
          }}
          rightComponent={
            <Icon
              name="paper"
              color="#fff"
              onPress={this.navigateAllTransactions}
            />
          }
        />
        <View>
          {/*  <FlatList
            data={data}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          /> */}
        </View>
      </View>
    );
  }
}
const detailBookStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  header: {
    backgroundColor: '#00a8ff',
    height: 400,
    shadowColor: '#dcdde1',
  },
});
