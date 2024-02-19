function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-input");
  let cityName = searchInput.value;

  let h1 = document.querySelector("h1");
  h1.innerHTML = cityName;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
let apiKey = "684co3fe49773dbfcf353105adtfdab1";

function displayTemperature(response) {
  console.log(response.data.temperature.current);
  let temperatureElement = document.querySelector("#temperature");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.textContent = temperature;
}

let cityForm = document.querySelector("form");
cityForm.addEventListener("submit", searchCity);

let timeElement = document.querySelector(".current-weather .time");

function updateCurrentDate() {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  let hour = now.getHours();
  let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hour < 10) {
    hour = `0${hour}`;
  }

  let formattedTime = `${day} ${hour}:${minutes}`;
  timeElement.textContent = formattedTime;
}

updateCurrentDate();
setInterval(updateCurrentDate, 60000);
