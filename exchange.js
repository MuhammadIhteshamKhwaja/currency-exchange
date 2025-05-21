const baseURL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";
const dropdowns = document.querySelectorAll(".drop-down select");
const toAmount = document.querySelector(".to-amount input");
const fromAmount = document.querySelector(".from-amount input");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const refresh = document.querySelector(".refresh");

for (let select of dropdowns) {
  for (let code in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = code;
    newOption.value = code;
    if (select.name === "From" && code === "USD") {
      newOption.selected = true;
    } else if (select.name === "To" && code === "PKR") {
      newOption.selected = true;
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode].toLowerCase();
  let newSrc = `https://hatscripts.github.io/circle-flags/flags/${countryCode}.svg`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};
console.log(from.value);
const getExchangeRate = async (from, to) => {
  const fromCurr = fromCurrency.value.toLowerCase();
  const toCurr = toCurrency.value.toLowerCase();

  const URL = `${baseURL}${fromCurr}.json`;

  let response = await fetch(URL);
  let data = await response.json();

  return data[fromCurr][toCurr];
};

const convertFromTo = async () => {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amount = parseFloat(fromAmount.value || 0);
  const rate = await getExchangeRate(from, to);
  toAmount.value = (amount * rate).toFixed(2);
};

const convertToFrom = async () => {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amount = parseFloat(toAmount.value || 0);
  const rate = await getExchangeRate(from, to);
  fromAmount.value = (amount / rate).toFixed(2);
};

fromCurrency.addEventListener("change", convertToFrom);
toCurrency.addEventListener("change", convertFromTo);
fromAmount.addEventListener("input", convertFromTo);
toAmount.addEventListener("input", convertToFrom);
refresh.addEventListener("click", () => {
  convertFromTo();
  convertToFrom();
});

window.addEventListener("DOMContentLoaded", convertFromTo);
