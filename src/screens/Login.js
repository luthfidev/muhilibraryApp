import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Button, colors, ThemeProvider} from 'react-native-elements';
import {connect} from 'react-redux';

import {login} from '../redux/actions/auth';
import Logo from '../components/Logo';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: true,
      btnLoading: false,
    };
    if (this.props.auth.token) {
      this.props.navigation.navigate('home');
    }
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

  onEmailChange = (email) => {
    this.setState({email});
  };
  onPasswordChange = (password) => {
    this.setState({password});
  };

  handleSubmit = async () => {
    const {email, password} = this.state;
    await this.props
      .login(email, password)
      .then((response) => {
        Alert.alert(this.props.auth.successMsg);
        this.setState({
          email: '',
          password: '',
        });
        this.props.navigation.navigate('home');
      })
      .catch((error) => {
        Alert.alert(this.props.auth.errorMsg);
      });
  };

  navigateSignup = () => {
    this.props.navigation.navigate('register');
  };

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
                <View style={loginStyle.form}>
                  <View style={loginStyle.field}>
                    <TextInput
                      style={loginStyle.input}
                      underlineColorAndroid="transparent"
                      placeholder="Email"
                      placeholderTextColor="#00a8ff"
                      autoCapitalize="none"
                      value={this.state.email}
                      onChangeText={this.onEmailChange}
                    />
                    <TextInput
                      style={loginStyle.input}
                      underlineColorAndroid="transparent"
                      placeholder="Password"
                      placeholderTextColor="#00a8ff"
                      autoCapitalize="none"
                      value={this.state.password}
                      onChangeText={this.onPasswordChange}
                    />
                  </View>
                  <Button
                    title="Login"
                    loading={this.props.auth.isLoading}
                    onPress={this.handleSubmit}
                  />
                  <View style={loginStyle.signup}>
                    <Text>Don't have account ?</Text>
                    <Text
                      style={loginStyle.btnSignup}
                      onPress={this.navigateSignup}>
                      Sign Up
                    </Text>
                  </View>
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
  form: {
    alignItems: 'center',
  },
  field: {
    width: 300,
  },
  input: {
    margin: 10,
    height: 45,
    borderColor: '#0097e6',
    borderWidth: 1,
    borderRadius: 30,
    paddingLeft: 15,
  },
  button: {
    width: 200,
    height: 20,
    marginTop: 15,
    borderRadius: 15,
    padding: 25,
    backgroundColor: '#0097e6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btntext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f5f6fa',
  },
  signup: {
    marginTop: 25,
    flexDirection: 'row',
  },
  btnSignup: {
    marginLeft: 5,
    color: 'blue',
  },
});
