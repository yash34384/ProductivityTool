import { StyleSheet, View } from 'react-native';
import React from 'react';
import KanbanBtn from '../Components/KanbanBtn';

const OneThreeFive = ({ navigation }) => {
  function getList(name) {
    navigation.navigate('OneThreeFiveList', {
      type: name
    });
  }

  return (
    <View style={style.OTFContainer}>
      <KanbanBtn onPress={() => getList('Major')}>Major Task</KanbanBtn>
      <KanbanBtn onPress={() => getList('Medium')}>Medium Task</KanbanBtn>
      <KanbanBtn onPress={() => getList('Minor')}>Minor Task</KanbanBtn>
    </View>
  );
};

export default OneThreeFive;

const style = StyleSheet.create({
  OTFContainer: {
    backgroundColor: '#dee2e6',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 80
  }
});
