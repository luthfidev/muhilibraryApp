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
  BackHandler,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {withNavigation} from '@react-navigation/compat';
import {SearchBar} from 'react-native-elements';
import {connect} from 'react-redux';
import {getbooks} from '../../redux/actions/book';
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
      dataCaraousel: [],
      refreshing: false,
      currentPage: 1,
      search: '',
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
    /* BackHandler.addEventListener('hardwareBackPress', function () {
      return true;
    }); */
  }

  componentDidMount() {
    this.fetchDataCaraousel();
    this.fetchData();
  }

  fetchDataCaraousel = async () => {
    await this.props.getbooks('?page='.concat(this.state.currentPage));
    const {dataBooks, isLoading} = this.props.books;
    this.setState({dataCaraousel: dataBooks, isLoading});
  };

  fetchData = async () => {
    await this.props.getbooks('?page='.concat(this.state.currentPage));
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

  updateSearch = (search) => {
    this.setState({search});
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
            <Text style={homeStyle.textName}>{item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {
      search,
      currentPage,
      dataBooks,
      dataCaraousel,
      isLoading,
    } = this.state;
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
              {/* <Header
                centerComponent={{
                  text: 'List Book',
                  style: {color: '#fff'},
                }}
                rightComponent={{icon: 'home', color: '#fff'}}
              /> */}
              <SearchBar
                platform="android"
                placeholder="Type Here..."
                onChangeText={this.updateSearch}
                value={search}
              />
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
                  onEndReached={this.nextPage}
                  onEndReachedThreshold={0.5}
                />
              </View>
              <View style={dashboardStyle.booklist}>
                <Text style={dashboardStyle.titlelist}>Horror</Text>
                <FlatList
                  horizontal
                  style={dashboardStyle.booklist}
                  data={dataBooks}
                  renderItem={this._renderItemFlat}
                  keyExtractor={(item) => item.email}
                  onRefresh={() => this.fetchData({page: currentPage})}
                  refreshing={isLoading}
                  onEndReached={this.nextPage}
                  onEndReachedThreshold={0.5}
                />
              </View>
              <View style={dashboardStyle.booklist}>
                <Text style={dashboardStyle.titlelist}>Science</Text>
                <FlatList
                  horizontal
                  style={dashboardStyle.booklist}
                  data={dataBooks}
                  renderItem={this._renderItemFlat}
                  keyExtractor={(item) => item.email}
                  onRefresh={() => this.fetchData({page: currentPage})}
                  refreshing={isLoading}
                  onEndReached={this.nextPage}
                  onEndReachedThreshold={0.5}
                />
              </View>
              <View style={dashboardStyle.booklist}>
                <Text style={dashboardStyle.titlelist}>Anime</Text>
                <FlatList
                  horizontal
                  style={dashboardStyle.booklist}
                  data={dataBooks}
                  renderItem={this._renderItemFlat}
                  keyExtractor={(item) => item.email}
                  onRefresh={() => this.fetchData({page: currentPage})}
                  refreshing={isLoading}
                  onEndReached={this.nextPage}
                  onEndReachedThreshold={0.5}
                />
              </View>
              <View style={dashboardStyle.booklist}>
                <Text style={dashboardStyle.titlelist}>Sejarah</Text>
                <FlatList
                  horizontal
                  style={dashboardStyle.booklist}
                  data={dataBooks}
                  renderItem={this._renderItemFlat}
                  keyExtractor={(item) => item.email}
                  onRefresh={() => this.fetchData({page: currentPage})}
                  refreshing={isLoading}
                  onEndReached={this.nextPage}
                  onEndReachedThreshold={0.5}
                />
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
    height: 300,
    flexDirection: 'column',
    marginTop: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 30,
    paddingLeft: 30,
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
