import React, {Component} from 'react';
import {
  StyleSheet,
  Platform,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Header, Input, Card, CheckBox, Button} from 'react-native-elements';
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
            centerComponent={
              <TouchableOpacity>
                <View style={profileStyle.btnDown} />
              </TouchableOpacity>
            }
          />
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 25, fontWeight: 'bold', marginTop: 10}}>
              Profile
            </Text>
          </View>
          <Card>
            <View style={profileStyle.WrapperForm}>
              <Input
                label="Full Name"
                /* leftIcon={{type: 'font-awesome', name: 'chevron-left'}} */
              />
              <Input
                label="Birthdate"
                /* leftIcon={{type: 'font-awesome', name: 'chevron-left'}} */
              />
              <View
                style={{
                  justifyContent: 'center',
                  flexDirection: 'row',
                  marginBottom: 20,
                }}>
                <CheckBox
                  center
                  title="Male"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                />
                <CheckBox
                  center
                  title="Female"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                />
              </View>
              <Button title="Save" />
            </View>
          </Card>
        </View>
      </SafeAreaView>
    );
  }
}

const profileStyle = StyleSheet.create({
  btnDown: {
    width: 90,
    height: 10,
    marginBottom: 50,
    backgroundColor: '#f5f6fa',
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  WrapperForm: {
    margin: 20,
  },
});
