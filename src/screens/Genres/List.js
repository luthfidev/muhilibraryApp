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
      currentPage: 1,
      search: '',
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    await this.props.getgenres('limit=20page='.concat(this.state.currentPage));
    const {dataGenres, isLoading} = this.props.genres;
    this.setState({dataGenres, isLoading});
  };

  /*   _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchData(this.state.currentPage).then(() => {
      this.setState({refreshing: false});
    });
  }; */

  updateSearch = (search) => {
    this.setState({search});
  };

  deleteGenre = async (id) => {
    const {token} = this.props.auth;
    await this.props
      .deletegenres(token, id)
      .then((response) => {
        Alert.alert(this.props.genres.successMsg);
        this.fetchData();
      })
      .catch((error) => {
        Alert.alert(this.props.genres.errorMsg);
      });
    this.fetchData();
  };

  rightSwipeOutButtons(id) {
    return [
      {
        onPress: () => this.deleteGenre(id),
        text: 'Remove',
        backgroundColor: '#FF4500',
        color: '#FFF',
      },
      {
        text: 'Edit',
        backgroundColor: '#ffb142',
        color: '#FFF',
      },
    ];
  }

  nextPage = () => {
    this.setState({currentPage: this.state.currentPage + 1}, () => {
      this.fetchData({page: this.state.currentPage});
    });
  };

  renderItem = ({item}) => (
    <Swipeout
      right={this.rightSwipeOutButtons(item.id)}
      backgroundColor={'transparent'}
      close>
      <ListItem title={`${item.name}`} bottomDivider={true} />
    </Swipeout>
  );

  render() {
    const {search, currentPage, dataGenres, isLoading} = this.state;
    return (
      <View style={listStyle.container}>
        <Header
          centerComponent={
            <TouchableOpacity>
              <View style={listStyle.btnDown} />
            </TouchableOpacity>
          }
          rightComponent={
            <View style={{padding: 5}}>
              <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
                Genres
              </Text>
            </View>
          }
        />
        <SearchBar
          platform="android"
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
        />
        <View>
          <FlatList
            data={dataGenres}
            keyExtractor={(item) => item.id}
            onRefresh={() => this.fetchData({page: currentPage})}
            refreshing={isLoading}
            renderItem={this.renderItem}
            onEndReached={this.nextPage}
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
