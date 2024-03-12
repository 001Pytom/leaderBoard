"use strict";
// create div/element
const leaderboard = document.createElement("div");
leaderboard.classList.add("leaderboard");
const errorText = document.createElement("p");
const noInput = "";
const personLb = document.createElement("div");
const inputContainer = document.querySelector(".input_container");
const inputFN = document.getElementById("firstname_input");
const inputLN = document.getElementById("lastname_input");
const countryInput = document.getElementById("country_input");
const inputScore = document.getElementById("Input_score");
const btn = document.querySelector(".btn");

inputFN.focus();
// function to get date
function getCurrentDateTime() {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const currentDate = new Date();
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");

  return `${month} ${day}, ${year} ${hours}:${minutes}`;
}

// save entreis to local storage
function setLocalStorage() {
  let existingData = JSON.parse(localStorage.getItem("personData")) || [];
  const newData = {
    firstName: inputFN.value,
    lastName: inputLN.value,
    country: countryInput.value,
    score: inputScore.value,
  };
  existingData.push(newData);
  localStorage.setItem("personData", JSON.stringify(existingData));
}

// function error message
let errorMessage = () => {
  // Check if the error message already exists
  if (!document.querySelector(".error-text")) {
    const errorText = document.createElement("p");
    errorText.textContent = "All Fields Are Required";
    errorText.classList.add("error-text");
    errorText.style.color = "red";
    errorText.style.fontWeight = "bold";
    inputContainer.insertAdjacentElement("afterend", errorText);
  }
};

// btn event lstener
btn.addEventListener("click", () => {
  const inputFNValue = inputFN.value.trim();
  const inputLNValue = inputLN.value.trim();
  const countryInputValue = countryInput.value.trim();
  const inputScoreValue = inputScore.value.trim();
  if (
    !inputFNValue ||
    !inputLNValue ||
    !countryInputValue ||
    !inputScoreValue
  ) {
    errorMessage();
  } else {
    const existingError = document.querySelector(".error-text");
    if (existingError) {
      existingError.remove();
    }

    // remaining functions
    const currentDateTime = getCurrentDateTime();
    const personLb = document.createElement("div");
    personLb.innerHTML = ` <div class="personal_details">
      <h4 class="name">${inputFNValue} ${inputLNValue}</h4>
      <p class="date">${currentDateTime}</p>
      </div>
      <div class="countyr">${countryInputValue}</div>
      <div class="score"> ${inputScoreValue}</div>
      <div class="fxn">
      <div class="delete">❌</div>
      <div class="increase">+5</div>
      <div class="decrease">-5</div>
      </div>`;
    personLb.classList.add("personLB");
    leaderboard.appendChild(personLb);
    let inputDel = personLb.querySelector(".delete");
    let addInput = personLb.querySelector(".increase");
    let subInput = personLb.querySelector(".decrease");
    let newinputScore = personLb.querySelector(".score");

    inputDel.addEventListener("click", () => {
      personLb.style.display = "none";
    });
    addInput.addEventListener("click", () => {
      let scoreVal = Number(newinputScore.textContent);
      scoreVal += 5;
      newinputScore.textContent = scoreVal;
    });

    subInput.addEventListener("click", () => {
      let scoreVal = Number(newinputScore.textContent);
      scoreVal -= 5;
      newinputScore.textContent = scoreVal;
    });

    setLocalStorage();
    // Clear input fields after submission
    inputFN.value = "";
    inputLN.value = "";
    countryInput.value = "";
    inputScore.value = "";
  }
});
// btn event lstener

//
// get data from local storage
function getLocalStorage() {
  const existingData = JSON.parse(localStorage.getItem("personData"));
  if (!existingData) {
    return;
  }
  existingData.forEach((item) => {
    const currentDateTime = getCurrentDateTime();
    const personLb = document.createElement("div");
    personLb.innerHTML = ` <div class="personal_details">
      <h4 class="name">${item.firstName} ${item.lastName}</h4>
      <p class="date">${currentDateTime}</p>
      </div>
      <div class="countyr">${item.country}</div>
      <div class="score"> ${item.score}</div>
      <div class="fxn">
      <div class="delete">❌</div>
      <div class="increase">+5</div>
      <div class="decrease">-5</div>
      </div>`;
    personLb.classList.add("personLB");
    leaderboard.appendChild(personLb);
    let inputDel = personLb.querySelector(".delete");
    let addInput = personLb.querySelector(".increase");
    let subInput = personLb.querySelector(".decrease");
    let newinputScore = personLb.querySelector(".score");

    inputDel.addEventListener("click", () => {
      personLb.style.display = "none";
      // Remove the corresponding data from local storage
      const index = existingData.findIndex(
        (data) =>
          data.firstName === item.firstName &&
          data.lastName === item.lastName &&
          data.country === item.country &&
          data.score === item.score
      );
      if (index !== -1) {
        existingData.splice(index, 1);
        localStorage.setItem("personData", JSON.stringify(existingData));
      }
    });
    addInput.addEventListener("click", () => {
      let scoreVal = Number(newinputScore.textContent);
      scoreVal += 5;
      newinputScore.textContent = scoreVal;
    });

    subInput.addEventListener("click", () => {
      let scoreVal = Number(newinputScore.textContent);
      scoreVal -= 5;
      newinputScore.textContent = scoreVal;
    });
  });
}
getLocalStorage();
inputContainer.insertAdjacentElement("afterend", leaderboard);
