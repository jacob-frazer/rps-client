import ACTIONS from "./action";
import _ from "lodash";



const rpsReducer = (state = {}, action) => {
  switch (action.type) {

    case ACTIONS.Types.GIVE_ID: {
        let newState = _.cloneDeep(state)
        newState["socket_id"] = action.payload.socket_id
        newState["room_id"] = action.payload.room_id
        return newState
    }

    case ACTIONS.Types.OUTCOME: {
      let newState = _.cloneDeep(state);
      newState["outcome"] = action.payload.outcome  // object contains the result and the new score of the game to update the user
      newState["your_score"] = action.payload.myScore
      newState["opp_score"] = action.payload.oppScore
      newState["submitted"] = action.payload.submitted
      return newState;
    }

    case ACTIONS.Types.GET_CHOICE: {
      let newState = _.cloneDeep(state);
      newState["choice"] = action.payload.choice
      return newState;
    }

    case ACTIONS.Types.SUBMIT_CHOICE: {
      let newState = _.cloneDeep(state);
      newState["outcome"] = action.payload.outcome
      newState["submitted"] = action.payload.submitted
      return newState;
    }

    case ACTIONS.Types.GIVE_OPP_ID: {
      let newState = _.cloneDeep(state)
      newState["opponent_id"] = action.payload.socket_id
      return newState
    }

    case ACTIONS.Types.HELLO_SENT: {
      let newState = _.cloneDeep(state)
      newState["hello_sent"] = true
      return newState
    }

    default:
      return state;
  }
};

export default rpsReducer;