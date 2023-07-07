import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

function HypertrophicScarsSummery(props) {

  const vitaminDeficiencies =  ["vitamin A", "vitamin B", "vitamin C", "vitamin E", "vitamin K", "iron", "zinc", "collagen"]

  const hypertrophicClassesList = ["Acne", "Hypertrophic", "Keloid"]

  const getStyles = () => {
    if (props.hypertrophicClass === 1) {
      return 'heading heading-purple';
    } else if (props.hypertrophicClass === 2) {
      return 'heading heading-orange';
    }
  };

  const styles = {
    marginTop: '50px',
    backgroundImage: props.hypertrophicClass === 1 ? "linear-gradient(to top, #dbf26e 0%, #61fa74 37%, #1cfdd6 100%)" : "linear-gradient(to top, #00b712 0%, #5aff15 74%)",
  };

  const resultStyle = {
    background : props.hypertrophicClass === 1 ? 'linear-gradient(319deg, #dbf26e 0%, #61fa74 37%, #1cfdd6 100%)' : 'linear-gradient(315deg, #00b712 0%, #5aff15 74%)',
    color: 'black',
    marginTop: '5vh',
    padding: '20px',
    lineHeight: '30px'
  }

  const [noDeficiencies, setNoDeficiencies] = useState(false)
  
  useEffect(() => {
    window.scrollTo(0, 0)
    if (Object.values(props.deficiencies).every(value => value === 0)) {
      setNoDeficiencies(true)
    }

  }, []);

  return (
    <div className='summeryContainer'>
      <h1 className={getStyles()}>Hypertrophic Scars Summery | {hypertrophicClassesList[props.hypertrophicClass]}</h1>
      <h2>Vitamin deficiencies</h2>
      <ol className='vitaminDeficienciesList'>
        {noDeficiencies && <li>No Deficiencies</li>}
        {vitaminDeficiencies.map((vitamin, index) => (
          props.deficiencies[index]!==0 && <li key={index}>{vitamin} - {props.deficiencies[index]===1 && "Mild"} {props.deficiencies[index]===2 && "Severe"} </li>
        ))}
      </ol>
        <div style={resultStyle}>
          {props.hypertrophicClass === 1 && <div className='resultsDesc'>Hypertrophic scars will continue to grow up to 6 months of more and eventually reduce. However most of the times it will fade on it’s own. But if you are concerned you can take a look at the possible solutions</div>}
          {props.hypertrophicClass === 2 && <div className='resultsDesc'>Keloid scars cannot be cured completely. even the scars are treated it will leave a mark on the skin. These type of scars can be removed with different treatments. however it can be grow back after the removal of the scar. You can take a look at possible solutions.</div>}
        </div>
        <div className='btnContainer'>
        <Link to={{pathname:'/products&treatments'}} state={{ data: 2}} style={{textDecoration: 'none'}} >
          <button id='nextBtn' style={styles}>Continue</button>
        </Link>
        </div>
    </div>
  )
}

export default HypertrophicScarsSummery