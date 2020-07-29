import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Header, Input, Card, Button} from 'react-native-elements';
import {connect} from 'react-redux';

import {postgenres} from '../../redux/actions/genre';
class addGenre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      isLoading: true,
      btnLoading: false,
    };
  }
  onNameChange = (name) => {
    this.setState({name});
  };

  handleSubmit = async () => {
    const data = {
      name: this.state.name,
    };
    const {token} = this.props.auth;
    await this.props
      .postgenres(token, data)
      .then((response) => {
        Alert.alert(this.props.genres.successMsg);
        this.setState({
          name: '',
        });
        this.props.navigation.navigate('genre');
      })
      .catch((error) => {
        Alert.alert(this.props.genres.errorMsg);
      });
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
              Add Genre
            </Text>
          </View>
          <Card>
            <View style={profileStyle.WrapperForm}>
              <Input
                label="Name Genre"
                onChangeText={this.onNameChange}
                /* leftIcon={{type: 'font-awesome', name: 'chevron-left'}} */
              />
              <Button title="Save" onPress={this.handleSubmit} />
            </View>
          </Card>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  genres: state.genres,
});

const mapDispatchToProps = {postgenres};

export default connect(mapStateToProps, mapDispatchToProps)(addGenre);

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
