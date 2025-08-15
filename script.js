
const select = document.querySelectorAll("select");
const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const changeBtn = document.getElementById("change-btn");
const result = document.getElementById("result");



for(let i=0;i<select.length;i++){
    for(code in countryList){
        const option=document.createElement("option");
        option.value=code;
        option.textContent = `${code} — ${currencyList[code]}`;
        select[i].appendChild(option);
        if(i===0 && code==="INR"){
            option.selected = true;
        }
        else if(i===1 && code==="USD"){
            option.selected = true;
        }
    }
    select[i].addEventListener("change",(event)=>{
        updateFlag(event.target);
    })
}



const updateFlag = (Element) => {
    const currcode = Element.value;
    const countrycode=countryList[currcode];
    const imgsrc=`https://flagsapi.com/${countrycode}/shiny/64.png`;
    let flag=Element.parentElement.querySelector("img");
    flag.src=imgsrc;
}

changeBtn.addEventListener("click",async ()=>{
    result.textContent = "Converting...";
    let from = fromSelect.value;
    from=from.toLowerCase();
    let to = toSelect.value;
    to=to.toLowerCase();
    const amount= document.getElementById("amount").value;
    if(!amount || isNaN(amount) || amount <= 0){
        document.getElementById("amount").textContent = "1";
        result.textContent = "Please enter a valid amount.";
        return;
    }
    let response = await fetch(`https://latest.currency-api.pages.dev/v1/currencies/${from}.json`);
    let data= await response.json();
    let rate=data[from][to];
    console.log(rate*amount);
    result.textContent = `${rate*amount}`;

});



document.getElementById("swap-btn").addEventListener("click",()=>{
    const from = fromSelect.value;
    const to = toSelect.value;
    fromSelect.value = to;
    toSelect.value = from;
    updateFlag(fromSelect);
    updateFlag(toSelect);
});

document.getElementById("clear-btn").addEventListener("click",()=>{
    document.getElementById("amount").value = "";
    result.textContent = "";
    fromSelect.value = "INR";
    toSelect.value = "USD";
    updateFlag(fromSelect);
    updateFlag(toSelect);
});