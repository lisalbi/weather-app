fetch('https://api.openweathermap.org/data/2.5/weather?q=London&APPID=5e9a522870527d0feb379b82180ca399', {mode: 'cors'})
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      console.log(response);
      display(response);
});

const place = document.querySelector('.location');
const temp = document.querySelector('.temp');
const feelsLike = document.querySelector('.feels-like');
const errorMsg = document.querySelector('.error');

const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const condition = document.querySelector('.condition');

function display(data) {
    place.textContent = data.name;
    condition.textContent = data.weather[0].description;
    temp.textContent = Math.round(kelvinToF(data.main.temp)) + ' °F'
    feelsLike.textContent = 'Feels Like: ' + Math.round(kelvinToF(data.main.feels_like)) + ' °F'
    humidity.textContent = 'Humidity: ' + data.main.humidity + '%';
    wind.textContent = 'Wind: ' + Math.round(toMPH(data.wind.speed)) + ' mph';
}

async function getData(inputLocation) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputLocation}&APPID=5e9a522870527d0feb379b82180ca399`, {mode: 'cors'});
    if (response.status === 404 || response.status === 400) {
        throwError();
    } else {
        clearError();
        let data = await response.json();
        console.log(data);
        clearSearch();
        return data;
    }
    
};

function throwError() {
    errorMsg.textContent = 'Please enter a valid location';
}

function clearError() {
    errorMsg.textContent = '';
}

const search = document.querySelector('#search');
search.addEventListener('keyup', function(event) {
      // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    getData(search.value).then(function(data) {
        display(data);
    })
  }
});
const searchIcon = document.querySelector('#search-icon');
searchIcon.addEventListener('click', function() {
    getData(search.value).then(function(data) {
        display(data);
    })
})

function clearSearch() {
    search.value = 'Enter a city';
}

function kelvinToF(temp) {
    temp = parseFloat(temp);
    return ((temp-273.15)*1.8)+32;
}

function kelvinToC(temp) {
    temp = parseFloat(temp);
    return (temp-273.15);
}

function toMPH(speed) {
    speed = parseFloat(speed);
    return ((speed * 60 * 60)/1000*0.62137);
} 



// 

// <div class='location'></div>a
// <div class='temp'></div>
// <div class='feels-like'></div>
// <div class='humidity'></div>
// <div class='wind'></div>