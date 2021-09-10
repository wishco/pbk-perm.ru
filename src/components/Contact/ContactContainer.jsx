import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Contact from "components/Contact/Contact";
import {showModalWindowByName} from "redux/tools-reducer";

const mapStateToProps = (state) => {
  return {
    telSelf: state.app.dataConstants.telSelf1
  }
}

let ContactContainer =
  compose (
    withRouter,
    connect(mapStateToProps, {showModalWindowByName}))
  (Contact)

export default ContactContainer
