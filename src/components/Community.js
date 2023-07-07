import React, { useEffect, useState } from 'react'
import '../styles/community/community.css'
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { Alert, Grid, TextField } from '@mui/material';
import axios from 'axios'
import styled from '@emotion/styled';
import image from '../assets/feedbackImg.png'

function Community({ handleUpdateSelectedItem }) {

  const [data, setData] = useState([])
  const [value, setValue] = useState(3)
  const [feedback, setFeedback] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const [feedbackSent, setFeedbackSent] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const quotes = ["Healthy skin requires commitment, not a miracle.",
                  "Don’t rely on labels to give you the information you need. Trust the process and listen to your gut.",
                  "Filters are great, but great skin is better.",
                  "May your coffee be strong, but your SPF stronger.",
                  "Eat, sleep, skincare, repeat.",
                  "You don’t have to be perfect to be beautiful, it’s all about patience because-i regret taking so good care of my skin.",
                  "But first...skincare!",
                  "Your skin is your best accessory. Take good care of it.",
                  "Happiness is a habit. So is your skincare."]

  //Retrieve data
  const retrieveData = async () => {
    const response = await axios.get("/getfeedback")
    return response.data.feedbacks;
}

const getAllData = async () => {
  const allData = await retrieveData()
  if (allData) setData(allData);
  if (data) console.log(allData)
}

useEffect(() => { 
    handleUpdateSelectedItem('link5')
    getAllData();
}, [])

  const handleSendFeedBackClick = () => {
    if (email === '' || name === '' || feedback === '') {
      setShowAlert(true)
    } else {
      const newFeedback = {
        "email" : email,
        "feedback" : feedback,
        "ratings" : value,
        "name" : name
      }
      axios.post('http://127.0.0.1:5000/feedback', newFeedback)
      .then(getAllData)
      .catch(err => console.log(err))
      setFeedbackSent(true)
    }

    setEmail('')
    setFeedback('')
    setName('')
    setValue(3)
  }

  const inputStyle = {
      color: 'white',
      fontWeight: 'bold',
      border: '2px solid #989AA3',
      '&:active': {
        border: '0px solid #989AA3',
      }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowAlert(false)
    }, 3000);
    return () => clearTimeout(timeoutId)
  }, [showAlert]);

  const CustomAlert = styled(Alert)(({ theme }) => ({
    position: 'fixed',
    top: '92%',
    left: '82%',
    minWidth: '28%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#F24E4E',
    '@media screen and (max-width: 800px)': {
      minWidth: '60%',
      left: '50%',
      top: '92%',
      padding: '10px 10%'
    }
  }))

  return (
    <div className='container'>
      <section id='showFeedbacksContainer'>
        <h1>Feedbacks</h1>
        
        {data && data.map((feedback, index) => (
          <div className='feedback-container' key={index}>
            <div id='user-container'>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <div id='username'> {feedback[1]} </div>
                </Grid>
                <Grid item xs={3} sx={{ml: 12, mt: 1}}>
                  <Rating name="text-feedback" value={feedback[4]} readOnly precision={0.5} emptyIcon={<StarIcon style={{ opacity: 0.55, color: 'white' }} fontSize="inherit"/>}/>
                </Grid>
              </Grid>
            </div>
            {feedback[3]}
          </div>
        ))}
      </section>

      <section id='enterFeedbackContainer'>
        {!feedbackSent && <>
          <h1 style={{fontSize:'35px'}}>Share Your Thoughts</h1>
          <Rating value={value} name="half-rating" onChange={(event, newValue) => { setValue(newValue) }}precision={1} icon={<StarIcon style={{ fontSize: 40 }} />} emptyIcon={<StarIcon style={{ opacity: 0.55, color: 'white', fontSize: 40 }}/>}/>
          <TextField fullWidth
            autoFocus
            InputProps={{
              style: inputStyle,
            }}
            placeholder="Your email goes here"
            value={email}
            onChange={(event) => { setEmail(event.target.value) }}
            multiline
            rows={1}
            sx={{mt: 2, color: 'white'}}
          /><TextField fullWidth
            autoFocus
            InputProps={{
              style: inputStyle,
            }}
            placeholder="Your Name goes here"
            value={name}
            onChange={(event) => { setName(event.target.value) }}
            multiline
            rows={1}
            sx={{mt: 2, color: 'white'}}
          />
          <TextField fullWidth
            autoFocus
            InputProps={{
              style: inputStyle,
            }}
            placeholder="Do you have any thoughts you'd like to share?"
            value={feedback}
            onChange={(event) => { setFeedback(event.target.value) }}
            multiline
            rows={5}
            sx={{mt: 2, color: 'white'}}
          />
          <button id='nextBtn' onClick={handleSendFeedBackClick}>Send Feedback</button>
        </>}
        {feedbackSent && <>
          <h1 id='feedbackReceivedh1'>Feedback Received!</h1>
          <div className='feedbackReceived'>
            <img id='feedbackImg' src={image} />
            <span>
              <h2>Thank you!</h2>
              <p>By making your voice heard, you help us to improve PureXkin.</p>
            </span>
          </div>
        </>}
      </section>
      {showAlert && <CustomAlert variant='filled' severity='error'>Oops, there's an empty feild</CustomAlert>}
    </div>
  )
}

export default Community