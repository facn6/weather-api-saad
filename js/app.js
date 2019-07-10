const WEATHER_URL = "https://api.openweathermap.org/data/2.5/forecast?appid=";
const GOOGLE_MAPS_URL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCJVssKQzekpNKXWEL1VlME9wVlQUi_W9A&libraries=places&callback=initAutocomplete";

const errorElement = document.getElementById("search-error");
const validityErrMsg = "Please enter a valid location. Letters a-z, 2 letter country code optional";


function updateWeather(weather) {

    const location = weather.city.name + ", " + weather.city.country;
    const result = weather.list[0];
    const time = result.dt_txt;
    const message = result.weather[0].description;
    const currTemp = result.main.temp;
    const minTemp = result.main.temp_min;
    const maxTemp = result.main.temp_max;
    const humidity = result.main.humidity;
    const wind = result.wind.speed;

    document.getElementById("location-result").innerHTML = location;
    document.getElementById("main-time").innerHTML = time;
    document.getElementById("main-message").innerHTML = message;
    document.getElementById("main-temp").innerHTML = currTemp;
    document.getElementById("min-temp").innerHTML = minTemp;
    document.getElementById("max-temp").innerHTML = maxTemp;
    document.getElementById("humidity").innerHTML = humidity;
    document.getElementById("wind").innerHTML = wind;

}

function getWeather(event) {
    event.preventDefault();

    const city = event.target[0].value;
    const reg = /^([A-Z]+)(\,\s*[A-Z]{2})?$/i;

    if (!reg.test(city)) {
        showValidityError(event);
    } else {
        console.log(event);
        console.log('check city value =', city);

        const url = `${WEATHER_URL}${keys.WEATHER_KEY}&q=${city}&units=metric`;

        fetch(url).then(function (response) {
                return response.json();
            })
            .then(function (data) {
                updateWeather(data);
                console.log(data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

function showValidityError(e) {
    e.target.classList.add("error");
    errorElement.classList.add("error-msg");
    errorElement.classList.remove("hidden");
    errorElement.innerHTML = validityErrMsg;
}

function validator(e) {
    if (!e.target.validity.valid) {
        showValidityError(e);
    } else {
        e.target.classList.remove("error");
        errorElement.classList.remove("error-msg");
        errorElement.classList.add("hidden");
        errorElement.innerHTML = "";
    }
}

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", validator);

const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", getWeather);