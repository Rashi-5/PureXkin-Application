import React from 'react'
import image from '../assets/healthy.png'
import '../styles/home/home.css'

function Healthy() {
  return (
    <div className='classification'>
      <h1>Not Acne Scarring</h1>
      <div className='classificationStatus'>Seems like you have no such concern of acne scarring. However you can take a look at skin clinic suggessions.</div>
      <img id='healthyImg' src={image} />
    </div>
  )
}

export default Healthy