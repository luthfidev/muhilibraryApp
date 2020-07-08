import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {connect} from 'react-redux';

// Auth
import LoginScreen from '../../screens/Login';
import RegisterScreen from '../../screens/Register';

// Transactions
import AllTransactionsScreen from '../../screens/transactions/AllTransactions';

// Profile
import EditProfileScreen from '../../screens/Profiles/EditProfile';

import GenresScreen from '../../screens/Genres/List';

import AuthorsScreen from '../../screens/Authors/List';
import AddAuthorsScreen from '../../screens/Authors/addAuthor';
import EditAuthorsScreen from '../../screens/Authors/editAuthor';

// Books
import DetailBookScreen from '../../screens/Books/DetailBook';
import BookGenresScreen from '../../screens/Books/BookGenres';

// Bottom Tab
import Tab from './Tab';
const Stacks = createStackNavigator();
class Stack extends Component {
  render() {
    return (
      <>
        <NavigationContainer>
          <Stacks.Navigator headerMode="float" animation="fade">
            {this.props.auth.token === null ? (
              <>
                <Stacks.Screen
                  component={LoginScreen}
                  options={{
                    headerShown: false,
                  }}
                  name={'login'}
                />
                <Stacks.Screen
                  component={RegisterScreen}
                  options={{
                    headerShown: false,
                  }}
                  name={'register'}
                />
              </>
            ) : (
              <>
                <Stacks.Screen
                  options={{title: 'Home', headerShown: false}}
                  component={Tab}
                  name={'home'}
                />
                <Stacks.Screen
                  options={{title: 'Detail Book', headerShown: false}}
                  component={DetailBookScreen}
                  name={'detailbook'}
                />
                <Stacks.Screen
                  options={{title: 'Books', headerShown: false}}
                  component={BookGenresScreen}
                  name={'bookgenres'}
                />
                {/* Transactions */}
                <Stacks.Screen
                  options={{title: 'Proses Transactions', headerShown: false}}
                  component={Tab}
                  name={'proses'}
                />
                <Stacks.Screen
                  options={{title: 'All Transactions', headerShown: false}}
                  component={AllTransactionsScreen}
                  name={'alltransactions'}
                />

                {/* Profile */}
                <Stacks.Screen
                  options={{
                    title: 'Profile',
                    headerShown: false,
                    gestureEnabled: true,
                    gestureDirection: 'vertical',
                    cardStyleInterpolator:
                      CardStyleInterpolators.forModalPresentationIOS,
                  }}
                  component={EditProfileScreen}
                  name={'editprofile'}
                />

                {/* Menu */}
                <Stacks.Screen
                  options={{
                    title: 'Author',
                    headerShown: false,
                    gestureEnabled: true,
                    gestureDirection: 'vertical',
                    cardStyleInterpolator:
                      CardStyleInterpolators.forModalPresentationIOS,
                  }}
                  component={AuthorsScreen}
                  name={'author'}
                />
                <Stacks.Screen
                  options={{
                    title: 'Add Author',
                    headerShown: false,
                    gestureEnabled: true,
                    gestureDirection: 'vertical',
                    cardStyleInterpolator:
                      CardStyleInterpolators.forModalPresentationIOS,
                  }}
                  component={AddAuthorsScreen}
                  name={'addauthor'}
                />
                <Stacks.Screen
                  options={{
                    title: 'Edit Author',
                    headerShown: false,
                    gestureEnabled: true,
                    gestureDirection: 'vertical',
                    cardStyleInterpolator:
                      CardStyleInterpolators.forModalPresentationIOS,
                  }}
                  component={EditAuthorsScreen}
                  name={'editauthor'}
                />
                <Stacks.Screen
                  options={{
                    title: 'Genre',
                    headerShown: false,
                    gestureEnabled: true,
                    gestureDirection: 'vertical',
                    cardStyleInterpolator:
                      CardStyleInterpolators.forModalPresentationIOS,
                  }}
                  component={GenresScreen}
                  name={'genre'}
                />
              </>
            )}
          </Stacks.Navigator>
        </NavigationContainer>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Stack);
