import React, { useState, useEffect } from 'react';
// import useInterval from './useInterval';
import './Clock.css';

function Clock() {
  const initialInterval = 25 * 1000 * 60;
  const [timer, setTimer] = useState(initialInterval);
  const [isActive, setIsActive] = useState(false);
  var minute = Math.floor(timer / (1000 * 60));
  var second = Math.floor((timer % (1000 * 60)) / 1000);
  function toggle() {
    setIsActive(!isActive);
  }
  function reset() {
    setTimer(initialInterval);
    minute = Math.floor(timer / (1000 * 60));
    second = Math.floor((timer % (1000 * 60)) / 1000);
    setIsActive(false);
  }
  function addTimer() {
    setTimer(timer + 60000);
  }
  function subtractTimer() {
    if (timer > 60000) {
      setTimer(timer - 60000);
    } else {
      return 60000;
    }
  }
  useEffect(() => {
    let interval = null;
    if (isActive && timer >= 0) {
      interval = setInterval(() => {
        setTimer(timer - 1000);
      }, 1000);
    }
    if (timer < 0) {
      clearInterval(interval);
      setIsActive(false);
      setTimer(initialInterval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, timer, initialInterval]);
  return (
    <div>
      <h2>Session Length</h2>
      <div id='count'>
        <span onClick={addTimer}>
          <i className='fa fa-arrow-up'></i>
        </span>
        <span onClick={subtractTimer}>
          <i className='fa fa-arrow-down'></i>
        </span>
      </div>
      <div id='clock'>
        {minute} : {second < 10 ? `0${second}` : `${second}`}
      </div>
      <button onClick={toggle}>{isActive === true ? 'pause' : 'start'}</button>
      <button onClick={reset}>reset</button>
    </div>
  );
}

export default Clock;
