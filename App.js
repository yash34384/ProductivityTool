import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import {
  AddToDo,
  Eisenhower,
  EisenhowerList,
  Home,
  Kanban,
  KanbanList,
  OneThreeFive,
  OneThreeFiveList,
  Pomodoro,
  TimeBlocking,
} from "./Screens";
import BarBtn from "./Components/BarBtn";
import { init } from "./Utils/database";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "mukta-4": require("./assets/fonts/Mukta-Regular.ttf"),
    "mukta-6": require("./assets/fonts/Mukta-Bold.ttf"),
  });
  const [dbInit, setDbInit] = useState(false);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
    init()
      .then(() => {
        setDbInit(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!fontsLoaded || !dbInit) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleStyle: {
              fontSize: 30,
              fontFamily: "mukta-6",
            },
            contentStyle: {
              backgroundColor: "#dee2e6",
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => ({
              title: "TaskMaster",
              headerRight: ({ tintColor }) => (
                <BarBtn
                  icon="add-circle"
                  size={34}
                  color={tintColor}
                  onPress={() => {
                    navigation.navigate("AddToDo");
                  }}
                />
              ),
            })}
          />
          <Stack.Screen
            name="TimeBlocking"
            component={TimeBlocking}
            options={{
              title: "Time Blocking"
            }}
          />
          <Stack.Screen
            name="Kanban"
            component={Kanban}
            options={{
              title: "Kanban Board",
            }}
          />
          <Stack.Screen
            name="Pomodoro"
            component={Pomodoro}
            options={{
              title: "Pomodoro Technique",
            }}
          />
          <Stack.Screen
            name="Eisenhower"
            component={Eisenhower}
            options={{
              title: "Eisenhower Matrix",
            }}
          />
          <Stack.Screen
            name="OneThreeFive"
            component={OneThreeFive}
            options={{
              title: "1-3-5 Method",
            }}
          />
          <Stack.Screen
            name="AddToDo"
            component={AddToDo}
            options={{
              title: "Add Task",
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="KanbanList"
            component={KanbanList}
            options={{
              title: "Kanban List",
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="EisenhowerList"
            component={EisenhowerList}
            options={{
              title: "Eisenhower List",
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="OneThreeFiveList"
            component={OneThreeFiveList}
            options={{
              title: "1-3-5 List",
              presentation: "modal",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
