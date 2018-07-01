let currency = {};
function convertCurrency( fromAmount, toAmount, db_cur) {

  fromCurrency = encodeURIComponent(fromAmount);
  toCurrency = encodeURIComponent(toAmount);
  let query = `${fromAmount}_${toAmounty}`;

  let url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=y`;

  let myQuery =`${fromAmount} to ${toAmount}`;

      let data = {};

      $.ajax({
        url  : url,
        type : 'get',
        data : data,
        success : (res) =>{



          currency[myQuery] = res[query].val;

          db_cur.insert(currency);
          db_cur.save();

           //currency conversion when user is offline

          let enlist = new Set();

          let list = document.querySelector('#OfflineList');
          $('.added').empty();

          let findcurrencies = db.collection('converted').find();


            for(let i=0; i<=findcurrencies.length;i++){

            for(let x in findcurrencies[i]){
              if(x != 'CURRENCY'){

               enlist.add(x);

              }

            }

        }
        let sNum = 1;
        let interval = setInterval(myTimer,100);
        const genIterator = getcurrencies();

          function* getcurrencies(){
            for(let g of enlist){

              let tr = document.createElement('tr');
              tr.setAttribute('class','added');

              let tdN = document.createElement('td');
              let txtN = document.createTextNode(sNum);
              tdN.appendChild(txtN);
              tr.appendChild(tdN);

              let tdV = document.createElement('td');
              let txtV = document.createTextNode(g);
              tdV.appendChild(txtV);
              tr.appendChild(tdV);

              list.appendChild(tr);


              sNum++;

                 yield;

          }

        }

        function myTimer(){

          genIterator.next();

        }


          let val = res[query].val;
          let total = val * amount;

          if(total != null || total != undefined || total != 0){
            $("#overlay").hide();
            let totRound = Math.round(total * 100) / 100;
            if(totRound == 0){
              cb(null, total.toFixed(4));
            }else{
              cb(null,totRound);

            }


          }


        },
        error : (err) =>{


          let findcurrencies = db.collection('converted').find();

          if(findcurrencies.length < 1 ){
            $("#CURR_valDIV").text('Unable to convert please check Network connection');

          }else{

            let enlist = new Set();

            let list = document.querySelector('#OfflineList');
            $('.added').empty();

            let findcurrencies = db.collection('converted').find();


              for(let i=0; i<=findcurrencies.length;i++){

              for(let x in findcurrencies[i]){
                if(x != 'CURRENCY'){

                 enlist.add(x);

                }

              }

          }
          let sNum = 1;
          let interval = setInterval(myTimer,100);
          const genIterator = getcurrencies();

            function* getcurrencies(){
              for(let g of enlist){

                let tr = document.createElement('tr');
                tr.setAttribute('class','added');

                let tdN = document.createElement('td');
                let txtN = document.createTextNode(sNum);
                tdN.appendChild(txtN);
                tr.appendChild(tdN);

                let tdV = document.createElement('td');
                let txtV = document.createTextNode(g);
                tdV.appendChild(txtV);
                tr.appendChild(tdV);

                list.appendChild(tr);


                sNum++;

                   yield;
            }

          }

          function myTimer(){

            genIterator.next();

          }



          let result;
          for(let r = 0;r<=findcurrencies.length;r++){
            for(let f in findcurrencies[r]){
              if(f == myQuery){
                result = findcurrencies[r][myQuery] * amount;
              }
            }
          }

          if(isNaN(result)){
            $("#CURR_valDIV").text(`Not Available Offline`);
          }else{
            $("#overlay").hide();
            $("#CURR_valDIV").text(`${result}`);
          }



          }

        }

      });

}


//currency button
 $("#getAmount").on('click',()=>{


   $("#overlay").show();
   $("#CURR_valDIV").text('');

  //input values
   let initVal = document.querySelector("#init_Val").value;
   let curFrom = document.querySelector('#CURR_FR');
   let fromValue = curFrom.options[curFrom.selectedIndex].value;

   let curTo = document.querySelector('#CURR_TO');
   let toValue = curTo.options[curTo.selectedIndex].value;

   convertCurrency(initVal, fromValue, toValue, (err, amount) => {

     $("#CURR_valDIV").text(`${amount}`);
   });

 });