/**
 * The function "encender" initializes the system by disabling certain inputs, setting the
 * mode to user, creating an array of memory with a limit, and displaying it on the page.
 */
function encender() {
	if (Number(memoriaInput.value) > 9999) {
		alert('EL ESPACIO DE MEMORIA ES INSUFICIENTE');
		apagar();
	}
	kernel.disabled = true;
	memoriaInput.disabled = true;
	inputMetodoAlgoritm.disabled = true;
	btnEncender.style.display = 'none';
	btnApagar.style.display = 'inline-block';

	modo.innerHTML = 'Modo usuario';
	cerrar.style.display = 'block';
	files.disabled = false;

	// ARRAY DE SISTEMA OPERATIVO Y KERNEL CON LIMITE DE MEMORIA
	let memoriaMostrar = [];
	initialPosition += Number(kernel.value) + 1;

	let lAcumulador = [0, ' Acumulador'];
	memoriaMostrar.push(lAcumulador.toString().replaceAll(',', ' '));
	// console.log(memoriaMostrar);
	for (let i = 1; i < Number(memoriaInput.value) + 1; i++) {
		if (i <= Number(kernel.value)) {
			let so = [i];

			so.push('USE FOR SYSTEM');
			memoriaMostrar.push(so.toString().replaceAll(',', ' '));
		} else {
			memoriaMostrar.push(`${i} - - - - `);
		}
	}

	if (inputMetodoAlgoritm.value === 'RR' && quantum === 0) {
		let quantum = prompt(`Ingrese el valor del quantum, ya que en defecto será (5)`);
		quantum = quantum ? Number(quantum) : 5;
		inputQuantum.value = quantum;
	}

	document.getElementById('memoria').style.display = 'block';
	document.getElementById('memoria').innerHTML = memoriaMostrar.join('<br></br>');
}

/**
 * The function "apagar" reloads the page and enables certain elements while disabling
 * others.
 */
function apagar() {
	location.reload();
	kernel.disabled = false;
	memoriaInput.disabled = false;
	inputMetodoAlgoritm.disabled = false;
	btnApagar.style.display = 'none';
	btnEncender.style.display = 'inline-block';
	modo.innerHTML = 'Modo kernel';
	files.disabled = true;
}
