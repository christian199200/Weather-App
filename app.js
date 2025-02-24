document.getElementById('get-weather-btn').addEventListener('click', getWeather);

const weatherApiKey = "9205065de373d40e6f2bc9e91514c983";

// the function here helps to fetch and display weather data
function getWeather() {
    const city = document.getElementById('city-input').value.trim();
    
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    // This is an OpenWeather API URL that helps  to get current weather data
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${weatherApiKey}&units=metric`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert("City not found. Please check your input.");
            }
        })
        .catch(error => {
            console.error("Error fetching weather:", error);
            alert("Error fetching weather data. Please try again later.");
        });
}

// Function to display weather information
function displayWeather(data) {
    const { name, main, weather } = data;
    const temperature = main.temp;
    const humidity = main.humidity;
    const description = weather[0].description;
    const icon = weather[0].icon;

    // Update the UI with weather data
    document.getElementById('city-name').textContent = `Weather in ${name}`;
    document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
    document.getElementById('weather-condition').textContent = `Condition: ${description}`;
    document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;

    // Update the weather icon
    const weatherIconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
    document.getElementById('weather-icon').src = weatherIconUrl;
    document.getElementById('weather-icon').alt = description;
}

// Allow fetching weather using the "Enter" key
document.getElementById('city-input').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});
