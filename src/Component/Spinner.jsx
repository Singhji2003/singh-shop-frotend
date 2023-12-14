import React from 'react'
import'./Css/Spinner.css'
const Spinner = () => {
  return (
    <div className='spinner'>
        <img src={require('./Image/spinner.gif')}/>
    </div>
  )
}

export default Spinner