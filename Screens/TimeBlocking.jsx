import { View, FlatList, Text } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

const TimeBlocking = () => {
  const todos = useSelector(state => state.todos);
  console.log(todos);
  const todoComponent = ({ item }) => {
    return (
      <View>
        <Text>{item.description}</Text>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={todos}
        renderItem={itemData => todoComponent(itemData)}
        keyExtractor={todo => todo.id}
      />
      {/* {todos.map(todo => (
        <Text key={todo.id}>{todo.description}</Text>
      ))} */}
    </View>
  );
};

export default TimeBlocking;
