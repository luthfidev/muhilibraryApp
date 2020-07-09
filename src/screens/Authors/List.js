import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {withNavigation} from '@react-navigation/compat';
import {SearchBar, ListItem, Header} from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-ionicons';
import {connect} from 'react-redux';
import {getauthors, deleteauthors} from '../../redux/actions/author';
import {clearmessage} from '../../redux/actions/clear';
class List extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      dataAuthors: [],
      pageInfo: [],
      refreshing: false,
      page: 1,
      loadingMore: false,
      search: '',
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    // don't forget to compare the props
    if (this.props.authors.isSuccess !== prevProps.authors.isSuccess) {
      this.onRefresh();
    }
  }

  fetchData = async () => {
    console.log(this.state.page);
    await this.props.getauthors(`limit=5&page=${this.state.page}`);
    const {dataAuthors, pageInfo, isLoading} = await this.props.authors;
    this.setState({
      dataAuthors: this.state.dataAuthors.concat(dataAuthors),
      pageInfo,
      isLoading,
    });
  };

  updateSearch = (search) => {
    this.setState({search});
  };

  deleteAuthor = async (id) => {
    const {token} = this.props.auth;
    await this.props
      .deleteauthors(token, id)
      .then((response) => {
        Alert.alert(this.props.authors.successMsg);
      })
      .catch((error) => {
        Alert.alert(this.props.authors.errorMsg);
      });
  };

  rightSwipeOutButtons({item}) {
    return [
      {
        onPress: () => this.deleteAuthor(item.id),
        text: 'Remove',
        backgroundColor: '#FF4500',
        color: '#FFF',
      },
      {
        onPress: () => this.props.navigation.navigate('editauthor', item),
        text: 'Edit',
        backgroundColor: '#ffb142',
        color: '#FFF',
      },
    ];
  }

  onRefresh = async () => {
    this.setState({page: 1});
    await this.props.getauthors(`limit=5&page=${this.state.page}`);
    const {dataAuthors, isLoading} = this.props.authors;
    this.setState({
      dataAuthors: dataAuthors,
      isLoading,
    });
  };

  // Handle searchbar
  handleSearch = async (e) => {
    const {search} = this.state;
    await this.props.getauthors('search='.concat(search.toLowerCase()));
    const {dataAuthors, isLoading} = this.props.authors;
    this.setState({dataAuthors, isLoading});
  };

  handleSearchClear = async (e) => {
    this.setState({page: 1});
    await this.props.getauthors(`page=${this.state.page}&search=`.concat(''));
    const {dataAuthors, isLoading} = this.props.authors;
    this.setState({dataAuthors, isLoading});
  };

  loadMore = () => {
    this.setState({page: this.state.page + 1}, () => {
      this.fetchData({page: this.state.page});
    });
  };

  renderItem = ({item, index}) => (
    <Swipeout
      right={this.rightSwipeOutButtons({
        item,
      })}
      backgroundColor={'transparent'}
      close>
      <ListItem key={index} title={`${item.name}`} bottomDivider={true} />
    </Swipeout>
  );

  render() {
    const {search, page, dataAuthors, isLoading} = this.state;
    return (
      <View style={listStyle.container}>
        <Header
          leftComponent={
            <View style={{padding: 5}}>
              <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
                Authors
              </Text>
            </View>
          }
          centerComponent={
            <TouchableOpacity>
              <View style={listStyle.btnDown} />
            </TouchableOpacity>
          }
          rightComponent={
            <View style={{padding: 5}}>
              <Text
                onPress={() => this.props.navigation.navigate('addauthor')}
                style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                ADD
              </Text>
            </View>
          }
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

        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={dataAuthors}
          onRefresh={this.loadMore}
          refreshing={isLoading}
          renderItem={this.renderItem}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.5}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  authors: state.authors,
  clear: state.clear,
});

const mapDispatchToProps = {
  getauthors,
  deleteauthors,
  clearmessage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(List));

const listStyle = StyleSheet.create({
  btnDown: {
    width: 90,
    height: 10,
    marginBottom: 50,
    backgroundColor: '#f5f6fa',
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
});
