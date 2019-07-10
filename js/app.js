const WEATHER_URL = "https://api.openweathermap.org/data/2.5/forecast?appid=";

const errorElement = document.getElementById("search-error");
const validityErrMsg = "Please enter a valid location. Letters a-z, 2 letter country code optional";
const icon_url="http://openweathermap.org/img/wn/"

function generateResultsList(weather) {
    let itemNum = -1;

    return weather.list.map(function (item) {
        itemNum++;
        return ('<div id="item-num-' + itemNum + '" class="weather-item">'
                + '<div class="item-date">'
                    + '<h6 class="item-date-title">Date</h6>'
                    + '<p class="item-date-text">' + item.dt_txt.split(' ')[0] + '</p>'
                + '</div>'
                + '<div class="item-time">'
                    + '<h6 class="item-time-title">Time</h6>'
                    + '<p class="item-time-text">' + item.dt_txt.split(' ')[1].slice(0,5) + '</p>'
                + '</div>'
                + '<div class="item-temp">'
                    + '<h6 class="item-temp-title">Temp</h6>'
                    + '<p class="item-temp-text">' + item.main.temp + '</p>'
                + '</div>'
                + '<div class="item-message">'
                    + '<h6 class="item-message-title">Outlook</h6>'
                    + '<p class="item-message-text">' + item.weather[0].description + '</p>'
                + '</div>' +
                '</div>')
    }).join('');
}

function updateWeather(weather) {

    const location = weather.city.name + ", " + weather.city.country;
    const result = weather.list[0];
    const date = result.dt_txt.split(' ')[0];
    const time = result.dt_txt.split(' ')[1].slice(0,5);
    const message = result.weather[0].description;
    const icon = result.weather[0].icon;
    const currTemp = result.main.temp;
    const minTemp = result.main.temp_min;
    const maxTemp = result.main.temp_max;
    const humidity = result.main.humidity;
    const wind = result.wind.speed;

    document.getElementById("location-result").innerHTML = location;
    document.getElementById("main-date").innerHTML = date;
    document.getElementById("main-time").innerHTML = time;
    document.getElementById("main-message").innerHTML = message;
    document.getElementById("main-temp").innerHTML = currTemp;
    document.getElementById("min-temp").innerHTML = minTemp;
    document.getElementById("max-temp").innerHTML = maxTemp;
    document.getElementById("humidity").innerHTML = humidity;
    document.getElementById("wind").innerHTML = wind;
    document.getElementById("icon").src = icon_url + icon + "@2x.png";

    document.getElementById("results-list").innerHTML = generateResultsList(weather)
}

function getWeather(event) {
    event.preventDefault();

    const city = event.target[0].value;
    const reg = /^([A-Z]+)(\,\s*[A-Z]{2})?$/i;

    if (!reg.test(city)) {
        showValidityError(event);
    } else {
        fetch(`${WEATHER_URL}${keys.WEATHER_KEY}&q=${city}&units=metric`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                document.getElementById("results-container").style.display = 'block';
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
