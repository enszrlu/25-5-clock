import logo from './logo.svg';
import './App.css';
import React from 'react';
import Timer from './components/Timer.js'



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 7,
      breakLength: 5,
      onSession: true
    }
    this.handleTimerEnd = this.handleTimerEnd.bind(this);
  }

  handleTimerEnd(event) {
    if (this.state.onSession) {
      this.setState({onSession: false})
      
    }
    else {
      this.setState({onSession: true})
      console.log('test')
    }
  }


  render() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + (this.state.onSession ? this.state.sessionLength : this.state.breakLength)); // 10 minutes timer
    return (
      <div className="App">
        <Timer expiryTimestamp={time} expiryFunction={this.handleTimerEnd} timerDuration={this.state.onSession ? this.state.sessionLength : this.state.breakLength}/>
      </div>
    );
  }
}
  

export default App;
