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
} from 'react-native';
import {Button, colors, ThemeProvider, Avatar} from 'react-native-elements';
import Icon from 'react-native-ionicons';
export default class Profile extends Component {
  render() {
    return (
      <View style={profileStyle.container}>
        <View style={profileStyle.header}>
          <View style={profileStyle.actionBack}>
            <Icon name="arrow-back" color="white" />
          </View>
          <View style={profileStyle.avatar}>
            <View style={profileStyle.center}>
              <Avatar
                rounded
                size={125}
                source={{
                  uri:
                    'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                }}
              />
              <View style={profileStyle.biodata}>
                <Text style={profileStyle.baseText}>My Name is</Text>
                <Text style={profileStyle.baseText}>Birthdate</Text>
                <Text style={profileStyle.baseText}>Status</Text>
              </View>
            </View>
          </View>
        </View>
        <Text>Hello</Text>
      </View>
    );
  }
}

const profileStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  header: {
    backgroundColor: '#00a8ff',
    height: 250,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    shadowColor: '#dcdde1',
    elevation: 6,
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
    marginTop: 15,
    marginLeft: 15,
  },
});
