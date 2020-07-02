import React, {Component} from 'react';
import {Platform, StyleSheet, View, FlatList} from 'react-native';
import {
  colors,
  SearchBar,
  ListItem,
  Badge,
  Header,
} from 'react-native-elements';
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

  keyExtractor = (item) => String(item.id);

  renderItem = ({item}) => (
    <ListItem
      title={`${item.firstName}`}
      subtitle={item.job}
      bottomDivider={true}
    />
  );

  render() {
    const {search} = this.state;
    return (
      <View style={detailBookStyle.container}>
        <Header
          leftComponent={{icon: 'arrow-back', color: '#fff'}}
          centerComponent={{
            text: 'History Transaction',
            style: {color: '#fff'},
          }}
          rightComponent={{icon: 'home', color: '#fff'}}
        />
        <SearchBar
          platform="android"
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
        />
        <View>
          <FlatList
            data={data}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  }
}

const theme = {
  color: {
    ...Platform.select({
      default: colors.platform.android,
      ios: colors.platform.ios,
    }),
  },
  Button: {
    buttonStyle: {
      backgroundColor: 'green',
    },
    containerStyle: {
      marginTop: 5,
      width: 200,
      borderRadius: 5,
    },
  },
};

const data = [
  {
    id: 1,
    firstName: 'Name Book',
    job: 'Status Transaction',
  },
  {
    id: 2,
    firstName: 'Name Book',
    job: 'Status Transaction',
  },
  {
    id: 3,
    firstName: 'Name Book',
    job: 'Status Transaction',
  },
  {
    id: 4,
    firstName: 'Name Book',
    job: 'Status Transaction',
  },
  {
    id: 5,
    firstName: 'Name Book',
    job: 'Status Transaction',
  },
  {
    id: 6,
    firstName: 'Name Book',
    job: 'Status Transaction',
  },
  {
    id: 7,
    firstName: 'Name Book',
    job: 'Status Transaction',
  },
  {
    id: 8,
    firstName: 'Name Book',
    job: 'Status Transaction',
  },
  {
    id: 9,
    firstName: 'Name Book',
    job: 'Status Transaction',
  },
  {
    id: 10,
    firstName: 'Name Book',
    job: 'Status Transaction',
  },
];

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
  avatar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  biodata: {
    marginTop: 10,
    alignItems: 'center',
  },
  baseText: {
    color: 'white',
    fontSize: 15,
  },
  actionBack: {
    flexDirection: 'row',
    margin: 15,
    justifyContent: 'space-between',
  },
  bookImg: {
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 200,
    marginBottom: 12,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  bookTitle: {
    fontSize: 20,
    color: 'white',
  },
  btnBorrow: {
    marginTop: 50,
    alignItems: 'center',
  },
});
