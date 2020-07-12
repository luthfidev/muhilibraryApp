import React from 'react';
import {StyleSheet, View, Text, TextInput, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import {login} from '../../redux/actions/auth';

const FormLogin = () => {
  const dispatch = useDispatch();
  const {control, handleSubmit, errors} = useForm();
  const auth = useSelector((state) => state.auth.msg);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const onSubmit = async (data) => {
    await dispatch(login(data.email, data.password))
      .then((response) => {
        Alert.alert('Login Success');
      })
      .catch((error) => {
        Alert.alert(auth);
      });
  };

  return (
    <View style={loginStyle.form}>
      <View style={loginStyle.field}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <TextInput
              type="text"
              style={loginStyle.input}
              underlineColorAndroid="transparent"
              placeholder="Email"
              placeholderTextColor="#00a8ff"
              autoCapitalize="none"
              value={value}
              onChangeText={(email) => onChange(email)}
            />
          )}
          name="email"
          rules={{
            required: {
              value: true,
              message: 'Required',
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Enter a valid e-mail address',
            },
          }}
          defaultValue=""
        />
        {errors.email && (
          <Text style={loginStyle.errormsg}>{errors.email.message}</Text>
        )}
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <TextInput
              type="text"
              style={loginStyle.input}
              underlineColorAndroid="transparent"
              placeholder="Password"
              placeholderTextColor="#00a8ff"
              autoCapitalize="none"
              value={value}
              onChangeText={(password) => onChange(password)}
            />
          )}
          name="password"
          rules={{
            required: {
              value: true,
              message: 'Required',
            },
          }}
          defaultValue=""
        />
        {errors.password && (
          <Text style={loginStyle.errormsg}>{errors.password.message}</Text>
        )}
      </View>
      <Button
        title="Login"
        loading={isLoading}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default FormLogin;

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
  errormsg: {
    color: 'red',
    fontSize: 15,
  },
});
