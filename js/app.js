
const WEATHER_KEY = "ca21dfe9667e871a5b4cfee4cabe100b";
const ROOT_URL = "https://api.openweathermap.org/data/2.5/forecast?appid=";


let getWeather = function (event) {
    event.preventDefault();
    console.log(event);
    console.log('check city value =', event.target[0].value);

    var city = event.target[0].value;
    const url = `${ROOT_URL}${keys.openWeather}&q=${city}`;

    fetch(url).then(function (response) {
            return response.json();
        })
        .then(function data {
            console.log(data);
        })
        .catch(function (error) {
            console.log(error);
        });
};

const input = document.getElementById("search-input")
input.addEventListener("submit", getWeather)