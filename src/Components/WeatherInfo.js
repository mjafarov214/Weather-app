import React from 'react';

const WeatherInfo =(props)=>{
  const {temp, city, country, feelsLike, sunrise, error} = props;
  return(
    <div className='infoWeath'>
      {city &&
        <div>
          <p>Местоположение: {city}, {country}</p>
          <p>Температура: {temp}</p>
          <p>Чувствуется как: {feelsLike}</p>
          <p>Восход солнца: {sunrise}</p>
        </div>
      }
      <p className='error'>{error}</p>
    </div>
  );
}

export default WeatherInfo;
