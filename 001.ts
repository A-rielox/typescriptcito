const person: {
	name: string;
	age: number;
	hobbies: string[];
	role: [number, string]; // tuple ( definido el length y tipos d cada elemento )
} = {
	name: "Arielox",
	age: 30,
	hobbies: ["sports", "cooking"],
	role: [2, "admin"],
};

// con "push()" es la unica forma de romper el length de una tupla

// mejor q lo haga solo
const person2 = {
	name: "Arielox",
	age: 30,
	hobbies: ["sports", "cooking"],
	role: [2, "admin"], // si no lo defino como tuple lo toma como ( role: (string | number)[] )
};

let ottoHobby: any[];
ottoHobby = ["sports", 1];

console.log(person2.hobbies);

// ENUMS

enum Role {
	ADMIN,
	READ_ONLY,
	AUTHOR,
}

const person3 = {
	name: "Arielox",
	age: 30,
	hobbies: ["sports", "cooking"],
	role: Role.ADMIN,
};

if (person3.role === Role.ADMIN) {
	console.log("role es admin");
}

///////////////////////////////////////
///////////////////////////////////////
// UNION TYPES
// para cuando necesito que algo tenga mas de un tipo

function combine(input1: string | number, input2: string | number) {
	let result;

	if (typeof input1 === "number" && typeof input2 === "number") {
		result = input1 + input2;
	} else {
		result = input1.toString() + input2.toString();
	}

	return result;
}

const combinedAges = combine(20, 31);
console.log(combinedAges);

const combinedNames = combine("Ariel+", "Emmi");
console.log(combinedNames);

///////////////////////////////////////
///////////////////////////////////////
// LITERAL TYPES
// para cuando necesito que algo tenga mas de un tipo

function combine2(
	input1: string | number,
	input2: string | number,
	// resultConversion: string
	resultConversion: "as-number" | "as-text"
) {
	let result;

	if (
		(typeof input1 === "number" && typeof input2 === "number") ||
		resultConversion === "as-number"
	) {
		result = +input1 + +input2;
	} else {
		result = input1.toString() + input2.toString();
	}

	return result;
}

const combinedAges2 = combine2(20, 31, "as-number");
console.log(combinedAges2);

const combinedStringAges2 = combine2("20", "31", "as-number");
console.log(combinedStringAges2);

const combinedNames2 = combine2("Ariel+", "Emmi", "as-text");
console.log(combinedNames2);

///////////////////////////////////////
///////////////////////////////////////
// 24. Type Aliases / Custom Types

// le pones cualquier nombre
type Combinaditos = string | number;
type OttoCombinaditos = "as-number" | "as-text";

// type User = { name: string; age: number };
// const u1: User = { name: 'Max', age: 30 }; // this works!

function combine3(
	input1: Combinaditos,
	input2: Combinaditos,
	resultConversion: OttoCombinaditos
) {
	let result;

	if (
		(typeof input1 === "number" && typeof input2 === "number") ||
		resultConversion === "as-number"
	) {
		result = +input1 + +input2;
	} else {
		result = input1.toString() + input2.toString();
	}

	return result;
}

const combinedAges3 = combine3(20, 31, "as-number");
console.log(combinedAges3);

const combinedStringAges3 = combine3("20", "31", "as-number");
console.log(combinedStringAges3);

const combinedNames3 = combine3("Ariel+", "Emmi", "as-text");
console.log(combinedNames3);

///////////////////////////////////////
///////////////////////////////////////
// 26. Function Return Types & "void"
// 27. Functions as Types
// 28. Function Types & Callbacks

function add(n1: number, n2: number) {
	return n1 + n2;
}

function printResult(num: number): void {
	console.log("Resultado: " + num);
}

// cb --> callback fcn
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
	const result = n1 + n2;
	cb(result);
}

// let combineValues: Function; --> jala pero muy generico
let combineValues: (a: number, b: number) => number;

combineValues = add;
// combineValues = 5; --> ERROR
// combineValues = printResult; --> ERROR

console.log(combineValues(8, 8));
addAndHandle(8, 2, printResult);
addAndHandle(18, 2, (num) => {
	console.log(num);
});

///////////////////////////////////////
///////////////////////////////////////
// 29. The "unknown" Type
// 30. The "never" Type

let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Max";
// tengo q hacer el check para asignar algo de tipo unknown a algo q si tiene tipo
if (typeof userInput === "string") {
	userName = userInput;
}

function generateError(message: string, code: number): never {
	throw { message: message, errorCode: code };
	// while (true) {}
}

generateError("An error occurred!", 500);

///////////////////////////////////////
///////////////////////////////////////
//
//		SECCION 5 - CLASES
//
///////////////////////////////////////
///////////////////////////////////////

class Department {
	name: string; // ---> field

	// methods
	constructor(n: string) {
		this.name = n;
	}

	// this: Department -> para indicar q este metodo debe ser llamado en una instancia de Department y no como en ✨
	describe(this: Department) {
		console.log("Department: " + this.name);
	}
}

const accounting = new Department("accounting");
console.log(accounting); // Department {name: 'accounting'}
accounting.describe();

// ✨
// antes de poner (this.Department) en el metodo
// const accountingCopy = { describe: accounting.describe };
// accountingCopy.describe();
// Department: undefined, xq el "this" apunta a accountingCopy, donde "this.name" no existe

// para q pueda correr tras agregar (this.Department)
const accountingCopy = { name: "departamento", describe: accounting.describe };
accountingCopy.describe(); // Department: departamento

////////////////////////////////////////
//
// OTTO
class Department {
	name: string;
	private employees: string[] = [];

	constructor(n: string) {
		this.name = n;
	}

	describe(this: Department) {
		console.log("Department: " + this.name);
	}

	addEmployee(employee: string) {
		this.employees.push(employee);
	}

	printEmployeeInformation() {
		console.log(`Cantidad de empleados: ${this.employees.length}`);
		console.log(`Array de empleados: ${this.employees.join(", ")}`);
	}
}

const accounting = new Department("accounting");
accounting.addEmployee("arielox");
accounting.addEmployee("ariel");
// accounting.employees[2] == "ana" NO SE PUEDE XQ AHORA ES PRIVATE FIELD
// console.log(accounting.employees); // ['arielox', 'ariel'] --> YA NO PUEDO ACCEDER XQ AHORA ES PRIVATE

accounting.printEmployeeInformation();
//  Cantidad de empleados: 2
//  Array de empleados: arielox, ariel

//////////////////////////

//
// 63. Shorthand Initialization

// "private" solo son accesibles desde la misma clase, NO desde las q hereden de esa
// "protected" son tambien accesibles desde las heredadas
// las clases marcadas como abstract no se pueden instanciar, solo son para ser heredadas

abstract class Department {
	static fiscalYear = 2020; // dentro de la clase, solo puedo acceder a las props o metodos static desde algo static ocupando el nombre de la clase y no con "this"
	protected employees: string[] = [];

	constructor(public readonly id: string, public name: string) {
		//
	}

	// metodo static, para poder crear un employee sin tener q crear una instancia de Department
	static createEmployee(name: string) {
		return { name: name };
	}

	// abstract para q en cada clase q herede de esta TENGA q implementar este metodo
	abstract describe(this: Department): void; // {
	// console.log(`Department (${this.id}): ${this.name}`);
	// }

	addEmployee(employee: string) {
		this.employees.push(employee);
	}

	printEmployeeInformation() {
		console.log(`Cantidad de empleados: ${this.employees.length}`);
		console.log(`Array de empleados: ${this.employees.join(", ")}`);
	}
}

class ITDepartment extends Department {
	constructor(id: string, public admins: string[]) {
		super(id, "IT"); // llama al constructor de la base class
	}

	describe(): void {
		console.log(`IT Department - ID: (${this.id})`);
	}
}

// el patron singleton es para asegurar q una clase solo se pueda instanciar UNA vez, se usa un "private constructor"
class AccountingDepartment extends Department {
	private lastReport: string;
	private static instance: AccountingDepartment; // para singleton

	get mostRecentReport() {
		if (this.lastReport) {
			return this.lastReport;
		}

		throw new Error("No reports yet");
	}

	set mostRecentReport(value: string) {
		this.addReport(value);
	}

	private constructor(id: string, private reports: string[]) {
		super(id, "Accounting");
		this.lastReport = reports[0];
	}

	// para singleton
	// "this" dentro de un metodo "static", da acceso a la clase y no a la instancia particular
	static getInstance() {
		if (AccountingDepartment.instance) {
			// si ya existe => retorna la instancia
			return this.instance;
		}

		this.instance = new AccountingDepartment("d2", []);
		return this.instance;
	}

	describe(): void {
		console.log(`Accounting Department - ID: (${this.id})`);
	}

	// overriding el method
	addEmployee(name: string) {
		if (name === "ariel") {
			return;
			// si es "ariel" => no lo agrega
		}

		this.employees.push(name);
	}

	addReport(text: string) {
		this.reports.push(text);
		this.lastReport = text;
	}

	printReports() {
		console.log(this.reports.join("\n"));
	}
}

// createEmployee es metodo static
const employee1 = Department.createEmployee("Lel");
console.log(employee1, Department.fiscalYear);
// {name: 'Lel'} 2020

const it = new ITDepartment("d2", ["pepi"]);
it.describe(); // Department (d2): IT
console.log(it); // {id: 'd2', name: 'IT', employees: Array(0), admins: Array(1)}

// const accounting = new AccountingDepartment("d3", []);
const accounting = AccountingDepartment.getInstance();
// const accounting2 = AccountingDepartment.getInstance(); esta me devolveria la misma, xq ya esta instanciada una vez

accounting.addEmployee("ariel");
accounting.addEmployee("mino");

// console.log(accounting.mostRecentReport);
// Uncaught Error: No reports yet
//     at get mostRecentReport [as mostRecentReport]

accounting.addReport("reporte reporte reporte reporte ...");
accounting.addReport("REPORTE REPORTE REPORTE REPORTE ...");
accounting.mostRecentReport = "otto report otto report ...";

accounting.printReports();
// reporte reporte reporte reporte ...
// REPORTE REPORTE REPORTE REPORTE ...
// otto report otto report ...

accounting.printEmployeeInformation();
// Cantidad de empleados: 1
// Array de empleados: mino

// LAS STATIC NO NECESITAN SER LLAMADAS DESDE UNA INSTANCIA, SINO Q PUEDEN SER LLAMADAS DESDE LA CLASE
// como PI en Math.PI
