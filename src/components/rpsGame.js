import React, {Component} from 'react'
import '../css/rps.css'

class RPSGame extends Component {

    rpsChoice = (event) => {
        this.props.choice(event.target.id)
    }

    submitChoice = () => {
        // for some reason I am always getting a duplicate of the last result before it updates to correct one?
        this.props.submit()
    }

    render() {    
        return (
        <div id='main-area'>
            <div className="header">Welcome to LAN Rock, Paper, Scissors!</div>
            
            <div className="scoreboard">  
            <div class="Column">You </div>
            <div class="Column">{this.props.your_score} - {this.props.opp_score}</div>
            <div class="Column">Opponent</div>
            </div>

            <div className="rpsContainer">
                <img src="/images/rps_choices/rock.jpg" alt="rock" id='Rock' onClick={this.rpsChoice}/>
                <img src="/images/rps_choices/paper.jpg" alt="paper" id='Paper' onClick={this.rpsChoice}/>
                <img src="/images/rps_choices/scissors.jpg" alt="scissors" id='Scissors' onClick={this.rpsChoice}/>
            </div>
            <br/>

            <button class="button" type="submit" value="play" onClick={this.submitChoice}>Submit!</button>
        </div>
        );
    }
}



export default RPSGame;