
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

//현재 날짜 가지고 오기

// const dt = new Date();

// console.log(dt)

// let nowYear = dt.getFullYear();

// console.log(nowYear)

// let nowMounth = dt.getMonth()+1;

// console.log(nowMounth)

// let nowDay = dt.getDay();

// console.log(nowDay)

// let firstday = dt.setDate(1)

let dt = new Date(); // 현재 날짜(로컬 기준) 가져오기
let ut = dt.getTime() + (dt.getTimezoneOffset() * 60 * 1000); // uct 표준시 도출
let kst = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
let tod = new Date(ut + kst);

console.log(tod);
var thisM = new Date(tod.getFullYear(), tod.getMonth(), tod.getDate());

var nowYear = thisM.getFullYear(); // 달력에서 표기하는 연
var nowMonth = thisM.getMonth()+1; // 달력에서 표기하는 월
var nowDate = thisM.getDate(); // 달력
var noeweek = thisM.getDay();

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

console.log(nowYear, nowMonth, nowDate, realWeek);

let nownow_day = document.getElementById("day");
let nownow_week = document.getElementById("weekend");
let nownow_yearM = document.getElementById("year_mounth");

nownow_day.innerText = nowDate;
nownow_week.innerText = realWeek;
nownow_yearM.innerText = `${nowYear}년 ${nowMonth}월`;

console.log(nownow_day, nownow_week, nownow_yearM)




$(document).ready(function() {
    calendarInit();
});
/*
    달력 렌더링 할 때 필요한 정보 목록 

    현재 월(초기값 : 현재 시간)
    금월 마지막일 날짜와 요일
    전월 마지막일 날짜와 요일
*/

function calendarInit() {

    // 날짜 정보 가져오기
    var date = new Date(); // 현재 날짜(로컬 기준) 가져오기
    var utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000); // uct 표준시 도출
    var kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
    var today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)
  
    var thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    // 달력에서 표기하는 날짜 객체
  
    
    var currentYear = thisMonth.getFullYear(); // 달력에서 표기하는 연
    var currentMonth = thisMonth.getMonth(); // 달력에서 표기하는 월
    var currentDate = thisMonth.getDate(); // 달력에서 표기하는 일

    // kst 기준 현재시간
    // console.log(thisMonth);

    // 캘린더 렌더링
    renderCalender(thisMonth);

    function renderCalender(thisMonth) {

        // 렌더링을 위한 데이터 정리
        currentYear = thisMonth.getFullYear();
        currentMonth = thisMonth.getMonth();
        currentDate = thisMonth.getDate();

        // 이전 달의 마지막 날 날짜와 요일 구하기
        var startDay = new Date(currentYear, currentMonth, 0);
        var prevDate = startDay.getDate();
        var prevDay = startDay.getDay();

        // 이번 달의 마지막날 날짜와 요일 구하기
        var endDay = new Date(currentYear, currentMonth + 1, 0);
        var nextDate = endDay.getDate();
        var nextDay = endDay.getDay();

        // console.log(prevDate, prevDay, nextDate, nextDay);

        // 현재 월 표기
        $('.year-month').text(currentYear + '.' + (currentMonth + 1));

        // 렌더링 html 요소 생성
        calendar = document.querySelector('.dates')
        calendar.innerHTML = '';
        
        // 지난달
        for (var i = prevDate - prevDay + 1; i <= prevDate; i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day prev disable">' + i + '</div>'
        }
        // 이번달
        for (var i = 1; i <= nextDate; i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day current">' + i + '</div>'
        }
        // 다음달
        for (var i = 1; i <= (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day next disable">' + i + '</div>'
        }

        // 오늘 날짜 표기
        if (today.getMonth() == currentMonth) {
            todayDate = today.getDate();
            var currentMonthDate = document.querySelectorAll('.dates .current');
            currentMonthDate[todayDate -1].classList.add('today');
        }
    }

    // 이전달로 이동
    $('.go-prev').on('click', function() {
        thisMonth = new Date(currentYear, currentMonth - 1, 1);
        renderCalender(thisMonth);
    });

    // 다음달로 이동
    $('.go-next').on('click', function() {
        thisMonth = new Date(currentYear, currentMonth + 1, 1);
        renderCalender(thisMonth); 
    });
}