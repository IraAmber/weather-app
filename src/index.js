let currentTime = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  let formattedDate = `${currentDay}, ${currentHour}:${currentMinute}`;

  return formattedDate;
}
//console.log(formatDate(currentTime));

let li1 = document.querySelector("#dayToday");
//console.log(li1);
li1.innerHTML = formatDate(currentTime);

function weather(response) {
  document.querySelector("#myCity").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#Humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#Wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#Description").innerHTML =
    response.data.weather[0].main;
}

//let city = "cityIn";

function searchCity(city) {
  let apiKey = "0308c30a8aae3c180c00d2c33d0d673f";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(url).then(weather);
}

function write(event) {
  event.preventDefault();
  let city = document.querySelector("#cityAdd").value;
  searchCity(city);
}

function location(position) {
  let apiKey = "0308c30a8aae3c180c00d2c33d0d673f";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(weather);
}

function location1(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(location);
}

let searchForm = document.querySelector("#sform");
searchForm.addEventListener("submit", write);

let myButton = document.querySelector("#my-location-button");
myButton.addEventListener("click", location1);

searchCity("paris");
