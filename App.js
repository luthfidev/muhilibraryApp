import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Auth
import LoginScreen from './src/screens/Login';
import RegisterScreen from './src/screens/Register';

// Transactions
import AllTransactionsScreen from './src/screens/transactions/AllTransactions';

// Profile
import EditProfileScreen from './src/screens/Profiles/EditProfile';

// Books
import DetailBookScreen from './src/screens/Books/DetailBook';

// Bottom Tab
import Tab from './src/components/Tab';

import {store, persistor} from './src/redux/store';

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
        <Provider store={store}>
          <PersistGate persistor={persistor}>
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

                {/* Transactions */}
                <Stack.Screen
                  options={{title: 'Proses Transactions', headerShown: false}}
                  component={Tab}
                  name={'proses'}
                />
                <Stack.Screen
                  options={{title: 'All Transactions', headerShown: false}}
                  component={AllTransactionsScreen}
                  name={'alltransactions'}
                />

                {/* Profile */}
                <Stack.Screen
                  options={{title: 'Profile', headerShown: false}}
                  component={EditProfileScreen}
                  name={'editprofile'}
                />

                <Stack.Screen
                  options={{title: 'Home', headerShown: false}}
                  component={Tab}
                  name={'home'}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </>
    );
  }
}
