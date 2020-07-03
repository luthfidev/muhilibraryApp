import React, {Component} from 'react';
// import {View, Text, StyleSheet, FlatList} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from './src/screens/Login';
import RegisterScreen from './src/screens/Register';

import DetailBookScreen from './src/screens/DetailBook';
import Tab from './src/components/Tab';

const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }

  render() {
    const Login = (props) => <LoginScreen login={this.login} {...props} />;
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              component={Login}
              options={{
                headerShown: false,
              }}
              name={'login'}
            />
            <Stack.Screen
              component={RegisterScreen}
              options={{
                headerShown: false,
              }}
              name={'register'}
            />
            <Stack.Screen
              options={{title: 'Detail', headerShown: false}}
              component={Tab}
              name={'detail'}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}
