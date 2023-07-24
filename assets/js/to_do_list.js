


function display_listmain() {
    let addpage = document.getElementById("listAdd_main_hidden");
    // addpage.switchClass(css2,css1);
    // $("#listAdd_main_hidden").switchClass("csnos2","css1",2);
    addpage.style.display = 'block';
}

function display_addpage() {
    let addpage = document.getElementById("listAdd_main_hidden");
    let table = document.getElementById("listAdd");    

    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let checkbox = document.createElement("input");

    checkbox.type = 'checkbox';
    checkbox.id = 'checkcheck';
    console.log(checkbox)
    
    let mustit = document.getElementById("mustit");
    let impotan = document.getElementById("impotan").value;

    let inmustit = mustit.value;

    td1.setAttribute("colspan","2");
    td1.innerHTML = inmustit;
    td2.innerHTML = impotan;
    td3.appendChild(checkbox);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    table.prepend(tr);    


    addpage.style.display = 'none';


    
}

// 달력 js



window.onload = function () { buildCalendar(); }    // 웹 페이지가 로드되면 buildCalendar 실행

let nowMonth = new Date();  // 현재 달을 페이지를 로드한 날의 달로 초기화
let today = new Date();     // 페이지를 로드한 날짜를 저장
today.setHours(0, 0, 0, 0);    // 비교 편의를 위해 today의 시간을 초기화
let nownow_day = document.getElementById("day");
let nownow_week = document.getElementById("weekend");
let nownow_yearM = document.getElementById("year_mounth");


// 달력 생성 : 해당 달에 맞춰 테이블을 만들고, 날짜를 채워 넣는다.
function buildCalendar() {


    var nowYear = nowMonth.getFullYear(); // 달력에서 표기하는 연
    var nowM = nowMonth.getMonth()+1; // 달력에서 표기하는 월
    var nowDate = nowMonth.getDate(); // 달력 표기 일
    var noeweek = nowMonth.getDay(); // 달력 표기 요일

    let realWeek = "";
    if (noeweek == 0){
        realWeek = "일요일"
    } else if (noeweek == 1){
        realWeek = "월요일"
    } else if (noeweek == 2){
        realWeek = "화요일"
    } else if (noeweek == 3){
        realWeek = "수요일"
    } else if (noeweek == 4){
        realWeek = "목요일"
    } else if (noeweek == 5){
        realWeek = "금요일"
    } else if (noeweek == 6){
        realWeek = "토요일"
    }

    console.log(nowYear, nowM, nowDate, realWeek);

    nownow_day.innerText = nowDate;
    nownow_week.innerText = realWeek;
    nownow_yearM.innerText = `${nowYear}년 ${nowM}월`;




    let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);     // 이번달 1일
    let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);  // 이번달 마지막날

    let tbody_Calendar = document.querySelector(".Calendar > tbody");
    document.getElementById("calYear").innerText = nowMonth.getFullYear();             // 연도 숫자 갱신
    document.getElementById("calMonth").innerText = leftPad(nowMonth.getMonth() + 1);  // 월 숫자 갱신

    while (tbody_Calendar.rows.length > 0) {                        // 이전 출력결과가 남아있는 경우 초기화
        tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
    }

    let nowRow = tbody_Calendar.insertRow();        // 첫번째 행 추가           

    for (let j = 0; j < firstDate.getDay(); j++) {  // 이번달 1일의 요일만큼
        let nowColumn = nowRow.insertCell();        // 열 추가
    }

    for (let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate() + 1)) {   
        // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복  

        let nowColumn = nowRow.insertCell();        // 새 열을 추가하고


        let newDIV = document.createElement("p");
        newDIV.innerHTML = leftPad(nowDay.getDate());        // 추가한 열에 날짜 입력
        nowColumn.appendChild(newDIV);

        if (nowDay.getDay() == 6) {                 // 토요일인 경우
            nowRow = tbody_Calendar.insertRow();    // 새로운 행 추가
            newDIV.id = "satDay";
        }

        if (nowDay.getDay() == 0) {                 // 일요일인 경우
            newDIV.id = "sunDay";
        }

        if (nowDay.getDay() == 1) {                 // 월요일인 경우
            newDIV.id = "monDay";
        }

        if (nowDay.getDay() == 2) {                 // 화요일인 경우
            newDIV.id = "tueDay";
        }

        if (nowDay.getDay() == 3) {                 // 수요일인 경우
            newDIV.id = "wedDay";
        }

        if (nowDay.getDay() == 4) {                 // 목요일인 경우
            newDIV.id = "thuDay";
        }

        if (nowDay.getDay() == 5) {                 // 금요일인 경우
            newDIV.id = "friDay";
        }

        if (nowDay < today) {                       // 지난날인 경우
            newDIV.className = "futureDay";
            newDIV.onclick = function () { choiceDate(this); }
        }
        else if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) { // 오늘인 경우           
            newDIV.className = "today";
            newDIV.onclick = function () { choiceDate(this); }
        }
        else {                                      // 미래인 경우
            newDIV.className = "futureDay";
            newDIV.onclick = function () { choiceDate(this); }
        }
    }

    let selectedDate = 0;
    let dayString = "";

    let cells = document.querySelectorAll(".Calendar td p");
    cells.forEach(cell => {
        cell.addEventListener("click", function () {
            selectedDate = this.innerHTML; // 선택된 날짜 정보 가져오기
            let dayOfWeek = this.parentNode.cellIndex; // 요일 정보 가져오기
            let weekdays = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
            dayString = weekdays[dayOfWeek]; // 요일을 실제 요일 문자열로 변환

            console.log("선택한 날짜:", selectedDate);
            console.log("요일:", dayString);
            nownow_day.innerText = selectedDate;
            nownow_week.innerText = dayString;


        });
    }); // 어떻게 이게 가능한지 알아보기


    

    
}

// 날짜 선택
function choiceDate(newDIV) {
    if (document.getElementsByClassName("choiceDay")[0]) {                              // 기존에 선택한 날짜가 있으면
        document.getElementsByClassName("choiceDay")[0].classList.remove("choiceDay");  // 해당 날짜의 "choiceDay" class 제거
    }
    newDIV.classList.add("choiceDay");// 선택된 날짜에 "choiceDay" class 추가

    // console.log(document.getElementsByClassName("choiceDay"));

}

// function dateDay() {
//     // let choi = document.getElementsByClassName("choiceDay");
//     // // let date = choi.innerText;
//     // // nownow_day.innerText = date;
//     // console.log(choi.innerText);
// }



// 이전달 버튼 클릭
function prevCalendar() {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate());   // 현재 달을 1 감소
    buildCalendar();    // 달력 다시 생성
}
// 다음달 버튼 클릭
function nextCalendar() {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate());   // 현재 달을 1 증가
    buildCalendar();    // 달력 다시 생성
}

// input값이 한자리 숫자인 경우 앞에 '0' 붙혀주는 함수
function leftPad(value) {
    if (value < 10) {
        value = "0" + value;
        return value;
    }
    return value;
}

// console.lod(choiceDate(this));

// let choice = document.getElementsByClassName("choiceDay");


// nownow_day.innerText = choice;
// nownow_week.innerText = realWeek;
// nownow_yearM.innerText = `${nowYear}년 ${nowM}월`;