import React, { useState } from "react";
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
export const WeatherApp = () => {
  const URL_BASE = "https://api.openweathermap.org/data/2.5/weather";
  const KEY = "10de1ef8102bacb617688b89078106bf";
  let difKelvin = 273.15;
  const [ciudad, setCiudad] = useState("");
  const [dataClima, setDataClima] = useState(null);

  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ciudad.length > 0) fetchClima();
  };

  const fetchClima = async () => {
    try {
      let response = await fetch(`${URL_BASE}?q=${ciudad}&appid=${KEY}`);
      const data = await response.json();
      if (data) console.log(data);
      setDataClima(data);
    } catch (error) {
      console.log("Ha ocurrido el el siguiente error: ", error);
    }
  };

  return (
    <div className="container">
      <h1>Aplicacion de Clima</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={ciudad} onChange={handleCambioCiudad} />
        <button type="submit">Buscar</button>
      </form>
      {dataClima && (
        <div>
          <p>{dataClima.name}</p>
          <p>Temperatura: {parseInt(dataClima.main.temp - difKelvin)}</p>
          <img
            src={` https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}
            alt="clima"
          />
          <p>
            Temperatura Minima: {parseInt(dataClima.main.temp_min - difKelvin)}
          </p>
          <p>
            Temperatura Maxima: {parseInt(dataClima.main.temp_max - difKelvin)}
          </p>
        </div>
      )}
    </div>
  );
};
