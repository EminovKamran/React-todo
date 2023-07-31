import React from 'react';

function TaskTimer({ startTimer, stopTimer, min, sec }) {
  return (
    <>
      <button
        type='button'
        aria-label='icon-play'
        className='icon icon-play'
        onClick={startTimer}
      />
      <button
        type='button'
        aria-label='icon-pause'
        className='icon icon-pause'
        onClick={stopTimer}
      />
      {`${min < 10 ? `0${min}` : min}`}:{`${sec < 10 ? `0${sec}` : sec}`}
    </>
  );
}

export default TaskTimer;
