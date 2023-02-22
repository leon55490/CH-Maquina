let memoria = [];
let listaArchivos = [];
let numVar = 0; //Es contador que cuenta las "VARIABLES" que hay por archivo

let contPasoApaso = 0;
let acumStepbyStep = 0;
let nextFile = 0;
let sum = 0;

let arrayVariables = [];
let instrucciones = [];

// De izquierda a derecha en la interfaz
let file = document.getElementById('files');
let btnEncender = document.getElementById('encender');
let btnApagar = document.getElementById('apagar');

let kernel = document.getElementById('kernel');
let memoriaInput = document.getElementById('memoria-input');
let inputAcumulador = document.getElementById('acumulador');
let acomulador = inputAcumulador.value;
let ejecutar = document.getElementById('correrPrograma'); //nuevo
let divMemoria = document.getElementById('memoria');

// variables del contenedor footer
let idColumn = document.getElementById('idColumn');
let programa = document.getElementById('programa');
let ins = document.getElementById('ins');
let rb = document.getElementById('rb');
let rlc = document.getElementById('rlc');
let rlp = document.getElementById('rlp');

// no importantes
let monitor = document.getElementById('monitor-result'); //diferente
let modo = document.getElementById('modo');
let impresora = document.getElementById('impresora-result'); //diferente
let cerrar = document.getElementById('cerrar');
let infoFooter = document.getElementById('footer-home');
let btnStepbyStep = document.getElementById('stepByStep');

//  array de Id
let listId = [];
let numId = 0;
//  array de programa
let listPrograma = [];
let listIns = [];
let listRb = [];
let listRlc = [];
let listRlp = [];

// Variables FASE C
let inputMetodoAlgoritm = document.getElementById('inputGroupSelect01');
let inputQuantum = document.getElementById('q');
let quantum = 0;
let contIO = 0; //conteo de las instrucciones de entrada y salida (Lea, Muestre, Imprima)
let contCPU = 0; //el conteo de las demás instrucciones excluyendo las declarativas(Nueva, Etiqueta, Retorne, comentarios)  da las ráfagas de CPU.

file.addEventListener('change', leerArchivo);

/**
 * It makes the divMemoria visible and the cerrar visible.
 */
function moMemoria() {
	divMemoria.style.display = 'block';
	cerrar.style.display = 'inline-block';
}
/**
 * When the user clicks on the button with the id of 'cerrar', the div with the id of
 * 'divMemoria' will be hidden, and the button with the id of 'cerrar' will be hidden as
 * well.
 */
function cerrarDiv() {
	divMemoria.style.display = 'none';
	cerrar.style.display = 'none';
}

/**
 * A function that is called when the user clicks on a button.
 */
function ejecutarPasoAPaso() {
	stepByStep(acumStepbyStep, filesCH, contPasoApaso);
}

/**
 * If the number is less than the width, add zeros to the left of the number until it is the
 * width.
 * @param number - The number to pad.
 * @param width - The total length of the output string.
 * @returns A string.
 */
function zeroFill(number, width) {
	width -= number.toString().length;
	if (width > 0) {
		return new Array(width + (/./.test(number) ? 2 : 1)).join('0') + number;
	}
	return number + ''; // always return a string
}

/**
 * It runs the program.
 */
function ejecutarPrograma() {
	if (inputMetodoAlgoritm.value === 'RR' || inputMetodoAlgoritm.value === 'RRP') {
		roundRobin(filesCH, Number(inputQuantum.value));
	} else if (inputMetodoAlgoritm.value === 'srtn') {
		runSrtn(filesCH);
	} else {
		correrArchivo(acomulador, filesCH);
	}
	ejecutar.style.display = 'none';
}

/**
 * It takes a variable name, a list of variables, and an accumulator value, and it updates
 * the accumulator value and the memory display
 * @param varChange - The variable that changed
 * @param lista - is the object that contains the variables and their values
 * @param acum - is the accumulator
 */
function showMemory(varChange, lista, acum) {
	console.log(lista);
	if (lista !== undefined) {
		for (l of lista.variables) {
			if (varChange == l.nombre) {
				for (v of listaArchivos) {
					if (varChange === v[1]) {
						v[3] = l.valor;
					}
				}
			}
		}

		let contador = 0;

		let lAcumulador = [acum, 'Acumulador'];
		let arrayMemoria = [];

		let suma = +kernel.value + +listaArchivos.length;

		if (typeof acum == 'object') {
			acum = 0;
		}
		arrayMemoria.push(lAcumulador);
		for (let s = 1; s <= Number(memoriaInput.value); s++) {
			if (s <= kernel.value) {
				arrayMemoria.push(`${s} Usado Por El Sistema`);
			} else if (s > kernel.value && s <= suma) {
				let commentIndexMemory = listaArchivos[contador].findIndex(
					(comment) => comment == '//'
				);
				if (commentIndexMemory !== -1) {
					listaArchivos[contador].splice(commentIndexMemory, 1);
				}
				arrayMemoria.push(listaArchivos[contador]);
				listaArchivos[contador].toString().replaceAll(',', ' ');
				contador++;
			} else {
				arrayMemoria.push(`${s} - - - - - - `);
			}
		}

		let sinEspacios = [];
		let contar;
		for (m of arrayMemoria) {
			contar = m.toString().replaceAll(',', ' ');
			sinEspacios.push(contar);
		}

		divMemoria.innerHTML = sinEspacios.join('<br></br>');
		inputAcumulador.value = acum;
	}
}
