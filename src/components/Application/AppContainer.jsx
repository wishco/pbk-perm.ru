import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { initializeApp } from "redux/app-reducer";
import App from "components/Application/App";

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized,
  };
};

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

export default AppContainer;
