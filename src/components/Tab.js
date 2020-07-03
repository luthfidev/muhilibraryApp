import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-ionicons';

import DashboardScreen from '../screens/Dashboard';
import HistoryScreen from '../screens/History';
import ProfileScreen from '../screens/Profile';

const BottomTab = createBottomTabNavigator();

export default class Tab extends Component {
  render() {
    return (
      <BottomTab.Navigator>
        <BottomTab.Screen
          options={{
            title: 'Dashboard',
            tabBarIcon: ({color, size}) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
          component={DashboardScreen}
          name="home"
        />
        <BottomTab.Screen
          options={{
            title: 'History',
            tabBarIcon: ({color, size}) => (
              <Icon name="trending-up" solid color={color} size={size} />
            ),
          }}
          component={HistoryScreen}
          name="add"
        />
        <BottomTab.Screen
          options={{
            title: 'Profile',
            tabBarIcon: ({color, size}) => (
              <Icon name="person" solid color={color} size={size} />
            ),
          }}
          component={ProfileScreen}
          name="profile"
        />
      </BottomTab.Navigator>
    );
  }
}
