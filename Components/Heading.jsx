import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const Heading = ({ children }) => {
  return (
    <View style={style.headingContainer}>
      <Text style={style.line}>.</Text>
      <Text style={style.heading}>{children}</Text>
      <Text style={style.line}>.</Text>
    </View>
  );
};

export default Heading;

const style = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  heading: {
    fontSize: 20
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'black'
  }
});
