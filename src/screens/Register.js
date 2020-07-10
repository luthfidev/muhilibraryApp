import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {colors, ThemeProvider, Header} from 'react-native-elements';
import {connect} from 'react-redux';
import FormRegister from '../components/Auth/FormRegister';
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
    }, 1000);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <DismissKeyboard>
          <SafeAreaView style={registerStyle.container}>
            {this.state.isLoading && (
              <View style={registerStyle.loading}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )}
            {!this.state.isLoading && (
              <>
                <Header
                  centerComponent={
                    <TouchableOpacity>
                      <View style={registerStyle.btnDown} />
                    </TouchableOpacity>
                  }
                />
                <KeyboardAvoidingView behavior="position">
                  <View>
                    <LogoRegister />
                    <Text style={registerStyle.logotext}>Register</Text>
                  </View>
                  <FormRegister />
                </KeyboardAvoidingView>
              </>
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
  btnDown: {
    width: 90,
    height: 10,
    marginBottom: 50,
    backgroundColor: '#f5f6fa',
    borderRadius: 10,
  },
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
