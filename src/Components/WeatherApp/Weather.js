import React, { useState } from 'react'
import './Weather.css';
import clear_sky from '../Assests/clear-sky.png';
import few_clouds from '../Assests/cloud.png';
import scattered_clouds from '../Assests/clouds.png';
import shower_rain from '../Assests/shower.png'
import rain from '../Assests/rain.png'
import thunder from '../Assests/thunderstorm.png'
import snow from '../Assests/snow.png'
import mist from '../Assests/mist.png'
import open from '../Assests/open.png'
import close from '../Assests/close.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Weather = () => {

  const [data, Setdata] = useState('')


  let fun_facts_10 = ['10 degrees Celsius is generally considered a comfortable temperature for many people. It\'s cool but not too cold, making it pleasant for outdoor activities.',
    'Exposure to cooler temperatures can stimulate the body to burn more calories as it works to maintain a stable internal temperature. This is known as thermogenesis.',
    'The ideal serving temperature for many white wines is around 10 degrees Celsius. This allows the flavors to be well-balanced and enhances the overall tasting experience.',
    ' 10 degrees Celsius is within the preferred temperature range for many cold-water fish species. This temperature provides an optimal environment for their metabolism and growth.',
    ' In areas with a temperature around 10 degrees Celsius, you might experience the melting of snow. This temperature range is often associated with the transition from winter to spring.'];

  //fun facts under 30 degrees

  let fun_facts_30 = ['The temperature range of 20-30 degrees Celsius is often considered perfect for a day at the beach. It\'s warm enough to enjoy the sun and water without being uncomfortably hot.',
    'Many plants thrive in temperatures between 20-30 degrees Celsius. This range provides optimal conditions for photosynthesis and overall plant growth.',
    ' Humans generally find temperatures between 20-30 degrees Celsius to be comfortable. It\'s neither too hot nor too cold, making it enjoyable for various daily activities.',
    'This temperature range allows for a diverse summer wardrobe, including shorts, T-shirts, sundresses, and sandals, providing a break from heavier winter clothing.']

  //fun facts under 50

  let fun_facts_50 = ['Some geothermal features, like hot springs and geysers, can have temperatures in this range. The water is heated by underground volcanic activity.',
    'Summer festivals and outdoor events are often scheduled in this temperature range, taking advantage of the warm weather for concerts, fairs, and cultural celebrations.',
    'The 30-40 degrees Celsius range is conducive to the growth of many crops, making it an important factor in agricultural planning and harvesting.',
    ' Warmer temperatures often lead to increased insect activity. Be prepared for buzzing bees, butterflies, and other insects during this temperature range.',
    'This temperature range is popular for outdoor sports like hiking, biking, and running. It allows for physical activity without the discomfort of extreme heat.'];

  const [icon, Seticon] = useState()
  const val = document.getElementsByClassName("location");
  const api_key = 'a9341607da913584e1d9eff1389385f7';

  

  const search = async () => {

    if (val[0].value === '') {
      window.alert("Enter Location to Continue");
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${val[0].value}&units=metric&appid=${api_key}`
    let response = await fetch(url);
    var data1 = await response.json();
    Setdata(data1);
    let temperature = document.getElementsByClassName('temperature');
    let Location = document.getElementsByClassName('Loc');
    let humidity = document.getElementsByClassName('humidityp')
    let wind = document.getElementsByClassName('windp');
    temperature[0].innerHTML = data1.main.temp.toFixed() + "   °C";
    Location[0].innerHTML = data1.name;
    humidity[0].innerHTML = data1.main.humidity + " %";
    wind[0].innerHTML = data1.wind.speed + " M/H";
    let timestamp=data1.timezone;
    var time=new Date()
    console.log(time)
    const timee=document.getElementsByClassName("time")
    timee[0].innerHTML=time

    if (data1.weather[0].icon == "01d" || data1.weather[0].icon == "01n") {
      Seticon(clear_sky)
    }
    else if (data1.weather[0].icon == "02d" || data1.weather[0].icon == "02n") {
      Seticon(few_clouds)
    }
    else if (data1.weather[0].icon == "03d" || data1.weather[0].icon == "03n") {
      Seticon(scattered_clouds)
    }
    else if (data1.weather[0].icon == "04d" || data1.weather[0].icon == "04n") {
      Seticon(scattered_clouds)
    }
    else if (data1.weather[0].icon == "09d" || data1.weather[0].icon == "09n") {
      Seticon(shower_rain)
    }
    else if (data1.weather[0].icon == "10d" || data1.weather[0].icon == "10n") {
      Seticon(rain)
    }
    else if (data1.weather[0].icon == "11d" || data1.weather[0].icon == "11n") {
      Seticon(thunder)
    }
    else if (data1.weather[0].icon == "13d" || data1.weather[0].icon == "13n") {
      Seticon(snow)
    }
    else if (data1.weather[0].icon == "50d" || data1.weather[0].icon == "50n") {
      Seticon(mist)
    }
  }
  let fact1 = '';

  const fun_facts = () => {
    let i = Math.floor(Math.random() * 5);
    console.log(i);
    if (data.main.temp >= 1 && data.main.temp <= 20) {
      fact1 = fun_facts_10[i];
      console.log(fact1)
    }
    else if (data.main.temp >= 20 && data.main.temp <= 30) {
      fact1 = fun_facts_30[i];
      console.log(fact1)
    }
    else if (data.main.temp >= 30 && data.main.temp <= 50) {
      fact1 = fun_facts_30[i];
    }

    const fact = document.getElementsByClassName('facts');
    fact[0].innerHTML = fact1
  }

  const show = () => {
    const fact = document.getElementsByClassName('facts');
    fact[0].style.display = 'flex';
    fact[0].style.opacity = '1'
    const less = document.getElementsByClassName('less');
    less[0].style.display = 'none';
    const less1 = document.getElementsByClassName('less1');
    less1[0].style.display = 'flex';

  }

  const hide = () => {
    const fact = document.getElementsByClassName('facts');
    fact[0].style.display = 'none';
    const less = document.getElementsByClassName('less');
    less[0].style.display = 'flex';
    const less1 = document.getElementsByClassName('less1');
    less1[0].style.display = 'none';
  }


  return (
    <div className='container-fluid' >
      <div className='Weather'>
        <div className='weat'>
          <div className='weather-container'>
            <div className="city-Input">
              <input type='text' placeholder='Search' className='location' />
              <FontAwesomeIcon icon={faMagnifyingGlass} className='weather-img' onClick={() => { search() }} />
            </div>
          </div>
          <div className='timestamp'>
            <p className='time'></p>
          </div>
          <div className='weather-icon'>
            <img src={icon} className='weather-icon1' />
            <p className='temperature'></p>
            <p className='Loc'> </p>
          </div>

          <div className="row hw">
            <div className='col-lg-6 humidity'>
              <img src='https://cdn-icons-png.flaticon.com/128/6566/6566344.png' className='hum' />
              <p className='humidityp'></p>
            </div>
            <div className='col-lg-6 wind'>
              <img src='https://cdn-icons-png.flaticon.com/128/9829/9829463.png'  />
              <p className='windp'></p>
            </div>
          </div>
          <div className='fun-facts col'>
            <img src={open} className='less' alt='Expand ' onClick={() => { fun_facts(); show() }} />
            <img src={close} className='less1' onClick={() => { hide() }} />
            <p className='facts'></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather
