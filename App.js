import React, {Component} from 'react';
// import {View, Text, StyleSheet, FlatList} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import DashboardScreen from './src/screens/Dashboard';
import LoginScreen from './src/screens/Login';
import RegisterScreen from './src/screens/Register';
import ProfileScreen from './src/screens/Profile';
import DetailBookScreen from './src/screens/DetailBook';
import HistoryScreen from './src/screens/History';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }

  render() {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              component={LoginScreen}
              name={'login'}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}
