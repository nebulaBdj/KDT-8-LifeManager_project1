
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

let nowYear = new Date(data).getFullYear();
let nowMounth = new Date(data).getMonth() + 1;
let firstDay = new Date(date.setDate(1)).getDay();
let lastDay = new Date(nowYear, nowMounth, 0).getDate();

console.log(nowYear,nowMounth,firstDay,lastDay);
