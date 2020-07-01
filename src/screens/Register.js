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
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {LogoRegister} from '../components/Logo';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
                  />
                  <TextInput
                    style={registerStyle.input}
                    underlineColorAndroid="transparent"
                    placeholder="Password"
                    placeholderTextColor="#00a8ff"
                    autoCapitalize="none"
                  />
                </View>
                <TouchableOpacity>
                  <View style={registerStyle.button}>
                    <Text style={registerStyle.btntext}>Register</Text>
                  </View>
                </TouchableOpacity>
                <Text style={registerStyle.signup}>Already have account ?</Text>
              </View>
            </KeyboardAvoidingView>
          )}
        </SafeAreaView>
      </DismissKeyboard>
    );
  }
}

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
    marginTop: 25,
  },
});
