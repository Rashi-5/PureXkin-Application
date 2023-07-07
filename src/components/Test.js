import React, { useEffect, useState } from 'react'
import '../styles/test/test.css'
import RadioBox from './RadioBox';
import data from '../assets/quiz.json';
import { useLocation } from 'react-router-dom';
import AtrophicScarsSummery from './AtrophicScarsSummery';
import HypertrophicScarsSummery from './HypertrophicScarsSummery';
import axios from 'axios'
import styled from '@emotion/styled';
import { Alert } from '@mui/material';

function Test() {

  const location = useLocation();
  const classifiedClass = location.state?.data1
  const hypertrophicClass = location.state?.data2

  const [viewSummeryClicked, setViewSummeryClicked] = useState(false)

  const [answers, setAnswers] = useState({
    "1": [0,0,0,0,0,0,0,0,0,0,0],
    "2": [0,0,0,0,0,0,0,0,0,0,0],
    "3": [0,0,0,0,0,0,0,0,0,0,0],
    "4": [0,0,0,0,0,0,0,0,0,0,0]
  })

  const [deficiencies, setDeficiencies] = useState(null)
  const [healingTime, setHealingTime] = useState(null)
  const [severity, setSeverity] = useState(null)
  const [count, setCount] = useState(0)

  const handleAnswer = (category, index, answer) => {
    const newArray = answers[category+1]
    newArray[index] = parseInt(answer)
    setAnswers({...answers, [category+1]: newArray})
    setCount(prevCount => prevCount+1)
    console.log(answers)
  }

  const [showAlert, setShowAlert] = useState(false)

  const handleContinueClick = () => {
    if (count <= 44) {
      axios.post('http://127.0.0.1:5000/test', answers)
      .then(getSummary)
      .catch(err => console.log(err))
    }
    else{
      setShowAlert(true)
    }
  }

  const getSummary = async () =>{
    const response = await axios.get('http://127.0.0.1:5000/summary')
    setDeficiencies(response.data.deficiency)
    setHealingTime(response.data.sum[0])
    setSeverity(response.data.sum[1])
    console.log(response.data.sum[1])
    setViewSummeryClicked(true)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowAlert(false)
    }, 3000);
    return () => clearTimeout(timeoutId)
  }, [showAlert]);

  const CustomAlert = styled(Alert)(({ theme }) => ({
    position: 'fixed',
    textAlign: 'center',
    top: '17.5%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#F24E4E',
    padding: '5px 5%',
    '@media screen and (max-width: 800px)': {
      minWidth: '60%',
      padding: '10px 10%'
    }
  }))

  return (
    <div className='test'>
    {!viewSummeryClicked && <>
      <div className='questionContainer'>
        <h1>{data[0].category}</h1>
        <ul>
          {data[0].questions.map((question, index) => (
            <li key={index} className='question'>
                <RadioBox text={question.question} index={index} category={data[0].categoryId} answer={handleAnswer}/>
            </li>
          ))}
        </ul>
      </div>
      <div className='questionContainer'>
      <h1>{data[1].category}</h1>
        <ul>
          {data[1].questions.map((question, index) => (
            <li key={index} className='question'>
                <RadioBox text={question.question} index={index} category={data[1].categoryId} answer={handleAnswer}/>
            </li>
          ))}
        </ul>
      </div>
      <div className='questionContainer last'>
      <h1>{data[2].category}</h1>
        <ul>
          {data[2].questions.map((question, index) => (
            <li key={index} className='question'>
             <RadioBox text={question.question} index={index} category={data[2].categoryId} answer={handleAnswer}/>
            </li>
          ))}
        </ul>
      </div>
      <div className='questionContainer last'>
      <h1>{data[3].category}</h1>
        <ul>
          {data[3].questions.map((question, index) => (
            <li key={index} className='question'>
              <RadioBox text={question.question} index={index} answers={question.answers} category={data[3].categoryId} answer={handleAnswer}/>
            </li>
          ))}
        </ul>
      </div>
      <button id="nextBtn" onClick={handleContinueClick}>Continue to View Summery</button>
      {showAlert && <CustomAlert variant='filled' severity='error'>Oops, You have misssed questions!</CustomAlert>}
    </>}
    {viewSummeryClicked && <>
      {classifiedClass === 0 && <AtrophicScarsSummery deficiencies={deficiencies} healingTime={healingTime} severity={severity}/>}
      {classifiedClass === 2 && <HypertrophicScarsSummery deficiencies={deficiencies} hypertrophicClass={ hypertrophicClass }/>}
    </>
    }
    </div>
  )
}

export default Test