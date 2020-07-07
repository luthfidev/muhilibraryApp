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

import {postauthors} from '../../redux/actions/author';
class AddAuthor extends Component {
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
  onDescriptionChange = (description) => {
    this.setState({description});
  };

  handleSubmit = async () => {
    const data = {
      name: this.state.name,
      description: this.state.description,
    };
    const {token} = this.props.auth;
    await this.props
      .postauthors(token, data)
      .then((response) => {
        Alert.alert(this.props.authors.successMsg);
        this.setState({
          name: '',
          description: '',
        });
        this.props.navigation.navigate('author');
      })
      .catch((error) => {
        Alert.alert(this.props.authors.errorMsg);
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
              Add Author
            </Text>
          </View>
          <Card>
            <View style={profileStyle.WrapperForm}>
              <Input
                label="Name Author"
                onChangeText={this.onNameChange}
                /* leftIcon={{type: 'font-awesome', name: 'chevron-left'}} */
              />
              <Input
                label="Description"
                onChangeText={this.onDescriptionChange}
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
  authors: state.authors,
});

const mapDispatchToProps = {postauthors};

export default connect(mapStateToProps, mapDispatchToProps)(AddAuthor);

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
