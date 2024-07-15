import { View, Text } from 'react-native';
import React, { useEffect } from 'react';

const KanbanList = ({ route, navigation }) => {
  const stage = route.params?.stage;
  useEffect(() => {
    navigation.setOptions({
      title: `Tasks ${stage}`
    });
  }, [navigation]);

  return (
    <View>
      <Text>KanbanList</Text>
    </View>
  );
};

export default KanbanList;
