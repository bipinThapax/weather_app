let temp = document.querySelector(".weather-temperature h3:first-child")
let cityName = document.querySelector(".weather-temperature h3:last-child")
let humidity = document.querySelector(".humidity span")
let windspeed = document.querySelector(".speed  span")
let weatherIcon = document.querySelector(".weather-icon img")

async function getWeather(city) {
    const apiKey = 'f761fc5a8e9f0642d9f4a5a5f038337f';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl)
        if (!response.ok) {
            console.log("Response not working")
            return;
        }
        let data = await response.json()

        // updating weather information name,temp,humidity,windspeed
        cityName.innerHTML = data.name
        temp.innerHTML = data.main.temp + "&deg; C"
        humidity.innerHTML = data.main.humidity + "%"
        windspeed.innerHTML = data.wind.speed + "km/h"

        // assigning weather image according to weather descripiton
        let weather = data.weather[0].description
        if (weather.includes("clear")) {
            // sunny
            weatherIcon.src = "./images/sun.png"
        }
        else if (weather.includes("overcast") || weather.includes("broken")) {
            // cloudy
            weatherIcon.src = "./images/cloudy.png"
        } else if (weather.includes("few") || weather.includes("scattered")) {
            // sunny cloudy
            weatherIcon.src = "./images/cloudSunRising.png"
        } else if (weather.includes("heavy rain")) {
            // heavy rain
            weatherIcon.src = "./images/rainy.png"
        } else if (weather.includes("rain")) {
            // light rainy
            weatherIcon.src = "./images/sunAndRain.png"
        }

    } catch (error) {
        console.log("fetch error:", error)
    }
}

let input = document.querySelector(".search-bar input")
let search = document.querySelector(".search-bar .search-icon")

// event listener to search icon and getWeather info
search.addEventListener("click", () => {
    if (input.value == "") {
        console.log("Value cannot be empty")
    } else if (input.value.includes(Number)) {
        console.log("Value cannot be number")
    } else {
        getWeather(input.value)
        input.value = ""
    }
})