import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {add_place} from "redux/app-reducer";
import SneshSkazkaLive from "pages/live/SneshSkazkaLive/SneshSkazkaLive";

const mapStateToProps = (state) => {
    return {
      placeSneshSkazka: state.app.places["snesh-skazka"],
      placesStructure: state.app.placesStructureStandard
    }
}

let SneshSkazkaLiveContainer =compose(
  connect(mapStateToProps, {add_place}),
  withRouter
)(SneshSkazkaLive)


export default SneshSkazkaLiveContainer
