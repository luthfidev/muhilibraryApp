import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {Button, colors, ThemeProvider, Avatar} from 'react-native-elements';
import Icon from 'react-native-ionicons';
import book from '../assets/Empon.jpg';
export default class DetailBook extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <View style={detailBookStyle.container}>
          <View style={detailBookStyle.header}>
            <View style={detailBookStyle.actionBack}>
              <Icon name="arrow-back" color="white" />
              <Icon name="more" color="white" />
            </View>
            <View style={detailBookStyle.bookImg}>
              <Image source={book} style={detailBookStyle.image} />
              <Text style={detailBookStyle.bookTitle}>Empon Empon</Text>
            </View>
          </View>
          <View>
            <View>
              <Text>adasdasdddddddddddddddddddddddd</Text>
            </View>
            <View style={detailBookStyle.btnBorrow}>
              <Button title="Borrow" />
            </View>
          </View>
        </View>
      </ThemeProvider>
    );
  }
}

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
    backgroundColor: '#00a8ff',
    height: 400,
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
  btnBorrow: {
    marginTop: 50,
    alignItems: 'center',
  },
});
