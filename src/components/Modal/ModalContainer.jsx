import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {hideModalWindow} from "redux/tools-reducer";
import Modal from "components/Modal/Modal";



const mapStateToProps = (state) => {
  return {
    // modalWindowName: state.tools.modalWindowName
    modalWindowBusy: state.tools.modalWindowBusy,
    modalWindowBusyText: state.tools.modalWindowBusyText
  }
}


let CallbackContainer =
  compose (
    withRouter,
    connect(mapStateToProps, {hideModalWindow}))
  (Modal)

export default CallbackContainer
