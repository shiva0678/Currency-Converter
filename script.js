const BASE_URL = "https://open.er-api.com/v6/latest/";

let selectors = document.querySelectorAll(".selector select")
let button = document.querySelector("button");
let fromCountry = document.querySelector(".from select ");
let toCountry = document.querySelector(".to select");
let msg = document.querySelector(".msg h3")
let exchange = document.querySelector("#exchange-icon")



for(let select of selectors){
    for(currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
        
        if(select.name==="from"&&currcode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && currcode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);

    })
    
}
const updateFlag = (element) => {
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let img_url = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let image = element.parentElement.querySelector("img");

    image.src = img_url;


}
button.addEventListener("click",(evt)=>{
    evt.preventDefault();
    displayRate();
})
const displayRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval==="" || amtval<1){
        amtval = 1;
        amount.value=1;
    }
    const from = fromCountry.value;
    const to = toCountry.value;
    const url = `${BASE_URL}${from}`;
    let response = await fetch(url);
    let data = await response.json();
    const rate = data.rates[to];
    newValue = amtval*rate;
    

    msg.innerText=`${amtval} ${fromCountry.value} = ${newValue} ${toCountry.value}`;
}
exchange.addEventListener("click",()=>{
    const temp = fromCountry.value;
    fromCountry.value = toCountry.value;
    toCountry.value = temp;
    updateFlag(fromCountry);
    updateFlag(toCountry);
    displayRate();
})

