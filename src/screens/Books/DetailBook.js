import React, {Component} from 'react';
import {Platform, StyleSheet, View, Text, Image, Alert} from 'react-native';
import {
  Button,
  colors,
  ThemeProvider,
  Badge,
  Header,
} from 'react-native-elements';
import moment from 'moment';
import qs from 'querystring';

import Icon from 'react-native-ionicons';
import book from '../../assets/Empon.jpg';
import {connect} from 'react-redux';
import {getbooks, detailbooks} from '../../redux/actions/book';
import {borrow} from '../../redux/actions/transaction';
class DetailBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBooks: [],
      id: props.route.params,
      transactiondate: moment().format('yyyy-MM-DD'),
      editModalShow: false,
      errorMsg: {},
      isLoading: true,
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  handlePostBorrow = () => {
    const {token} = this.props.auth;
    const borrowData = {
      bookid: this.state.bookid,
      transactiondate: this.state.transactiondate,
    };
    this.props
      .borrow(token, qs.stringify(borrowData))
      .then((response) => {
        Alert.alert(this.props.transactions.successMsg);
        this.props.navigation.navigate('prosses');
      })
      .catch((error) => {
        Alert.alert(this.props.transactions.errorMsg);
      });
  };

  fetchData = async () => {
    const {id} = this.state;
    await this.props.detailbooks(id);
    const {dataBooks, isLoading} = this.props.books;
    this.setState({dataBooks, isLoading});
    this.state.dataBooks.map((books, index) =>
      this.setState({
        bookid: books.id,
        booktitle: books.title,
        bookrelease: books.releaseDate,
        bookgenreid: books.genreId,
        bookgenre: books.genreName,
        bookimage: books.image,
        bookdesc: books.description,
        bookauthorid: books.authorId,
        bookauthor: books.authorName,
        bookstatusid: books.nameStatusId,
        bookstatus: books.nameStatus,
      }),
    );
  };
  render() {
    const {isLoading, booktitle, bookimage, bookdesc, bookstatus} = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Header
          leftComponent={
            <Icon
              name="arrow-back"
              color="#fff"
              onPress={() => this.props.navigation.goBack()}
            />
          }
          centerComponent={{
            text: 'Detail Book',
            style: {color: '#fff'},
          }}
        />
        <View style={detailBookStyle.container}>
          <View style={detailBookStyle.header}>
            <View style={detailBookStyle.bookImg}>
              <Image source={{uri: bookimage}} style={detailBookStyle.image} />
              <Text style={detailBookStyle.bookTitle}>{booktitle}</Text>
              <Badge value={bookstatus} status="warning" />
            </View>
          </View>
          <View>
            <View>
              <Text style={detailBookStyle.bookDesc}>{bookdesc}</Text>
            </View>
            <View style={detailBookStyle.btnBorrow}>
              {bookstatus === 'Available' && (
                <Button
                  loading={isLoading}
                  onPress={this.handlePostBorrow}
                  title="Borrow"
                />
              )}
            </View>
          </View>
        </View>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
  books: state.books,
  transactions: state.transactions,
});

const mapDispatchToProps = {
  getbooks,
  detailbooks,
  borrow,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailBook);

const theme = {
  color: {
    ...Platform.select({
      default: colors.platform.android,
      ios: colors.platform.ios,
    }),
  },
  Button: {
    buttonStyle: {
      backgroundColor: 'green',
    },
    containerStyle: {
      marginTop: 5,
      width: 200,
      borderRadius: 5,
    },
  },
};

const detailBookStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  header: {
    height: 300,
    backgroundColor: '#00a8ff',
    shadowColor: '#dcdde1',
  },
  avatar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  biodata: {
    marginTop: 10,
    alignItems: 'center',
  },
  baseText: {
    color: 'white',
    fontSize: 15,
  },
  actionBack: {
    flexDirection: 'row',
    margin: 15,
    justifyContent: 'space-between',
  },
  bookImg: {
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 200,
    marginTop: 12,
    marginBottom: 12,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  bookTitle: {
    fontSize: 20,
    color: 'white',
  },
  bookDesc: {
    margin: 10,
  },
  btnBorrow: {
    marginTop: 10,
    alignItems: 'center',
  },
});
