import React, { useState, useEffect } from 'react';
import './App.css';
import nubes from './assets/video/cielo.mp4';
import axios from 'axios';

export const WeatherApp = () =>{
  
  const [ ciudad, setCiudad ] = useState('Lima');
  const [ option, setOption ] = useState('');
  const [ temp, setTemp ] = useState();
  const [ clouds, setClouds ] = useState();
  const [ sensacion, setSensacion ] = useState();
  const [ presion, setPresion ] = useState();
  const [ humedad, setHumedad ] = useState();

  const fetchWeather = async (ciudadFetch = 'Lima') => {
    try {
      const res = await axios.get(`http://api.weatherapi.com/v1/current.json?key=15227df04da9468184f14958213012&q=${ciudadFetch}&aqi=no`);    
        
      setHumedad(res.data.current.humidity)
      setTemp(res.data.current.temp_c)
      setSensacion(res.data.current.feelslike_c)
      setClouds(res.data.current.condition.text)
      setPresion(res.data.current.precip_in)
      
    }catch( e ) {
      console.log( e )
    }
  }

  useEffect(()=>{
    fetchWeather(ciudad);
  },[ ciudad, fetchWeather ])

  const handleCiudad = (e) => {
    setCiudad(option); 
  }
  
  const handleInputChange = (e) => {
    setOption(e.target.value); 
  }

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        height: '100vh',
        width: '100vw'
      }}
      className="App"
    >    
      <div
        style={{
          color: 'white',
          paddingTop: '25px',
          paddingBottom: '25px'
        }}
      >
        { ciudad }
      </div>
      <div 
        style={{
          textAlign: 'center'
        }}
      >
        <h1 
          style={{
            fontSize: '96px',
            color: 'white'
          }}
        >
          { temp }°
        </h1>
        <h1
          style={{
            fontSize: '24px',
            color: 'white'
          }}
        >
          { clouds }
        </h1>
      </div>
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: '20px',
          width: '200px',
          color: 'white',
          fontWeight: 'bold'
        }}
      >
        <h1 className="h6">Sensación térmica</h1> 
        <p>{ sensacion }°</p>
      </div>
      

      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '200px',
          color: 'white',
          fontWeight: 'bold'
        }}
      >
        <h1 className="h6">Presión</h1> 
        <p>{ presion }°</p>
      </div>

      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '200px',
          color: 'white',
          fontWeight: 'bold'
        }}
      >
        <h1 className="h6">Humedad</h1> 
        <p>{ humedad }°</p>
      </div>

      <div 
        style={{
          width: '200px'
        }} 
        className="input-group"
      >
        <input 
          type="text" 
          className="form-control"
          name="option"
          value={ option }
          onChange={ handleInputChange }
        />
        <button
          className="btn btn-primary"
          onClick={ handleCiudad }
        >
          O
        </button>
      </div>
      
      <video 
        id="background-video" 
        style={{
          height: '100%',
          width: '100%',
          float: 'left',
          top: '0',
          left: '0',
          padding: 'none',
          position: 'absolute',
          objectFit: 'cover',
          filter: 'blur(3px)',
          zIndex: '-1',
        }}
        autoPlay
        muted
        loop
      >
        <source src={nubes} type="video/mp4"/>
      </video>  
    </div>
  );
}

