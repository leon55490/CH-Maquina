/* The class Etiqueta defines a template for creating objects with properties such as id,
name, value, and whether it exceeds a certain limit. */
class Etiqueta {
	static contadorEtiqueta = 0;
	constructor(nombre, valor, sobrepasa) {
		this._id = ++Etiqueta.contadorEtiqueta;
		this._nombre = nombre;
		this._sobrepasa = sobrepasa;
		this._valor = valor;
	}
	get id() {
		return this._id;
	}
	get nombre() {
		return this._nombre;
	}
	set nombre(nombre) {
		this._nombre = nombre;
	}
	get sobrepasa() {
		return this._sobrepasa;
	}
	set sobrepasa(sobrepasa) {
		this._sobrepasa = sobrepasa;
	}
	get valor() {
		return this._valor;
	}
	set valor(valor) {
		this._valor = valor;
	}
}
