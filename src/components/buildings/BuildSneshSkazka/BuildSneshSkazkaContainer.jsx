import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {hideModalWindow} from "redux/tools-reducer";
import Modal from "components/Modal/Modal";
import BuildSneshSkazka from "components/buildings/BuildSneshSkazka/BuildSneshSkazka";
import {changeEntranceOfBuildSelect, changeFieldOfBuildSelect} from "redux/app-reducer";



const mapStateToProps = (state) => {
  return {
    // modalWindowName: state.tools.modalWindowName
    // modalWindowBusy: state.tools.modalWindowBusy,
    // modalWindowBusyText: state.tools.modalWindowBusyText
    places: state.app,
    placesStructureStandard: state.app.places,
  }
}


let BuildSneshSkazkaContainer =
  compose (
    withRouter,
    connect(mapStateToProps, {}))
  (BuildSneshSkazka)

export default BuildSneshSkazkaContainer
