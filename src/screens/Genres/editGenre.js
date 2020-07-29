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

import {getgenres, postgenres, updategenres} from '../../redux/actions/genre';
class editGenre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.route.params.name,
      dataGenres: [],
      isLoading: true,
      btnLoading: false,
    };
  }
  onNameChange = (name) => {
    this.setState({name});
  };

  handleSubmit = async () => {
    const id = this.props.route.params.id;
    const data = {
      name: this.state.name,
    };
    const {token} = this.props.auth;
    await this.props
      .updategenres(token, id, data)
      .then((response) => {
        Alert.alert(this.props.genres.successMsg);
        this.props.navigation.navigate('genre');
      })
      .catch((error) => {
        Alert.alert(this.props.genres.errorMsg);
      });
  };

  render() {
    const {name} = this.props.route.params;
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
              Edit Genre
            </Text>
          </View>
          <Card>
            <View style={profileStyle.WrapperForm}>
              <Input
                label="Name Genre"
                onChangeText={this.onNameChange}
                defaultValue={name}
                /* leftIcon={{type: 'font-awesome', name: 'chevron-left'}} */
              />
              <Button
                title="Update"
                loading={this.props.genres.isLoading}
                onPress={this.handleSubmit}
              />
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

const mapDispatchToProps = {postgenres, getgenres, updategenres};

export default connect(mapStateToProps, mapDispatchToProps)(editGenre);

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
