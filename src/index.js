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
    let cityName = document.querySelector("h3");
    let inputCity = document.querySelector("#cityInput").value;
    if (inputCity !== "") {
      let splitInput = inputCity.split(" ");
      cityName.innerHTML = splitInput
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join(" ");
    } else {
      cityName.innerHTML = response.data.name;
    }
    let temperatureValue = document.querySelector("#temperature-number");
    temperatureValue.innerHTML = Math.round(response.data.main.temp);

    //substitute minor data
    var minTemp = document.querySelector("#min-temp");
    var maxTemp = document.querySelector("#max-temp");
    minTemp.innerHTML = `${Math.round(response.data.main.temp_min)}°C`;
    maxTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°C`;

    var windspeed = document.querySelector("#windspeed");
    windspeed.innerHTML = `${Math.round(response.data.wind.speed)} m/s`;

    var humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${response.data.main.humidity}%`;

    //Search function - convert

    var celsiusSymbol = document.getElementById("convert-to-celsius");
    var farenheitSymbol = document.getElementById("convert-to-farenheit");
    farenheitSymbol.classList.add("inactive-link");
    farenheitSymbol.classList.remove("active-link");
    celsiusSymbol.classList.add("active-link");
    celsiusSymbol.classList.remove("inactive-link");
    farenheitSymbol.addEventListener("click", celsiusToFarenheit);
    celsiusSymbol.addEventListener("click", farenheitToCelsius);
    
    function celsiusToFarenheit(event) {
      event.preventDefault();
      let farenheitTemperature = Math.round((response.data.main.temp * 9) / 5 + 32);
      let minTempFarenheit = Math.round((response.data.main.temp_min * 9) / 5 + 32);
      let maxTempFarenheit = Math.round((response.data.main.temp_max * 9) / 5 + 32);
      temperatureValue.innerHTML = farenheitTemperature;
      minTemp.innerHTML = `${minTempFarenheit}°F`;
      maxTemp.innerHTML = `${maxTempFarenheit}°F`;
      farenheitSymbol.classList.remove("inactive-link");
      farenheitSymbol.classList.add("active-link");
      celsiusSymbol.classList.remove("active-link");
      celsiusSymbol.classList.add("inactive-link");
    }

    function farenheitToCelsius(event) {
      event.preventDefault();
      temperatureValue.innerHTML = Mafth.round(response.data.main.temp);
      minTemp.innerHTML = `${Math.round(response.data.main.temp_min)}°C`;
      maxTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°C`;
      celsiusSymbol.classList.remove("inactive-link");
      celsiusSymbol.classList.add("active-link");
      farenheitSymbol.classList.remove("active-link");
      farenheitSymbol.classList.add("inactive-link");
    }

    if (
      response.data.weather[0].description === "broken clouds" ||
      response.data.weather[0].description === "scattered clouds" ||
      response.data.weather[0].description === "few clouds"
    ) {
      document.body.style.backgroundImage =
        "url('src/images/sfondo-sun-cloudy.png')";
      document.querySelector("#mainIcon").src = "src/images/cloudy.png";
    } else {
      let weatherCondition = response.data.weather[0].main
      document.body.style.backgroundImage = `url('src/images/sfondo-${weatherCondition}.png')`;
      document.querySelector("#mainIcon").src = `src/images/${weatherCondition}.png`;  
    }

    //reset input value
    document.querySelector("#cityInput").value = "";
  }

  function showTemperatureSmall(response) {
    for (let i = 1; i < response.data.data.length; i++) {
    let temperatureLocale = document.querySelector("#temperature-day-" + i);
    temperatureLocale.innerHTML = Math.round(response.data.data[i].temp) + "°C";

    let weatherConditionLocale = response.data.data[i].weather.code;
    if (weatherConditionLocale >= 200 && weatherConditionLocale < 300) {
      document.querySelector("#small-icon-" + i).src = "src/images/thunderstorm.png";
    }
    if (weatherConditionLocale >= 300 && weatherConditionLocale < 600) {
      document.querySelector("#small-icon-" + i).src = "src/images/rain.png";
    }
    if (weatherConditionLocale >= 600 && weatherConditionLocale < 700) {
      document.querySelector("#small-icon-" + i).src = "src/images/snow.png";
    }
    if (weatherConditionLocale >= 700 && weatherConditionLocale < 800 || weatherConditionLocale === 804) {
      document.querySelector("#small-icon-" + i).src = "src/images/clouds.png";
    }
    if (weatherConditionLocale === 800) {
      document.querySelector("#small-icon-" + i).src = "src/images/clear.png";
    }
    if (weatherConditionLocale >= 801 && weatherConditionLocale < 804) {
      document.querySelector("#small-icon-" + i).src = "src/images/cloudy.png";
    }

    let forecastDays = document.querySelector("#day-" + i);
    let dateTime = response.data.data[i].datetime;

    forecastDays.innerHTML = new Date(dateTime).toLocaleString('en-us', {weekday: "short"});

  }
}
}
window.onload = function() {
  document.getElementById("currentLocation").click();
};