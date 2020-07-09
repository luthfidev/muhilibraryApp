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
} from 'react-native';
import qs from 'querystring';
import _ from 'lodash';
import {withNavigation} from '@react-navigation/compat';
import {SearchBar, Divider, Badge} from 'react-native-elements';
import {connect} from 'react-redux';
import {getbooks} from '../../redux/actions/book';
import {getgenres} from '../../redux/actions/genre';
import {ScrollView} from 'react-native-gesture-handler';
const {width: screenWidth} = Dimensions.get('window');

// data dummy
/* import ENTRIES1 from '../../components/dataBook'; */

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataBooks: [],
      dataGenres: [],
      dataCaraousel: [],
      refreshing: false,
      currentPage: 1,
      search: '',
      query: '',
    };
  }

  UNSAFE_componentWillMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 3000);
  }

  componentDidMount() {
    this.fetchDataCaraousel();
    this.fetchData();
    this.fetchDataGenres();
  }

  fetchDataCaraousel = async () => {
    const {currentPage} = this.state;
    await this.props.getbooks('page='.concat(currentPage));
    const {dataBooks, isLoading} = this.props.books;
    this.setState({dataCaraousel: dataBooks, isLoading});
  };

  fetchData = async () => {
    const {currentPage} = this.state;
    await this.props.getbooks('page='.concat(currentPage));
    const {dataBooks, isLoading} = this.props.books;
    this.setState({dataBooks, isLoading});
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
    await this.props.getbooks('search='.concat(search.toLowerCase()));
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
            <Image style={homeStyle.picture} source={{uri: item.image}} />
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
          <Badge
            status="success"
            size={20}
            value={item.name}
            textStyle={{fontSize: 14}}
          />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {
      currentPage,
      dataBooks,
      dataGenres,
      dataCaraousel,
      isLoading,
    } = this.state;
    console.log(dataGenres);
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
              <View style={dashboardStyle.booklist}>
                <Text style={dashboardStyle.titlelist}>Romance</Text>
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
