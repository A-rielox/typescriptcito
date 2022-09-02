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

// con "push()" es la unica forma de romper el length de una typla

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

function combine(
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

const combinedAges = combine(20, 31, "as-number");
console.log(combinedAges);

const combinedStringAges = combine("20", "31", "as-number");
console.log(combinedStringAges);

const combinedNames = combine("Ariel+", "Emmi", "as-text");
console.log(combinedNames);

///////////////////////////////////////
///////////////////////////////////////
// 24. Type Aliases / Custom Types

// le pones cualquier nombre
type Combinaditos = string | number;
type OttoCombinaditos = "as-number" | "as-text";

// type User = { name: string; age: number };
// const u1: User = { name: 'Max', age: 30 }; // this works!

function combine(
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

const combinedAges = combine(20, 31, "as-number");
console.log(combinedAges);

const combinedStringAges = combine("20", "31", "as-number");
console.log(combinedStringAges);

const combinedNames = combine("Ariel+", "Emmi", "as-text");
console.log(combinedNames);

///////////////////////////////////////
///////////////////////////////////////
//
