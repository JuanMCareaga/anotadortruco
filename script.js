let puntos = {
  equipo1: 0,
  equipo2: 0
};

function actualizarFosforos() {
  for (let equipo in puntos) {
    const contenedor = document.getElementById("fosforos" + equipo.slice(-1));
    const marcador = document.getElementById("puntaje" + equipo.slice(-1));
    contenedor.innerHTML = "";
    marcador.textContent = puntos[equipo];

    const total = puntos[equipo];
    const cuadrosCompletos = Math.floor(total / 5);
    const resto = total % 5;

    // Dibujar cuadros completos
    for (let i = 0; i < cuadrosCompletos; i++) {
      const cuadro = crearCuadro(5);
      contenedor.appendChild(cuadro);
    }

    // Cuadro parcial
    if (resto > 0) {
      const cuadro = crearCuadro(resto);
      contenedor.appendChild(cuadro);
    }
  }
}

function crearCuadro(cantidad) {
  const cuadro = document.createElement("div");
  cuadro.classList.add("cuadro");

  for (let i = 1; i <= cantidad; i++) {
    const fosforo = document.createElement("div");
    fosforo.classList.add("fosforo", `f${i}`);
    fosforo.style.animationDelay = `${i * 0.0}s`; // escalonado
    cuadro.appendChild(fosforo);
  }

  return cuadro;
}

function sumar(equipo) {
  if (puntos[equipo] < 30) {
    puntos[equipo]++;
    actualizarFosforos();

    if (puntos[equipo] === 30) {
      const nombre = equipo === "equipo1" ? "Soles ⭐" : "Monitos 🐵";
      setTimeout(() => {
        document.getElementById("audioVictoria").play();
        alert(`🎉 ¡${nombre} ganaron el Truco!`);
      }, 500);
    }
  }
}

function restar(equipo) {
  if (puntos[equipo] > 0) {
    puntos[equipo]--;
    actualizarFosforos();
  }
}

function reiniciarJuego() {
  puntos.equipo1 = 0;
  puntos.equipo2 = 0;
  actualizarFosforos();
}

actualizarFosforos();
