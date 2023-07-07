import React, { useState, useEffect } from 'react'
import '../styles/home/home.css'
import image from '../assets/defaultImage3.png'
import Instructions from './Instructions'
import Healthy from './Healthy'
import Atrophic from './Atrophic'
import Hypertrophic from './Hypertrophic'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import axios from 'axios'
import { Alert } from '@mui/material'
import styled from '@emotion/styled'

function Home({ handleUpdateSelectedItem }) {

  const [imageNotUploaded, setImageNotUploaded] = useState(true)
  const [showAlert, setShowAlert] = useState(false)
  const [classifyClick, setClassifyClick] = useState(false)

  const [healthy, setHealthy] = useState(false)
  const [atrophic, setAtrophic] = useState(false)
  const [hypertrophic, setHypertrophic] = useState(false)
  const [classifiedClass, setClassifiedClass] = useState(null)

  const [atrophicValues, setAtrophicValues] = useState({
    icepick: null,
    boxcar: null,
    rolling: null
  });

  const [hypertrophicValue, setHypertrophicValue] = useState(null)

  const handleClassification = (classifiedClass) => {
    switch (classifiedClass) {
      case 0:
        setHealthy(false)
        setAtrophic(true)
        setHypertrophic(false)
        break
      case 1:
        setHealthy(true)
        setAtrophic(false)
        setHypertrophic(false)
        break
      case 2:
        setHealthy(false)
        setAtrophic(false)
        setHypertrophic(true)
        break
      default:
        break
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    handleUpdateSelectedItem('link1')
  }, []);

  const [hypertrophicClass, setHypertrophicClass] = useState(0)

  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  function handleFileInputChange(event) {
    setSelectedFile(event.target.files[0]);
    setPreviewUrl(URL.createObjectURL(event.target.files[0]));
    setImageNotUploaded(false)
  }

  function handleUploadButtonClick() {
    setClassifyClick(false)
    const formData = new FormData();
    if (!imageNotUploaded) {
      formData.append('file', selectedFile);
      axios.post('http://127.0.0.1:5000/upload', formData)
      .then(getClassificationResults)
      .catch(err => console.log(err))  
    }else {
      setShowAlert(true)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowAlert(false)
    }, 3000);
    return () => clearTimeout(timeoutId)
  }, [showAlert]);

  function getClassificationResults(){
    axios.get('http://127.0.0.1:5000/classify')
    .then(response => {
      setClassifiedClass(response.data.pred[0])
      handleClassification(response.data.pred[0])
      console.log(response.data.pred)
 
      if(response.data.pred.length === 4){
        setAtrophicValues({
          icepick: response.data.pred[1],
          boxcar: response.data.pred[2],
          rolling: response.data.pred[3]
        })
      }
      else if(response.data.pred.length === 2){
        setHypertrophicValue(response.data.pred[1])
        setHypertrophicClass(response.data.pred[1])
      }
      setClassifyClick(true)
    })
    .catch(err => console.log(err))
  }

  const CustomAlert = styled(Alert)(({ theme }) => ({
    position: 'fixed',
    textAlign: 'center',
    top: '95%',
    left: '25%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#F24E4E',
    padding: '5px 5%',
    '@media screen and (max-width: 800px)': {
      minWidth: '60%',
      left: '50%',
      top: '92%',
      padding: '10px 10%'
    }
  }))

  const UploadButton = styled(Button)(({ themee}) => ({
    display: 'block',
    margin: 'auto',
    width: '35vw',
    marginTop: '5vh',
    padding: '18px',
    backgroundColor: '#9B66C0',
    textAlign: 'center',
    fontWeight:'600',
    '&:hover': { backgroundColor: '#ce91ee' },
    '@media screen and (max-width: 800px)': {
      minWidth: '60%'
    }
  }))

  return (
    <div className='container'>
      <section id='firstSection'>
        <UploadButton variant="contained" component="label">
          Upload Image
          <input hidden accept="image/*" onChange={handleFileInputChange} multiple type="file" />
        </UploadButton>
        <div className='imageContainer'>
          {previewUrl ? <img  id='uploadImage' src={previewUrl} alt="Preview" /> : <img id='uploadImage' src={image} alt='image here' /> }
        </div>
        <button id='classifyBtn' onClick={handleUploadButtonClick}>Classify</button> 
      </section>

      <section id='secondSection'>
        {!classifyClick ? <Instructions /> : <>
          {healthy && <Healthy />}
          {atrophic && <Atrophic subValues={atrophicValues} />}
          {hypertrophic && <Hypertrophic subValue={hypertrophicValue} />}
        </>}
        {classifiedClass === 0 || (classifiedClass === 2 && hypertrophicClass !== 0) ? <Link to={{pathname:'/test'}} state={{ data1: classifiedClass, data2: hypertrophicClass }} style={{textDecoration: 'none'}} ><button id='nextBtn'>Next</button></Link> : <></>}
        {(classifiedClass === 2 && hypertrophicClass === 0) ? <Link to={{pathname:'/locations'}} style={{textDecoration: 'none'}} ><button id='nextBtn'>View Skin Care Locations</button></Link> : <></>}
      </section>

      {showAlert && <CustomAlert variant='filled' severity='error'>Oops, you forgot to upload!</CustomAlert>}

    </div>
  )
}

export default Home