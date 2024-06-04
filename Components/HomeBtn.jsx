import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import React from 'react';

const HomeBtn = ({ children, logo, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [style.btn, style.pressed] : style.btn
      }
      onPress={onPress}
    >
      <View style={style.container}>
        <Image style={style.image} source={logo} />
        <Text style={style.heading}>{children}</Text>
      </View>
    </Pressable>
  );
};

export default HomeBtn;

const style = StyleSheet.create({
  btn: {
    width: '44%',
    borderRadius: 8,
    height: 200,
    marginTop: 15,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
    elevation: 5
  },
  pressed: {
    backgroundColor: '#fca311'
  },
  container: {
    alignItems: 'center'
  },
  heading: {
    fontFamily: 'mukta-6',
    fontSize: 24,
    color: 'black'
  },
  image: {
    width: 80,
    height: 80
  }
});
