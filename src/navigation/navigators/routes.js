import { createSwitchNavigator, createStackNavigator } from "react-navigation";
import * as screenNames from "../ScreenNames";

// Screens
import Home from "../../components/Home";
import Main from "../../components/Main";

const stackNavigator = createStackNavigator(
  {
    [screenNames.HOME]: {
      screen: Home,
      navigationOptions: {
        header: () => null
      }
    },
    [screenNames.MAIN]: {
      screen: Main,
      navigationOptions: {
        header: () => null
      }
    }
  },
  {
    headerMode: "none",
    initialRouteName: screenNames.HOME
  }
);

export default createSwitchNavigator({
  stackNavigator
});
