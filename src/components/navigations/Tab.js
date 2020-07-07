import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-ionicons';

import DashboardScreen from '../../screens/Homes/Dashboard';

// transactions
import onProses from '../../screens/transactions/Proses';

import HistoryScreen from '../../screens/Profiles/History';
import ProfileScreen from '../../screens/Profiles/Profile';

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
            title: 'Transaction',
            tabBarIcon: ({color, size}) => (
              <Icon name="paper" solid color={color} size={size} />
            ),
          }}
          component={onProses}
          name="prosses"
        />
        <BottomTab.Screen
          options={{
            title: 'History',
            tabBarIcon: ({color, size}) => (
              <Icon name="trending-up" solid color={color} size={size} />
            ),
          }}
          component={HistoryScreen}
          name="history"
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
