import { forceX } from "d3";
import { NewtonCotes } from "./tarefa8";

// ex 1 simples
// function fx(x: number) {
//     return Math.pow(Math.pow(Math.cosh(x), -4) * Math.pow(Math.sinh(x), -2), 1 / 3)
// }


// ex 2 simples
// function fx(x: number) {
//     let th = Math.tanh(x)
//     let sh = Math.sinh(x)
//     let ch = Math.cosh(x)

//     let result = ch * sh;
//     result *= Math.sqrt(-1 - (2 / th) + (3 / (th * th)))
//     result = Math.pow(result, -1)
//     return result
// }
function fx(x: number) {

    let sh = Math.sinh(x);
    let ch = Math.cosh(x);
    let u = Math.PI * sh / 2;

    let thu = Math.tanh(u);
    let shu = Math.sinh(u);
    let chu = Math.cosh(u);

    let numerador = Math.PI * ch;
    let denominador = 2 * chu * shu;
    denominador *= Math.sqrt((3 / thu) + (2 / thu) - 1)
    let result = numerador / denominador;
    return result;
}

export function Solve() {
    let result = NewtonCotes(-2, 2, fx, 2, false)
    console.log(result);
}