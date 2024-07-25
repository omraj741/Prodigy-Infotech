const apiKey = "cb75efacd58899d67efb463b7badca5f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherStatus = document.querySelector(".description");
const weather = document.querySelector(".weather");
const err = document.querySelector(".error");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();

        if (response.status === 404) {
            err.style.display = "block";
            weather.style.display = "none";
        } else {
            document.querySelector(".city").innerText = data.name;
            document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerText = data.main.humidity + "%";
            document.querySelector(".wind").innerText = data.wind.speed + " km/h";

            if (data.weather[0].main === "Clouds") {
                weatherIcon.src = "images/clouds.png";
                weatherStatus.innerText = "Cloudy";
            } else if (data.weather[0].main === "Clear") {
                weatherIcon.src = "images/clear.png";
                weatherStatus.innerText = "Clear";
            } else if (data.weather[0].main === "Rain") {
                weatherIcon.src = "images/rain.png";
                weatherStatus.innerText = "Rain";
            } else if (data.weather[0].main === "Drizzle") {
                weatherIcon.src = "images/drizzle.png";
                weatherStatus.innerText = "Drizzle";
            } else if (data.weather[0].main === "Mist") {
                weatherIcon.src = "images/mist.png";
                weatherStatus.innerText = "Mist";
            }

            weather.classList.remove("hide");
            weather.style.display = "block";
            err.style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        err.style.display = "block";
        weather.style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        searchBtn.click();
    }
});
