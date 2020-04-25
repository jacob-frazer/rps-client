const Types = {
    GIVE_ID: "GIVE_ID",
    OUTCOME: "OUTCOME",
    GET_CHOICE: "GET_CHOICE",
    SUBMIT_CHOICE: "SUBMIT_CHOICE",
    GIVE_OPP_ID: "GIVE_OPP_ID",
    HELLO_SENT: "HELLO_SENT"
  };

// actions
const giveID = data => ({
type: Types.GIVE_ID,
payload: data
});

const dispatchOutcome = data => ({
type: Types.OUTCOME,
payload: data
});

const dispatchGetChoice = data => ({
type: Types.GET_CHOICE,
payload: data
});

const dispatchSubmitChoice = data => ({
type: Types.SUBMIT_CHOICE,
payload: data
});

const giveOppID = data => ({
  type: Types.GIVE_OPP_ID,
  payload: data
  });

const helloSent = data => ({
  type: Types.HELLO_SENT,
  payload: data
  });
  

export default {
giveID,
dispatchOutcome,
dispatchGetChoice,
dispatchSubmitChoice,
giveOppID,
helloSent,
Types
};