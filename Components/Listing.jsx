import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';

const Listing = ({ list }) => {
  const listComponent = ({ item }) => {
    return (
      <View style={style.listItem}>
        <Text style={style.desc}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={style.listContainer}>
      {list.length === 0 ? (
        <View style={{ alignSelf: 'center' }}>
          <Text style={style.desc}>No Todo for this category</Text>
        </View>
      ) : (
        <FlatList
          data={list}
          renderItem={itemData => listComponent(itemData)}
          keyExtractor={listItem => listItem.id}
        />
      )}
    </View>
  );
};

export default Listing;

const style = StyleSheet.create({
  listContainer: {
    padding: 10,
    backgroundColor: '#dee2e6',
    flex: 1
  },
  listItem: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    padding: 4,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10
  },
  desc: {
    fontFamily: 'mukta-4',
    fontSize: 20
  }
});
