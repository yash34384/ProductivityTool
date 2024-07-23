import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import React from 'react';
import HomeBtn from '../Components/HomeBtn';

const { height: deviceHeight } = Dimensions.get('window');

const Home = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={[style.container, { minHeight: deviceHeight - 56 }]}>
        <HomeBtn
          style={style.homeBtn}
          logo={require('../assets/images/time-blocking.png')}
          onPress={() => navigation.navigate('TimeBlocking')}
        >
          Time Blocking
        </HomeBtn>
        <HomeBtn
          style={style.homeBtn}
          logo={require('../assets/images/kanban.png')}
          onPress={() => navigation.navigate('Kanban')}
        >
          Kanban Board
        </HomeBtn>
        <HomeBtn
          style={style.homeBtn}
          logo={require('../assets/images/eisenhower.png')}
          onPress={() => navigation.navigate('Eisenhower')}
        >
          Eisenhower Matrix
        </HomeBtn>
        <HomeBtn
          style={style.homeBtn}
          logo={require('../assets/images/1-3-5.png')}
          onPress={() => navigation.navigate('OneThreeFive')}
        >
          1-3-5 Method
        </HomeBtn>
        <HomeBtn
          style={style.homeBtn}
          logo={require('../assets/images/pomodoro.png')}
          onPress={() => navigation.navigate('Pomodoro')}
        >
          Pomodoro Technique
        </HomeBtn>
      </View>
    </ScrollView>
  );
};

export default Home;

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#dee2e6',
    padding: 5
  }
});
