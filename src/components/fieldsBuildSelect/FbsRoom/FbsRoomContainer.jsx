import React from 'react'
import {compose} from "redux";
import {connect} from "react-redux";
import {changeFieldOfBuildSelect} from "redux/app-reducer";
import FbsType from "components/fieldsBuildSelect/FbsType/FbsType";
import FbsRoom from "components/fieldsBuildSelect/FbsRoom/FbsRoom";

const mapStateToProps = (state) => {
  return {
    // modalWindowName: state.tools.modalWindowName
    // selectorEntrance: state.app.buildSelect.sneshSkazka.entrance,
    places: state.app.places,
    buildOptions: state.app.buildOptions,
    buildSelect: state.app.buildSelect
  }
}


let FbsRoomContainer =
  compose (
    connect(mapStateToProps, {changeFieldOfBuildSelect}))
  (FbsRoom)

export default FbsRoomContainer
