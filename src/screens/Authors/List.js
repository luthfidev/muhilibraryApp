import React, {Component} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {SearchBar, ListItem, Header} from 'react-native-elements';
import Icon from 'react-native-ionicons';
import {connect} from 'react-redux';
import {getauthors} from '../../redux/actions/author';
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
    await this.props.getauthors('?page='.concat(this.state.currentPage));
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

  renderItem = ({item}) => (
    <ListItem title={`${item.name}`} bottomDivider={true} />
  );

  render() {
    const {search, currentPage, dataAuthors, isLoading} = this.state;
    return (
      <View style={detailBookStyle.container}>
        <Header
          leftComponent={
            <Icon
              name="arrow-back"
              color="white"
              onPress={() => this.props.navigation.navigate('profile')}
            />
          }
          centerComponent={{
            text: 'Authors',
            style: {color: '#fff'},
          }}
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
  authors: state.authors,
});

const mapDispatchToProps = {
  getauthors,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);

const detailBookStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
});
