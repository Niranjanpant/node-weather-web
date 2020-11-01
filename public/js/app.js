

const weatherform = document.querySelector('form');
const search = document.querySelector("input");
const infoOne = document.querySelector("#message-1");
const infoTwo = document.querySelector("#message-2");



  weatherform.addEventListener("submit",(e) => {
    e.preventDefault();
  
    const location = search.value;
    infoOne.textContent = "loading";
infoTwo.textContent="";

    fetch('/weather?address=' + location)
    .then((response) => {
     response.json().then((data) => {
       if(data.error) {
         infoOne.textContent=data.error;
       }else {
         const parsed = JSON.stringify(data.forecast);
         infoOne.textContent=parsed;
         infoTwo.textContent=data.address;
         console.log(data.address);
         console.log(data.forecast);
       }
     })
    })

})
