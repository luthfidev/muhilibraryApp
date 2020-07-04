import React, {Component} from 'react';
import {
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
  Platform,
} from 'react-native';
import {Button, colors, ThemeProvider} from 'react-native-elements';
import {connect} from 'react-redux';

import {register} from '../redux/actions/auth';
import {LogoRegister} from '../components/Logo';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: true,
    };
  }
  UNSAFE_componentWillMount() {
    setTimeout(() => {
      this.setState({
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
      .register(email, password)
      .then((response) => {
        Alert.alert(this.props.auth.successMsg);
        this.setState({
          email: '',
          password: '',
        });
        this.props.navigation.navigate('login');
      })
      .catch((error) => {
        Alert.alert(this.props.auth.errorMsg);
      });
  };

  navigateLogin = () => {
    this.props.navigation.navigate('login');
  };

  render() {
    return (
      <DismissKeyboard>
        <SafeAreaView style={registerStyle.container}>
          {this.state.isLoading && (
            <View style={registerStyle.loading}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
          {!this.state.isLoading && (
            <KeyboardAvoidingView behavior="position">
              <View>
                <LogoRegister />
                <Text style={registerStyle.logotext}>Register</Text>
              </View>
              <View style={registerStyle.form}>
                <View style={registerStyle.field}>
                  <TextInput
                    style={registerStyle.input}
                    underlineColorAndroid="transparent"
                    placeholder="Email"
                    placeholderTextColor="#00a8ff"
                    autoCapitalize="none"
                    value={this.state.email}
                    onChangeText={this.onEmailChange}
                  />
                  <TextInput
                    style={registerStyle.input}
                    underlineColorAndroid="transparent"
                    placeholder="Password"
                    placeholderTextColor="#00a8ff"
                    autoCapitalize="none"
                    value={this.state.password}
                    onChangeText={this.onPasswordChange}
                  />
                </View>
                <ThemeProvider theme={theme}>
                  <Button
                    title="Register"
                    loading={this.props.auth.isLoading}
                    onPress={this.handleSubmit}
                  />
                </ThemeProvider>
                <View style={registerStyle.signup}>
                  <Text>Don't have account ?</Text>
                  <Text
                    style={registerStyle.btnLogin}
                    onPress={this.navigateLogin}>
                    Sign In
                  </Text>
                </View>
              </View>
            </KeyboardAvoidingView>
          )}
        </SafeAreaView>
      </DismissKeyboard>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {register};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

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

const registerStyle = StyleSheet.create({
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
    flexDirection: 'row',
    marginTop: 25,
  },
  btnLogin: {
    marginLeft: 5,
    color: 'blue',
  },
});
