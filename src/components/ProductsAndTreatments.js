import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import '../styles/products/productsAndtreatments.css'
import axios from 'axios'


function ProductsAndTreatments() {

    const location = useLocation();
    const classifiedClass = location.state?.data

    // const [products, setProducts] = useState([])
    // const [treatments, setTreatments] = useState([])
    const [data, setData] = useState({ products: [], treatments: [] });

     //Retrieve data
    const retrieveData = async () => {
    const response = await axios.get("/treatments")
    return response.data;
    }

    useEffect(() => {   
        const getAllData = async () => {
        const response = await axios.get("/treatments")
        setData({products : response.data.products, treatments : response.data.treatments})
        }
        getAllData();
    }, [])

  return (
    <div className='productsTreatmentsContainer'>
        <p id='note'> * Please Note that these information are only to give a clear understanding on the products that are available in the market. It is a MUST to use these under expert recommendation!</p>
        <div id='productsContainer'>
            <h1 >Products</h1>
            {data.products.map((product, index) => (
                <div key={index}>
                    {product[1] === classifiedClass && <div className='item products'>
                    <h2>{product[2]}</h2>
                    <p>{product[3]}</p>
                    </div>}
                </div>
            ))}
        </div>
        <div id='treatmentsContainer'>
            <h1>Treatments</h1>
            {data.treatments.map((treatment, index) => (
                <div key={index}>
                    {treatment[1] === classifiedClass && <div className='item treatments'>
                    <h2>{treatment[2]}</h2>
                    <p>{treatment[3]}</p>
                    </div>}
                </div>
            ))}
        </div>
    </div>
  )
}

export default ProductsAndTreatments