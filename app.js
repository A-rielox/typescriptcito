///////////////////////////////////////
///////////////////////////////////////
// 26. Function Return Types & "void"
// 27. Functions as Types
// 28. Function Types & Callbacks
function add(n1, n2) {
    return n1 + n2;
}
function printResult(num) {
    console.log("Resultado: " + num);
}
// cb --> callback fcn
function addAndHandle(n1, n2, cb) {
    var result = n1 + n2;
    cb(result);
}
// let combineValues: Function; --> jala pero muy generico
var combineValues;
combineValues = add;
// combineValues = 5; --> ERROR
// combineValues = printResult; --> ERROR
console.log(combineValues(8, 8));
addAndHandle(8, 2, printResult);
addAndHandle(18, 2, function (num) {
    console.log(num);
});
///////////////////////////////////////
///////////////////////////////////////
//
