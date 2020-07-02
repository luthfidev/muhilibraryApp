import React, {Component} from 'react';
// import {View, Text, StyleSheet, FlatList} from 'react-native';

import DashboardScreen from './src/screens/Dashboard';
import LoginScreen from './src/screens/Login';
import RegisterScreen from './src/screens/Register';
import ProfileScreen from './src/screens/Profile';
import DetailBookScreen from './src/screens/DetailBook';
import HistoryScreen from './src/screens/History';

export default class App extends Component {
  render() {
    return (
      <>
        <LoginScreen />
      </>
    );
  }
}
