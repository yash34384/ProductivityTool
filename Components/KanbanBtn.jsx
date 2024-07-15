import { Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';

const KanbanBtn = ({ children, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [style.pressed, style.kanbanBtn] : style.kanbanBtn
      }
      onPress={onPress}
    >
      <Text style={style.kanbanStatus}>{children}</Text>
    </Pressable>
  );
};

export default KanbanBtn;

const style = StyleSheet.create({
  kanbanBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%'
  },
  pressed: {
    opacity: 0.4
  },
  kanbanStatus: {
    fontFamily: 'mukta-6',
    fontSize: 50
  }
});
