import React, {Component} from 'react';
import {Text, View, SafeAreaView, FlatList, StyleSheet} from 'react-native';
import {Header, Card, Divider, Avatar, SearchBar} from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-ionicons';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import {connect} from 'react-redux';
import {REACT_APP_URL} from 'react-native-dotenv';
const url = `${REACT_APP_URL}`;
import {
  gettransactions,
  updatetransactions,
} from '../../redux/actions/transaction';
import {userhistory} from '../../redux/actions/user';
class AllTransactions extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      dataTransactions: [],
      refreshing: false,
      page: 1,
      sort: 0,
      search: '',
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    // don't forget to compare the props
    if (
      this.props.transactions.isSuccess !== prevProps.transactions.isSuccess
    ) {
      this.fetchData();
    }
  }

  prosesTransaction = async (id) => {
    this.setState({refreshing: true});
    const data = {
      statusid: 1,
    };
    await this.props.updatetransactions(id, data);
    this.fetchData();
    this.setState({refreshing: false});
  };

  fetchData = async () => {
    await this.props
      .gettransactions(
        `sort=${this.state.sort}&limit=5&page=${this.state.page}`,
      )
      .then((response) => {
        const {dataTransactions, isLoading} = this.props.transactions;
        this.setState({
          dataTransactions: this.state.dataTransactions.concat(
            dataTransactions,
          ),
          isLoading,
        });
      })
      .catch((error) => {
        this.setState({dataTransactions: [], isLoading: false});
      });
  };

  onRefresh = async () => {
    this.setState({page: 1});
    await this.props.gettransactions(`limit=5&page=${this.state.page}`);
    const {dataTransactions, isLoading} = this.props.transactions;
    this.setState({
      dataTransactions,
      isLoading,
    });
  };

  rightSwipeOutButtons(id) {
    return [
      /*     {
        text: 'Remove',
        backgroundColor: '#FF4500',
        color: '#FFF',
      }, */
      {
        onPress: () => this.prosesTransaction(id),
        text: 'Return Book',
        backgroundColor: '#7FFF00',
        color: '#000',
      },
    ];
  }

  updateSearch = (search) => {
    this.setState({search});
  };

  // Handle searchbar
  handleSearch = async (e) => {
    const {search} = this.state;
    await this.props.gettransactions(
      'limit=20&search='.concat(search.toLowerCase()),
    );
    const {dataTransactions, isLoading} = this.props.transactions;
    this.setState({dataTransactions, isLoading});
  };

  handleSearchClear = async (e) => {
    await this.props.gettransactions('search='.concat(''));
    const {dataTransactions, isLoading} = this.props.transactions;
    this.setState({dataTransactions, isLoading});
  };

  loadMore = () => {
    this.setState({page: this.state.page + 1}, () => {
      this.fetchData({page: this.state.page});
    });
  };

  renderItem = ({item}) => (
    <Swipeout
      right={this.rightSwipeOutButtons(item.id)}
      backgroundColor={'transparent'}
      close>
      <View style={TransactionStyle.item}>
        <View style={TransactionStyle.pictureWrapper}>
          <Avatar
            rounded
            size="large"
            source={{
              uri: url + item.picture,
            }}
          />
          {console.log(item)}
        </View>
        <View style={TransactionStyle.Wrapper}>
          <View style={TransactionStyle.WrapperText}>
            <Text style={TransactionStyle.textName}>{item.name}</Text>
            <View style={TransactionStyle.status}>
              <Text style={{color: 'white'}}>{item.statusName}</Text>
            </View>
          </View>
          <View style={TransactionStyle.titlebook}>
            <Text>Tittle Book: {item.title}</Text>
          </View>
          <View style={TransactionStyle.date}>
            <Text>{moment(item.transaction_date).format('yyyy-MM-DD')}</Text>
          </View>
        </View>
      </View>
      <Divider style={{backgroundColor: 'grey'}} />
    </Swipeout>
  );

  render() {
    const {dataTransactions, isLoading} = this.state;
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
        <SearchBar
          platform="ios"
          placeholder="Type Here..."
          value={this.state.search}
          onChangeText={(search) => this.setState({search})}
          returnKeyType={'search'}
          onSubmitEditing={this.handleSearch}
          onCancel={this.handleSearchClear}
          onClear={this.handleSearchClear}
        />
        <View>
          <View style={TransactionStyle.sort}>
            <DropDownPicker
              placeholder="Sort"
              items={[
                {label: 'A-z', value: 1},
                {label: 'Z-a', value: 0},
              ]}
              defaultIndex={0}
              containerStyle={{width: 100, height: 40}}
              onChangeItem={() => this.fetchData({sort: 1})}
            />
          </View>
          {dataTransactions.length !== 0 && (
            <FlatList
              data={dataTransactions}
              keyExtractor={(item) => item.id}
              onRefresh={this.loadMore}
              refreshing={isLoading}
              renderItem={this.renderItem}
              onEndReached={this.loadMore}
              onEndReachedThreshold={0.5}
            />
          )}
          {dataTransactions.length === 0 && (
            <Card>
              <Text>No have a transaction</Text>
            </Card>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  transactions: state.transactions,
  users: state.users,
  auth: state.auth,
});

const mapDispatchToProps = {
  gettransactions,
  userhistory,
  updatetransactions,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllTransactions);

const TransactionStyle = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
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
  Wrapper: {
    justifyContent: 'center',
    width: 250,
  },
  WrapperText: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  date: {
    marginTop: 10,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  titlebook: {
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'column',
  },
  textName: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  status: {
    alignItems: 'center',
    backgroundColor: '#fa8231',
    width: 70,
    height: 20,
    borderRadius: 5,
  },
  sort: {
    marginRight: 15,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
});
