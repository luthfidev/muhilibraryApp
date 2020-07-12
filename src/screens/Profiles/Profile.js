import React, {Component} from 'react';
import qs from 'querystring';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Avatar,
  Card,
  colors,
  Button,
  ThemeProvider,
  Header,
} from 'react-native-elements';
import Icon from 'react-native-ionicons';
import {connect} from 'react-redux';
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import ImagePicker from 'react-native-image-picker';
import {REACT_APP_URL} from 'react-native-dotenv';
const url = `${REACT_APP_URL}`;
import {logout} from '../../redux/actions/auth';
import {getusersid, uploadavatarprofile} from '../../redux/actions/user';
import {Alert} from 'react-native';

const CardView = () => {
  const navigation = useNavigation();
  return (
    <Card title="MENU">
      <View style={CardStyle.WrapperContent}>
        <View style={CardStyle.wrapperButton}>
          <ThemeProvider theme={theme}>
            <TouchableOpacity onPress={() => navigation.navigate('author')}>
              <Card>
                <Icon name="create" color="#44bd32" />
                <Text style={CardStyle.btnTitle}>Author</Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('genre')}>
              <Card>
                <Icon name="pricetags" color="#44bd32" />
                <Text style={CardStyle.btnTitle}>Genre</Text>
              </Card>
            </TouchableOpacity>
          </ThemeProvider>
        </View>
      </View>
    </Card>
  );
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUsers: [],
      isLoading: false,
      user: jwt_decode(this.props.auth.token) || {
        email: '',
        role: '',
      },
      avatar: null,
      progress: 0,
    };
  }
  navigateEditProfile = () => {
    const {id} = this.state.user;
    this.props.navigation.navigate('editprofile', id);
  };

  componentDidMount() {
    this.fetchData();
  }

  onLogout = async () => {
    const {token} = this.props.auth;
    await this.props.logout(token);
    this.props.navigation.navigate('login');
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
        picture: users.picture,
        birthdate: moment(users.birthdate).format('yyyy-MM-DD'),
        gender: users.gender,
      }),
    );
  };

  handleChoosePhoto = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({avatar: response});
      }
    });
  };

  handleUploadAvatar = async () => {
    const {id} = this.state.user;
    const {token} = this.props.auth;
    // const data = this.createFormData(this.state.avatar);
    const avatar = this.state.avatar;
    const data = new FormData();
    data.append('picture', {
      name: avatar.fileName,
      type: avatar.type,
      uri:
        Platform.OS === 'android'
          ? avatar.uri
          : avatar.uri.replace('file://', ''),
    });
    await this.props
      .uploadavatarprofile(token, id, data)
      .then((response) => {
        Alert.alert('Upload success!');
        this.setState({avatar: null});
      })
      .catch((error) => {
        Alert.alert('Upload failed!');
      });
  };

  render() {
    const {avatar} = this.state;
    return (
      <SafeAreaView style={profileStyle.container}>
        <View style={profileStyle.header}>
          <Header
            rightComponent={
              <Icon
                name="create"
                color="#fff"
                onPress={this.navigateEditProfile}
              />
            }
          />
          <View style={profileStyle.WrapperAvatar}>
            {avatar && (
              <>
                <Avatar
                  onPress={this.handleChoosePhoto}
                  rounded
                  size={125}
                  source={{
                    uri: avatar.uri,
                  }}
                />
                <TouchableOpacity onPress={this.handleUploadAvatar}>
                  <Text>Upload</Text>
                </TouchableOpacity>
              </>
            )}
            {!avatar && (
              <Avatar
                onPress={this.handleChoosePhoto}
                rounded
                size={125}
                source={{
                  uri: url + this.state.picture,
                }}
              />
            )}

            <View style={profileStyle.wrapperBiodata}>
              <Text style={profileStyle.BiodataText}>{this.state.name}</Text>
              <Text style={profileStyle.BiodataText}>
                {this.state.birthdate}
              </Text>
              <Text style={profileStyle.BiodataText}>{this.state.gender}</Text>
            </View>
          </View>
        </View>
        <ScrollView>
          <CardView />
          <View style={profileStyle.wrapperLogout}>
            <ThemeProvider theme={themeBtn}>
              <Button
                title="Logout"
                loading={this.props.auth.isLoading}
                onPress={this.onLogout}
              />
            </ThemeProvider>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});

const mapDispatchToProps = {
  logout,
  getusersid,
  uploadavatarprofile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const theme = {
  color: {
    ...Platform.select({
      default: colors.platform.android,
      ios: colors.platform.ios,
    }),
  },
  Card: {
    buttonStyle: {
      backgroundColor: '#e84118',
    },
    containerStyle: {
      alignItems: 'center',
      marginTop: 5,
      width: 100,
      height: 100,
      borderRadius: 5,
    },
  },
};

const themeBtn = {
  color: {
    ...Platform.select({
      default: colors.platform.android,
      ios: colors.platform.ios,
    }),
  },
  Button: {
    buttonStyle: {
      backgroundColor: '#EA2027',
    },
    containerStyle: {
      alignItems: 'center',
      marginTop: 5,
      borderRadius: 5,
      width: 100,
    },
  },
};

const profileStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  header: {
    backgroundColor: '#2289DC',
    height: 250,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    shadowColor: '#dcdde1',
    elevation: 6,
    marginBottom: 25,
  },
  WrapperAvatar: {
    alignItems: 'center',
  },
  wrapperBiodata: {
    alignItems: 'center',
    marginTop: 10,
    width: 250,
    backgroundColor: '#dfe4ea',
    borderRadius: 10,
    shadowColor: '#dcdde1',
    elevation: 5,
  },
  BiodataText: {},
  avatar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperLogout: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});

const CardStyle = StyleSheet.create({
  WrapperContent: {
    flexDirection: 'column',
  },
  wrapperButton: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    shadowColor: '#dcdde1',
    elevation: 6,
  },
  btnTitle: {
    marginTop: 10,
  },
});
