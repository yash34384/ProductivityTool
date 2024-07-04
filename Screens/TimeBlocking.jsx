import { View, FlatList, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useSelector } from 'react-redux';

const TimeBlocking = () => {
  const stages = ['Queued', 'Ongoing', 'Achieved'];
  const todos = useSelector(state => state.todos);
  const todoComponent = ({ item }) => {
    return (
      <View style={{ marginBottom: 10 }}>
        <View style={style.TodoContainer}>
          <View style={style.UpContainer}>
            <Pressable
              style={({ pressed }) =>
                pressed ? [style.editable, style.pressed] : style.editable
              }
            >
              <Text style={style.desc}>{item.description}</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) =>
                pressed ? [style.binIcon, style.pressed] : style.binIcon
              }
            >
              <Ionicons name="trash-bin-sharp" size={35} color="black" />
            </Pressable>
          </View>
        </View>
        <Pressable
          style={({ pressed }) =>
            pressed ? [style.go, style.pressed] : style.go
          }
        >
          <Text style={style.goText}>{stages[item.stage]}</Text>
        </Pressable>
      </View>
    );
  };
  return (
    <View style={style.TimeBlockingContainer}>
      <FlatList
        data={todos}
        renderItem={itemData => todoComponent(itemData)}
        keyExtractor={todo => todo.id}
      />
    </View>
  );
};

export default TimeBlocking;

const style = StyleSheet.create({
  TimeBlockingContainer: {
    backgroundColor: '#dee2e6',
    flex: 1,
    padding: 10
  },
  TodoContainer: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    borderBottomLeftRadius: 0
  },
  UpContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  editable: {
    flex: 1,
    paddingLeft: 5
  },
  desc: {
    fontSize: 20,
    fontFamily: 'mukta-4'
  },
  binIcon: {
    padding: 15,
    borderLeftColor: 'black',
    borderLeftWidth: 1
  },
  go: {
    width: 100,
    borderWidth: 1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderRadius: 5,
    borderTopWidth: 0,
    paddingLeft: 10,
    paddingBottom: 5,
    paddingRight: 10
  },
  goText: {
    fontSize: 20,
    fontFamily: 'mukta-4'
  },
  pressed: {
    opacity: 0.3
  }
});
