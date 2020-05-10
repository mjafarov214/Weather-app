import React from 'react';
import Info from './Components/Info';
import Form from './Components/Form'
import WeatherInfo from './Components/WeatherInfo'

const API_KEY = 'f559156ec9434ac98c7392bf66fdaaac';

class App extends React.Component {

  state={
    temp:undefined,
    city:undefined,
    country:undefined,
    feelsLike:undefined,
    sunrise:undefined,
    error:undefined
  }

  gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    if (city) {
      const api_url = await
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await api_url.json();

      let sunrise = data.sys.sunrise;
      let date = new Date();
      date.setTime(sunrise*1000);
      let hours = date.getHours(); // Minutes part from the timestamp
      let minutes = "0" + date.getMinutes(); // Seconds part from the timestamp
      let seconds = "0" + date.getSeconds();
      let sunrise_date = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

      this.setState({
        temp:data.main.temp,
        city:data.name,
        country:data.sys.country,
        feelsLike:data.main.feels_like,
        sunrise:sunrise_date,
        error:''
      })
    }else{
      this.setState({
        temp:undefined,
        city:undefined,
        country:undefined,
        feelsLike:undefined,
        sunrise:undefined,
        error: 'Введите название города'
      })
    }
  }

  render(){
    return(
      <div className='wrapper'>
        <div className='main'>
          <div className='container'>
            <div className='row'>
              <div className='col-sm-5 info'>
                <Info/>
              </div>
              <div className='col-sm-7 form'>
                <Form weatherMethod={this.gettingWeather}/>
                <WeatherInfo {...this.state}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
