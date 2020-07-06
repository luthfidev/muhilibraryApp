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
import {getauthors, deleteauthors} from '../../redux/actions/author';
class List extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      dataAuthors: [],
      refreshing: false,
      currentPage: 1,
      search: '',
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    await this.props.getauthors('limit=20page='.concat(this.state.currentPage));
    const {dataAuthors, isLoading} = this.props.authors;
    this.setState({dataAuthors, isLoading});
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

  updateSearch = (search) => {
    this.setState({search});
  };

  deleteAuthor = async (id) => {
    const {token} = this.props.auth;
    await this.props
      .deleteauthors(token, id)
      .then((response) => {
        Alert.alert(this.props.authors.successMsg);
        this.fetchData();
      })
      .catch((error) => {
        Alert.alert(this.props.authors.errorMsg);
      });
  };

  rightSwipeOutButtons(id) {
    return [
      {
        onPress: () => this.deleteAuthor(id),
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

  /*   nextPage = () => {
    this.setState({currentPage: this.state.currentPage + 1}, () => {
      this.fetchData({page: this.state.currentPage});
    });
  }; */

  renderItem = ({item}) => (
    <Swipeout
      right={this.rightSwipeOutButtons(item.id)}
      backgroundColor={'transparent'}
      close>
      <ListItem title={`${item.name}`} bottomDivider={true} />
    </Swipeout>
  );

  render() {
    const {search, currentPage, dataAuthors, isLoading} = this.state;
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
                Authors
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
            data={dataAuthors}
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
  authors: state.authors,
});

const mapDispatchToProps = {
  getauthors,
  deleteauthors,
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
