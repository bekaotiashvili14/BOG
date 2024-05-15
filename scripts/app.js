const body = document.querySelector("body");
sidebar = body.querySelector(".sidebar");
toggle = body.querySelector(".toggle");
searchBtn = body.querySelector(".search-box");
modeSwitch = body.querySelector(".toggle-switch");
modeText = body.querySelector(".mode-text");

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    modeText.innerText = "თეთრი ფონი";
  } else {
    modeText.innerText = "შავი ფონი";
  }
});

//  all course
let _apiUrl = "https://bankofgeorgia.ge/api/currencies/history";
fetch(_apiUrl, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    sessionStorage.setItem("data", JSON.stringify(data));
    let container = document.getElementById("container_for_all_course");
    data.data.slice(0, 11).forEach((valute) => {
      let georgianCcy = "GEL";
      let difference = (valute.previousRate * valute.currentRate) / 100;
      let differencenumber = parseFloat(difference).toFixed(4);
      let Color = "";
      if (valute.difference > 0) {
        Color = "Fullred";
      } else if (valute.difference < 0) {
        Color = "Fullgreen";
      } else Color = "Fullblack";

      let countryHTML = `
<hr>
<div class="box_js">
 
  <div class="dictionaryValue">${valute.dictionaryValue}</div>
  <div class="dictionaryValue">${valute.ccy}</div>
  <div class="buyRate dictionaryValue">
    <span> ${valute.buyRate} </span>
    <span>${georgianCcy} / ${valute.ccy} </span>
  </div>
  <div class="sellRate dictionaryValue">
    <span> ${valute.sellRate} </span>
    <span>${valute.ccy} /${georgianCcy} </span>
  </div>
  <div class="difference dictionaryValue">
    <span class="${Color}"> ${differencenumber}% </span>
    <span>${georgianCcy} / ${valute.ccy}</span>
  </div>
</div>
      `;
      container.innerHTML += countryHTML;
    });
  });

let _curses = "https://bankofgeorgia.ge/api/currencies/history/";
fetch(_curses, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    let container = document.getElementsByClassName("valute_box");

    for (let i = 0; i < 3; i++) {
      console.log(data.data[i].difference);
      let Color = "";
      if (data.data[i].difference > 0) {
        Color = "red";
      } else if (data.data[i].difference < 0) {
        Color = "green";
      } else Color = "black";

      let HTML = `
    <div class = "container_js">
          <div class="name_JS">
            <div class="${Color}">${data.data[i].symbol}</div>
            <div class="logo_name">${data.data[i].dictionaryValue}</div>
          </div>

          <div class="course_JS">
            <span>ოფიც.კურსი</span>
            <span>ბანკის კურსი</span>
          </div>
          <div class="course_number_JS">
           <div class="box1">
            <div class="number"><h2>${data.data[i].currentRate}</h2></div>
            </div>
            <div class="box">
              <div class="boxText">ყიდვა</div>
              <div class="number"><h2>${data.data[i].buyRate}</h2></div>
            </div>

            <div class="box">
              <div class="boxText">გაყიდვა</div>
              <div class="number"><h2>${data.data[i].sellRate}</h2></div>
            </div>
          </div>
       </div>
      `;

      container[0].innerHTML += HTML;
    }
  });

let _apiCount =
  "https://bankofgeorgia.ge/api/currencies/convert/GEL/USD?amountFrom=100";

fetch(_apiCount, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {});

let FindData = JSON.parse(sessionStorage.getItem("data"));
let input = document.getElementById("optionValue");
let input1 = document.getElementById("optionValue1");
FindData.data.forEach((element) => {
  let valute = element.ccy;
  HTML = `
  <option id="optionValue" value="${valute}">${valute}</option>
  `;
  input.innerHTML += HTML;
  input1.innerHTML += HTML;
});

function button() {
  let inputValueFirst = document.getElementById("inputValueFirst").value;
  let optionValue = document.getElementById("optionValue").value;
  let optionValue1 = document.getElementById("optionValue1").value;

  let _apiCount = `https://bankofgeorgia.ge/api/currencies/convert/${optionValue}/${optionValue1}?amountFrom=${inputValueFirst}`;

  let amountContainer = document.getElementById("convert_count");
  amountContainer.innerHTML = "";

  fetch(_apiCount, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      HTML = `
    
        <h5>თანხა ${data.data.amount}</h5>
      `;
      amountContainer.innerHTML += HTML;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function log_in() {
  let log_in_container = document.getElementById("log_in_container");
  log_in_container.style.display = "inline";
}
