import { View, FlatList, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  deleteToDo,
  readSingleToDo,
  readToDo,
  updateToDoStage
} from '../Utils/database';

const TimeBlocking = ({ navigation }) => {
  const [todos, settodos] = useState([]);
  const stages = ['To do', 'Doing', 'Done'];

  useEffect(() => {
    const gettingToDo = async settodos => {
      await readToDo(settodos);
    };
    gettingToDo(settodos);
  }, []);

  async function deletingTodo(id) {
    await deleteToDo(id, () => readToDo(settodos));
  }

  async function editingPage(id) {
    const resp = await readSingleToDo(id);
    navigation.navigate('AddToDo', {
      editId: id,
      todo: resp[0],
      setAllTodo: () => readToDo(settodos)
    });
  }

  async function changeStage(id) {
    const resp = await readSingleToDo(id);
    let stage = resp[0].stage;
    stage = stage + 1;
    if (stage > 2) {
      stage = 0;
    }
    await updateToDoStage(stage, id, () => readToDo(settodos));
  }

  const todoComponent = ({ item }) => {
    return (
      <View style={{ marginBottom: 10 }}>
        <View style={style.TodoContainer}>
          <View style={style.UpContainer}>
            <Pressable
              style={({ pressed }) =>
                pressed ? [style.editable, style.pressed] : style.editable
              }
              onPress={() => editingPage(item.id)}
            >
              <Text style={style.desc}>{item.description}</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) =>
                pressed ? [style.binIcon, style.pressed] : style.binIcon
              }
              onPress={() => deletingTodo(item.id)}
            >
              <Ionicons name="trash-bin-sharp" size={35} color="black" />
            </Pressable>
          </View>
        </View>
        <Pressable
          style={({ pressed }) =>
            pressed ? [style.go, style.pressed] : style.go
          }
          onPress={() => changeStage(item.id)}
        >
          <Text style={style.goText}>{stages[item.stage]}</Text>
        </Pressable>
      </View>
    );
  };
  return (
    <View style={style.TimeBlockingContainer}>
      {todos.length === 0 ? (
        <View style={{ alignSelf: 'center' }}>
          <Text style={style.desc}>No Todos yet</Text>
        </View>
      ) : (
        <FlatList
          data={todos}
          renderItem={itemData => todoComponent(itemData)}
          keyExtractor={todo => todo.id}
        />
      )}
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
