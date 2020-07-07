import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Platform,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import qs from 'querystring';
import _ from 'lodash';
import {withNavigation} from '@react-navigation/compat';
import {SearchBar, Card, Header} from 'react-native-elements';
import Icon from 'react-native-ionicons';
import {connect} from 'react-redux';
import {getbooks} from '../../redux/actions/book';
import {ScrollView} from 'react-native-gesture-handler';
const {width: screenWidth} = Dimensions.get('window');

// data dummy
/* import ENTRIES1 from '../../components/dataBook'; */

class BookGenres extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataBooks: [],
      keyword: props.route.params,
      refreshing: false,
      currentPage: 1,
      search: '',
      query: '',
    };
    /*  if (!this.props.auth.token) {
      this.props.navigation.navigate('login');
    } */
  }

  UNSAFE_componentWillMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 3000);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const {currentPage, keyword} = this.state;
    await this.props.getbooks(`search=${keyword}&page=${currentPage}`);
    const {dataBooks, isLoading} = this.props.books;
    this.setState({dataBooks, isLoading});
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

  // Handle searchbar
  handleSearch = async (e) => {
    const {search} = this.state;
    await this.props.getbooks('search='.concat(search.toLowerCase()));
    const {dataBooks, isLoading} = this.props.books;
    this.setState({dataBooks, isLoading});
  };

  handleSearchClear = async (e) => {
    await this.props.getbooks('search='.concat(''));
    const {dataBooks, isLoading} = this.props.books;
    this.setState({dataBooks, isLoading});
  };

  _renderItemFlat = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('detailbook', item.id)}>
        <View style={homeStyle.item}>
          <View style={homeStyle.pictureWrapper}>
            <Image style={homeStyle.picture} source={{uri: item.image}} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {currentPage, dataBooks, isLoading} = this.state;
    return (
      <SafeAreaView style={dashboardStyle.container}>
        {this.state.isLoading && (
          <View style={dashboardStyle.loading}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        {!this.state.isLoading && (
          <>
            <View style={dashboardStyle.header}>
              <Header
                leftComponent={
                  <Icon
                    name="arrow-back"
                    color="#fff"
                    onPress={() => this.props.navigation.goBack()}
                  />
                }
                centerComponent={{
                  text: 'List Books',
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
            </View>
            <ScrollView>
              <View style={dashboardStyle.booklist}>
                <Text style={dashboardStyle.titlelist}>
                  {this.state.keyword}
                </Text>
                {dataBooks.length !== 0 && (
                  <FlatList
                    vertival
                    style={dashboardStyle.booklist}
                    data={dataBooks}
                    renderItem={this._renderItemFlat}
                    keyExtractor={(item) => item.email}
                    onRefresh={() => this.fetchData({page: currentPage})}
                    refreshing={isLoading}
                  />
                )}
                {dataBooks.length === 0 && (
                  <Card>
                    <Text>No Found Book</Text>
                  </Card>
                )}
              </View>
            </ScrollView>
          </>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  books: state.books,
});

const mapDispatchToProps = {
  getbooks,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(BookGenres));

const dashboardStyle = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  header: {
    marginTop: 15,
    marginBottom: 10,
  },
  titlelist: {
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  item: {
    width: 100,
    height: 150,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'stretch',
    width: 100,
    height: 150,
  },
  booklist: {
    margin: 10,
  },
});

const homeStyle = StyleSheet.create({
  item: {
    height: 220,
    flexDirection: 'column',
    marginTop: 15,
    paddingTop: 5,
    paddingRight: 10,
    paddingLeft: 10,
  },
  pictureWrapper: {
    width: 150,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picture: {
    width: 150,
    height: 200,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  textWrapper: {
    justifyContent: 'center',
    marginLeft: 10,
    padding: 10,
  },
  textName: {
    fontWeight: 'bold',
    fontSize: 17,
  },
});

const genreStyle = StyleSheet.create({
  container: {
    width: screenWidth,
  },
  item: {
    height: 20,
    width: 70,
    margin: 10,
  },
});
