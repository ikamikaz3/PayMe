import React from "react";
import { Provider } from "react-redux";
import { AppLoading, Font, Icon } from "expo";
import PropTypes from "prop-types";

import { AppWithNavigationState } from "./navigation";
import store from "./redux/store";

const fontPath = require("../assets/fonts/OpenSans-SemiBold.ttf");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false
    };
  }

  // async componentWillMount() {
  //   await Font.loadAsync({
  //     ...Icon.Ionicons.font,
  //     openSansSemiBold: fontPath
  //   });
  //   console.log(this.state);
  //   this.setState({ isLoadingComplete: true });
  //   console.log(this.state);
  // }

  loadResourcesAsync = async () => {
    Promise.all([
      Font.loadAsync({
        ...Icon.Ionicons.font,
        openSansSemiBold: fontPath
      })
    ]);
  };

  // handleLoadingError = error => {
  //   console.warn(error);
  // };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    const { isLoadingComplete } = this.state;
    const { props } = PropTypes.objectOf(this.props);

    if (!isLoadingComplete && !props) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          // onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default App;
