import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import SneshSkazkaCommerce from "./SneshSkazkaCommerce";

const mapStateToProps = (state) => {

  return {

  }

}

export default compose(
  connect(mapStateToProps, {}),
  withRouter
)(SneshSkazkaCommerce)
