function searchCity(event) {
  if (event) event.preventDefault();
  let cityName = event
    ? document.querySelector(".search-input").value
    : "Paris";

  let h1 = document.querySelector("h1");
  h1.innerHTML = capitalizeFirstLetter(cityName);
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
let apiKey = "684co3fe49773dbfcf353105adtfdab1";
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function displayWeather(response) {
  console.log(response.data);

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = ` ${response.data.temperature.humidity}%`;

  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = ` ${response.data.wind.speed} km/h`;

  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = formatDate(date);

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class ="current-temperature-icon" />`;
  getForecast(response.data.city);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return ` ${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

let cityForm = document.querySelector("form");
cityForm.addEventListener("submit", searchCity);

function getForecast(city) {
  let apiKey = "684co3fe49773dbfcf353105adtfdab1";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `
<div class="weather-forecast-day">
  <div class="weather-forecast-date">${formatDay(day.time)}</div>
  <div class="weather-forecast-icon">
  <img src="${day.condition.icon_url}" />
  </div>
  <div class="weather-forecast-temperatures">
    <div class="weather-forecast-temperature"><strong>${Math.round(
      day.temperature.maximum
    )}°</strong></div>
     
    <div class="weather-forecast-temperature">${Math.round(
      day.temperature.minimum
    )}°</div>
  </div>
</div>
`;
    }
  });
  forecastElement.innerHTML = forecastHtml;
}
document.addEventListener("DOMContentLoaded", function () {
  searchCity(null);
});
