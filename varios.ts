//
//
//                   //////////////////////////////////
//
//                         83. Intersection Types
//
//                   //////////////////////////////////
//
//
//

type Admin = {
	name: string;
	privileges: string[];
};

type Employee = {
	name: string;
	startDate: Date;
};

// interface ElevatedEmployee extends Employee, Admin {}

type ElevatedEmployee = Admin & Employee;
// PARA LOS objects VA A SER la combinacion de ELLOS

const e1: ElevatedEmployee = {
	name: "Max",
	privileges: ["create-server"],
	startDate: new Date(),
};

// PARA LOS UNION TYPES VA A SER EL QUE ES COMUN A ELLOS
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;
let bole: Universal; // VA A SER DE TIPO number

//             //////////////////////////////////
//
//                      Type Guards
//
//             //////////////////////////////////

// if (typeof a === "string" || typeof b === "string") es el Type Guard

function addd(a: Combinable, b: Combinable) {
	if (typeof a === "string" || typeof b === "string") {
		return a.toString() + b.toString();
	}
	return a + b;
}

// type Admin = {
// 	name: string;
// 	privileges: string[];
// };
// type Employee = {
// 	name: string;
// 	startDate: Date;
// };
type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
	console.log("Name: " + emp.name); // Name: Manu

	if ("privileges" in emp) {
		console.log("Privileges: " + emp.privileges);
	}

	if ("startDate" in emp) {
		console.log("Start Date: " + emp.startDate);
		// Start Date: Tue Sep 06 2022 17:58:01 GMT-0400
	}
}

printEmployeeInformation(e1);
printEmployeeInformation({ name: "Manu", startDate: new Date() });

class Car {
	drive() {
		console.log("Driving...");
	}
}

class Truck {
	drive() {
		console.log("Driving a truck...");
	}

	loadCargo(amount: number) {
		console.log("Loading cargo ..." + amount);
	}
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
	vehicle.drive();

	if (vehicle instanceof Truck) {
		vehicle.loadCargo(1000);
	}
}

useVehicle(v1);
useVehicle(v2);

//             //////////////////////////////////
//
//                 85. Discriminated Unions
//
//             //////////////////////////////////

interface Bird {
	type: "bird";
	flyingSpeed: number;
}

interface Horse {
	type: "horse";
	runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
	let speed;

	switch (animal.type) {
		case "bird":
			speed = animal.flyingSpeed;
			break;

		case "horse":
			speed = animal.runningSpeed;
	}
	console.log("Moving at speed: " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 10 });
// Moving at speed: 10

//             //////////////////////////////////
//
//                     86. Type Casting
//
//             //////////////////////////////////

// <body>
//    <input type="text" id="user-input">
// </body>

// prettier-ignore
// const userInputElement = <HTMLInputElement>document.getElementById("user-input");
const userInputElement = document.getElementById("user-input")! as HTMLInputElement;

userInputElement.value = "Hi there!!";

// o
// if (userInputElement) {
// 	(userInputElement as HTMLInputElement).value = "Hi there!!";
// }

//             //////////////////////////////////
//
//                     87. Index Properties
//
//             //////////////////////////////////

interface ErrorContainer {
	// { email: 'Not a valid email', username: 'Must start with a character!' }
	[prop: string]: string;
	// no se cuantas va a tener ni el nombre de la key
}

const errorBag: ErrorContainer = {
	email: "Not a valid email!",
	username: "Must start with a capital character!",
};

//             //////////////////////////////////
//
//                     88. Function Overloads
//
//             //////////////////////////////////

type Combina = string | number;

function adding(a: number, b: number): number;
function adding(a: string, b: string): string;
function adding(a: Combina, b: Combina) {
	if (typeof a === "string" || typeof b === "string") {
		return a.toString() + b.toString();
	}

	return a + b;
}

const resulta = adding("lel", " goy");
resulta.split(" ");

//             //////////////////////////////////
//
//                     90. Nullish Coalescing
//
//             //////////////////////////////////

const userInputcito = "";
const storedData = userInputcito ?? "DEFAULT";

console.log(storedData); // ''

// solo pasa el otro si es null o undefined
