import { View, Text, FlatList } from 'react-native';
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
      <View>
        <Text>{item.description}</Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={list}
        renderItem={itemData => listComponent(itemData)}
        keyExtractor={listItem => listItem.id}
      />
    </View>
  );
};

export default KanbanList;
