import React from 'react'
import '../Spinner/Spinner.css'
import Loader from '../Spinner/Loader.gif'

function Spinner() {
  return (
    <div className='parent-div'>
        <img src={Loader} className='loader' />
    </div>
  )
}
 
export default Spinner