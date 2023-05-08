/**
 * The function sorts an array of files based on the selected algorithm for scheduling.
 * @param filesCH - an array of objects representing files to be processed, each object
 * containing properties such as id, lineas (an array of lines of code), priority, and
 * endingRr (for algorithms that use round-robin scheduling)
 * @param algorithmToUse - The scheduling algorithm to use. It can be one of the following:
 * 'fcfs', 'sjf', 'prioridad', 'RR', 'RRP', or 'srtn'.
 * @param quantum - The time quantum for the Round Robin (RR) and Round Robin with Priority
 * (RRP) algorithms. It determines the maximum amount of time a process can run before being
 * preempted and moved to the back of the queue.
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
