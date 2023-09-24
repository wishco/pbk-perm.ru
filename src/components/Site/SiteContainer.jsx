import { compose } from "redux";
import { connect } from "react-redux";
import Site from "components/Site/Site";
import {
  hideModalWindow,
  showModalWindowByName,
  updateScreenWidth,
} from "redux/tools-reducer";

const mapStateToProps = (state) => {
  return {
    activeModalWindowName: state.tools.activeModalWindowName,
    activeModalWindowData: state.tools.activeModalWindowData,
  };
};

let CallbackContainer = compose(
  connect(mapStateToProps, {
    showModalWindowByName,
    hideModalWindow,
    updateScreenWidth,
  })
)(Site);

export default CallbackContainer;
