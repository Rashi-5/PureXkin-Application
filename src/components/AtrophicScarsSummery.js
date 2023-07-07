import React, { useState, useEffect } from 'react'
import '../styles/home/summery.css'
import ProgressBar from './ProgressBar'
import { Link } from 'react-router-dom'

function AtrophicScarsSummery(props) {

  const vitaminDeficiencies = ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin E", "Vitamin K", "Iron", "Zinc", "Collagen"]

  const levelOfScarring = ['Minimal', 'Moderate', 'Severe']
  const [level, setLevel] = useState(null)
  const [cureTime, setCureTime] = useState(null)

  const getStyles = () => {
    if (cureTime < 12 && cureTime >= 6) {
      return 'heading heading-green';
    } else if (cureTime < 18 && cureTime >= 12) {
      return 'heading heading-yellow';
    } else if (cureTime <= 24 && cureTime >= 18) {
      return 'heading heading-red';
    }
  };

  const styles = {
    background: cureTime < 12 && cureTime >= 6 ? "linear-gradient(to top, #11998e, #38ef7d)" : cureTime < 18 && cureTime >= 12 ? "linear-gradient(to top, #EA9A30 0%, #DEA100 74%)" : cureTime <= 24 && cureTime >= 18 ? "linear-gradient(to top, #d31027, #ea384d)" : '#fff',
  };

  const [noDeficiencies, setNoDeficiencies] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(props.deficiencies)
    setLevel(levelOfScarring[props.severity - 1])
    setCureTime(props.healingTime)
    console.log(props.severity)
    if (Object.values(props.deficiencies).every(value => value === 0)) {
      setNoDeficiencies(true)
    }

  }, []);

  return (
    <div className='summeryContainer'>
      <h1 className={getStyles()}>Atrophic Scars Summery</h1>
      <h2>Vitamin deficiencies You might have</h2>
      <ol className='vitaminDeficienciesList'>
      {noDeficiencies && <li>No Deficiencies</li>}
      {vitaminDeficiencies.map((vitamin, index) => (
        props.deficiencies[index]!==0 && <li key={index}>{vitamin} - {props.deficiencies[index]===1 && "Mild"} {props.deficiencies[index]===2 && "Severe"} </li>
      ))}
      </ol>
      <h2>You have {level} Acne Scarring</h2>
      <ProgressBar data={ cureTime } />
      <div id='note'>
       * 
These values are estimates based on available data and are being reviewed by domain experts. They may change and should be considered rough values until confirmed. We'll provide more accurate results once they are validated. Thanks for your understanding!
      </div>
      {level === 'Minimal' ? <div className='resultsDesc'>Since you have {level} acne scars you can go for chemical serum solutions or by referring to an expert you can get Professional help on the matter.</div> : <div className='resultsDesc'>Since you have {level} acne scarring this cannot be cured by just using serums, by referring to an expert you can get Professional help on the matter.</div>} 
      <div className='btnContainer'>
      <Link to={{pathname:'/products&treatments'}} state={{ data: 0}} style={{textDecoration: 'none'}}>
          <button id='nextBtn' style={styles}>Continue</button>
        </Link>
        </div>
    </div>
  )
}

export default AtrophicScarsSummery