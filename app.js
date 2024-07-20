const mainUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".update");

for (let select of dropdowns){
    for(curr in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = curr ;
        newOption.value = curr ;
        if (select.name === "from" && curr === "USD"){
            newOption.selected = "selected";
        }else if (select.name === "to" && curr === "NPR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target); 
    });
};

const updateFlag = (element) => {
    let curr = element.value ;
    let countryCode = countryList[curr];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal<1){
        amtVal = 1;
        amount.value = 1;
    }
    const url = `${mainUrl}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data [fromCurr.value.toLowerCase()] [toCurr.value.toLowerCase()];

    let finalAmt = rate * amtVal;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});