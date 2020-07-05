import React, {Component} from 'react';
import {Text, View, SafeAreaView, FlatList, StyleSheet} from 'react-native';
import {Header, ListItem} from 'react-native-elements';
import Icon from 'react-native-ionicons';
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
    await this.props.gettransactions('?page='.concat(this.state.currentPage));
    const {dataTransactions, isLoading} = this.props.transactions;
    this.setState({dataTransactions, isLoading});
  };

  nextPage = () => {
    this.setState({currentPage: this.state.currentPage + 1}, () => {
      this.fetchData({page: this.state.currentPage});
    });
  };

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchData(this.state.currentPage).then(() => {
      this.setState({refreshing: false});
    });
  };

  renderItem = ({item}) => (
    <ListItem title={`${item.transaction_date}`} bottomDivider={true} />
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
              onPress={() => this.props.navigation.navigate('proses')}
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
});
