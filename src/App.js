import React from "react";
import View from "react-native";
import { Provider } from "react-redux";
import { Font, Icon } from "expo";
import PropTypes from "prop-types";

import { AppWithNavigationState } from "./navigation";
import store from "./redux/store";
import AppText from "./components/AppText";

const fontPath = require("../assets/fonts/OpenSans-SemiBold.ttf");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false
    };
  }

  _loadResourcesAsync = async () => {
    Promise.all([
      Font.loadAsync({
        ...Icon.Ionicons.font,
        openSansSemiBold: fontPath
      })
    ]);
  };

  // _handleLoadingError = error => {
  //   // In this case, you might want to report the error to your error
  //   // reporting service, for example Sentry
  //   console.warn(error);
  // };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    const { isLoadingComplete } = this.state;
    const { props } = PropTypes.objectOf(this.props);

    if (!isLoadingComplete && !props) {
      return (
        <Provider store={store}>
          <AppWithNavigationState />
        </Provider>
      );
    }
    return (
      <View>
        <AppText> Loading Application ...</AppText>
      </View>
    );
  }
}

export default App;
