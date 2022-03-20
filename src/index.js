// show date time
let date = document.querySelector("#date");
let time = document.querySelector("#time");

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12"
];

let currentDay = days[now.getDay()];
let currentDate = now.getDate();
let currentMonth = months[now.getMonth()];
let currentYear = now.getFullYear();
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();

function formatDate() {
  date.innerHTML = `${currentDay} ${currentDate}/${currentMonth}/${currentYear}`;
}

function formatTime() {
  if (currentMinutes < 10) {
    time.innerHTML = `${currentHour}:0${currentMinutes}`;
  } else {
    time.innerHTML = `${currentHour}:${currentMinutes}`;
  }
}
formatDate();
formatTime();


// addEventListener

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", function() {
  let parameter = "search";
  getData(event, parameter);
});



let searchForm = document.querySelector("#inputGroup");
searchForm.addEventListener("submit", getData);


function getData(event, parameter) {
  let inputCity = document.querySelector("#cityInput").value;
  if (parameter === "search") {
    showCurrentLocation();
    function showCurrentLocation() {navigator.geolocation.getCurrentPosition(showPosition);

    function showPosition(position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;  

      console.log(latitude);

      let apiKey = "7573780ca10b4a84bc1fe1d021e3d865";
      let apiUrlPosition = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
      axios.get(apiUrlPosition).then(showTemperature); 

      let apiKeyAbi = "7be32609312e4b2a8605bf935a91864b";
      let apiUrlAbi = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${apiKeyAbi}&days=6`;

      axios.get(apiUrlAbi).then(showTemperatureSmall);
    }
  }
  } else {
    event.preventDefault()
    let apiKey = "7573780ca10b4a84bc1fe1d021e3d865";
    let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}&units=metric`;

    axios.get(weatherApiUrl).then(showTemperature);

    let apiKeyAbi = "7be32609312e4b2a8605bf935a91864b";
    let apiUrlAbi = `https://api.weatherbit.io/v2.0/forecast/daily?city=${inputCity}&key=${apiKeyAbi}&days=6`;

    axios.get(apiUrlAbi).then(showTemperatureSmall);
  }

  function showTemperature(response) {
    console.log("okay");

    let cityName = document.querySelector("h3");
    let inputCity = document.querySelector("#cityInput").value;
    let splitInput = inputCity.split(" ");
    cityName.innerHTML = splitInput
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
    let temperatureValue = document.querySelector("#temperature-number");
    temperatureValue.innerHTML = Math.round(response.data.main.temp);

    //Search function - convert

    let celsiusSymbol = document.getElementById("convert-to-celsius");
    let farenheitSymbol = document.getElementById("convert-to-farenheit");
    farenheitSymbol.addEventListener("click", celsiusToFarenheit);
    celsiusSymbol.addEventListener("click", farenheitToCelsius);
    
    function celsiusToFarenheit(event) {
      event.preventDefault();
      let farenheitTemperature = Math.round((response.data.main.temp * 9) / 5 + 32);
      temperatureValue.innerHTML = farenheitTemperature;
      farenheitSymbol.classList.remove("inactive-link");
      farenheitSymbol.classList.add("active-link");
      celsiusSymbol.classList.remove("active-link");
      celsiusSymbol.classList.add("inactive-link");
    }

    function farenheitToCelsius(event) {
      event.preventDefault();
      temperatureValue.innerHTML = Math.round(response.data.main.temp);
      celsiusSymbol.classList.remove("inactive-link");
      celsiusSymbol.classList.add("active-link");
      farenheitSymbol.classList.remove("active-link");
      farenheitSymbol.classList.add("inactive-link");
    }

    //substitute minor data
    let minTemp = document.querySelector("#min-temp");
    let maxTemp = document.querySelector("#max-temp");
    minTemp.innerHTML = `${Math.round(response.data.main.temp_min)}°C`;
    maxTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°C`;

    let windspeed = document.querySelector("#windspeed");
    windspeed.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${response.data.main.humidity}%`;

    if (response.data.weather[0].main === ["Drizzle", "Rain"].indexOf()) {
    document.body.style.backgroundImage = "url('sfondo-rainy.4257b76d.png')";
    document.querySelector("#mainIcon").src = "rain.1e042ddf.png";
    }
    if (response.data.weather[0].main === "Thunderstorm") {
      document.body.style.backgroundImage = "url('sfondo-thunder.4cf0b0bf.png')";
      document.querySelector("#mainIcon").src = "thunderstorm.b65ce3a6.png";
    }
    if (response.data.weather[0].main === "Snow") {
      document.body.style.backgroundImage = "url('sfondo-snowy.35f42c3a.png')";
      document.querySelector("#mainIcon").src = "snow.f87c4275.png";
    }
    if (response.data.weather[0].main === "Clear") {
      document.body.style.backgroundImage = "url('sfondo-sunny.55ad7263.png')";
      document.querySelector("#mainIcon").src = "sun.328582e4.png";
    }
    if (response.data.weather[0].main === "Clouds") {
      document.body.style.backgroundImage = "url('sfondo-cloudy.267b0bf8.png')";
      document.querySelector("#mainIcon").src = "clouds.8c9e0a75.png";
    }
    if (
      response.data.weather[0].description === "broken clouds" ||
      response.data.weather[0].description === "scattered clouds" ||
      response.data.weather[0].description === "few clouds"
    ) {
      document.body.style.backgroundImage =
        "url('sfondo-sun-cloudy.9e0bdc4f.png')";
      document.querySelector("#mainIcon").src = "cloudy.17aa9d1b.png";
    }
  }
}