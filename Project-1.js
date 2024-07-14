document.getElementById("submitButton").addEventListener("click", formSubmit);

function formSubmit() {
    let City = document.getElementById("city-name").value;
    let State = document.getElementById("state-text").value;
    const storedState = localStorage.getItem("State");
    const storedCity = localStorage.getItem("City");

    const url = `https://api.api-ninjas.com/v1/geocoding?city=${City}&state=${State}&country=US`;
    console.log(City, State, localStorage.getItem("City"), localStorage.getItem("State"));

    if ((!City || !State) && (!storedCity || !storedState)) {
        alert("Please enter a city AND a state");
    } else if ((!City || !State) && storedCity && storedState) {
        confirmPrev(storedCity, storedState);
    } else {
        getCoordinates(url);
        localStorage.setItem("City", City);
        localStorage.setItem("State", State);
    }

    const myModalEl = document.getElementById('exampleModal');
    const myModal = bootstrap.Modal.getInstance(myModalEl);
    myModal.hide();
}

function confirmPrev(storedCity, storedState) {
    if (confirm("Would you like to use your previous entry of " + storedCity + ", " + storedState + "?")) {
        let City = storedCity;
        let State = storedState;
        const url = `https://api.api-ninjas.com/v1/geocoding?city=${City}&state=${State}&country=US`;
        getCoordinates(url);
        console.log("true");
    } else {
        console.log("false");
    }
}

async function getCoordinates(url) {
    const options = {
        headers: {
            "X-Api-Key": "bqCDMIQBl8n8JAdyO7tMYw==cmnAhPj015c3slkP",
        },
    };

    try {
        const result = await fetch(url, options);

        if (!result.ok) {
            throw new Error("Network response was not ok " + result.statusText);
        }

        const data = await result.json();
        const weatherUrl = `https://api.api-ninjas.com/v1/weather?lat=${data[0].latitude}&lon=${data[0].longitude}`;

        const weatherResponse = await fetch(weatherUrl, options);

        if (!weatherResponse.ok) {
            throw new Error("Network response was not ok " + weatherResponse.statusText);
        }

        const weatherData = await weatherResponse.json();
        const feelsLike = weatherData.feels_like
        const clouds = weatherData.cloud_pct;
        console.log(weatherData);
        console.log(weatherData.feels_like);
        console.log(feelsLike);
        console.log(clouds);

        updateWeather(feelsLike);

    } catch (error) {
        console.error("Error fetching data:", error);
    }

}

function celsiusToFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}


const paragraph1 = document.getElementById('p1');
const paragraph2 = document.getElementById('p2');
const paragraph3 = document.getElementById('p3');
const img1 = document.getElementById('img-1');
const img2 = document.getElementById('img-2');
const img3 = document.getElementById('img-3');



function updateWeather(tempCelsius) {
    const tempFahrenheit = celsiusToFahrenheit(tempCelsius);


    switch (true) {

        case (tempCelsius <= 16):
            paragraph2.textContent = "Wear pants, a long sleeve, and bring a jacket!";
            paragraph1.textContent = (`The temperature today is ${tempCelsius}°C (${tempFahrenheit.toFixed(1)}°F). It's going to be a chilly one!`);
            paragraph3.textContent = "You may want to bring a warm hat, gloves, a jacket, and closed-toed shoes with you today.";
            img3.src = "Assets/accessory-images/colder-weather.webp";
            img1.src = "Assets/weather-images/cold.webp";
            img2.src = "Assets/outfit-images/cold.webp";
            video1.src = "Assets/Weather-video/winter3.mov";



            break;
        case (tempCelsius <= 26.7):

            paragraph2.textContent = "Wear shorts, a short sleeve, and bring a jacket in case you get chilly!";
            paragraph1.textContent = (`The temperature today is ${tempCelsius}°C (${tempFahrenheit.toFixed(1)}°F). It's going to be mostly warm, but may get cold enough for a jacket!`);
            paragraph3.textContent = "You may want to bring a ball cap, sunglasses, a jacket, and sandals with you today.";
            img3.src = "Assets/accessory-images/medium-weather.webp";
            img1.src = "Assets/weather-images/medium.webp";
            img2.src = "Assets/outfit-images/medium.webp";
            video1.src = "Assets/Weather-video/medium.mov";
            break;
        case (tempCelsius <= 50):
            paragraph2.textContent = "Wear shorts, a tank top, and sandals!";
            paragraph1.textContent = (`The temperature today is ${tempCelsius}°C (${tempFahrenheit.toFixed(1)}°F). It's going to be toasty!`);
            paragraph3.textContent = "You may want to bring a sun hat, sunglasses, a fan, sunscreen, and sandals with you today... or just stay inside and enjoy the A/C!";
            img3.src = "Assets/accessory-images/warmer-weather.webp";
            img1.src = "Assets/weather-images/hot.webp";
            img2.src = "Assets/outfit-images/hot.webp";
            video1.src = "Assets/Weather-video/hot.mov";
            break;
        default:
            paragraph2.textContent = "Check the weather in your city";

    }
}
