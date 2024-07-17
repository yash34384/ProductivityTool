import { Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';

const EisenhowerBtn = ({ head, detail, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [style.eisenBtn, style.pressed] : style.eisenBtn
      }
      onPress={onPress}
    >
      <Text style={style.eisenHead}>{head}</Text>
      <Text style={style.eisenDet}>{detail}</Text>
    </Pressable>
  );
};

export default EisenhowerBtn;

const style = StyleSheet.create({
  eisenBtn: {
    width: '45%',
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    margin: 5
  },
  eisenHead: {
    fontFamily: 'mukta-6',
    fontSize: 30
  },
  eisenDet: {
    fontFamily: 'mukta-4',
    fontSize: 15
  },
  pressed: {
    opacity: 0.4
  }
});
