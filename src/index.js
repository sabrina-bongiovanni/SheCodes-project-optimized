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

function formatDate(current) {
  date.innerHTML = `${currentDay} ${currentDate}/${currentMonth}/${currentYear}`;
}

function formatTime(current) {
  if (currentMinutes < 10) {
    time.innerHTML = `${currentHour}:0${currentMinutes}`;
  } else {
    time.innerHTML = `${currentHour}:${currentMinutes}`;
  }
}
formatDate(now);
formatTime(now);

// show temperature

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", showCurrentLocation);
      
function showCurrentLocation() {
    navigator.geolocation.getCurrentPosition(showPosition);

    function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let apiKey = "7573780ca10b4a84bc1fe1d021e3d865";
    let apiUrlPosition = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    axios.get(apiUrlPosition).then(showMainTemperature);

    let apiKeyAbi = "7be32609312e4b2a8605bf935a91864b";
    let apiUrlAbi = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${apiKeyAbi}&days=6`;

    axios.get(apiUrlAbi).then(showSmallTemperature);
    }

let searchForm = document.querySelector("#inputGroup");
searchForm.addEventListener("submit", functionSearch);

function functionSearch(event) {
    event.preventDefault();
    let farenheitSymbol = document.getElementById("convert-to-farenheit");
    let celsiusSymbol = document.getElementById("convert-to-celsius");
    farenheitSymbol.style.color = "rgba(255, 255, 255, 0.5)";
    celsiusSymbol.style.color = "rgb(255, 255, 255)";
  
    let cityName = document.querySelector("h3");
    let inputCity = document.querySelector("#cityInput").value;
    let splitInput = inputCity.split(" ");
    cityName.innerHTML = splitInput
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join(" ");

    let apiKey = "7573780ca10b4a84bc1fe1d021e3d865";
    let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}&units=metric`;
  
    axios.get(weatherApiUrl).then(showMainTemperature);
  
    let apiKeyAbi = "7be32609312e4b2a8605bf935a91864b";
    let apiUrlAbi = `https://api.weatherbit.io/v2.0/forecast/daily?city=${inputCity}&key=${apiKeyAbi}&days=6`;
  
    axios.get(apiUrlAbi).then(showSmallTemperature);
  }
  
  function showMainTemperature(response) {
    let temperatureValue = document.querySelector("#temperature-number");
    temperatureValue.innerHTML = Math.round(response.data.main.temp);

  
      let celsiusSymbol = document.getElementById("convert-to-celsius");
      let farenheitSymbol = document.getElementById("convert-to-farenheit");
      farenheitSymbol.addEventListener("click", celsiusToFarenheit);
      
      let showFarenheit = false;
  
      function celsiusToFarenheit(event) {
        event.preventDefault();
        let farenheitTemperature = Math.round((response.data.main.temp * 9) / 5 + 32); 
        temperatureValue.innerHTML = farenheitTemperature;
        farenheitSymbol.style.color = "rgb(255, 255, 255)";
        celsiusSymbol.style.color = "rgba(255, 255, 255, 0.5)";
        showFarenheit = true;
        if (showFarenheit === true) {
          farenheitSymbol.removeEventListener("click", celsiusToFarenheit);
        } 
      }
  
        celsiusSymbol.addEventListener("click", farenheitToCelsius);
      
        let showCelsius = false;
  
        function farenheitToCelsius(event) {
          event.preventDefault();
          temperatureValue.innerHTML = Math.round(response.data.main.temp);
          farenheitSymbol.style.color = "rgba(255, 255, 255, 0.5)";
          celsiusSymbol.style.color = "rgb(255, 255, 255)";
          showCelsius = true;
          showFarenheit = false;
          farenheitSymbol.addEventListener("click", celsiusToFarenheit)
        }
  
  
    let minTemp = document.querySelector("#min-temp");
    let maxTemp = document.querySelector("#max-temp");
    minTemp.innerHTML = `${Math.round(response.data.main.temp_min)}°C`;
    maxTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°C`;
  
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
  
  function showSmallTemperature(response) {
    for (let i = 1; i < response.data.data.length; i++) {
      let temperature = document.querySelector("#temperature-day-" + i);
      temperature.innerHTML = Math.round(response.data.data[i].temp) + "°C";
  
      let weatherCondition = response.data.data[i].weather.code;
      if (weatherCondition >= 200 && weatherCondition < 300) {
        document.querySelector("#small-icon-" + i).src = "thunderstorm.b65ce3a6.png";
      }
      if (weatherCondition >= 300 && weatherCondition < 600) {
        document.querySelector("#small-icon-" + i).src = "rain.1e042ddf.png";
      }
      if (weatherCondition >= 600 && weatherCondition < 700) {
        document.querySelector("#small-icon-" + i).src = "snow.f87c4275.png";
      }
      if (weatherCondition >= 700 && weatherCondition < 800 || weatherCondition === 804) {
        document.querySelector("#small-icon-" + i).src = "clouds.8c9e0a75.png";
      }
      if (weatherCondition === 800) {
        document.querySelector("#small-icon-" + i).src = "sun.328582e4.png";
      }
      if (weatherCondition >= 801 && weatherCondition < 804) {
        document.querySelector("#small-icon-" + i).src = "cloudy.17aa9d1b.png";
      }
      
      let forecastDays = document.querySelector("#day-" + i);
      let dateTime = response.data.data[i].datetime;
  
      forecastDays.innerHTML = new Date(dateTime).toLocaleString('en-us', {weekday: "short"});
    }
}
}