import React, { Component } from 'react';

export default class TaskTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { startTimer, stopTimer, min, sec } = this.props;
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
}
