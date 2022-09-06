///////////////////////////////////////
///////////////////////////////////////
//

// compila al salvar
// tsc app.ts --watch
// o
// tsc app.ts -w

// para q me compile todos los archivos ts
// SOLO UNA VEZ en la carpeta ppl del proyecto
//
// tsc --init
//
// va a crear tsconfig.json
// y ahora solo con >tsc se compilan todos
// y con >tsc -w
// queda en modo watch compilando todos los archivos

//
// 36. Including & Excluding Files
//=====================================

//
// "exclude": ["001.ts"] -------> en tsconfig.json

//
// 41. rootDir and outDir
//=====================================
// "outDir": "./dist", -------> para q mantenga la estructura de carpetas en los archivos compilados
// "rootDir": "./src",  -------> compila solo lo de esta carpeta
