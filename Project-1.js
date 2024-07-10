const City = "Phoenix";
const State = "Arizona";



const url = `https://api.api-ninjas.com/v1/geocoding?city=${City}&state=${State}&country=US`;

async function getCoordinates() {
    const options = {
        headers: {
            'X-Api-Key': 'bqCDMIQBl8n8JAdyO7tMYw==cmnAhPj015c3slkP'
        }
    };

    const result = await fetch(url, options);

    if (!result.ok) {
        throw new Error('Network response was not ok ' + result.statusText);
    }

    const data = await result.json();


    const weatherUrl = `https://api.api-ninjas.com/v1/weather?lat=${data[0].latitude}&lon=${data[0].longitude}`;

    const weatherResponse = await fetch(weatherUrl, options);

    if (!weatherResponse.ok) {
        throw new Error('Network response was not ok ' + weatherResponse.statusText);
    }

    const weatherData = await weatherResponse.json();
    console.log(weatherData);



}

getCoordinates();
console.log(weatherData);

