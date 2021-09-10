import {compose} from "redux";
import {connect} from "react-redux";
import Site from "components/Site/Site";
import {hideModalWindow, showModalWindowByName, updateScreenWidth} from "redux/tools-reducer";
import YandexMap from "components/YandexMap/YandexMap";
import RoomBanner from "components/RoomBanner/RoomBanner";
import {changeFieldOfBuildSelect} from "redux/app-reducer";

const mapStateToProps = (state) => {
  return {
    // activeModalWindowName: state.tools.activeModalWindowName
    buildOptions: state.app.buildOptions,
    buildSelect: state.app.buildSelect
  }
}

let RoomBannerContainer =
  compose (
    connect(mapStateToProps, {changeFieldOfBuildSelect}))
  (RoomBanner)

export default RoomBannerContainer
