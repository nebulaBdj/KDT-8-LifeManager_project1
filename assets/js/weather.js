const API_KEY = "fa3eba61f243af3e8e69086462763172";
let temp, weat;

function onGeoOk(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // console.log(`You live in ${latitude} and ${longitude}`);

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      temp = data.main.temp;
      weat = data.weather[0].main;
      console.log(`온도 : ${temp}, 날씨 : ${weat}`);
    });
}

function onGeoError() {
  alert("Can't find you. No weather for you.");
}

// console.log(temp, weather)
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

function weatherChange() {
  let weatherClass = document.getElementById("weather");
  // console.log(weatherClass)
  if (weat == "Rain") {
    $("#weather").removeClass();
    $("#weather").addClass("icon solid fa-cloud-showers-heavy");
  } else if (weat == "Clear") {
    $("#weather").removeClass();
    $("#weather").addClass("icon solid fa-sun");
  } else if (weat == "Clouds") {
    $("#weather").removeClass();
    $("#weather").addClass("icon solid fa-cloud");
  } else if (weat == "Snow") {
    $("#weather").removeClass();
    $("#weather").addClass("icon solid fa-snowflake");
  } else if (weat == "Haze") {
    $("#weather").removeClass();
    $("#weather").addClass("icon solid fa-water");
  }

  let temreal = document.querySelector(".temperature");
  temp = temp.toFixed(1);
  temreal.innerText = `${temp}°C`;
  console.log(temreal.innerText);

  document.getElementById("weather").style.opacity = 1;
}
