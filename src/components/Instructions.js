import React from 'react'
import '../styles/home/instructions.css'

function Instructions() {
  return (
    <div className='instructions'>
      <h1 id='howItWorks'>:: How it works</h1>
      <ol>
        <li>You can upload a clear close-up photo of an acne scar.</li>
        <li>The application will determine the type of acne scars for you.</li>
        <li>Based on the results, you can proceed to find out more about your concern.</li>
        <li>Don't skip over the vitamin deficiency test.</li>
        <li>Learn about treatments and time frames for healing the scars.</li>
        <li>Finally, you can gather recommendations on local experts.</li>
    </ol>
    </div>
  )
}

export default Instructions