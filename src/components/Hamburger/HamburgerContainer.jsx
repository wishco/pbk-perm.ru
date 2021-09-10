import {compose} from "redux";
import {connect} from "react-redux";
import {showModalWindowByName} from "redux/tools-reducer";
import Hamburger from "components/Hamburger/Hamburger";

const mapStateToProps = (state) => {
  return {
    // activeModalWindowName: state.tools.activeModalWindowName
  }
}

let HamburgerContainer =
  compose (
    connect(mapStateToProps, {showModalWindowByName}))
  (Hamburger)

export default HamburgerContainer
