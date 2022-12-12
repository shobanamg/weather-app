const button = document.querySelector(".btn");
const searchValue = document.querySelector("#searchbox");

const setFunction = () => {
  const cityName = searchValue.value;
  getData(cityName);
};

const BASE_URL = "https://api.openweathermap.org";
const API_KEY = "4eeb1d008f71e17389ab9cfdf9790eee";
const getData = (cityName) => {
  if (searchValue.value === "") {
    alert("Please enter a valid city name");
  } else {
    fetch(`${BASE_URL}/data/2.5/weather?q=${cityName}&appid=${API_KEY}`)
      .then((response) => response.json())
      .then((weather) => {
        console.log(weather);
        const celcius = Math.round(parseFloat(weather.main.temp) - 273.15);
        document.querySelector(".city").innerHTML = `${weather.name} ,
        ${weather.sys.country}`;
        document.querySelector(".temperature").innerHTML = celcius + "&deg;";
        document.getElementById(
          "icon"
        ).src = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
        document.querySelector(".weather").innerHTML =
          weather.weather[0].description;
        document.querySelector(
          ".wind"
        ).innerHTML = `wind speed: ${weather.wind.speed} km/h`;
        const unixSunrise = weather.sys.sunrise;
        const sunrise = new Date(unixSunrise * 1000);
        const unixSunset = weather.sys.sunset;
        const sunset = new Date(unixSunset * 1000);
        document.querySelector(
          ".sun-rise-set"
        ).innerHTML = `sunrise: ${sunrise.toLocaleTimeString([], {
          hour: "2-digit",
        })}am <br> sunset: ${sunset.toLocaleTimeString([], {
          hour: "2-digit",
        })}pm  `;
      })
      .catch((error) => console.log(error));
  }
  searchValue.value = "";
};

button.addEventListener("click", setFunction);
