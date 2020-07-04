import React, {Component} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {Header} from 'react-native-elements';
import Icon from 'react-native-ionicons';

export default class Profile extends Component {
  navigateProfile = () => {
    this.props.navigation.navigate('profile');
  };
  render() {
    return (
      <SafeAreaView style={profileStyle.container}>
        <View style={profileStyle.header}>
          <Header
            leftComponent={
              <Icon
                name="arrow-back"
                color="#fff"
                onPress={this.navigateProfile}
              />
            }
          />
        </View>
      </SafeAreaView>
    );
  }
}

const profileStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  WrapperAvatar: {
    alignItems: 'center',
  },
  wrapperBiodata: {
    marginTop: 10,
    width: 200,
    backgroundColor: '#dfe4ea',
    borderRadius: 10,
    shadowColor: '#dcdde1',
    elevation: 5,
  },
  BiodataText: {
    marginLeft: 15,
  },
  avatar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperLogout: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});
