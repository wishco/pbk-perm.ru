import {compose} from "redux";
import {connect} from "react-redux";
import RightsPersonalData from "components/RightsPeronalData/RightsPersonalData";
import {toggleRightsPersonalData} from "redux/tools-reducer";


const mapStateToProps = (state) => {
  return {
    checked: state.tools.userForm.rightsPersonalData.checked,
    valid: state.tools.userForm.rightsPersonalData.valid,
    required: state.tools.userForm.rightsPersonalData.required,
    used: state.tools.userForm.rightsPersonalData.used,
  }
}


let CallbackContainer =
  compose (
    connect(mapStateToProps, {toggleRightsPersonalData}))
  (RightsPersonalData)

export default CallbackContainer
