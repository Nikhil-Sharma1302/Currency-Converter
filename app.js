let BASE_URL = "https://api.currencyapi.com/v3/latest?apikey=cur_live_tMFQcySSlZ30vq1zpxl1tvEtAHBxei3KGensE3JO&currencies="
// https://api.currencyapi.com/v3/latest?apikey=cur_live_tMFQcySSlZ30vq1zpxl1tvEtAHBxei3KGensE3JO&currencies=EUR%2CUSD%2CCAD&base_currency=AFN
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let currencyvalue = toCurr.value;
let btn = document.querySelector("#btn");
let message = document.querySelector(".msg")

const dropDowns = document.querySelectorAll(".dropdown select");
for(let select of dropDowns) {
    for(currCode in countryList) {
      let newOption = document.createElement("option")
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if(select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
       select.appendChild(newOption);
    }
    select.addEventListener("change",(evt) => {
        updateFlag(evt.target)
        
    })
};
let updateFlag = (element) =>{
    let currCode = element.value;
     let countryCode = countryList[currCode];
     let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
     let img = element.parentElement.querySelector("img");
     img.src = newSrc;
     
};
 btn.addEventListener("click",async function (evt) {
         evt.preventDefault();
         let amount = document.querySelector(".amount input");
         let amtValue = amount.value;
         if (amtValue === "" || amtValue<0 ){
    amount.value= 1;
         }
         let URL = `${BASE_URL}${toCurr.value}&base_currency=${fromCurr.value}`;
         console.log(URL);
         let response = await fetch(URL); 
         let sitedata =await response.json();
         console.dir(sitedata);
         let rate = sitedata.data[toCurr.value].value;
         let finalAmount = amtValue * rate;
         message.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;


     });
