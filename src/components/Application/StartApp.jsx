import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import store from "redux/redux-store";
import AppContainer from "components/Application/AppContainer";

const StartApp = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer theme="default" />
      </Provider>
    </BrowserRouter>
  );
};
export default StartApp;
