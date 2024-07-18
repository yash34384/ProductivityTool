import { View, StyleSheet } from 'react-native';
import React from 'react';
import EisenhowerBtn from '../Components/EisenhowerBtn';

const Eisenhower = ({ navigation }) => {
  function getEisenList(heading, isImportant, isUrgent) {
    navigation.navigate('EisenhowerList', {
      heading: heading,
      isImportant: isImportant,
      isUrgent: isUrgent
    });
  }
  return (
    <View style={style.eisenScreen}>
      <EisenhowerBtn
        head={'Do'}
        detail={"Urgent and Important tasks you'll work on immediately."}
        onPress={() => getEisenList('Do', 0, 0)}
      />
      <EisenhowerBtn
        head={'Decide'}
        detail={
          'Important, but not Urgent, tasks that can be scheduled for later.'
        }
        onPress={() => getEisenList('Decide', 0, 1)}
      />
      <EisenhowerBtn
        head={'Delegate'}
        detail={
          'Urgent, but not Important, tasks that need to be completed quickly.'
        }
        onPress={() => getEisenList('Delegate', 1, 0)}
      />
      <EisenhowerBtn
        head={'Delete'}
        detail={
          'Not Urgent or Important tasks that can be eliminated entirely.'
        }
        onPress={() => getEisenList('Delete', 1, 1)}
      />
    </View>
  );
};

export default Eisenhower;

const style = StyleSheet.create({
  eisenScreen: {
    backgroundColor: '#dee2e6',
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
