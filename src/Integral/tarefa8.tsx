// Newton - Cotes

export var allArguments = [[1, true], [2, true], [3, true], [1, false], [2, false], [3, false]]
var errAcept = 0.000001

// function fx(x) {
//     return Math.pow(Math.sin(2 * x) + 4 * x * x + 3 * x, 2);
// }

function trapezio(fx: any, xi: number, dx: number, closed = true) {
    if (closed) {
        let x1 = fx(xi)
        let x2 = fx(xi + dx)
        let value = (x2 + x1) * dx / 2;
        return value;
    } else {
        let h = dx / 3;
        let x1 = fx(xi + h)
        let x2 = fx(xi + 2 * h)
        return (x1 + x2) * dx / 2;
    }
}

function simpson(fx: any, xi: number, dx: number, closed = true) {
    if (closed) {
        let h = dx / 2;
        let x1 = fx(xi)
        let x2 = fx(xi + h)
        let x3 = fx(xi + h * 2)
        return (x1 + 4 * x2 + x3) * h / 3;
    } else {
        let h = dx / 4;
        let x1 = fx(xi + h)
        let x2 = fx(xi + 2 * h)
        let x3 = fx(xi + 3 * h)
        return (2 * x1 - x2 + 2 * x3) * 4 * h / 3;
    }
}

function simpson3(fx: any, xi: number, dx: number, closed = true) {
    if (closed) {
        let h = dx / 3;
        let x1 = fx(xi)
        let x2 = fx(xi + h)
        let x3 = fx(xi + h * 2)
        let x4 = fx(xi + h * 3)
        return (x1 + 3 * x2 + 3 * x3 + x4) * 3 * h / 8;
    } else {
        let h = dx / 5;
        let x1 = fx(xi + h)
        let x2 = fx(xi + 2 * h)
        let x3 = fx(xi + 3 * h)
        let x4 = fx(xi + 4 * h)
        return (11 * x1 + x2 + x3 + 11 * x4) * 5 * h / 24;
    }
}

var dictFx: any = { 1: trapezio, 2: simpson, 3: simpson3 }

function discoveriDx(xi: number, xf: number, qtdDivision: number) {
    let dx = (xf - xi) / qtdDivision;
    return dx;
}

export function NewtonCotes(xi: number, xf: number, fx: any, grau: number, isClosed: boolean) {
    let fInterpol = dictFx[grau];
    let leastResult = 0;
    let diferenceResults = errAcept;
    let qtdDivision = 1;

    while (diferenceResults >= errAcept) {
        qtdDivision += 1;
        let dx = discoveriDx(xi, xf, qtdDivision)

        let result = 0;
        for (let index = 0; index < qtdDivision; index++) {
            result += fInterpol(fx, xi + dx * index, dx, isClosed);
        }

        if (isNaN(result)) {
            continue;
        }

        diferenceResults = Math.abs(result - leastResult)
        leastResult = result
    }

    return { qtdDivision, leastResult }
}

// export { NewtonCotes, allArguments }