import React, { useEffect, useState } from 'react';
import '../styles/locations/locations.css';
import data from '../assets/locations.json';
import CallIcon from '@mui/icons-material/Call';
import BusinessIcon from '@mui/icons-material/Business';
import { Button } from '@mui/material';
import DirectionsIcon from '@mui/icons-material/Directions';

function Locations({ handleUpdateSelectedItem }) {

  useEffect(() => {
    handleUpdateSelectedItem('link4')
  }, []);

  return (
    <div className='locations'>
      {data && data.map((location, index) => (
        <div className='location-container' key={index}>
          <iframe className='googleMap' title={location.id} src={location.link} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" ></iframe>
          <div className='details'>
            <h1 style={{color: '#F1A2B0'}}>{location.name}</h1>
            <div> <CallIcon sx={{pr: 2}} /> {location.contact} </div>
            <div> <BusinessIcon sx={{pr: 2}} /> {location.address} </div>
            <Button sx={{py: 2, mt:2}} variant="contained" startIcon={<DirectionsIcon />} onClick={() => window.open(location.url, '_blank')} target="_blank" rel="noopener noreferrer"> Get Directions </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Locations;
