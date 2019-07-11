# API-weather-map

## Weather
We are using the [Open Weather data api](https://openweathermap.org/) to get weather results.

The user searches for a location and we return the data for that city.

We display the data for the area based on hours or days and add icons relating to the weather.

The user can click on a different time or day in the results and see this as the main result where more detailed information is displayed.


### API Call
Hiding keys in a separate file so user can't see them.
Call using fetch and then process the result


### Form Entry and Validation
We initially used a really cool search bar that looked beautiful and had animations. It was a nightmare to make work with the form. Lesson. Don't copy code just build it from scratch and then make it look nice if you have time.
We use a REGEX in the search field so people can only search for a city with an optional country code following. If the country is entered incorrectly the form will prevent them submitting. However, this does not deal with cities that have two words such as 'Tel Aviv' so it could be improved


#### Google Maps
We tried to implement Google Maps api call to show the location but got caught in CORS issues and key issues and lots of stuff. It worked for a while then it didn't work and it wasted a lot time. But we learnt stuff.
