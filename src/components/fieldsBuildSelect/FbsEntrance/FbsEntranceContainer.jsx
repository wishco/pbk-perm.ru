import React from 'react'
import {compose} from "redux";
import {connect} from "react-redux";
import {changeFieldOfBuildSelect} from "redux/app-reducer";
import FbsEntrance from "components/fieldsBuildSelect/FbsEntrance/FbsEntrance";

const mapStateToProps = (state) => {
  return {
    // modalWindowName: state.tools.modalWindowName
    selectorEntrance: state.app.buildSelect,
    buildOptions: state.app.buildOptions
  }
}


let FbsEntranceContainer =
  compose (
    connect(mapStateToProps, {changeFieldOfBuildSelect}))
  (FbsEntrance)

export default FbsEntranceContainer
