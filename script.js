// script.js
const inputBox = document.getElementById('inputBox');
const searchBtn = document.getElementById('searchBtn');
const weatherImg = document.getElementById('weatherImg');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');

const locationNotFound = document.getElementById('locationNotFound');
const weatherBody = document.getElementById('weatherBody');

async function checkWeather(city) {
    const api_key = "eef8d96a72af56e3efb2d2d3766731b8";
    const url = https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key};

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const weather_data = await response.json();

        if (weather_data.cod === "404") {
            locationNotFound.style.display = "flex";
            weatherBody.style.display = "none";
            console.log("Location not found");
            return;
        }

        console.log("Weather data received");
        locationNotFound.style.display = "none";
        weatherBody.style.display = "flex";
        temperature.innerHTML = ${Math.round(weather_data.main.temp - 273.15)}°C;
        description.innerHTML = weather_data.weather[0].description;

        humidity.innerHTML = ${weather_data.main.humidity}%;
        windSpeed.innerHTML = ${weather_data.wind.speed} Km/H;

        switch (weather_data.weather[0].main) {
            case 'Clouds':
                weatherImg.src = "assets/cloud.png";
                break;
            case 'Clear':
                weatherImg.src = "assets/clear.png";
                break;
            case 'Rain':
                weatherImg.src = "assets/rain.png";
                break;
            case 'Mist':
                weatherImg.src = "assets/mist.png";
                break;
            case 'Snow':
                weatherImg.src = "assets/snow.png";
                break;
            default:
                weatherImg.src = "assets/cloud.png";
                break;
        }

        console.log(weather_data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        locationNotFound.style.display = "flex";
        weatherBody.style.display = "none";
    }
}

searchBtn.addEventListener('click', () => {
    const city = inputBox.value;
    if (city) {
        checkWeather(city);
    } else {
        console.log("Please enter a city name");
    }
});
