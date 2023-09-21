const userTab = document.querySelector("[data-userweather]");
const searchTab = document.querySelector("[data-searchweather]");
const userContainer = document.querySelector(".weather-container");
const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchform]");
const loadingScreen = document.querySelector(".loading");
const userInfoContainer = document.querySelector(".user-weather-info")


let currentTab = userTab;
const API_KEY = "your api key";
currentTab.classList.add("current-tab");
getfromSessionStorage();


function switchTab(clickedTab) {

    if(clickedTab != currentTab){
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")){
        userInfoContainer.classList.remove("active");
        grantAccessContainer.classList.remove("active");
        searchForm.classList.add("active");   
        }
        else{
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            getfromSessionStorage();
        }

    }
}

userTab.addEventListener("click", () => {
    //para clicked tab as input parameter
    switchTab(userTab);

});

searchTab.addEventListener("click", () => {
      //para clicked tab as input parameter
    switchTab(searchTab);
});


//check if coordinates are already present in session storage

function getfromSessionStorage() {

    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        //agr local coordinates present nhi hai

        grantAccessContainer.classList.add("active");

    }
    else{
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates) {
    const {latitude,longitude} = coordinates;

    //make grantcontainer invsible
    grantAccessContainer.classList.remove("active");

    //make loader visible
    loadingScreen.classList.add("active");

    //api call

    try{
       const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
       const data = await response.json();

       loadingScreen.classList.remove("active");
       userInfoContainer.classList.add("active");

       renderWeatherInfo(data);
    }
    catch(err){
        loadingScreen.classList.remove("active");
        console.log("Error Found", err);
    }

}

function renderWeatherInfo(weatherInfo){

    const cityName = document.querySelector("[ data-cityname]");
    const countryIcon = document.querySelector("[data-countryicon]");
    const desc = document.querySelector("[data-weatherdesc]");
    const weatherIcon = document.querySelector("[data-weathericon]");
    const temp = document.querySelector("[data-temp]");
    const windSpeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    //fetch values from weatherinfo object and putt in UI element

    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;

    desc.innerText = weatherInfo?.weather?.[0]?.description;
    // weatherIcon.innerText.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windSpeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity} %`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all} %`;

}

function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
        else {
            console.log("No geolocator Support");
            // show on alret for no geolocation support available
        }
    }

function showPosition(position){
    const userCoordinates = {
        
        latitude:position.coords.latitude,
        longitude:position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

const grantAccessButton = document.querySelector("[data-grantaccess]");

grantAccessButton.addEventListener("click", getLocation);

const searchInput = document.querySelector("[data-searchinput]");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === "")
         return;

    else 
        fetchSearchWeatherInfo(cityName);

})

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessButton.classList.remove("active");

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    
         const data = await response.json();
         loadingScreen.classList.remove("active");
         userInfoContainer.classList.add("active");
         renderWeatherInfo(data);
    }
    catch(err){

    }
}


























// console.log("Weather App");


// function renderWeatherInfo(data) {

//     let newPara = document.createElement("p");
//     newPara.textContent = `${data?.main?.temp.toFixed(2)} c`
//     document.body.appendChild(newPara);

// }

// async function showWeather() {


//     try{
//         let city = "patna";
//         // let latitude = "25.5941";
//         // let longitude = "85.1376";
    
//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    
//         const data = await response.json();
    
//         console.log("Weather data:->", data);
    
//         renderWeatherInfo(data);
//     }
//   catch(err){
//     console.log("Error Found", err);
//   }


// }

// async function weatherDetails() {

//     try {

//         let latitude = "17.5941";
//         let longitude = "85.1376";

//         let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);

//         let data = await result.json();

//         console.log(data);
//     }

//     catch (err) {

//         console.log("Error Found", err);

//     }


// }




// function switchTab(clickedTab) {
//     apiErrorContainer.classList.remove("active");
//     if (clickedTab !== currentTab) {
//         currentTab.classList.remove("current-Tab");
//         currentTab.classList;
//         if (!searchForm.classList.contains("active")) {
//             userInfoContainer.classList.remove("active");
//             grantAccessContainer.classList.remove("active");
//             searchForm.classList.add("active");

//         }
//         else {
//             searchForm.classList.remove("active");
//             userInfoContainer.classList.remove("active");
//             getFormSessionStorage();
//         }
//     }
// }



// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }
//     else {
//         console.log("No geolocator Support");
//     }
// }

// function showPosition(position) {

//     let lat = position.coords.latitude;
//     let longi = position.coords.longitude;

//     console.log(lat);
//     console.log(longi);
// }