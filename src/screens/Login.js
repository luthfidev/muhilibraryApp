import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {colors, ThemeProvider} from 'react-native-elements';
import {connect} from 'react-redux';

import {login} from '../redux/actions/auth';
import Logo from '../components/Logo';
import FormLogin from '../components/Auth/FormLogin';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  UNSAFE_componentWillMount() {
    setTimeout(() => {
      this.setState({
        error: null,
        errorInfo: null,
        isLoading: false,
      });
    }, 3000);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <DismissKeyboard>
          <SafeAreaView style={loginStyle.container}>
            {this.state.isLoading && (
              <View style={loginStyle.loading}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )}
            {!this.state.isLoading && (
              <KeyboardAvoidingView behavior="position">
                <View>
                  <Logo />
                  <Text style={loginStyle.logotext}>Log In</Text>
                </View>
                <FormLogin />
                <View style={loginStyle.signup}>
                  <Text>Don't have account ?</Text>
                  <Text
                    style={loginStyle.btnSignup}
                    onPress={() => this.props.navigation.navigate('register')}>
                    Sign Up
                  </Text>
                </View>
              </KeyboardAvoidingView>
            )}
          </SafeAreaView>
        </DismissKeyboard>
      </ThemeProvider>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {login};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const theme = {
  color: {
    ...Platform.select({
      default: colors.platform.android,
      ios: colors.platform.ios,
    }),
  },
  Button: {
    buttonStyle: {
      backgroundColor: '#e84118',
    },
    containerStyle: {
      marginTop: 5,
      width: 200,
      borderRadius: 5,
    },
  },
};

const loginStyle = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#E3E6ED',
    alignItems: 'center',
  },
  logotext: {
    marginLeft: 25,
    marginBottom: 10,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#e84118',
    textDecorationLine: 'underline',
  },
  signup: {
    marginTop: 25,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnSignup: {
    marginLeft: 5,
    color: 'blue',
  },
});
