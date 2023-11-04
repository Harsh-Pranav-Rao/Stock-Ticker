import React,{useState} from 'react'
import './Company.css'

function Company({name,value,darkMode}) {
  let profit = true;
  if (value<0){
    profit = false;
  }

  return (
    <div className='box' style={{backgroundColor:darkMode?"black":"white"}}>
    <div className='left'  style={{backgroundColor:profit?"lightgreen":"red"}}></div>
    <div className='right'  style={{borderColor:profit?"lightgreen":"red"}}>
        <span className='name' style={{color:darkMode?"white":"black"}}>{name} </span>
        <span className="value" style={{color:profit?"lightgreen":"red"}}>{profit&&"+"}{value}%</span>
    </div>

    </div>
  )
}

export default Company