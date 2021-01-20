import React, { useState, useEffect } from 'react';
import {  Modal  } from 'antd';
import TimerCountComponent from './TimerCount/TimerCountComponent';
import TimerInputComponent from './TimerInput/TimerInputComponent';
import TimerButtonsComponent from './TimerButtons/TimerButtonsComponent';

const TimerComponent = ({ playAudio, setAudio }) => {

  const [ allTimeSeconds, setAllTimeSeconds ] = useState(0)
  const [ currentSeconds, setCurrentSeconds ] = useState(0);
  const [ currentMinutes, setCurrentMinutes ] = useState(0);
  const [ timerSeconds, setTimerSeconds ] = useState(allTimeSeconds);
  const [ isRunningTimer, setIsRunningTimer ] = useState(false);
  const [ isModalVisible, setIsModalVisible ] = useState(false);

  let duringSeconds = allTimeSeconds - timerSeconds;
  let procent = duringSeconds / allTimeSeconds * 100;
  let lineTimer = Math.ceil(procent);

  useEffect(()=> {
    if(isRunningTimer) {
      const TimerInterval = window.setInterval(() => {
        setTimerSeconds((timerSeconds) => timerSeconds - 1);
      }, 1000);

      return () => {
        window.clearInterval(TimerInterval);
      }
    }
    return undefined
  }, [isRunningTimer])

  const startTimer = (minutes, seconds) => {
    const allTime = minutes * 60 + seconds;
    setTimerSeconds(allTime);
    setAllTimeSeconds(allTime);
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setTimerSeconds(allTimeSeconds);
    setIsRunningTimer(true);
    setAudio('./example.mp3');
    playAudio();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if(timerSeconds < 0) {
    setIsRunningTimer(false);
    setTimerSeconds(0);
    showModal();
    setAudio('./done.mp3', false);
    playAudio();
  }

  const changeCurrentTime = (minutes, seconds) => {
    setCurrentMinutes(minutes);
    setCurrentSeconds(seconds);
  }

  const timerStarted = () => {
    setIsRunningTimer(true);
  }

  const timerStoped = () => {
    setIsRunningTimer(false);
  }

  return (
    <div>
      <div className = 'timer-container'>
      <>
        <Modal 
          title="Well done!" 
          visible={isModalVisible} 
          onOk={handleOk} 
          onCancel={handleCancel}
          centered={true}
          okText={'Start new Timer with previous value'}
          cancelText={'Set new Timer'}
        >
          <img 
            src="./timer-popup-img.svg" 
            width="300px"
            alt="img"
          />
          <p>Time is up!</p>
        </Modal>
      </>
        <TimerInputComponent
          startTimer = {startTimer}
          changeCurrentTime = {changeCurrentTime}
          currentMinutes = {currentMinutes}
          currentSeconds = {currentSeconds}
          timerStarted = {timerStarted}
          setAudio = {setAudio}
          playAudio = {playAudio}
        />
        <TimerCountComponent 
          seconds = {timerSeconds}
          lineTimer = {lineTimer}
        />
      </div>
      <TimerButtonsComponent
          startTimer = {startTimer}
          changeCurrentTime = {changeCurrentTime}
          currentMinutes = {currentMinutes}
          currentSeconds = {currentSeconds}
          timerStarted = {timerStarted}
          timerStoped = {timerStoped}
          isRunningTimer = {isRunningTimer}
          setAudio = {setAudio}
          playAudio = {playAudio}
          allTimeSeconds = {allTimeSeconds}
        />
    </div>
  )
}

export default TimerComponent;