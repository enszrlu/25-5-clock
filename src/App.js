import logo from './logo.svg';
import './App.css';
import React from 'react';
import Timer from './components/Timer.js'
import {Howl, Howler} from 'howler';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      status: "Pause",
      state: "Not Started",
      minutes: 25,
      seconds: 0
    }
    /* this.sound = new Howl({
      src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav",
      html5: true
    }); */
    this.handleTimer = this.handleTimer.bind(this);
    this.switchState = this.switchState.bind(this);
    this.handleStartButton = this.handleStartButton.bind(this);
    this.handlePauseButton = this.handlePauseButton.bind(this);
    this.handleRestartButton = this.handleRestartButton.bind(this);
    this.handleSessionIncrement = this.handleSessionIncrement.bind(this);
    this.handleSessionDecrement = this.handleSessionDecrement.bind(this);
    this.handleBreakIncrement = this.handleBreakIncrement.bind(this);
    this.handleBreakDecrement = this.handleBreakDecrement.bind(this);    
  }

  handleTimer() {
    if (this.state.seconds == 0 && this.state.minutes == 0) {
      this.switchState();
    }
    else if (this.state.seconds == 0) {
      if (this.state.minutes == 1) {
        this.setState({status: this.state.state+"Red", minutes: 0, seconds: 59})
      }
      else {
        this.setState({minutes: this.state.minutes - 1, seconds: 59})
      }
    }
    else {
      this.setState({seconds: this.state.seconds - 1})
    }
  }

  switchState() {
    //this.sound.play();
    var sound2 = document.getElementById('beep');
    sound2.play();
    if (this.state.state == "Session") {
      this.setState({state:"Break", minutes:this.state.breakLength, seconds: 0, status: "Break"});
    }
    else if (this.state.state == "Break") {
      this.setState({state:"Session", minutes:this.state.sessionLength, seconds: 0, status: "Session"});
    }
  }

  handleStartButton() {
    if (this.state.status == "Pause") {
      if (this.state.state == "Not Started") {
        this.setState({status: "Session", state: "Session"})
      }
      else if (this.state.state == "Session Pause") {
        if (this.state.minutes == 0) {
          this.setState({status: "SessionRed", state: "Session"})
        }
        else {
          this.setState({status: "Session", state: "Session"})
        }
      }
      else if (this.state.state == "Break Pause") {
        if (this.state.minutes == 0) {
          this.setState({status: "BreakRed", state: "Break"})
        }
        else {
          this.setState({status: "Break", state: "Break"})
        }
      }
    }
  }

  handlePauseButton() {
    if (this.state.state == "Session") {
      this.setState({status: "Pause", state: "Session Pause"})
    }
    else if (this.state.state == "Break") {
      this.setState({status: "Pause", state: "Break Pause"})
    }
  }

  handleRestartButton() {
    //this.sound.stop();
    var sound2 = document.getElementById('beep');
    sound2.pause();
    sound2.currentTime = 0;
    this.setState({
      sessionLength: 25,
      breakLength: 5,
      status: "Pause",
      state: "Not Started",
      minutes: 25,
      seconds: 0
    })
  }

  handleSessionIncrement() {
    if (this.state.sessionLength < 60) {
      if (this.state.state == "Session" || this.state.state == "Session Pause" || this.state.state == "Not Started"){
        this.setState({sessionLength: this.state.sessionLength + 1, minutes: this.state.minutes + 1})
      }
      else (
        this.setState({sessionLength: this.state.sessionLength + 1})
      )
    }
  }
  handleSessionDecrement() {
    if (this.state.state == "Session" || this.state.state == "Session Pause" || this.state.state == "Not Started") {
      if (this.state.sessionLength > 1) {
        this.setState({sessionLength: this.state.sessionLength - 1, minutes: this.state.minutes > 0 ? this.state.minutes - 1 : this.state.minutes})
      }
    }
    else {
      if (this.state.sessionLength > 1) {
        this.setState({sessionLength: this.state.sessionLength - 1})
      }
    }
  }
  handleBreakIncrement() {
    if (this.state.breakLength < 60) {
      if (this.state.state == "Break" || this.state.state == "Break Pause"){
        this.setState({breakLength: this.state.breakLength + 1, minutes: this.state.minutes + 1})
      }
      else (
        this.setState({breakLength: this.state.breakLength + 1})
      )
    }
  }
  handleBreakDecrement() {
    if (this.state.state == "Break" || this.state.state == "Break Pause") {
      if (this.state.breakLength > 1) {
        this.setState({breakLength: this.state.breakLength - 1, minutes: this.state.minutes > 0 ? this.state.minutes - 1 : this.state.minutes})
      }
    }
    else {
      if (this.state.breakLength > 1) {
        this.setState({breakLength: this.state.breakLength - 1})
      }
    }
  }

  componentDidMount() {
    setInterval(() => {
      if (this.state.status != "Pause") {
        this.handleTimer();
      }
    }, 10);
  }

  render() {
    return (
      <div className="App">
        <Timer sessionLength={this.state.sessionLength} breakLength={this.state.breakLength} status={this.state.status} 
            state={this.state.state} minutes={this.state.minutes} seconds={this.state.seconds} start={this.handleStartButton}
            pause={this.handlePauseButton} restart={this.handleRestartButton} increaseSessionLength={this.handleSessionIncrement}
            decreaseSessionLength={this.handleSessionDecrement} increaseBreakLength={this.handleBreakIncrement}
            decreaseBreakLength={this.handleBreakDecrement} />
      </div>
    );
  }
}
  

export default App;
