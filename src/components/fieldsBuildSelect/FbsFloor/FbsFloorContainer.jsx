import React from 'react'
import {compose} from "redux";
import {connect} from "react-redux";
import {changeFieldOfBuildSelect} from "redux/app-reducer";
import FbsFloor from "components/fieldsBuildSelect/FbsFloor/FbsFloor";

const mapStateToProps = (state) => {
  return {
    // modalWindowName: state.tools.modalWindowName
    // selectorEntrance: state.app.buildSelect.sneshSkazka.entrance,
    buildOptions: state.app.buildOptions,
    buildSelect: state.app.buildSelect
  }
}


let FbsFloorContainer =
  compose (
    connect(mapStateToProps, {changeFieldOfBuildSelect}))
  (FbsFloor)

export default FbsFloorContainer
