import React, { useState } from "react";
import Search from "../src/components/Search";
import "./App.css";
import CurrentWeather from "./components/current-weather";
import { WEATHER_API_URL } from "./Api";
import { WEATHER_API_KEY } from "./Api";
import Forecast from "./components/Forecast";

function App() {
  // const navigate=useNavigate();

  // const navigateTolinkedin=()=>{
  //   navigate('https://www.linkedin.com/in/muditjain20/');
  // }

  const [currentWeather, setcurrentWeather] = useState(null);
  const [forecast, setforecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherfetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastfetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherfetch, forecastfetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setcurrentWeather({ city: searchData.label, ...weatherResponse });
        setforecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };
  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className="App">
      <div className="container">
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && <Forecast data={forecast} />}
      </div>
      <footer className="foot">
        <p>Made by <a href="https://www.linkedin.com/in/muditjain20/" target="_blank"> Mudit Jain</a></p>
      </footer>
    </div>
  );
}

export default App;
