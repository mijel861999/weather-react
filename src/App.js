import React, { useState, useEffect } from 'react';
import './App.css';
import nubes from './assets/video/cielo.mp4';
import noche from './assets/video/cielo_noche.mp4';
import axios from 'axios';
import Swal from 'sweetalert2'

const IS_DAY = 1;

export const WeatherApp = () =>{
  
  const [ ciudad, setCiudad ] = useState('Lima');
  const [ pais, setPais ] = useState('')
  const [ option, setOption ] = useState('');
  const [ temp, setTemp ] = useState();
  const [ clouds, setClouds ] = useState();
  const [ sensacion, setSensacion ] = useState();
  const [ humedad, setHumedad ] = useState();
  const [ isDay, setIsDay ] = useState();

  const fetchWeather = async (ciudadFetch = 'Lima') => {
    try {
      const res = await axios.get(`http://api.weatherapi.com/v1/current.json?key=15227df04da9468184f14958213012&q=${ciudadFetch}&aqi=no`);    
        
      setTemp(res.data.current.temp_c)
      setHumedad(res.data.current.humidity)
      setSensacion(res.data.current.feelslike_c)
      setClouds(res.data.current.condition.text)
      setIsDay(res.data.current.is_day)
      setPais(res.data.location.country)
      
    }catch( e ) {
      Swal.fire('Ciudad no encontrada')
      setCiudad('Lima')
    }
  }

  useEffect(()=>{
    fetchWeather(ciudad);
  },[ ciudad ])

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
        className="animate__animated animate__bounceInDown"
        style={{
          color: 'white',
          paddingTop: '25px',
          paddingBottom: '25px'
        }}
        key={ ciudad }
      >
        { ciudad }, { pais }
      </div>
      <div 
        style={{
          textAlign: 'center'
        }}
      >
        <h1 
          key={ temp }
          className="animate__animated animate__bounceIn"
          style={{
            fontSize: '96px',
            color: 'white'
          }}
        >
          { temp } C°
        </h1>
        <h1
          key={ clouds }
          className="animate__animated animate__bounceInLeft"
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
        <h1 
          className="h6 animate__animated animate__bounceInLeft"
        >
          Sensación térmica
        </h1> 
        <p
          key={ sensacion }
          className="animate__animated animate__bounceInLeft"
        >{ sensacion } °C</p>
      </div>
      
      <div 
        className="animate__animated animate__bounceInLeft"
        key={ isDay }
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '200px',
          color: 'white',
          fontWeight: 'bold'
        }}
      >
        <h1 className="h6">¿Día o Noche?</h1> 
        
          { 
            ( isDay === IS_DAY )
              ? (
                <p className="animate__animated animate__bounceInLeft" key={ isDay }>Día</p>  
              )
              : (
                <p className="animate__animated animate__bounceInLeft" >Noche</p>
              )
          }
      </div>
      
      <div 
        className="animate__animated animate__bounceInLeft"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '200px',
          color: 'white',
          fontWeight: 'bold'
        }}
      >
        <h1 className="h6">Humedad</h1> 
        <p className="animate__animated animate__bounceInLeft" key={ humedad }>{ humedad } %</p>
      </div>
      
      <form 
        onSubmit={(e) => {
          e.preventDefault(); 
        }}
        style={{
          width: '200px'
        }} 
        className="input-group"
      >
        <input 
          autocomplete="off"
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
      </form>

      {
          (isDay === IS_DAY)
            ? (
              <video 
                className="animate__animated animate__fadeIn" 
                key={ nubes }
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
                <source src={ nubes } type="video/mp4"/> 
            </video>
            )
            : (
              <video 
                className="animate__animated animate__fadeIn"
                key={ noche }
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
                <source src={ noche } type="video/mp4"/> 
            </video> 
            )
        }
    </div>
  );
}

