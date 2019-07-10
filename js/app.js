const WEATHER_URL = "https://api.openweathermap.org/data/2.5/forecast?appid=";

const errorElement = document.getElementById("search-error");
const validityErrMsg = "Please enter a valid location. Letters a-z, 2 letter country code optional";

function getWeather(event) {
    event.preventDefault();

    const city = event.target[0].value;
    const reg = /^([A-Z]+)(\,\s*[A-Z]{2})?$/i;

    if (!reg.test(city)) {
        showValidityError(event);
    } else {
        console.log(event);
        console.log('check city value =', city);

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
