// 차트를 그럴 영역을 dom요소로 가져옴
var chartArea = document.getElementById("myChart").getContext("2d");
// 차트를 생성한다.
var myChart = new Chart(chartArea, {
  type: "line",
  data: {
    labels: ["20일", "21일", "22일", "23일", "24일", "25일", "TODAY"],
    datasets: [
      {
        label: "Weight",
        data: [68.9, 69, 68.5, 69.2, 68.7, 68.3],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 3,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    scales: {
      y: [
        {
          ticks: {
            beginAtzero: true,
          },
        },
      ],
    },
  },
});

// 차트를 그럴 영역을 dom요소로 가져옴
var chartArea = document.getElementById("bmiChart").getContext("2d");
// 차트를 생성한다.
var bmiChart = new Chart(chartArea, {
  type: "bar",
  data: {
    labels: ["20일", "21일", "22일", "23일", "24일", "25일", "TODAY"],
    datasets: [
      {
        label: "BMI",
        data: [22.7, 22.7, 22.6, 22.8, 22.6, 22.5],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 3,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 20,
        max: 25,
      },
    },
  },
});

function btn1() {
  let tdweight = document.getElementById("tdweight").value;
  let tdheight = document.getElementById("heightinput").value;
  tdweight = Number(tdweight);
  tdheight = Number(tdheight);
  let bmi = tdweight / ((tdheight * tdheight) / 10000);
  console.log(bmi.toFixed(1));

  var dataset = myChart.data.datasets;
  for (var i = 0; i < dataset.length; i++) {
    dataset[i].data.push(tdweight);
  }
  myChart.update();

  var bmidataset = bmiChart.data.datasets;
  for (var i = 0; i < dataset.length; i++) {
    bmidataset[i].data.push(bmi);
  }
  bmiChart.update();
}

var ctx = document.getElementById("dietChart");
var dietChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["현재 칼로리", "남은 칼로리"],
    datasets: [
      {
        label: "# of Tomatoes",
        data: [0, 100],
        backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 206, 86, 1)"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
  },
});

function show_name(e) {
  let word = document.getElementById("word");
  const diaryinputEl = document.getElementById("diaryinput");
  let txt = document.getElementById("diaryinput").value;
  const txt2 = diaryinputEl.value;
  let date = new Date();

  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (e.keyCode === 13) {
    word.innerHTML += hours + ":" + minutes + " " + txt + "\n";
    diaryinputEl.value = "";
    e.preventDefault();
  }
}

function d() {
  const diaryDelete = document.getElementById("word");
  word.innerText = "";
}

function diet_cal(e) {
  let cal_text = document.getElementById("diet_input").value;
  let cal_word = document.getElementById("now_cal");
  let cal_area = document.getElementById("caltext");
  let cal_text2 = document.getElementById("diet_input");

  if (e.keyCode === 13) {
    cal_text = Number(cal_text);
    let cal_word_num = Number(cal_word.innerText);
    cal_word.innerHTML = cal_text + cal_word_num;

    let nowcal = 0;
    nowcal = Math.floor((cal_word.innerHTML / 2133) * 100);
    cal_area.innerHTML += "+ " + cal_text + " cal" + "\n";
    var dataset = dietChart.data.datasets;
    for (let i = 0; i < dataset.length; i++) {
      var data = dataset[i].data;
      for (let j = 0; j < data.length; j++) {
        data[0] = nowcal;
        data[1] = 100 - nowcal;
      }
    }

    dietChart.update();
    cal_text2.value = "";
    e.preventDefault();
  }
}
