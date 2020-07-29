import React, {Component} from 'react';
import Carousel from 'react-native-snap-carousel';
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
  ImageBackground,
} from 'react-native';
import jwt_decode from 'jwt-decode';
import {withNavigation} from '@react-navigation/compat';
import {SearchBar, Divider, Header, Card} from 'react-native-elements';
import {connect} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {getbooks} from '../../redux/actions/book';
import {getgenres} from '../../redux/actions/genre';
import Logo from '../../assets/dmy.jpg';
import {ScrollView} from 'react-native-gesture-handler';

const {width: screenWidth} = Dimensions.get('window');

// data dummy
/* import ENTRIES1 from '../../components/dataBook'; */

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUsers: [],
      isLoading: true,
      dataBooks: [],
      dataBooksHumor: [],
      dataBooksHorror: [],
      dataGenres: [],
      dataCaraousel: [],
      refreshing: false,
      currentPage: 1,
      search: '',
      user: jwt_decode(this.props.auth.token),
    };
  }

  async componentDidMount() {
    await this.fetchDataCaraousel();
    await this.fetchData();
    await this.fetchDataHumor();
    await this.fetchDataHorror();
    await this.fetchDataGenres();
    SplashScreen.hide();
    const {nameUser, id} = this.state.user;
    if (nameUser === null) {
      this.props.navigation.navigate('editprofile', id);
    }
  }

  fetchDataCaraousel = async () => {
    await this.props.getbooks('limit=5');
    const {dataBooks, isLoading} = this.props.books;
    this.setState({dataCaraousel: dataBooks, isLoading});
  };

  fetchData = async () => {
    await this.props.getbooks('limit=20');
    const {dataBooks, isLoading} = this.props.books;
    this.setState({dataBooks, isLoading});
  };

  fetchDataHumor = async () => {
    await this.props.getbooks('limit=20&search=Humor');
    const {dataBooks, isLoading} = this.props.books;
    this.setState({dataBooksHumor: dataBooks, isLoading});
  };

  fetchDataHorror = async () => {
    await this.props.getbooks('limit=20&search=Horror');
    const {dataBooks, isLoading} = this.props.books;
    this.setState({dataBooksHorror: dataBooks, isLoading});
  };

  fetchDataGenres = async () => {
    await this.props.getgenres();
    const {dataGenres, isLoading} = this.props.genres;
    this.setState({dataGenres, isLoading});
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
    await this.props.getbooks('limit=20&search='.concat(search.toLowerCase()));
    const {dataBooks, isLoading} = this.props.books;
    this.setState({dataBooks, isLoading});
  };

  handleSearchClear = async (e) => {
    await this.props.getbooks('search='.concat(''));
    const {dataBooks, isLoading} = this.props.books;
    this.setState({dataBooks, isLoading});
  };

  _renderItem({item, index}) {
    return (
      <View style={dashboardStyle.item}>
        <Image
          style={dashboardStyle.imageContainer}
          source={{uri: item.image}}
        />
      </View>
    );
  }

  _renderItemFlat = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('detailbook', item.id)}>
        <View style={homeStyle.item}>
          <View style={homeStyle.pictureWrapper}>
            <ImageBackground style={homeStyle.picture} source={Logo}>
              <Image style={homeStyle.picture} source={{uri: item.image}} />
            </ImageBackground>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  _renderItemFlatHumor = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('detailbook', item.id)}>
        <View style={homeStyle.item}>
          <View style={homeStyle.pictureWrapper}>
            <ImageBackground style={homeStyle.picture} source={Logo}>
              <Image style={homeStyle.picture} source={{uri: item.image}} />
            </ImageBackground>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  _renderItemFlatHorror = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('detailbook', item.id)}>
        <View style={homeStyle.item}>
          <View style={homeStyle.pictureWrapper}>
            <ImageBackground style={homeStyle.picture} source={Logo}>
              <Image style={homeStyle.picture} source={{uri: item.image}} />
            </ImageBackground>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  _renderItemGenres = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('bookgenres', item.name)}>
        <View style={genreStyle.item}>
          <View style={genreStyle.badge}>
            <Text style={genreStyle.text}>{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {
      currentPage,
      dataBooks,
      dataBooksHumor,
      dataBooksHorror,
      dataGenres,
      dataCaraousel,
      isLoading,
    } = this.state;
    console.log(this.props.users);
    return (
      <SafeAreaView style={dashboardStyle.container}>
        {this.state.isLoading && (
          <View style={dashboardStyle.loading}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        {!this.state.isLoading && (
          <>
            <Header
              centerComponent={{
                text: 'List Books',
                style: {color: '#fff'},
              }}
            />
            <View style={dashboardStyle.header}>
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
              {/* get genre */}
              <Text style={dashboardStyle.titlelist}>Genres</Text>
              <FlatList
                horizontal
                style={genreStyle.container}
                data={dataGenres}
                renderItem={this._renderItemGenres}
                keyExtractor={(item) => item.id.toString()}
              />
              <Divider style={{backgroundColor: 'grey'}} />
            </View>
            <ScrollView>
              <View style={dashboardStyle.booklist}>
                <Text style={dashboardStyle.titlelist}>
                  Top Recomended Book
                </Text>
                <Carousel
                  layout={'default'}
                  activeSlideAlignment={'center'}
                  loop={true}
                  enableSnap={true}
                  autoplay={true}
                  autoplayInterval={3000}
                  sliderWidth={screenWidth}
                  sliderHeight={150}
                  itemWidth={100}
                  data={dataCaraousel}
                  renderItem={this._renderItem}
                />
              </View>
              {dataBooks.length !== 0 && (
               <View style={dashboardStyle.booklist}>
                   {/* <Text style={dashboardStyle.titlelist}>Science</Text>
                  <FlatList
                    horizontal
                    style={dashboardStyle.booklist}
                    data={dataBooksHumor}
                    renderItem={this._renderItemFlatHumor}
                    keyExtractor={(item) => item.email}
                    onRefresh={() => this.fetchData({page: currentPage})}
                    refreshing={isLoading}
                  />
                  <Divider style={{backgroundColor: 'grey'}} />
                  <Text style={dashboardStyle.titlelist}>Horror</Text>
                  <FlatList
                    horizontal
                    style={dashboardStyle.booklist}
                    data={dataBooksHorror}
                    renderItem={this._renderItemFlatHorror}
                    keyExtractor={(item) => item.email}
                    onRefresh={() => this.fetchData({page: currentPage})}
                    refreshing={isLoading}
                  /> */}
                  <Divider style={{backgroundColor: 'grey'}} />
                  <FlatList
                    horizontal
                    style={dashboardStyle.booklist}
                    data={dataBooks}
                    renderItem={this._renderItemFlat}
                    keyExtractor={(item) => item.email}
                    onRefresh={() => this.fetchData({page: currentPage})}
                    refreshing={isLoading}
                  />
                  <Divider style={{backgroundColor: 'grey'}} />
                </View>
              )}
              {dataBooks.length === 0 && (
                <Card>
                  <Text>No book founds</Text>
                </Card>
              )}
            </ScrollView>
          </>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  books: state.books,
  genres: state.genres,
  auth: state.auth,
});

const mapDispatchToProps = {
  getbooks,
  getgenres,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(Dashboard));

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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d98da',
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
    height: 25,
    width: 70,
    margin: 10,
  },
  badge: {
    padding: 5,
    backgroundColor: '#1B9CFC',
    borderRadius: 6,
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});
