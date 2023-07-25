const API_KEY = "fa3eba61f243af3e8e69086462763172";
const kakao_API_KEY = "3a6c3035c801405eaa71ebb9dc7f474b";
let temp, weat;
let address;

function onGeoOk(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // console.log(`You live in ${latitude} and ${longitude}`);

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      temp = data.main.temp.toFixed(1);
      weat = data.weather[0].main;
      console.log(`온도 : ${temp}, 날씨 : ${weat}`);
    });

  fetch(
    `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
    {
      method: "GET",
      headers: { Authorization: `KakaoAK ${kakao_API_KEY}` },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      address =
        data.documents[0].address.region_1depth_name +
        " " +
        data.documents[0].address.region_2depth_name;
      console.log(address);
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

  $("#weather").removeClass();

  if (weat == "Rain") {
    $("#weather").addClass("icon solid fa-cloud-showers-heavy");
  } else if (weat == "Clear") {
    $("#weather").addClass("icon solid fa-sun");
  } else if (weat == "Clouds") {
    $("#weather").addClass("icon solid fa-cloud");
  } else if (weat == "Snow") {
    $("#weather").addClass("icon solid fa-snowflake");
  } else {
    $("#weather").addClass("icon solid fa-water");
  }

  let temreal = document.querySelector(".temperature");
  let addreal = document.querySelector(".address");
  addreal.innerText = `${address}`;
  temreal.innerText = `${temp}°C`;
  console.log(addreal.innerText, temreal.innerText);

  document.getElementById("weather").style.opacity = 1;
}
