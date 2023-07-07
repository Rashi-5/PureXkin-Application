import React from 'react'
import ProgressChart  from './ProgressChart'
import '../styles/home/atrophic.css'

function Atrophic({subValues}) {
  return (
    <div className='classification'>
      <h1>Atrophic</h1>
      <div className='classificationStatus'>You have Atrophic acne scars. which is a huge concern for 95% of the people who has acne scar. But don’t worry you have came to the right place for the best solutions. Atrophic scars can be further categorise into 3 sub categories. Continue to find out more about it. </div>
      <div className='progressChartContainer'>
        <ProgressChart text={"Icepick"} progressEndValue={subValues.icepick}/>
        <ProgressChart text={"Boxcar"} progressEndValue={subValues.boxcar}/>
        <ProgressChart text={"Rolling"} progressEndValue={subValues.rolling}/>
      </div>
    </div>
  )
}

export default Atrophic