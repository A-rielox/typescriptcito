/*
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


*/

/*
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

*/

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
