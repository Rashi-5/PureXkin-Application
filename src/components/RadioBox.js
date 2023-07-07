import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function RadioBox(props) {

  const styles = {
    fontSize: '0.8rem',
    marginRight: 'auto',
    '@media screen and (maxWidth: 800px)': {
      fontSize: '0.75rem',
      textAlign: 'left'
    }
  }

  const handleChange = (event) => {
    // setSelectedValue(event.target.value);
    props.answer(props.category, props.index, event.target.value)
  };

  return (
    <FormControl>
      <FormLabel>{props.text}</FormLabel>
      <RadioGroup row onChange={handleChange} sx={{display: 'flex'}}>
        <FormControlLabel value={1} control={<Radio />} label={<span style={styles}> {props.answers ? props.answers[0] : "Disagree"} </span>}/>
        <FormControlLabel value={2} control={<Radio />} label={<span style={styles}> {props.answers ? props.answers[1] : "Neutral"} </span>}/>
        <FormControlLabel value={3} control={<Radio />} label={<span style={styles}> {props.answers ? props.answers[2] : "Agree"} </span>}/>
      </RadioGroup>
    </FormControl>
  )
}

export default RadioBox