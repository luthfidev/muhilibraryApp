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
} from 'react-native';
import Logo from '../components/Logo';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default class Login extends Component {
  render() {
    return (
      <DismissKeyboard>
        <SafeAreaView style={loginStyle.container}>
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
                />
                <TextInput
                  style={loginStyle.input}
                  underlineColorAndroid="transparent"
                  placeholder="Password"
                  placeholderTextColor="#00a8ff"
                  autoCapitalize="none"
                />
              </View>
              <TouchableOpacity>
                <View style={loginStyle.button}>
                  <Text style={loginStyle.btntext}>Login</Text>
                </View>
              </TouchableOpacity>
              <Text style={loginStyle.signup}>Don't have account ?</Text>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </DismissKeyboard>
    );
  }
}

const loginStyle = StyleSheet.create({
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
    margin: 15,
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
