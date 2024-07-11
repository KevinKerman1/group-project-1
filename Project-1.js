document.getElementById("submitButton").addEventListener("click", formSubmit);

function formSubmit() {
  let City = document.getElementById("recipient-name").value;
  let State = document.getElementById("message-text").value;
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
  } catch (error) {
    console.error("Error fetching data:", error);
  }

}

const weatherData.feels_like = "temp"
let temp = 0

switch (temp) {
    case (temp <= 13.5 ):
      return 
    case caseExpression2:
      statements
    // …
    case caseExpressionN:
      statements
    default:
      statements
  }

