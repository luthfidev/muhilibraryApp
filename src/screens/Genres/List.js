import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SearchBar, ListItem, Header} from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-ionicons';
import {connect} from 'react-redux';
import {getgenres, deletegenres} from '../../redux/actions/genre';
class List extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      dataGenres: [],
      refreshing: false,
      page: 1,
      search: '',
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    // don't forget to compare the props
    if (this.props.genres.isSuccess !== prevProps.genres.isSuccess) {
      this.onRefresh();
    }
  }

  fetchData = async () => {
    await this.props.getgenres(`limit=5&page=${this.state.page}`);
    const {dataGenres, isLoading} = await this.props.genres;
    this.setState({
      dataGenres: this.state.dataGenres.concat(dataGenres),
      isLoading,
    });
  };

  updateSearch = (search) => {
    this.setState({search});
  };

  deleteGenre = async (id) => {
    const {token} = this.props.auth;
    await this.props
      .deletegenres(token, id)
      .then((response) => {
        Alert.alert(this.props.genres.successMsg);
      })
      .catch((error) => {
        Alert.alert(this.props.genres.errorMsg);
      });
  };

  onRefresh = async () => {
    this.setState({page: 1});
    await this.props.getgenres(`limit=5&page=${this.state.page}`);
    const {dataGenres, isLoading} = this.props.genres;
    this.setState({
      dataGenres: dataGenres,
      isLoading,
    });
  };

  // Handle searchbar
  handleSearch = async (e) => {
    const {search} = this.state;
    await this.props.getgenres('search='.concat(search.toLowerCase()));
    const {dataGenres, isLoading} = this.props.genres;
    this.setState({dataGenres, isLoading});
  };

  handleSearchClear = async (e) => {
    this.setState({page: 1});
    await this.props.getgenres(`page=${this.state.page}&search=`.concat(''));
    const {dataGenres, isLoading} = this.props.genres;
    this.setState({dataGenres, isLoading});
  };

  loadMore = () => {
    this.setState({page: this.state.page + 1}, () => {
      this.fetchData({page: this.state.page});
    });
  };

  rightSwipeOutButtons({item}) {
    return [
      {
        onPress: () => this.deleteGenre(item.id),
        text: 'Remove',
        backgroundColor: '#FF4500',
        color: '#FFF',
      },
      {
        onPress: () => this.props.navigation.navigate('editgenre', item),
        text: 'Edit',
        backgroundColor: '#ffb142',
        color: '#FFF',
      },
    ];
  }

  renderItem = ({item}) => (
    <Swipeout
      right={this.rightSwipeOutButtons({item})}
      backgroundColor={'transparent'}
      close>
      <ListItem title={`${item.name}`} bottomDivider={true} />
    </Swipeout>
  );

  render() {
    const {dataGenres, isLoading} = this.state;
    return (
      <View style={listStyle.container}>
        <Header
          leftComponent={
            <View style={{padding: 5}}>
              <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
                Genres
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
                onPress={() => this.props.navigation.navigate('addgenre')}
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
        <View>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={dataGenres}
            onRefresh={this.loadMore}
            refreshing={isLoading}
            renderItem={this.renderItem}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0.5}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  genres: state.genres,
});

const mapDispatchToProps = {
  getgenres,
  deletegenres,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);

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
