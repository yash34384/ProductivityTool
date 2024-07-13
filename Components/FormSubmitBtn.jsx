import { Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';

const FormSubmitBtn = ({ children, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [style.createBtn, style.pressed] : style.createBtn
      }
      onPress={onPress}
    >
      <Text style={style.btnTitle}>{children}</Text>
    </Pressable>
  );
};

export default FormSubmitBtn;

const style = StyleSheet.create({
  createBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    borderWidth: 2,
    borderRadius: 10
  },
  pressed: {
    opacity: 0.3
  },
  btnTitle: {
    fontFamily: 'mukta-6',
    fontSize: 25
  }
});
