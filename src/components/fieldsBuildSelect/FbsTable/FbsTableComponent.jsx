import React from 'react'
import {compose} from "redux";
import {connect} from "react-redux";
import FbsTable from "components/fieldsBuildSelect/FbsTable/FbsTable";

const mapStateToProps = (state) => {
  return {
    places: state.app.places,
    buildSelect: state.app.buildSelect,
    placesStructureStandard:  state.app.placesStructureStandard
  }
}


let FbsTableComponent =
  compose (
    connect(mapStateToProps, {}))
  (FbsTable)

export default FbsTableComponent
