import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import jwt_decode from 'jwt-decode';
import {Header, Input, Card, Button} from 'react-native-elements';
import Icon from 'react-native-ionicons';
import {connect} from 'react-redux';
import moment from 'moment';
import {getusersid, updateusersprofile} from '../../redux/actions/user';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: jwt_decode(this.props.auth.token),
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  onNameChange = (name) => {
    this.setState({name});
  };

  onBirthdateChange = (birthdate) => {
    this.setState({birthdate});
  };

  onGenderChange = (gender) => {
    this.setState({gender});
  };

  handleSubmit = async () => {
    const data = {
      name: this.state.name,
      birthdate: this.state.birthdate,
      gender: this.state.gender,
    };
    const {token} = this.props.auth;
    await this.props
      .updateusersprofile(token, data)
      .then((response) => {
        Alert.alert(this.props.users.successMsg);
        this.props.navigation.navigate('profile');
      })
      .catch((error) => {
        Alert.alert(this.props.users.errorMsg);
      });
  };

  fetchData = async () => {
    const {token} = this.props.auth;
    const {id} = this.state.user;
    await this.props.getusersid(token, id);
    const {dataUsers, isLoading} = this.props.users;
    this.setState({dataUsers, isLoading});
    this.state.dataUsers.map((users, index) =>
      this.setState({
        name: users.name,
        birthdate: moment(users.birthdate).format('yyyy-MM-DD'),
        gender: users.gender,
      }),
    );
  };
  render() {
    console.log(this.state.name)
    return (
      <SafeAreaView style={profileStyle.container}>
        <View style={profileStyle.header}>
          <Header
            centerComponent={
              <TouchableOpacity>
                <View style={profileStyle.btnDown} />
              </TouchableOpacity>
            }
          />
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 25, fontWeight: 'bold', marginTop: 10}}>
              Profile
            </Text>
          </View>
          <Card>
            <View style={profileStyle.WrapperForm}>
              <Input
                label="Full Name"
                onChangeText={this.onNameChange}
                defaultValue={this.state.name}
                /* leftIcon={{type: 'font-awesome', name: 'chevron-left'}} */
              />
              <Input
                label="Birthdate"
                onChangeText={this.onBirthdateChange}
                defaultValue={this.state.birthdate}
                /* leftIcon={{type: 'font-awesome', name: 'chevron-left'}} */
              />
              <View
                style={{
                  justifyContent: 'center',
                  flexDirection: 'row',
                  marginBottom: 20,
                }}>
                {/* <CheckBox
                  center
                  title="Male"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                />
                <CheckBox
                  center
                  title="Female"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                /> */}
                <Input
                  onChangeText={this.onGenderChange}
                  label="Gender"
                  defaultValue={this.state.gender}
                  /* leftIcon={{type: 'font-awesome', name: 'chevron-left'}} */
                />
              </View>
              <Button onPress={this.handleSubmit} title="Save" />
            </View>
          </Card>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});

const mapDispatchToProps = {
  getusersid,
  updateusersprofile,
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
const profileStyle = StyleSheet.create({
  btnDown: {
    width: 90,
    height: 10,
    marginBottom: 50,
    backgroundColor: '#f5f6fa',
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  WrapperForm: {
    margin: 20,
  },
});
