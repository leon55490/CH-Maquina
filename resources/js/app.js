/**
 * This is a JavaScript function that includes various functionalities for executing and
 * displaying the memory of a program.
 */
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
 * The function displays a div element and sets the display property of another element to
 * inline-block.
 */
function moMemoria() {
	divMemoria.style.display = 'block';
	cerrar.style.display = 'inline-block';
}
/**
 * The function hides a div and a button.
 */
function cerrarDiv() {
	divMemoria.style.display = 'none';
	cerrar.style.display = 'none';
}

/**
 * The function executes a step-by-step process using input files and a counter.
 */
function ejecutarPasoAPaso() {
	stepByStep(acumStepbyStep, filesCH, contPasoApaso);
}

/**
 * The function adds leading zeros to a number to make it a certain width.
 * @param number - The number that needs to be zero-filled to the specified width.
 * @param width - The width parameter is the total number of digits that the resulting string
 * should have, including the digits of the original number. The function pads the original
 * number with leading zeros to achieve the desired width.
 * @returns a string with the given number padded with zeros on the left to meet the
 * specified width.
 */
function zeroFill(number, width) {
	width -= number.toString().length;
	if (width > 0) {
		return new Array(width + (/./.test(number) ? 2 : 1)).join('0') + number;
	}
	return number + ''; // always return a string
}
/**
 * The function executes a program based on the selected algorithm and input parameters.
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
 * The function "showMemory" logs a list of variables, updates the value of a variable in a
 * list of files, and displays the contents of memory in an HTML element.
 * @param varChange - The name of the variable that has been changed and needs to be updated
 * in the memory display.
 * @param lista - The "lista" parameter is an object that contains information about
 * variables and their values. It is used in the function to update the values of variables
 * in the "listaArchivos" array.
 * @param acum - The current value of the accumulator in a computer program.
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
				arrayMemoria.push(`${s} USE FOR SYSTEM`);
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
