import {compose} from "redux";
import {connect} from "react-redux";
import Callback from "components/Callback/Callback";
import {hideModalWindow, setModalWindowBusy, setTextModalWindowBusy, unsetModalWindowBusy} from "redux/tools-reducer";
import {updateFormCallBack} from "redux/forms-values-reducer";

const mapStateToProps = (state) => {
  return {
    formCallBack: state.formsValues.formCallBack,
    checkedRights: state.tools.userForm.rightsPersonalData.checked,
  }
}

let CallbackContainer =
  compose (
    connect(mapStateToProps, {
      hideModalWindow, updateFormCallBack, setModalWindowBusy, unsetModalWindowBusy, setTextModalWindowBusy
    }))
  (Callback)

export default CallbackContainer
