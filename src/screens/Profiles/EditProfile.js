import React, {Component} from 'react';
import {
  StyleSheet,
  Platform,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Header, Input, Card, CheckBox, Button} from 'react-native-elements';
import Icon from 'react-native-ionicons';
import {connect} from 'react-redux';
import moment from 'moment';
import {getusersid} from '../../redux/actions/user';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route.params,
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    const {token} = this.props.auth;
    const id = this.state.id;
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
                defaultValue={this.state.name}
                /* leftIcon={{type: 'font-awesome', name: 'chevron-left'}} */
              />
              <Input
                label="Birthdate"
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
                  label="Gender"
                  defaultValue={this.state.gender}
                  /* leftIcon={{type: 'font-awesome', name: 'chevron-left'}} */
                />
              </View>
              <Button title="Save" />
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
