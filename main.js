const apikey = "5baf67744e1dab13dc0f7cd577c123dd";
console.log("Sddds");
var mydata = {};
const main = document.getElementById("main");
const infor = document.getElementById("inform");
const week = document.getElementById("week");
const cross = document.getElementById("cross");
const options = document.getElementById("options");
const input = document.getElementById("input");
const color = [
  "#28E0AE",
  "#28E0AE",
  "#FF0090",
  "#FFAE00",
  "#0090FF",
  "#DC0000",
  "#0051FF",
];

var gsDayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

input.value = localStorage.getItem("location");
const frm = document.getElementById("form");

frm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    show();
  }
});
function expand(id) {
  main.style.opacity = 0;

  console.log();

  var d = new Date(mydata.forecast.forecastday[id].date);
  var dayname = gsDayNames[d.getDay()];

  const daydata = mydata.forecast.forecastday[id];

  // console.log();
  // console.log(dayname);

  var timedatas = timedaydata(daydata);
  infor.innerHTML = `<button class="cross cross-show" id="cross" onclick="hide()"> X </button>
                <span id="day" style="font-weight: 400; padding: 10px;"> ${dayname}</span>
                <img src="${daydata.day.condition.icon}" alt="" srcset="" id="inform-icon">
                <span style="display: flex; flex-direction: column; align-items: center;">
                    <span id="avg-temp">40&deg</span>
                    <span id="minmax">
                        <span>
                            <span class="infor-min-temp">
                               Min : ${daydata.day.mintemp_c}&deg
                            </span>
                            <span class="infor-min-temp">
                                Max : ${daydata.day.maxtemp_c}&deg
                            </span>
                        </span>


                    </span>
                </span>
                <div class="time-data-cont">
                    ${timedatas}

                </div>`;
  // console.log();
  infor.style.display = "flex";
  cross.classList.add("cross-show");
  infor.style.backgroundColor = color[id];
  infor.style.height = "80vh";
  infor.style.width = "100vw";
}

function hide() {
  cross.classList.remove("cross-show");
  // infor.style.display = "hidden";

  main.style.opacity = 1;
  infor.style.height = "0vh";
}

function timedaydata(s) {
  var result = "";
  for (let i = 12; i < 23; i += 2) {
    var hours = s.hour[i];
    var dt = new Date(hours.time).getHours();
    // console.log(hours.);
    result += `<span class="time-data">
                                ${dt}:00 <img src="${hours.condition.icon}" id="time-icon" alt="" srcset="">
                          <span id=time-data-temp>${hours.feelslike_c}&deg</span>
                      </span>`;
  }
  return result;
}

function show() {
  console.log(input.value);
  var dataget = "";
  const url = `http://api.weatherapi.com/v1/forecast.json?key=27d7a33dd2a5418ba1c95448211705&q=${input.value}&days=7&aqi=no&alerts=no`;
  console.log(url);
  const curtemp = document.getElementById("temp");
  const curtempicon = document.getElementById("temp-icon");

  fetch(url)
    .then((response) => response.json())

    .then((data) => {
      var cur = data.current;
      console.log(data);
      mydata = data;
      var data = `
            <span class="name">  ${data.location.name} ,${data.location.region}  </span>
         <span class="temp" id="temp"> ${cur.feelslike_c}&deg</span>
            <span class="description"> ${cur.condition.text}</span>
            <img src="${cur.condition.icon}" id="" alt="" srcset=""></img>`;

      main.innerHTML = data;
      var datenow = new Date().getDay();
      console.log(datenow);
      document.getElementById("1").innerText = gsDayNames[datenow + 1];
      document.getElementById("2").innerText = gsDayNames[datenow + 2];
    });
}

show();
