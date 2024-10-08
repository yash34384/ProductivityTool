import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  LogBox,
  Alert
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { createToDo, updateToDo } from '../Utils/database';
import FormSubmitBtn from '../Components/FormSubmitBtn';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state'
]);
const { height: deviceHeight } = Dimensions.get('window');

const AddToDo = ({ route, navigation }) => {
  const [taskDesc, settaskDesc] = useState('');
  const [isImpo, setisImpo] = useState(0);
  const [isUrgent, setisUrgent] = useState(0);
  const [isMajor, setisMajor] = useState(0);

  const editTodoId = route.params?.editId;
  const isEditing = !!editTodoId;
  const todo = route.params?.todo;
  const setAllTodo = route.params?.setAllTodo;

  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Task' : 'Add Task'
    });
    if (isEditing) {
      settaskDesc(todo.description);
      setisImpo(todo.isImportant);
      setisUrgent(todo.isUrgent);
      setisMajor(todo.taskType);
    }
  }, [navigation, isEditing]);

  const submitTodo = async () => {
    if (!taskDesc || taskDesc.trim().length === 0) {
      Alert.alert('Invalid Description', 'Description can not be empty.', [
        { text: 'Okay', style: 'default' }
      ]);
      return;
    }
    const todo = {
      description: taskDesc.trim(),
      isImportant: isImpo,
      isUrgent: isUrgent,
      taskType: isMajor,
      stage: 0
    };
    await createToDo(todo);
    navigation.goBack();
  };
  const editTodo = async () => {
    if (isEditing) {
      const todo = {
        description: taskDesc.trim(),
        isImportant: isImpo,
        isUrgent: isUrgent,
        taskType: isMajor
      };
      if (!todo.description || todo.description.length === 0) {
        Alert.alert('Invalid Description', 'Description can not be empty.', [
          { text: 'Okay', style: 'default' }
        ]);
        return;
      }
      await updateToDo(todo, editTodoId, setAllTodo);
    }
    navigation.goBack();
  };

  return (
    <ScrollView style={style.scroll}>
      <View style={[style.container, { minHeight: deviceHeight - 56 }]}>
        <View>
          <Text style={style.title}>Task</Text>
          <TextInput
            multiline
            placeholder="Add Task"
            style={style.taskInput}
            value={taskDesc}
            onChangeText={txt => settaskDesc(txt)}
          />
        </View>
        <View>
          <Text style={style.title}>Is this task??</Text>
          <View style={style.box}>
            <TouchableOpacity onPress={() => setisImpo(0)}>
              <View style={style.radioWrapper}>
                <View style={style.radio}>
                  {isImpo == 0 ? <View style={style.radiobg}></View> : null}
                </View>
                <Text style={style.radioText}>Important</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setisImpo(1)}>
              <View style={style.radioWrapper}>
                <View style={style.radio}>
                  {isImpo == 1 ? <View style={style.radiobg}></View> : null}
                </View>
                <Text style={style.radioText}>Not Important</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={style.box}>
            <TouchableOpacity onPress={() => setisUrgent(0)}>
              <View style={style.radioWrapper}>
                <View style={style.radio}>
                  {isUrgent == 0 ? <View style={style.radiobg}></View> : null}
                </View>
                <Text style={style.radioText}>Urgent</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setisUrgent(1)}>
              <View style={style.radioWrapper}>
                <View style={style.radio}>
                  {isUrgent == 1 ? <View style={style.radiobg}></View> : null}
                </View>
                <Text style={style.radioText}>Not Urgent</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={style.title}>Type of this task??</Text>
          <View style={style.box}>
            <TouchableOpacity onPress={() => setisMajor(0)}>
              <View style={style.radioWrapper}>
                <View style={style.radio}>
                  {isMajor == 0 ? <View style={style.radiobg}></View> : null}
                </View>
                <Text style={style.radioText}>Major Task</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setisMajor(1)}>
              <View style={style.radioWrapper}>
                <View style={style.radio}>
                  {isMajor == 1 ? <View style={style.radiobg}></View> : null}
                </View>
                <Text style={style.radioText}>Medium Task</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setisMajor(2)}>
              <View style={style.radioWrapper}>
                <View style={style.radio}>
                  {isMajor == 2 ? <View style={style.radiobg}></View> : null}
                </View>
                <Text style={style.radioText}>Small Task</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {isEditing ? (
          <FormSubmitBtn onPress={editTodo}>Edit</FormSubmitBtn>
        ) : (
          <FormSubmitBtn onPress={submitTodo}>Add</FormSubmitBtn>
        )}
      </View>
    </ScrollView>
  );
};

export default AddToDo;

const style = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: 'green'
  },
  container: {
    flex: 1,
    backgroundColor: '#dee2e6',
    padding: 10
  },
  title: {
    fontFamily: 'mukta-4',
    fontSize: 30
  },
  taskInput: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    fontFamily: 'mukta-4',
    borderRadius: 10
  },
  box: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  radioWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3
  },
  radio: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderRadius: 15,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  radiobg: {
    backgroundColor: 'black',
    width: 20,
    height: 20,
    borderRadius: 10
  },
  radioText: {
    fontSize: 20,
    fontFamily: 'mukta-6'
  }
});
