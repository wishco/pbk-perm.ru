import React from 'react'
import {compose} from "redux";
import {connect} from "react-redux";
import {changeFieldOfBuildSelect} from "redux/app-reducer";
import FbsType from "components/fieldsBuildSelect/FbsType/FbsType";

const mapStateToProps = (state) => {
  return {
    // modalWindowName: state.tools.modalWindowName
    // selectorEntrance: state.app.buildSelect.sneshSkazka.entrance,
    buildOptions: state.app.buildOptions,
    buildSelect: state.app.buildSelect
  }
}


let FbsTypeContainer =
  compose (
    connect(mapStateToProps, {changeFieldOfBuildSelect}))
  (FbsType)

export default FbsTypeContainer
