let weather = {
  apiKey: "5a1d988f63100956184d164f1e7c77d3",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&lang=pt&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { temp_min, temp_max } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Temperatura em " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp.toFixed() + "°C";
    document.querySelector(".min").innerText =  "min: " + temp_min.toFixed() + "°C ";
    document.querySelector(".max").innerText =  "max: " + temp_max.toFixed() + "°C";  
    document.querySelector(".humidity").innerText =
      "Humidade: " + humidity + "%";
    
    document.querySelector(".wind").innerText =
      "Velocidade do vento: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1920x1080/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Curitiba");
