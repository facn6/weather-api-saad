

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/forecast?appid=";
const GOOGLE_MAPS_URL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCJVssKQzekpNKXWEL1VlME9wVlQUi_W9A&libraries=places&callback=initAutocomplete";

let getWeather = function (event) {
    event.preventDefault();
    console.log(event);
    console.log('check city value =', event.target[0].value);

    var city = event.target[0].value;
    const url = `${WEATHER_URL}${keys.WEATHER_KEY}&q=${city}`;

    fetch(url).then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
        .catch(function (error) {
            console.log(error);
        });
};

const input = document.getElementById("search-input")
input.addEventListener("submit", getWeather)