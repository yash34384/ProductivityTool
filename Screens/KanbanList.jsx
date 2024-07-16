import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { readKanban } from '../Utils/database';

const KanbanList = ({ route, navigation }) => {
  const [list, setList] = useState([]);
  const stage = route.params?.stage;
  useEffect(() => {
    navigation.setOptions({
      title: `Tasks ${stage}`
    });
    const getList = async () => {
      const arr = ['To do', 'Doing', 'Done'];
      const index = arr.findIndex(ele => ele === stage);
      const list = await readKanban(index);
      setList([...list]);
    };
    getList();
  }, [navigation]);

  const listComponent = ({ item }) => {
    return (
      <View style={style.listItem}>
        <Text style={style.desc}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={style.listContainer}>
      <FlatList
        data={list}
        renderItem={itemData => listComponent(itemData)}
        keyExtractor={listItem => listItem.id}
      />
    </View>
  );
};

export default KanbanList;

const style = StyleSheet.create({
  listContainer: {
    padding: 10
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
