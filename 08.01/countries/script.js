 const input=document.getElementById("input")
const card=document.getElementById("card")

const filterBtn=document.getElementById("filterBtn")
const filterList=document.getElementById("filterList")
const filterRegionItems=document.querySelectorAll("#filterList li")


let countries;

filterBtn.addEventListener("click",()=>{
    filterList.classList.toggle("hidden")
})

const getCountries=async ()=>{
  const response= await fetch("https://restcountries.com/v3.1/all")
  const data=await response.json()

  countries=data;
  displayCountries(countries)
}
getCountries();

const displayCountries=(countries)=>{
    card.innerHTML="";
countries.forEach(country => {
    card.innerHTML+=`  <div class="w-[320px] h-[340px] bg-white overflow-hidden rounded">
    <img id="img" class="w-[100%] h-[50%]" src="${country.flags.png}" alt="">
  <div class="p-[20px] flex flex-col gap-[5px]">
     <h1 id="country" class="font-bold">${country.name.common}</h1>
     <p id="population" class="font-medium">Population: <span class="text-slate-400">${country.population}</span></p>
     <p id="region" class="font-medium">Region: <span class="text-slate-400">${country.region}</span></p>
     <p id="capital" class="font-medium">Capital: <span class="text-slate-400">${country.capital ? country.capital : "Not Defined"}</span></p>
  </div>
 </div>`
});
}


const searchCountry=()=>{
    const givenValue=input.value.trim().toLowerCase();

    const filteredCountries=countries.filter((country,index,array)=>country.name.common.toLowerCase().includes(givenValue));
   console.log(filteredCountries);
    displayCountries(filteredCountries);

    input.value="";
}

input.addEventListener("keydown",()=>{
    if(event.code ==="Enter"){
        searchCountry();
    }
})


filterRegionItems.forEach((regionBtn)=>{
    regionBtn.addEventListener("click",()=>{
        const {region}=regionBtn.dataset;
        filterList.classList.add("hidden");

        const filteredByRegion=countries.filter((country)=>country.region===region);

        displayCountries(filteredByRegion)
    })
})