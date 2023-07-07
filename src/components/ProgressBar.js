import React from 'react'
import '../styles/home/progressBar.css'

function ProgressBar(props) {

  const styles = {
    width: `${props.data / 24 * 100}%`,
    background: props.data < 12 && props.data >= 6 ? "linear-gradient(to right, #11998e, #38ef7d)" : props.data < 18 && props.data >= 12 ? "linear-gradient(90deg, #EA9A30 0%, #DEA100 74%)" : props.data <= 24 && props.data >= 18 ? "linear-gradient(to right, #d31027, #ea384d)" : '#fff',
  };

  const tooltipStyles = {
    background: props.data < 12 && props.data >= 6 ? "linear-gradient(to right, #11998e, #38ef7d)" : props.data < 18 && props.data >= 12 ? "linear-gradient(90deg, #EA9A30 0%, #DEA100 74%)" : props.data <= 24 && props.data >= 18 ? "linear-gradient(to right, #d31027, #ea384d)" : '#fff',
  }

  const getHeadingStyles = () => {
    if (props.data < 12 && props.data >= 6) {
      return 'text heading-green';
    } else if (props.data < 18 && props.data >= 12) {
      return 'text heading-yellow';
    } else if (props.data <= 24 && props.data >= 18) {
      return 'text heading-red';
    }
  };

  return (
    <div className='progressBarcontainer'>
        <div className='skill-box'>
          <div className='results'>With treatments you will be able to cure 80 -100 % of the disease. However considering all the factors it will take more than <span className={getHeadingStyles()}>{props.data} months</span></div>
            <div className='skill-bar'>
                <span className='skill-per' style={styles}>
                    <span className={'tooltip'} style={tooltipStyles}><span className="tooltip-text">{props.data}</span></span>
                </span>
            </div>
        </div>
    </div>
  )
}

export default ProgressBar