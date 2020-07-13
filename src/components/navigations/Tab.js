import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-ionicons';
import {connect} from 'react-redux';
import jwt_decode from 'jwt-decode';
import DashboardScreen from '../../screens/Homes/Dashboard';

// transactions
import onProses from '../../screens/transactions/Proses';

import AdminOnProses from '../../screens/transactions/AdminProses';

import ProfileScreen from '../../screens/Profiles/Profile';

const BottomTab = createBottomTabNavigator();

class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: jwt_decode(this.props.auth.token) || {
        email: '',
        role: '',
      },
    };
  }
  render() {
    const {role} = this.state.user;
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
        {role === 'admin' && (
          <BottomTab.Screen
            options={{
              title: 'Admin Transaction',
              tabBarIcon: ({color, size}) => (
                <Icon name="paper" solid color={color} size={size} />
              ),
            }}
            component={AdminOnProses}
            name="adminproses"
          />
        )}
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
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Tab);
