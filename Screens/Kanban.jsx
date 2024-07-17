import { View, StyleSheet } from 'react-native';
import React from 'react';
import KanbanBtn from '../Components/KanbanBtn';

const Kanban = ({ navigation }) => {
  function getList(name) {
    navigation.navigate('KanbanList', {
      stage: name
    });
  }

  return (
    <View style={style.kanbanContainer}>
      <KanbanBtn onPress={() => getList('To do')}>To do</KanbanBtn>
      <KanbanBtn onPress={() => getList('Doing')}>Doing</KanbanBtn>
      <KanbanBtn onPress={() => getList('Done')}>Done</KanbanBtn>
    </View>
  );
};

export default Kanban;

const style = StyleSheet.create({
  kanbanContainer: {
    backgroundColor: '#dee2e6',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 80
  }
});
