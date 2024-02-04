let mago1 = {
    nombre: "Germain",
    vida: 50,
    ataque: 20,
    defensa: 5
};

let mago2 = {
    nombre: "Yanu",
    vida: 50,
    ataque: 20,
    defensa: 5
};


let frase = 0;
let turno = 1;
var siguiente = true;

const mensajeInicial = "¡El duelo comienza!";
const mensajesMago1 = [
    "Es el Turno de " + mago1.nombre,
    "Qué vas a hacer?",
    // mago1.nombre + " Ha atacado a " + mago2.nombre + "\nHa hecho X de daño"
    `${mago1.nombre} atacó a ${mago2.nombre} y le infligió ${mago1.ataque} de daño.`
];

const mensajesMago2 = [
    "Es el Turno de " + mago2.nombre,
    mago2.nombre + " Ha hecho lo propio",
    `${mago2.nombre} te atacó y te infligió ${mago1.ataque} de daño.`
];

// Botones
const botonAtacar = document.getElementById("boton-atacar");
const botonCurarse = document.getElementById("boton-curarse");
botonAtacar.addEventListener("click", atacar);
botonCurarse.addEventListener("click", curarse);


// FUNCIONES
function mostrarSiguienteFrase() {
    const mensajesElement = document.getElementById("mensajes");
    const accionesElement = document.getElementById("acciones");


    //Si la vida de cualquiera es 0
    if ((mago1.vida <= 0 || mago2.vida <= 0)) {
        //Ocultar botones
        accionesElement.style.display = "none";

        // mensajeFinal
        //Si ganas
        if (mago2.vida <= 0) {
            mensajesElement.textContent = "Has vencido a un viejo amigo. Quieres seguir pegandole?";
        } else {
            mensajesElement.textContent = "Estas muy debil pero eliges volver a levantarte:";
        }

    } else {
        if (turno == 1) {
            if (frase < mensajesMago1.length) {
                mensajesElement.textContent = mensajesMago1[frase];
                frase++;

                if (frase == 2) {
                    // Mostrar las opciones
                    accionesElement.style.display = "block";
                    // Desactivar keydown
                    siguiente = false;
                }

                if (frase == 3) {
                    accionesElement.style.display = "none";
                    siguiente = true;
                }

            } else {
                frase = 0;
                turno = 2;
            }
        }
        if (turno == 2) {
            if (frase < mensajesMago2.length) {
                mensajesElement.textContent = mensajesMago2[frase];
                frase++;

                if (frase == 3) {
                    console.log("Frase " + frase);
                    atacar();
                }
            } else {
                frase = 0;
                turno = 1;
            }
        }
    }
}



// MOVIMIENTOS
function atacar() {
    // Mago 1
    if (turno == 1) {
        // Calcular daño y Restar vida al rival
        mago2.vida -= mago1.ataque;
        // Actualizar vida del rival
        const vidaRival = document.getElementById("mago2-vida");
        vidaRival.textContent = mago2.vida;
    }
    // Mago 2
    if (turno == 2) {
        // Calcular daño y Restar vida al rival
        mago1.vida -= mago2.ataque;
        // Actualizar vida del rival
        const vidaRival = document.getElementById("mago1-vida");
        vidaRival.textContent = mago1.vida;
    }

    console.log("Atacando...");
    mostrarSiguienteFrase();
}

function curarse() {
    // Mago 1
    if (turno == 1) {
        // Calcular vida
        mago1.vida += 10;
        // Actualizar vida 
        const vida = document.getElementById("mago1-vida");
        vida.textContent = mago1.vida;
    }
    // Mago 2
    if (turno == 2) {
       // Calcular vida
       mago2.vida += 10;
       // Actualizar vida 
       const vida = document.getElementById("mago2-vida");
       vida.textContent = mago2.vida;
    }

    console.log("Curándose...");
    mostrarSiguienteFrase();
}



// MOSTRAR MENSAJES:
function mostrarMensajeInicial() {
    const mensajesElement = document.getElementById("mensajes");
    mensajesElement.textContent = mensajeInicial;
}



mostrarMensajeInicial();

// document.body.addEventListener("click", mostrarSiguienteFrase);
document.body.addEventListener("keydown", function (event) {
    if (siguiente) {
        if (event.keyCode === 32 || event.keyCode === 13) {
            mostrarSiguienteFrase();
        }
    }
});