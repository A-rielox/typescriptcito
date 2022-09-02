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
//
