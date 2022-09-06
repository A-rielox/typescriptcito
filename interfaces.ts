//
//
//                   //////////////////////////////////
//
//                       			DEFINICION
//
//                   //////////////////////////////////
//
//
//

// para definir el tipo de una fcn con type
// type AddFcn = (a: number, b: number) => number;
// 								...     con interface
interface AddFcn {
	(a: number, b: number): number;
}
let add: AddFcn;
add = (n1: number, n2: number) => {
	return n1 + n2;
};

interface Named {
	readonly name: string;
	outputName?: string; // property opcional ( NO tinen q implementarla a fuerza )

	// para metodos opcionales es optional ! => myMethod?(){...}
}

interface Greetable extends Named {
	greet(phrase: string): void;
}

class Person implements Greetable {
	name: string;
	age = 30;

	constructor(n: string) {
		this.name = n;
	}

	greet(phrase: string) {
		console.log(phrase + " " + this.name);
	}
}

let user1: Greetable;

user1 = new Person("Ariel");

user1.greet("holi hola, soy");
// holi hola, soy Ariel
