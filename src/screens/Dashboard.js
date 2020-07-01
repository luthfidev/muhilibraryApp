import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

function Item({title}) {
  return (
    <View style={dashboardStyle.item}>
      <Text style={dashboardStyle.title}>{title}</Text>
    </View>
  );
}

export default class Dashboard extends Component {
  render() {
    return (
      <SafeAreaView style={dashboardStyle.container}>
        <View>
          <Text>Dashboard</Text>
        </View>
        <FlatList
          data={DATA}
          renderItem={({item}) => <Item title={item.title} />}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  }
}

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const dashboardStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#4834d4',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 42,
    color: '#f5f6fa',
  },
});
