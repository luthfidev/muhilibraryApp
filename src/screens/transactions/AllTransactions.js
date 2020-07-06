import React, {Component} from 'react';
import {Text, View, SafeAreaView, FlatList, StyleSheet} from 'react-native';
import {Header, ListItem, Divider, Avatar} from 'react-native-elements';
import Icon from 'react-native-ionicons';
import moment from 'moment';
import {connect} from 'react-redux';
import {gettransactions} from '../../redux/actions/transaction';
class AllTransactions extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      dataTransactions: [],
      refreshing: false,
      currentPage: 1,
      search: '',
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    await this.props.gettransactions(
      'limit=20page='.concat(this.state.currentPage),
    );
    const {dataTransactions, isLoading} = this.props.transactions;
    this.setState({dataTransactions, isLoading});
  };

  nextPage = () => {
    this.setState({currentPage: this.state.currentPage + 1}, () => {
      this.fetchData({page: this.state.currentPage});
    });
  };

  /*   _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchData(this.state.currentPage).then(() => {
      this.setState({refreshing: false});
    });
  }; */

  nextPage = () => {
    this.setState({currentPage: this.state.currentPage + 1}, () => {
      this.fetchData({page: this.state.currentPage});
    });
  };

  renderItem = ({item}) => (
    <>
      <View style={TransactionStyle.item}>
        <View style={TransactionStyle.pictureWrapper}>
          <Avatar
            rounded
            size="large"
            source={{
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            }}
          />
        </View>
        <View style={TransactionStyle.textWrapper}>
          <Text style={TransactionStyle.textName}>{item.name}</Text>
          <Text style={TransactionStyle.textName}>
            {moment(item.transaction_date).format('yyyy-MM-DD')}
          </Text>
          <View style={TransactionStyle.status}>
            <Text style={{color: 'white'}}>{item.statusName}</Text>
          </View>
        </View>
      </View>
      <Divider style={{backgroundColor: 'grey'}} />
    </>
  );

  render() {
    const {search, currentPage, dataTransactions, isLoading} = this.state;
    return (
      <SafeAreaView style={TransactionStyle.container}>
        <Header
          leftComponent={
            <Icon
              name="arrow-back"
              color="#fff"
              onPress={() => this.props.navigation.goBack()}
            />
          }
          centerComponent={{
            text: 'All Transaction',
            style: {color: '#fff'},
          }}
        />
        <View>
          <FlatList
            data={dataTransactions}
            keyExtractor={(item) => item.id}
            onRefresh={() => this.fetchData({page: currentPage})}
            refreshing={isLoading}
            renderItem={this.renderItem}
            onEndReached={this.nextPage}
            onEndReachedThreshold={0.5}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  transactions: state.transactions,
});

const mapDispatchToProps = {
  gettransactions,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllTransactions);

const TransactionStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height: 65,
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 30,
    margin: 15,
  },
  pictureWrapper: {
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  textWrapper: {
    justifyContent: 'center',
  },
  textName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  status: {
    alignItems: 'center',
    backgroundColor: '#fa8231',
    width: 70,
    height: 20,
    borderRadius: 5,
  },
});
