import React, { useState } from 'react';
import './App.css';
import Calendar from 'react-calendar';

function App() {
  const [value, onChange] = useState(new Date());

  const handleOnChange = (newValue) => {
    onChange(newValue);
  };

  const horarioTrabajo = ["Trabaja de tardes", "Trabaja de mañanas"];

  let horarioDiaSeleccionado = "";

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const getTipoSemana = (date) => {
    // Definir el patrón de semanas
    const tipoSemana = ["Corta Tardes 🌙", "Larga Mañanas ☀️", "Corta Mañanas ☀️", "Larga Tardes 🌙"];
    const semanaLarga = [0,1,4,5,6];
    const semanaCorta = [2,3];

    // Obtener el número de días transcurridos desde el Lunes de semana corta de tardes
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const startDate = new Date(2025, 1, 6); // Poner el Lunes de semana corta de tardes
    const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const daysPassed = Math.floor((currentDate - startDate) / millisecondsPerDay);

    // Calcular el tipo de semana
    const weekTypeIndex = (Math.floor(daysPassed / 7) % 4) >= 0 ? (Math.floor(daysPassed / 7) % 4) : (Math.floor(daysPassed / 7) % 4) + 4;
    const weekday = Math.floor(daysPassed % 7) >= 0 ? Math.floor(daysPassed % 7) : Math.floor(daysPassed % 7) + 7;

    console.log(weekday);
    console.log(weekTypeIndex);

    switch(weekTypeIndex){
      case 0:
        horarioDiaSeleccionado = semanaCorta.includes(weekday) ? horarioTrabajo[0] : "Libre";
        break;
      case 1:
        horarioDiaSeleccionado = semanaLarga.includes(weekday) ? horarioTrabajo[1] : "Libre";
        break;
      case 2:
        horarioDiaSeleccionado = semanaCorta.includes(weekday) ? horarioTrabajo[1] : "Libre";
        break;
      case 3:
        horarioDiaSeleccionado = semanaLarga.includes(weekday) ? horarioTrabajo[0] : "Libre";
        break;
      default:
        horarioDiaSeleccionado = "Libre";
    }
    return tipoSemana[weekTypeIndex];
  };

  const tipoSemana = getTipoSemana(value);

  const textColor = horarioDiaSeleccionado === 'Libre' ? 'green' : horarioDiaSeleccionado == horarioTrabajo[1] ? 'orange' : 'lightblue';

  const fechaSeleccionada = value.toLocaleString("es-ES", options);

  return (
    <>
      <h2>Calendario de Miguel</h2>
      <Calendar
        minDetail="decade"
        next2Label={null}
        prev2Label={null}
        onChange={handleOnChange}
        value={value}
      />
      <p>{fechaSeleccionada.charAt(0).toUpperCase() + fechaSeleccionada.slice(1)}</p>
      <p style={{ color: textColor, fontWeight: 'bold', fontSize: '2em'}}>
        {horarioDiaSeleccionado}
      </p>
      <p style={{fontSize: '1em'}}><span style={{ fontWeight: 'bold', fontSize: '1em'}}>{tipoSemana}</span></p>
    </>
  );
}

export default App;
