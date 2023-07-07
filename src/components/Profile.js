import React, { useEffect } from 'react'

function Profile({ handleUpdateSelectedItem }) {

  useEffect(() => {
    handleUpdateSelectedItem('link2')
  });

  return (
    <div>Profile</div>
  )
}

export default Profile