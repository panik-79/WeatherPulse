const apiKey = "c27a015d28f886d7cec8e66670b5abd4";
const weatherDataEle = document.querySelector(".weather-data") ;
const cityInputEle = document.getElementById("city-input");

const formEle = document.querySelector("form");

formEle.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityVal = cityInputEle.value;
    getWeatherData(cityVal);
})


async function getWeatherData(cityVal){
    try{

        // FETCHING DATA
        const result = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityVal}&limit=5&appid=${apiKey}`);

        if(!result.ok){
            throw new Error("Network response was not okay.")
        }
        const geoData = await result.json();

        const lati = geoData[0].lat;
        const longi = geoData[0].lon ;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=${apiKey}&units=metric`);

        if(!response.ok){
            throw new Error("Network response was not okay.")
        }
        const data = await response.json();

        console.log(data);

        const temp = Math.round(data.main.temp);
        const description = data.weather[0].description ;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like &nbsp; ${Math.round(data.main.feels_like)}°C`,
            `Humidity &nbsp; ${data.main.humidity}%`,
            `Wind speed &nbsp; ${data.wind.speed} mph`,
        ]

        // UPDATING UI
        weatherDataEle.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png">`;
        document.querySelector(".temperature").textContent = `${temp}°C`;   
        document.querySelector(".description").textContent = `${description}`;
        weatherDataEle.querySelector(".details").innerHTML = details.map((detail) => 
        `<div class="info">${detail}</div>`).join("");

    }
    catch(error){
        weatherDataEle.querySelector(".icon").innerHTML = "";
        document.querySelector(".temperature").textContent = "";   
        document.querySelector(".description").textContent = "Please enter a valid location !";
        weatherDataEle.querySelector(".details").innerHTML = "";
    }
}