let currentDate = new Date();
let hours = currentDate.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let date = currentDate.getDate();
if (date < 10) {
  date = `0${date}`;
}
let year = currentDate.getFullYear();

function currentDay() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[currentDate.getMonth()];
  let day = days[currentDate.getDay()];
  let newDay = document.querySelector(".day");
  newDay.innerHTML = `${day}, ${date} ${month} ${year}, ${hours}:${minutes}`;
}
currentDay();

function mainCity() {
  let city = `Harare`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;

  function mainTemp(response) {
    let temperature = Math.round(response.data.main.temp);
    let temp = document.querySelector("#temp");
    temp.innerHTML = `${temperature}°C`;
  }
  let apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(mainTemp);

  function mainDescription(response) {
    let status = response.data.weather[0].description;
    let currentStatus = document.querySelector(".appearance");
    currentStatus.innerHTML = `${status}`;
  }
  axios.get(apiUrl).then(mainDescription);
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
    let temperature = Math.round(response.data.main.temp);
    let temp = document.querySelector("#temp");
    temp.innerHTML = `${temperature}°C`;
  }

  let apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentTemperature);

  function currentDescription(response) {
    let status = response.data.weather[0].description;
    let currentStatus = document.querySelector(".appearance");
    currentStatus.innerHTML = `${status}`;
  }
  axios.get(apiUrl).then(currentDescription);
}

let city = document.querySelector("#city-form");
city.addEventListener("submit", enterCity);

function currentLocation(event) {
  event.preventDefault();

  function currentCity(response) {
    let city = response.data.name;
    let h1 = document.querySelector("h1");
    h1.innerHTML = `${city}`;
    let temperature = Math.round(response.data.main.temp);
    let temp = document.querySelector("#temp");
    temp.innerHTML = `${temperature}°C`;
    let status = response.data.weather[0].description;
    let currentStatus = document.querySelector(".appearance");
    currentStatus.innerHTML = `${status}`;
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
let button = document.querySelector("button");
button.addEventListener("click", currentLocation);
