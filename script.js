const weather = {
  apiKey: '7de96ba4b2bea8a0ad34e3beff5f0c7d',
  fetchWeather: function (city) {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&units=metric&appid=' +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data))
      .catch((error) => console.error('Error fetching data:', error));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector('.city').innerText = 'Weather in ' + name;
    document.querySelector('.icon').src =
      'https://openweathermap.org/img/wn/' + icon + '.png';
    document.querySelector('.description').innerText = description;
    document.querySelector('.temp').innerText = temp + '°C';
    document.querySelector('.humidity').innerText =
      'Humidity: ' + humidity + '%';
    document.querySelector('.wind').innerText =
      'Wind speed: ' + speed + ' km/h';
    document.querySelector('.weather').classList.remove('loading');
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector('.searchbar').value);
  },
};

// Auto_Search ...

document.querySelector('.searchbar').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        weather.search();
    } else {
        // You can add a delay before auto-searching to avoid sending requests for each keypress
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(function () {
            weather.search();
        }, 1000); // Adjust the delay as needed (e.g., 1000 milliseconds = 1 second)
    }
});

// End of Auto-Search


weather.fetchWeather('Mumbai');


