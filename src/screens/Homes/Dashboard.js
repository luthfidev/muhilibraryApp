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
  ScrollView,
  ActivityIndicator,
  BackHandler,
  FlatList,
} from 'react-native';
import {SearchBar, Header} from 'react-native-elements';
import {connect} from 'react-redux';
import {getbooks} from '../../redux/actions/book';
const {width: screenWidth} = Dimensions.get('window');

// data dummy
/* import ENTRIES1 from '../../components/dataBook'; */

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataBooks: [],
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
    BackHandler.addEventListener('hardwareBackPress', function () {
      return true;
    });
  }

  componentDidMount() {
    this.fetchData();
  }

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
  _renderItemFlat({item, index}) {
    return (
      <View style={homeStyle.item}>
        <View style={homeStyle.pictureWrapper}>
          <Image style={homeStyle.picture} source={{uri: item.image}} />
        </View>
        <View style={homeStyle.textWrapper}>
          <Text style={homeStyle.textName}>{item.title}</Text>
          <Text>{item.title}</Text>
        </View>
      </View>
    );
  }

  render() {
    const {search, currentPage, dataBooks, isLoading} = this.state;
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
            <View style={dashboardStyle.booklist}>
              <Text style={dashboardStyle.titlelist}>Top Recomended Book</Text>
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
                data={this.props.books.dataBooks}
                renderItem={this._renderItem}
              />
            </View>
            <FlatList
              style={dashboardStyle.booklist}
              data={dataBooks}
              renderItem={this._renderItemFlat}
              keyExtractor={(item) => item.email}
              onRefresh={() => this.fetchData({page: currentPage})}
              refreshing={isLoading}
              onEndReached={this.nextPage}
              onEndReachedThreshold={0.5}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

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
    marginTop: 10,
    marginBottom: 10,
  },
});

const homeStyle = StyleSheet.create({
  item: {
    height: 80,
    flexDirection: 'row',
    marginTop: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 30,
    paddingLeft: 30,
  },
  pictureWrapper: {
    width: 70,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picture: {
    height: 80,
    width: 70,
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
    fontSize: 18,
  },
});
