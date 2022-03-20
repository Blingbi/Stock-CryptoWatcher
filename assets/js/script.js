ar stockContainer = document.getElementById('stockData');
var cryptoContainer =  document.getElementById('cryptoData')
var fetchButton = document.getElementById('fetch-button');
var today = new Date();
var yesterday = new Date(today);
yesterday.setDate(yesterday.getDate()-1)
var dd = String(yesterday.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;
document.write(today);
const stockStorage= [];
const cryptoStorage = [];
const cryptoChartData = [];


      //Get stored stocks and reinitialize them
      $(document).ready(function () {
        if (JSON.parse(localStorage.getItem("storedStocks")) != null) {
          var stocksNames = JSON.parse(localStorage.getItem("storedStocks"));
        for(var i = 0; i < stocksNames.length;i++){
          var savedStockName = stocksNames[i];
        if(savedStockName != null)
        {
          var requestUrl = 'https://api.polygon.io/v2/aggs/ticker/'+savedStockName.toUpperCase()+'/prev?adjusted=true&apiKey=x9aOGMvupupwhHuYUerXqh9LBf1gm1HN';
        console.log(requestUrl)
          fetch(requestUrl)
          .then(function (response) {
            return response.json();
          })
            .then(function (data) {
              console.log(data);
                
                
                var stockName = document.createElement('h3');
                var stockOpen = document.createElement('p');
                var stockClose = document.createElement('p')

              //Setting the text of the h3 element and p element.
              if(data.results[0].T != null){
                stockName.textContent = data.results[0].T;
                stockOpen.textContent = "Open: "+data.results[0].o;
                stockClose.textContent = "Close: "+data.results[0].c

              //Appending the dynamically generated html to the div associated with the id="users"
              //Append will attach the element as the bottom most child.
              stockContainer.append(stockName);
              stockContainer.append(stockOpen);
              stockContainer.append(stockClose);
              }
            })
            }
            }
          }
          })

          //Get stored cryptos and reinitialize them
          $(document).ready(function () {
            if (localStorage.getItem("storedCrypto") != null) {
            var savedCrypto = JSON.parse(localStorage.getItem("storedCrypto"));
            for(var i = 0; i < savedCrypto.length;i++){
            var cryptoNames = savedCrypto[i];
            if(cryptoNames != null)
            {
              var requestUrl = 'https://rest.coinapi.io/v1/exchangerate/'+cryptoNames.toUpperCase()+'/USD/?apiKey=C4D62BF3-1B0B-45D4-9A3F-48DC7D801132';
              fetch(requestUrl)
              .then(function (response) {
                return response.json();
              })
                .then(function (data) {
  
                  var cryptoName = document.createElement('h3');
                  var cryptoValue = document.createElement('p');
    
                  //Setting the text of the h3 element and p element.
                  if(data.asset_id_base != null){
                cryptoName.textContent = data.asset_id_base;
                cryptoValue.textContent = "Current Value: "+data.rate;
                  
                  //Appending the dynamically generated html to the div associated with the id="users"
                  //Append will attach the element as the bottom most child.
                cryptoContainer.append(cryptoName);
                cryptoContainer.append(cryptoValue);
                  }
                })
                }
                }
               }
              })
              //Search and save stock function
    $(document).ready(function () {
      $(".stockBtn").on("click", function () {
       
     
            // Get nearby values of the description in JQuery
          var stockName = $(this).siblings(".description").val();
          var requestUrl = 'https://api.polygon.io/v2/aggs/ticker/'+stockName.toUpperCase()+'/prev?adjusted=true&apiKey=x9aOGMvupupwhHuYUerXqh9LBf1gm1HN';
          var stocksNames = JSON.parse(localStorage.getItem("storedStocks"))
         
         
          stockStorage.push(stockName.toUpperCase())
          localStorage.setItem("storedStocks", JSON.stringify(stockStorage))
        
          fetch(requestUrl)
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              //Using console.log to examine the data
              console.log(data);

                var stockName = document.createElement('h3');
                var stockOpen = document.createElement('p');
                var stockClose = document.createElement('p')

              //Setting the text of the h3 element and p element.
              stockName.textContent = data.results[0].T;
              stockOpen.textContent = "Open: "+data.results[0].o;
              stockClose.textContent = "Close: "+data.results[0].c

              //Appending the dynamically generated html to the div associated with the id="users"
              //Append will attach the element as the bottom most child.
              stockContainer.append(stockName);
              stockContainer.append(stockOpen);
              stockContainer.append(stockClose);
              })
            
            })
    
      })
      //Search and Save crypto Function
      $(document).ready(function () {
        $(".cryptoBtn").on("click", function () {
          
              // Get nearby values 
          var cryptoName = $(this).siblings(".description").val();
          var requestUrl = 'https://rest.coinapi.io/v1/exchangerate/'+cryptoName.toUpperCase()+'/USD/?apiKey=C4D62BF3-1B0B-45D4-9A3F-48DC7D801132';
          localStorage.setItem("storedCrypto", JSON.stringify(''))
          var cryptoNames = JSON.parse(localStorage.getItem("storedCrypto"))
          for(var i = 0;i<=cryptoNames.length;i++){
          cryptoStorage.push(cryptoNames[i])
          }
          cryptoStorage.push(cryptoName.toUpperCase())
          localStorage.setItem("storedCrypto", JSON.stringify(cryptoStorage))
            fetch(requestUrl)
              .then(function (response) {
                return response.json();
              })
              .then(function (data) {
                //Using console.log to examine the data
                console.log(data);
                
                  var cryptoName = document.createElement('h3');
                  var cryptoValue = document.createElement('p');
  
                //Setting the text of the h3 element and p element.
                cryptoName.textContent = data.asset_id_base;
                cryptoValue.textContent = "Current Value: "+data.rate;
               
                //Appending the dynamically generated html to the div associated with the id="users"
                //Append will attach the element as the bottom most child.
                cryptoContainer.append(cryptoName);
                cryptoContainer.append(cryptoValue);
                })
              })
        })
         //Search and Save crypto Function
         $(document).ready(function () {
          $(".cryptoBtn").on("click", function () {
            var oneMonth = new Date();
            var yesterday = new Date(oneMonth);
            var dd = String(oneMonth.getDate()-1).padStart(2, '0');
            var mm = String(oneMonth.getMonth()).padStart(2, '0')
            var yyyy = oneMonth.getFullYear();
            oneMonth = yyyy + '-' + mm + '-' + dd;
            console.log(oneMonth)
            var cryptoName = $(this).siblings(".description").val();
            
            var requestUrl = 'https://rest.coinapi.io/v1/exchangerate/'+cryptoName.toUpperCase()+'/USD/history?period_id=1DAY&time_start='+oneMonth+'T00:00:00&time_end='+today+'T00:00:00&apiKey=C4D62BF3-1B0B-45D4-9A3F-48DC7D801132'
              fetch(requestUrl)
                .then(function (response) {
                  return response.json();
                })
                .then(function (data) {
                  for(var i = 0;i<data.length;i++)
                  cryptoChartData.push(data[i].rate_high)
                  console.log(cryptoChartData);
            
                  })
                })
          })
          $(".clearBtn").on("click", function () {
            localStorage.clear()
          })