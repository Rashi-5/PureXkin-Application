import React, { useState, useEffect } from 'react'
import '../styles/home/progressChart.css'

function ProgressChart(props) {

  const [progressStartValue, setProgressStartValue] = useState(0)

  const style = {
    backgroundImage: `conic-gradient( #E472B6 ${progressStartValue * 3.6}deg, #E6E6FA 0deg)`
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressStartValue(count => {
        if (count < props.progressEndValue) {
          return count + 1;
        } else {
          clearInterval(interval);
          return count;
        }
      });
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);


  return (
    <div id='progressChart'>
      <div className='circular-progress' style={style}>
        <span className='progress-value'>{progressStartValue}%</span>
      </div>
      <span className='text'>{props.text}</span>
    </div>
  )
}

export default ProgressChart