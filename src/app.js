function formatDate (timestamp){
//calculate the date
let date=new Date (timestamp);
let hours= date.getHours();
let minutes=date.getMinutes();
if (minutes<10){
    minutes=`0${minutes}`;
}
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
let day=days[date.getDay()];
return `${day} ${hours}: ${minutes}`;
}

function formatDay(timestamp){
let date= new Date(timestamp*1000);
let day=date.getDay();
let days=[
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];
return days[day];
}

function displayForecast(response){
    let forecast=response.data.daily;
    let forecastElement=document.querySelector("#forecast");

let forecastHTML=`<div class="row">`;
forecast.forEach(function (forecastDay,index){
    if(index < 6){
    forecastHTML= 
    forecastHTML+ 
    `
    <div class="col-2">
     <div class="weather-forecast-date">${formatDay(forecastDay.dt)} </div>
     <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="42px"/>
     <div class="weather-forecast-temp"><span class="weather-forecast-maximum">${Math.round(forecastDay.temp.max)}&deg</span> <span class="weather-forecast-minimum">${Math.round(forecastDay.temp.min)}&deg</span></div>
    </div>`;
    forecastElement.innerHTML=forecastHTML;
    }
})

}

function getForecast(coordinates){
    let apiKey="e450bc345a80a08ada69fd5c714d871d";
    let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
let temperatureElement=document.querySelector("#temperature");
let cityElement=document.querySelector("#city");
let descriptionElement=document.querySelector("#description");
let humidityElement=document.querySelector("#Humidity");
let windElement=document.querySelector("#Wind");
let dateElement=document.querySelector("#date");
let iconElement=document.querySelector("#icon");
dateElement.innerHTML=formatDate(response.data.dt * 1000);
windElement.innerHTML=Math.round(response.data.wind.speed);
humidityElement.innerHTML=response.data.main.humidity;
temperatureElement.innerHTML= Math.round(response.data.main.temp);
cityElement.innerHTML=response.data.name;
descriptionElement.innerHTML=response.data.weather[0].description;
iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

getForecast(response.data.coord);
}



function search(city){
    let apiKey="2efb90627753bf3d901e44a0b3405473";
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}`).then (displayTemperature);
}


function handleSubmit(event){
    event.preventDefault();
    let cityInputElement=document.querySelector("#city-input");
search(cityInputElement.value);
}

function showFahrenheitTemp(event){
    event.preventDefault();
    let fahrenheitTemperature=(19 * 9/5) + 32;
let temperatureElement=document.querySelector("#temperature");
temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
}



search("London");


let form=document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitlink=document.querySelector("#fahrenheit");
fahrenheitlink.addEventListener("click",showFahrenheitTemp);