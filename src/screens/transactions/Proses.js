import React, {Component} from 'react';
import {
  Text,
  ActivityIndicator,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from 'react-native';
import {Header, Divider, Avatar, Card} from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-ionicons';
import moment from 'moment';
import {REACT_APP_URL} from 'react-native-dotenv';
const url = `https://api-muhilibrary.herokuapp.com/`;
import {connect} from 'react-redux';
import {
  gettransactions,
  updatetransactions,
} from '../../redux/actions/transaction';
import {userhistory} from '../../redux/actions/user';
class Proses extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      dataHistoryUsers: [],
      refreshing: false,
      currentSearch: 'Pending',
      search: '',
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    // don't forget to compare the props
    if (this.props.users.isSuccess !== prevProps.users.isSuccess) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    const {token} = this.props.auth;
    await this.props
      .userhistory(token, 'search=Pending')
      .then((response) => {
        const {dataHistoryUsers, isLoading} = this.props.users;
        this.setState({dataHistoryUsers, isLoading});
      })
      .catch((error) => {
        this.setState({dataHistoryUsers: [], isLoading: false});
      });
  };

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchData(this.state.currentSearch).then(() => {
      this.setState({refreshing: false});
    });
  };

  prosesTransaction = async (id) => {
    this.setState({refreshing: true});
    const data = {
      statusid: 4,
    };
    await this.props.updatetransactions(id, data);
    this.fetchData();
    this.setState({refreshing: false});
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
        text: 'Cancel',
        backgroundColor: '#7FFF00',
        color: '#000',
      },
    ];
  }

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
              uri: 'https://api-muhilibrary.herokuapp.com/uploads/default.png',
            }}
          />
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
    const {currentSearch, dataHistoryUsers, isLoading} = this.state;
    return (
      <SafeAreaView style={TransactionStyle.container}>
        {this.state.isLoading && (
          <View style={TransactionStyle.loading}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        {!this.state.isLoading && (
          <>
            <Header
              centerComponent={{
                text: 'On Proses',
                style: {color: '#fff'},
              }}
              rightComponent={
                <Icon
                  name="paper"
                  color="#fff"
                  onPress={() =>
                    this.props.navigation.navigate('alltransactions')
                  }
                />
              }
            />
            <View>
              {dataHistoryUsers.length !== 0 && (
                <FlatList
                  data={dataHistoryUsers}
                  keyExtractor={(item) => item.id}
                  onRefresh={() => this.fetchData({search: currentSearch})}
                  refreshing={isLoading}
                  renderItem={this.renderItem}
                  onEndReachedThreshold={0.5}
                />
              )}
              {dataHistoryUsers.length === 0 && (
                <Card>
                  <Text>No have a transaction</Text>
                </Card>
              )}
            </View>
          </>
        )}
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
  updatetransactions,
  userhistory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Proses);

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
});
