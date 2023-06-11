function displayTemperature(response) {
let temperatureElement=document.querySelector("#temperature");
let cityElement=document.querySelector("#city");
let descriptionElement=document.querySelector("#description");
let humidityElement=document.querySelector("#Humidity");
let windElement=document.querySelector("#Wind");
windElement.innerHTML=Math.round(response.data.wind.speed);
humidityElement.innerHTML=response.data.main.humidity;
temperatureElement.innerHTML= Math.round(response.data.main.temp);
cityElement.innerHTML=response.data.name;
descriptionElement.innerHTML=response.data.weather[0].description;
}

let apiKey="2efb90627753bf3d901e44a0b3405473";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=London,Uk&appid=${apiKey}&units=metric`;
axios.get(`${apiUrl}`).then (displayTemperature);