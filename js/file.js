function formatDate(timestamp) {
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[date.getDay()];
if (date < 10) {
  date = `0${date}`;
} 
return `${day}, ${hours}:${minutes}`;

}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
  ];

   return days[day];
}



function mainCity() {
  let city = `Harare`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;

  function mainTemp(response) {
    celsiusTemperature = response.data.main.temp;
    let temperature = Math.round(response.data.main.temp);
    let temp = document.querySelector("#temp");
    temp.innerHTML = `${temperature}`;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity;
    let wind = document.querySelector("#wind");
    wind.innerHTML = Math.round(response.data.wind.speed);
    let currentStatus = document.querySelector(".appearance");
    currentStatus.innerHTML = response.data.weather[0].description;
    let dateElement = document.querySelector(".day");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    let icon = document.querySelector("#icon");
    icon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    weatherForecast(response.data.coord);
  }
  let apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(mainTemp);
  
}
mainCity();

function enterCity(event) {
  event.preventDefault();
  let insertCity = document.querySelector("#colFormLabelLg");
  let city = insertCity.value;
  let h1 = document.querySelector("h1");
  if (city) {
    h1.innerHTML = `${city}`;
  }

  function currentTemperature(response) {
    celsiusTemperature = response.data.main.temp;
    let temperature = Math.round(response.data.main.temp);
    let temp = document.querySelector("#temp");
    temp.innerHTML = `${temperature}`;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity;
    let wind = document.querySelector("#wind");
    wind.innerHTML = Math.round(response.data.wind.speed);
    let currentStatus = document.querySelector(".appearance");
    currentStatus.innerHTML = response.data.weather[0].description;
    let dateElement = document.querySelector(".day");
    dateElement.innerHTML = formatDate(response.data.dt *1000);
    let icon = document.querySelector("#icon");
    icon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    weatherForecast(response.data.coord);
   
  }
  
  let apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentTemperature);
}

let city = document.querySelector("#city-form");
city.addEventListener("submit", enterCity);

function currentLocation(event) {
  event.preventDefault();

  function currentCity(response) {
    celsiusTemperature = response.data.main.temp;
    let city = response.data.name;
    let h1 = document.querySelector("h1");
    h1.innerHTML = `${city}`;
    let temperature = Math.round(response.data.main.temp);
    let temp = document.querySelector("#temp");
    temp.innerHTML = `${temperature}`;
    let status = response.data.weather[0].description;
    let currentStatus = document.querySelector(".appearance");
    currentStatus.innerHTML = `${status}`;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity;
    let wind = document.querySelector("#wind");
    wind.innerHTML = Math.round(response.data.wind.speed);
    let dateElement = document.querySelector(".day");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    let icon = document.querySelector("#icon");
    icon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    weatherForecast(response.data.coord);

  }
  function currentPosition(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(currentCity);
  }
  navigator.geolocation.getCurrentPosition(currentPosition);
}
 
function showCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temp = document.querySelector("#temp");
  temp.innerHTML = Math.round(celsiusTemperature);
}

function showFahrenheit(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let temp = document.querySelector("#temp");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temp.innerHTML = Math.round(fahrenheitTemp);
}

let celsiusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);

let button = document.querySelector("button");
button.addEventListener("click", currentLocation);
 
function displayForecast (response) {
  forecastDays = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecastDays.forEach(function(forecastDay, index) {
    if (index < 6) {
  forecastHTML =
    forecastHTML +
    `
     <div class="col">
       <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
       <img
         src="https://openweathermap.org/img/wn/${
           forecastDay.weather[0].icon
         }@2x.png"
         alt="cloudy"
         width="50"
         id="forecast-icon"
       />
       <div class="forecast-temp">
         <span class="forecast-temp-max"><strong>${Math.round(
           forecastDay.temp.max)
         }°</strong></span>
         <span class="forecast-temp-min">${Math.round(forecastDay.temp.min)}°</span>
       </div>
     </div>
   `;
        }
  });

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;

}

function weatherForecast(coordinates) {
  console.log(coordinates)
  let apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}