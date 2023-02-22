/**
 * It sorts the files according to the algorithm that is going to be used
 * @param filesCH - Array of files that are in the CPU.
 * @param algorithmToUse - The algorithm to use.
 * @param quantum - The quantum is the time that the CPU will give to each process before
 * switching to the next one.
 */
function ordenarAlgoritmos(filesCH, algorithmToUse, quantum) {
	if (algorithmToUse === 'fcfs') {
		//orden de llegada
		filesCH = filesCH.sort((a, b) => Number(a.id) - Number(b.id));
	} else if (algorithmToUse === 'sjf') {
		//dependiendo el n[umero de linea de menor a mayor
		filesCH = filesCH.sort((a, b) => Number(a.id) - Number(b.id));
		filesCH = filesCH.sort((a, b) => Number(a.lineas.length) - Number(b.lineas.length));
	} else if (algorithmToUse === 'prioridad') {
		// dependiendo la prioridad si es mayor es mas importante

		filesCH = filesCH.sort((a, b) => Number(a.id) - Number(b.id));

		filesCH = filesCH.sort((a, b) => Number(b.priority) - Number(a.priority));
	} else if (algorithmToUse === 'RR') {
		for (let file of filesCH) {
			file.endingRr = quantum;
		}

		filesCH.sort((a, b) => Number(a.id) - Number(b.id));
	} else if (algorithmToUse === 'RRP') {
		filesCH = filesCH.sort((a, b) => Number(a.id) - Number(b.id));

		filesCH = filesCH.sort((a, b) => Number(b.priority) - Number(a.priority));

		for (let file of filesCH) {
			file.endingRr = quantum;
		}
	} else if (algorithmToUse === 'srtn') {
		filesCH.sort((a, b) => Number(a.id) - Number(b.id));
	}
}
