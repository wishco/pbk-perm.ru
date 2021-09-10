import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PlaceToServer from "components/Data/PlaceToServer/PlaceToServer";

const mapStateToProps = (state) => {
  return {
    placesStructureStandard: state.app.placesStructureStandard
  }
}

let PlaceToServerContainer =
  compose (
    withRouter,
    connect(mapStateToProps, {}))
  (PlaceToServer)

export default PlaceToServerContainer
