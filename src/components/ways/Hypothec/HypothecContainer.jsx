import {compose} from "redux";
import {connect} from "react-redux";
import {updateFormHypothec} from "redux/forms-values-reducer";
import Hypothec from "components/ways/Hypothec/Hypothec";

const mapStateToProps = (state) => {
  return {
    formHypothec: state.formsValues.formHypothec
  }
}

let HypothecContainer =
  compose (
    connect(mapStateToProps, {updateFormHypothec}))
  (Hypothec)

export default HypothecContainer
