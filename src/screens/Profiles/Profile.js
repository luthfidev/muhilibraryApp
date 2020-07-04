import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
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
import {logout} from '../../redux/actions/auth';
const CardView = () => {
  return (
    <Card title="MENU">
      <View style={CardStyle.WrapperContent}>
        <View style={CardStyle.wrapperButton}>
          <ThemeProvider theme={theme}>
            <TouchableOpacity>
              <Card>
                <Icon name="create" color="#44bd32" />
                <Text style={CardStyle.btnTitle}>Author</Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity>
              <Card>
                <Icon name="pricetags" color="#44bd32" />
                <Text style={CardStyle.btnTitle}>Genre</Text>
              </Card>
            </TouchableOpacity>
          </ThemeProvider>
        </View>
        <View style={CardStyle.wrapperButton}>
          <ThemeProvider theme={theme}>
            <TouchableOpacity>
              <Card>
                <Icon name="create" color="#44bd32" />
                <Text style={CardStyle.btnTitle}>Author</Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity>
              <Card>
                <Text>Button</Text>
              </Card>
            </TouchableOpacity>
          </ThemeProvider>
        </View>
        <View style={CardStyle.wrapperButton}>
          <ThemeProvider theme={theme}>
            <TouchableOpacity>
              <Card>
                <Text>Button</Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity>
              <Card>
                <Text>Button</Text>
              </Card>
            </TouchableOpacity>
          </ThemeProvider>
        </View>
      </View>
    </Card>
  );
};

class Profile extends Component {
  static navigationOptions = {
    gesturesEnabled: true,
  };
  navigateEditProfile = () => {
    this.props.navigation.navigate('editprofile');
  };

  onLogout = async () => {
    const {token} = this.props.auth;
    await this.props.logout(token);
    this.props.navigation.navigate('login');
  };

  render() {
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
            <Avatar
              rounded
              size={125}
              source={{
                uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              }}
            />
            <View style={profileStyle.wrapperBiodata}>
              <Text style={profileStyle.BiodataText}>Prima Dana D</Text>
              <Text style={profileStyle.BiodataText}>Birthdate</Text>
              <Text style={profileStyle.BiodataText}>Gender</Text>
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
});

const mapDispatchToProps = {
  logout,
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