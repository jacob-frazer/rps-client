import React, { Component } from "react";
import RPSGame from "./rpsGame";

import ACTIONS from "../modules/action";
import { connect } from "react-redux";

import socketIOClient from "socket.io-client";

const mapStateToProps = (state) => {
    return {...state}
  };
  
const mapDispatchToProps = dispatch => ({
  giveID: item => dispatch(ACTIONS.giveID(item)),
  dispatchOutcome: outcomeData => dispatch(ACTIONS.dispatchOutcome(outcomeData)),
  getChoice: choice => dispatch(ACTIONS.dispatchGetChoice(choice)),
  submitChoice: choice => dispatch(ACTIONS.dispatchSubmitChoice(choice)),
  giveOppID: ID => dispatch(ACTIONS.giveOppID(ID)),
  helloSent: hello => dispatch(ACTIONS.helloSent(hello))
});

const mySocket = socketIOClient("http://192.168.10.100:4001")

class socket_connector extends Component {

  componentDidMount() {
    mySocket.on("giveID", data => {
      this.props.giveID({ socket_id: data[1] , room_id: data[0]})
      mySocket.emit("hello", this.props.socket_id)
      console.log("the hello was emitted!")
    })
    
    mySocket.on("hello", ID => {
      if (this.props.hello_sent) { return }  // else 3rd person joining overwrites opponent ID - exchanged a hello doesn't care about anyone else
      console.log("msg received from ID "+ ID)
      this.props.giveOppID({socket_id: ID})   
      mySocket.emit("hello", this.props.socket_id)
      this.props.helloSent({hello_sent:true})
    });

    mySocket.on("outcome", outcomeScore => {
      let outcome = outcomeScore[0]
      let myScore = outcomeScore[1][this.props.socket_id]["score"]
      let oppScore = outcomeScore[1][this.props.opponent_id]["score"]

      this.props.dispatchOutcome({myScore, oppScore, outcome, submitted:false})
    })

    mySocket.on("connectToRoom", data => {console.log(data)});
    console.log(mySocket)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.choice !== this.props.choice){      // when the choice changes log the new choice in the console
      console.log(this.props.choice) 
    }
  }

  getData = (RPSChoice) => {
    // if value has already been submited to server than can't change value until game resolves
    if (!this.props.submitted) {
      this.props.getChoice({choice: RPSChoice})
    }
  }

  submitData = () => {
    if (!this.props.submitted) {
      this.props.submitChoice({submitted:true, outcome:false})
      mySocket.emit("choice", {"id":this.props.socket_id, "choice":this.props.choice, "room":this.props.room_id})
      console.log("the choice socket was emitted")
      
    }
  }

  getPicture = () => {
    const picDict = {
      "you won": "/images/results/win.jpg",
      "you tied": "/images/results/draw.jpg",
      "you lost": "/images/results/lose.jpg"
    }

    return picDict[this.props.outcome]
  }

  render() {
    return (
        <div class='bg'>
          <RPSGame your_score={this.props.your_score} opp_score={this.props.opp_score} choice={this.getData} submit={this.submitData}/>
          {this.props.submitted ? 
          <p>You have submitted {this.props.choice}! Waiting on your opponent to lock in their choice!</p>
          : 
          <p>Your current selection is: {this.props.choice}. Click submit to lock this in!</p>
          }

          {this.props.outcome
              ? <div><img src={this.getPicture()} alt="outcome" width="33%"/>
              <p>
                The results are in... {this.props.outcome}. Submit another choice to play again!
              </p></div>
              : <p>My ID is {this.props.socket_id}</p>}
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(socket_connector);