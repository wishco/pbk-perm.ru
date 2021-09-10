import {compose} from "redux";
import {connect} from "react-redux";
import Site from "components/Site/Site";
import {hideModalWindow, showModalWindowByName, updateScreenWidth} from "redux/tools-reducer";
import YandexMap from "components/YandexMap/YandexMap";

const mapStateToProps = (state) => {
  return {
    // activeModalWindowName: state.tools.activeModalWindowName
    screenSize: state.tools.screenSize
  }
}

let YandexMapContainer =
  compose (
    connect(mapStateToProps, {}))
  (YandexMap)

export default YandexMapContainer
