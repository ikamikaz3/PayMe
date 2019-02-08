import React from "react";
import { Provider } from "react-redux";
import { store, AppWithNavigationState } from "./navigation/navigators";

const App = () => (
  <Provider store={store}>
    <AppWithNavigationState />
  </Provider>
);

export default App;
