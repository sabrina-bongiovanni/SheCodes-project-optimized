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
currentLocationButton.addEventListener("click", getCurrentData);

let searchForm = document.querySelector("#inputGroup");
searchForm.addEventListener("submit", getSearchedData);


