import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BarBtn = ({ onPress, icon, size, color }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => (pressed ? style.pressed : [])}
    >
      <View style={style.container}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
};

export default BarBtn;

const style = StyleSheet.create({
  container: {
    marginHorizontal: 20
  },
  pressed: {
    opacity: 0.3
  }
});
