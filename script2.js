const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

$(document).ready(function () {
    // Optional: Load a default city on startup
    weatherFn('Pune');

    // When the button is clicked:
    $('#city-input-btn').on('click', function() {
        let cityName = $('#city-input').val(); // Get what the user typed
        if (cityName) {
            weatherFn(cityName); // Fetch weather for that city
        } else {
            alert("Please enter a city name");
        }
    });
});

async function weatherFn(cName) {
    const temp = `${url}?q=${cName}&appid=${apiKey}&units=metric`;
    try {
        const res = await fetch(temp);
        const data = await res.json();
        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function weatherShowFn(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').html(`${data.main.temp}°C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
    
    // Correctly setting the icon URL
    const iconCode = data.weather[0].icon;
    $('#weather-icon').attr('src', `https://openweathermap.org/img/wn/${iconCode}@2x.png`);
    
    $('#weather-info').fadeIn();
}
