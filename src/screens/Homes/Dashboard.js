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
  RefreshControl,
  BackHandler,
} from 'react-native';
import {SearchBar, Header} from 'react-native-elements';
import {connect} from 'react-redux';
import {logout} from '../../redux/actions/auth';
const {width: screenWidth} = Dimensions.get('window');

import ENTRIES1 from '../../components/dataBook';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      refreshing: false,
      search: '',
    };
    if (!this.props.auth.token) {
      this.props.navigation.navigate('login');
    }
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

  _onRefresh = () => {
    /*  this.setState({refreshing: true});
    fetchData().then(() => {
      this.setState({refreshing: false});
    }); */
    this.setState({refreshing: true});
    setTimeout(() => {
      this.setState({
        refreshing: false,
      });
    }, 3000);
  };

  updateSearch = (search) => {
    this.setState({search});
  };
  _renderItem({item, index}) {
    return (
      <View style={dashboardStyle.item}>
        <Image
          style={dashboardStyle.imageContainer}
          source={{uri: item.illustration}}
        />
      </View>
    );
  }
  render() {
    const {search} = this.state;
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
                centerComponent={{
                  text: 'List Book',
                  style: {color: '#fff'},
                }}
                rightComponent={{icon: 'home', color: '#fff'}}
              />
              <SearchBar
                platform="android"
                placeholder="Type Here..."
                onChangeText={this.updateSearch}
                value={search}
              />
            </View>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                />
              }>
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
                  data={ENTRIES1}
                  renderItem={this._renderItem}
                />
              </View>
              <View style={dashboardStyle.booklist}>
                <Text style={dashboardStyle.titlelist}>Book</Text>
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
                  data={ENTRIES1}
                  renderItem={this._renderItem}
                />
              </View>
              <View style={dashboardStyle.booklist}>
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
                  data={ENTRIES1}
                  renderItem={this._renderItem}
                />
              </View>
              <View style={dashboardStyle.booklist}>
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
                  data={ENTRIES1}
                  renderItem={this._renderItem}
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
  auth: state.auth,
});

const mapDispatchToProps = {
  logout,
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
