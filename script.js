document.getElementById("amountSubmit").addEventListener("click", function(event) {
    event.preventDefault();

    const APIKEY = "1fcf51b0668bd29e6f35bcb0";

    const base = document.getElementById("base").value;
    const target = document.getElementById("target").value;
    const amount = parseFloat(document.getElementById("amountInput").value);

    if (base === "" || target === "" || isNaN(amount)){
        return;
    }

    const url = "https://prime.exchangerate-api.com/v5/" + APIKEY + "/latest/" + base;
    fetch(url)
        .then(function(response) {
          return response.json();
        }).then(function(json) {
            console.log(json);
          updateResult(json, base, target, amount);
        });  
});

function updateResult(json, base, target, amount){
    let rate = parseFloat(json.conversion_rates[target]);
    let total = rate * amount;
    
    let result = base + " " + amount + " = " + target + " " + total;
    document.getElementById("result").innerHTML = result;
    
    const currentCurrency = document.getElementById("base").value;
    let curiousMessage = "How much is One " + currentCurrency + " worth around the Globe?"
    document.getElementById("curiosity").innerHTML = curiousMessage;

    let currencyTable = "";
    let count = 0;
    
    for(const currency in json.conversion_rates){
        if(currency === base){
            continue;
        }

        if(count % 10 == 0){
            if(count != 0){
                currencyTable += "</table>";
            }
            currencyTable += "<table class=\"everyCurrency\">";
        }

        currencyTable += "<tr><td>" + currency + "</td><td id=\"value\">" + json.conversion_rates[currency] + "</td></tr>";
        count++;
    }

    currencyTable += "</table>";
    document.getElementById("allCurrencies").innerHTML = currencyTable;
}