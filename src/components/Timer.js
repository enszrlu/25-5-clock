import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import { VscDebugPause, VscDebugStart, VscDebugRestart} from 'react-icons/vsc';

export default function Timer(props) {
    return (
      <div id="timer">
        <h1>25 + 5 Clock </h1>
        <div id="lenght-cont">
            <div className='length-sub-cont'>
                <h2 id="break-label">Break Length</h2>
                <div className='lenght-controllers'>
                    <button className='length-button' id="break-increment" onClick={props.increaseBreakLength}><AiOutlineArrowUp /></button>
                    <h2 id="break-length" className='length-label'>{props.breakLength}</h2>
                    <button className='length-button' id="break-decrement" onClick={props.decreaseBreakLength}><AiOutlineArrowDown /></button>
                </div>
            </div>
            <div className='length-sub-cont'>
                <h2 id="session-label">Session Length</h2>
                <div className='lenght-controllers'>
                    <button className='length-button' id="session-increment" onClick={props.increaseSessionLength}><AiOutlineArrowUp /></button>
                    <h2 id="session-length" className='length-label'>{props.sessionLength}</h2>
                    <button className='length-button' id="session-decrement" onClick={props.decreaseSessionLength}><AiOutlineArrowDown /></button>
                </div>
            </div>
        </div>
        <div id="timer-div" className={props.status}>
            <h2 id="timer-label">{props.state}</h2>
            <div id="time-left"><span>{props.minutes < 10 ? "0"+props.minutes : props.minutes}</span>:<span>{props.seconds < 10 ? "0"+props.seconds : props.seconds}</span></div>
        </div>
        <div id="action-buttons-div">
            <button onClick={props.status == "Pause" ? props.start : props.pause} id="start_stop"> <VscDebugStart /> <VscDebugPause /></button>
            <button onClick={props.restart} id="reset"><VscDebugRestart /></button>
        </div>
        <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
      </div>
    );
}