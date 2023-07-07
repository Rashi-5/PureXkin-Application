import React, { useState, useEffect } from 'react'

function Hypertrophic(props) {

  const [acne, setAcne] = useState(true)
  const [wound, setWound] = useState(false)
  const [keloid, setKeloid] = useState(false)

  useEffect(() => {
    handleSubClassification()
  });

  const handleSubClassification = () => {
    switch (props.subValue) {
      case 0:
        setAcne(true)
        setWound(false)
        setKeloid(false)
        break
      case 1:
        setAcne(false)
        setWound(true)
        setKeloid(false)
        break
      case 2:
        setAcne(false)
        setWound(false)
        setKeloid(true)
        break
      default:
        break
    }
  }

  return (
    <div className='classification'>
      <h1>Hypertrophic</h1>
      <div className='classificationStatus'>You have Hypertrophic acne scars or acnes. Hypertrophic scars can be raise due to various reasons including acnes. These can be further categorise into 2 main categories. Continue to find out more about it.</div>
      <div className='subClassification'>
        {acne && <span>Seems like you are having acnes. Before treating acne scars you should cure acnes first. But don’t worry you can still get to know more about your concern</span>}
        {wound && <span>Seems like you are having hypertrophic scars which is not a concern of acne scarring. But don’t worry you can still get to know more about your concern</span>}
        {keloid && <span>You have Keloid scars. which raises as a result of untreated acnes. But don’t worry, you have come to the right place for the best solutions</span>}
      </div>
    </div>
  )
}

export default Hypertrophic