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
