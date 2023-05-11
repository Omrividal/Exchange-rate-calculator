const currencyEl_one = document.getElementById("currency-1");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-2");
const amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swapBtn = document.getElementById("swap");

// Fetch exchange rate and update the dom
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/6cb36da584b60a428756d8d3/latest/${currency_one}`
  )
    .then((res) => res.json())
    .then((data) => {
      const rate = data.conversion_rates[currency_two];
      // console.log(rate);

      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

// Event listeners
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

swapBtn.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();
