import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, FlatList} from 'react-native';
import {Avatar} from 'react-native-elements';
import ENTRIES1 from '../components/dataBook';

function Item({title, image}) {
  return (
    <View style={profileStyle.item}>
      <View style={profileStyle.left}>
        <Image style={profileStyle.imageContainer} source={{uri: image}} />
      </View>
      <View style={profileStyle.right}>
        <Text style={profileStyle.title}>{title}</Text>
      </View>
    </View>
  );
}

export default class Profile extends Component {
  render() {
    return (
      <View style={profileStyle.container}>
        <View style={profileStyle.header}>
          <View style={profileStyle.avatar}>
            <View style={profileStyle.center}>
              <Avatar
                rounded
                size={125}
                source={{
                  uri:
                    'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                }}
              />
              <View style={profileStyle.biodata}>
                <Text style={profileStyle.baseText}>My Name is</Text>
                <Text style={profileStyle.baseText}>Birthdate</Text>
                <Text style={profileStyle.baseText}>Status</Text>
              </View>
            </View>
          </View>
        </View>
        <Text style={profileStyle.recent}>Recent Book</Text>
        <FlatList
          data={ENTRIES1}
          renderItem={({item}) => (
            <Item title={item.title} image={item.illustration} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  }
}

const profileStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  header: {
    backgroundColor: '#00a8ff',
    height: 250,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    shadowColor: '#dcdde1',
    elevation: 6,
  },
  avatar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  biodata: {
    marginTop: 10,
    alignItems: 'center',
  },
  baseText: {
    color: 'white',
    fontSize: 15,
  },
  actionBack: {
    marginTop: 15,
    marginLeft: 15,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    height: 150,
    /*  justifyContent: 'space-between', */
  },
  left: {
    marginLeft: 10,
  },
  right: {
    padding: 20,
    marginLeft: 100,
  },
  recent: {
    marginLeft: 25,
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 1,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'stretch',
    width: 100,
    height: 150,
  },
});
