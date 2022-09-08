//
//
//                   //////////////////////////////////
//
//                                 GENERICS
//
//                   //////////////////////////////////
//
//
//

////////////////////////////////////////////
//       96. Working with Constraints
//

// para pasar genericos, pero q sean de un tipo particular
// puedo pasar solo objects
function merge<T extends object, U extends object>(objA: T, objB: U) {
	return Object.assign(objA, objB);
}

// const mergedObjct = merge({name: 'ariel', hobbies:['name']}, 30); error x restriccion
const mergedObjct = merge({ name: "ariel", hobbies: ["name"] }, { num: 30 });
console.log(mergedObjct);
// {name: 'ariel', hobbies: Array(1), num: 30}

// fuerza a q el segundo sea una key del primero
function extractAndConvert<T extends object, U extends keyof T>(
	obj: T,
	key: U
) {
	return "Value " + obj[key];
}

const res = extractAndConvert({ casa: "linda" }, "casa");
console.log(res); //Value linda

////////////////////////////////////////////
//       99. Generic Classes
//

// extends string | number | boolean -> para q NO sea un object
class DataStorage<T extends string | number | boolean> {
	private data: T[] = [];

	addItem(item: T) {
		this.data.push(item);
	}

	removeItem(item: T) {
		if (this.data.indexOf(item) === -1) {
			return;
		}

		this.data.splice(this.data.indexOf(item), 1);
	}

	getItems() {
		return [...this.data];
	}
}

const textStorage = new DataStorage<string>();
textStorage.addItem("lel");
textStorage.addItem("pepi");
textStorage.addItem("ayi");

textStorage.removeItem("lel");
console.log(textStorage.getItems()); // ['pepi', 'ayi']

const numStorage = new DataStorage<number>();
numStorage.addItem(1);
numStorage.addItem(45);
numStorage.addItem(2);

numStorage.removeItem(45);
console.log(numStorage.getItems()); // [1, 2]
