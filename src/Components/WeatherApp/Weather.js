import React, { useEffect, useState } from 'react'
import './Weather.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

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
import clear_skyBg from '../Assests/clear-skybg.avif'
import few_cloudsbg from '../Assests/few-cloudsBg.jpeg'
import scattered_clousBg from '../Assests/scatteredcloudsbg.jpg'
import broken_cloudsBg from '../Assests/brokenCloudsBg.jpeg'
import shower_rainBg from '../Assests/shower_rainBg.jpg'
import rain_Bg from '../Assests/rainBg.jpg'
import thunder_bg from '../Assests/thunderBg.jpg'
import snow_bg from '../Assests/snowBg.jpg'
import mist_bg from '../Assests/mistbg.avif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faMagnifyingGlass, faSun } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const Weather = () => {
  let [data, Setdata] = useState('')
  const [descript, Setdescript] = useState(clear_skyBg)
  const [loader, setloader] = useState(false);
  const [countryName, SetcountryName] = useState()
  let [locTime, SetlocTime] = useState()
  const [over, Setover] = useState(false)
  let [sunrise, Setsunrise] = useState()
  let [sunset, setsunset] = useState()
  let [loading, Setloading] = useState(true)
  let [min_temp, setmintemp] = useState()
  let [max_temp, setmaxtemp] = useState()
  const [error, seterror] = useState()


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


  useEffect(() => {
    val[0].value = "Tiruchengode"
    search();
    Setloading(true)
    setTimeout(() => {
      Setloading(false)
    }, 5000)
  }, [])

  const timezone = async () => {
    let response;
    let timeapi = "9d5ec08b7e2b44d7b14221668430299c";
    let url = `https://api.ipgeolocation.io/timezone?apiKey=${timeapi}&location=${val[0].value},%20${countryName}`
    response = await fetch(url);
    let timedata = await response.json();
    locTime = timedata.time_12
    SetlocTime(locTime)
    sunrise = (moment.utc(data.sys.sunrise, 'X').add(data.timezone, 'seconds').format('HH:mm a'));
    Setsunrise(sunrise)
    sunset = (moment.utc(data.sys.sunset, 'X').add(data.timezone, 'seconds').format('HH:MM a'))
    setsunset(sunset)
  }

  const formsubmit = (e) => {
    e.preventDefault();
    search();
    background();
    timezone();
  }

  const search = async (e) => {

    let response;
    if (val[0].value === '') {
      window.alert("Enter Location to Continue");
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${val[0].value}&units=metric&appid=${api_key}`
    try {
      setloader(true);
      // Seticon(null)
      response = await fetch(url);

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      data = await response.json();
      Setdata(data);
      render();
      loading = false
      console.log(loading);
    }
    catch (err) {

      setloader(false);
      window.alert(err.message)
    }
    setloader(false);

  }

  const render = () => {
    min_temp = data.main.temp_min;
    setmintemp(min_temp)
    max_temp = data.main.temp_max;
    setmaxtemp(max_temp)
    let temperature = document.getElementsByClassName('temperature');
    let Location = document.getElementsByClassName('Loc');
    let humidity = document.getElementsByClassName('humidityp')
    let wind = document.getElementsByClassName('windp');
    // let country1 = data.sys.country;
    SetcountryName(data.sys.country)
    temperature[0].innerHTML = data.main.temp.toFixed() + "   °C";
    Location[0].innerHTML = data.name;
    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = data.wind.speed + " M/H";
    var time = new Date()
    const timee = document.getElementsByClassName("time")
    timee[0].innerHTML = time


    if (data.weather[0].icon == "01d" || data.weather[0].icon == "01n") {
      Seticon(clear_sky)
    }
    else if (data.weather[0].icon == "02d" || data.weather[0].icon == "02n") {
      Seticon(few_clouds)
    }
    else if (data.weather[0].icon == "03d" || data.weather[0].icon == "03n") {
      Seticon(scattered_clouds)
    }
    else if (data.weather[0].icon == "04d" || data.weather[0].icon == "04n") {
      Seticon(scattered_clouds)
    }
    else if (data.weather[0].icon == "09d" || data.weather[0].icon == "09n") {
      Seticon(shower_rain)
    }
    else if (data.weather[0].icon == "10d" || data.weather[0].icon == "10n") {
      Seticon(rain)
    }
    else if (data.weather[0].icon == "11d" || data.weather[0].icon == "11n") {
      Seticon(thunder)
    }
    else if (data.weather[0].icon == "13d" || data.weather[0].icon == "13n") {
      Seticon(snow)
    }
    else if (data.weather[0].icon == "50d" || data.weather[0].icon == "50n") {
      Seticon(mist)
    }
    timezone();
    background();
  }
  let fact1 = '';

  const fun_facts = () => {
    let i = Math.floor(Math.random() * 5);
    if (data.main.temp >= 1 && data.main.temp <= 20) {
      fact1 = fun_facts_10[i];
    }
    else if (data.main.temp >= 20 && data.main.temp <= 30) {
      fact1 = fun_facts_30[i];
    }
    else if (data.main.temp >= 30 && data.main.temp <= 50) {
      fact1 = fun_facts_30[i];
    }

    const fact = document.getElementsByClassName('facts');
    fact[0].innerHTML = fact1

  }

  const background = () => {
    if (data.weather[0].description === "clear sky") {
      Setdescript(clear_skyBg)
    }
    if (data.weather[0].description === "few clouds") {
      Setdescript(few_cloudsbg)
    }
    if (data.weather[0].description === "scattered clouds") {
      Setdescript(scattered_clousBg)
    }
    if (data.weather[0].description === "broken clouds") {
      Setdescript(scattered_clousBg)
    }
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


  const enter = () => {
    Setover(true)
  }

  const leave = () => {
    Setover(false)
  }

  return (
    <>
      <div className='d-flex justify-content-center'>
        <div className='wha'>
          <div className='weat' style={{ backgroundImage: `url(${descript})` }}>
            <div className='weather-container'>
              <div className="city-Input">
                <form onSubmit={(e) => { formsubmit(e) }} className='d-flex w-100'>
                  <input type='text' placeholder='Search' className='location ' />
                  <button type='submit' className='btn'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='weather-img' onClick={() => { search(); background(); timezone() }} />
                  </button>
                </form>
              </div>
            </div>
            <div className='timestamp'>
              <p className='time'></p>
            </div>
            {
              loader &&
              (
                <span className="loader"></span>
              )
            }
            <div className='weather-icon'>
              <img src={icon} className='weather-icon1' />
              <p className='temperature'></p>
              <p className='Loc'> </p>
            </div>

            <div className='sidebar' onMouseEnter={() => { enter() }} onMouseLeave={() => { leave() }} >
              <div className='local-time' >
                <label ><FontAwesomeIcon icon={faClock} className='side-font' /></label>
                {
                  over &&
                  <>
                    <label className='tim'  >Local Time:</label>
                    <label className='tim'>
                      {locTime}
                    </label>
                  </>
                }
              </div>
              <div className='sun-rise'>
                <label><FontAwesomeIcon icon={faSun} className='side-font' /></label>
                {
                  over &&
                  <>
                    <label className='tim'>Expected Sunrise:</label>
                    <label className='tim'> {sunrise}</label>
                  </>}
              </div>
              <div className='sun-set'>
                <label><FontAwesomeIcon icon={faSun} className='side-font' /></label>
                {over &&
                  <>
                    <label>Expected Sunset:</label>
                    <label className='tim'>{sunset}</label>
                  </>}
              </div>
            </div>
            <div className="hw">
              <div className='col-md-4 humidity'>
                <p>Humidity :</p>
                {/* <img src='https://cdn-icons-png.flaticon.com/128/6566/6566344.png' className='hum' /> */}
                <p className='humidityp'></p>
              </div>
              <div className='col-md-4 wind'>
                <p>Wind Speed:</p>
                {/* <img src='https://cdn-icons-png.flaticon.com/128/9829/9829463.png' /> */}
                <p className='windp'></p>
              </div>
              <div className='col-md-4 wind'>
                <p className='windp'>
                  <label>Min Temp:{min_temp}</label>
                  <br />
                  <label>Max Temp:{max_temp}</label>
                </p>
              </div>
            </div>
            <div className='fun-facts'>
              <img src={open} className='less' alt='Expand ' onClick={() => { fun_facts(); show() }} />
              <img src={close} className='less1' onClick={() => { hide() }} />
              <p className='facts'></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Weather