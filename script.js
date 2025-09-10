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
        let data = await response.json()
        if (!response.ok) {
            userReqHandle()
        } else {

            // updating weather information name,temp,humidity,windspeed
            cityName.innerHTML = data.name
            temp.innerHTML = data.main.temp + "&deg; C"
            humidity.innerHTML = data.main.humidity + " %"
            windspeed.innerHTML = data.wind.speed + " m/s"
        }

        // assigning weather image according to weather descripiton
        const weatherCond = {
            "clear sky": "./images/sun.png",
            "overcast clouds": "./images/cloudy.png",
            "broken clouds": "./images/cloudy.png",
            "few clouds": "./images/cloudSunRising.png",
            "scattered clouds": "./images/cloudSunRising.png",
            "heavy rain": "./images/rainy.png",
            "light rain": "./images/sunAndRain.png",
            "moderate rain": "./images/sunAndRain.png"
        }
        let weather = data.weather[0].description.toLowerCase();
        weatherIcon.src = weatherCond[weather] || "./images/sun.png";

    } catch (error) {
        console.log("fetch error:", error)
    }
}

// handle unavailable city 
function userReqHandle() {
    cityName.innerHTML = " City not found !"
    temp.innerHTML = "-- C"
    humidity.innerHTML = "- %"
    windspeed.innerHTML = "- m/s"
    weatherIcon.src = "./images/sun.png";
}


let input = document.querySelector(".search-bar input")
let search = document.querySelector(".search-bar .search-icon")


// function to handle search to load Weather information
function handleSearch() {
    if (input.value == "" || !isNaN(input.value)) {
        userReqHandle()
    } else {
        getWeather(input.value)
    }
    input.value = ""
}

// event listener to search icon 
search.addEventListener("click", handleSearch)

// add Event listener to enter key 
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        handleSearch()
    }
})

// displaying pokhara weather by default 
window.addEventListener("DOMContentLoaded", () => {
    getWeather("Pokhara")
})