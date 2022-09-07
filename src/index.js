let h2 = document.querySelector("h2");
let now = new Date();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let dayIndex = now.getDay();
let days = [
  "Sanday",
  "Monday",
  "Tuesday",
  "Wednesdya",
  "Thursday",
  "Friday",
  "Saturday",
];

h2.innerHTML = `${days[dayIndex]} ${hours}:${minutes}`;

function showWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weathre").innerHTML = response.data.weather[0].main;
}

function search(city) {
  let apiKey = "1ac15f3089d5ecb2f63776d46484ddca";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function handelSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  search(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handelSubmit);

search("Bucha");

function showPosition(position) {
  let apiKey = "1ac15f3089d5ecb2f63776d46484ddca";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("button");
locationButton.addEventListener("click", getCurrentPosition);