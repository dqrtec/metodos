let Matriz = require('../Matriz/Matriz')

let ex = [
    [40, 8, 4, 2, 1],
    [8, 30, 12, 6, 2],
    [4, 12, 20, 1, 2],
    [2, 6, 1, 25, 4],
    [1, 2, 2, 4, 5]
]

function Jacobi(A, e = 10 ** -6) {
    let a = new Matriz(A)
    let n = a.n()

    let Lamb = []
    for (let i = 0; i < n; i++) {
        Lamb.push([0])
    }
    Lamb = new Matriz(Lamb)

    let val = 100

    let P = new Matriz().I(n)
    let a_velho = a

    while (val > e) {
        console.log(val);

        a_novoJ = varreduraDeJacobi(a_velho);
        let a_novo = a_novoJ[0]
        let J = a_novoJ[1]
        a_velho = a_novo

        P = P.Pm(J)

        val = somaDosQuadradosDosTermosAbaixoDaDiagonal(a_novo)
    }

    Lamb = a_velho._matriz.map((element, index) => {
        return element[index]
    })

    return [P, Lamb]
}

function varreduraDeJacobi(a) {
    let n = a._matriz.length

    let J = new Matriz().I(n)
    let a_velho = a

    for (let j = 1; j < n - 1; j++) {
        for (let i = j + 1; i < n; i++) {
            let Jij = matrizJacobiBaseadaNoElemento_ij_DaMatrizVelha(a, i, j, n)


            let a_novo = Jij.T().Pm(a_velho.Pm(Jij))
            a_velho = a_novo
            J = J.Pm(Jij)
        }
    }
    return [a_velho, J]
}

function matrizJacobiBaseadaNoElemento_ij_DaMatrizVelha(a, i, j) {
    let n = a.n()
    let Jij = new Matriz().I(n)
    let e = 10 ** -6

    let teta = 0

    if (Math.abs(a._matriz[i][j]) < e) {
        return Jij
    }
    else if (Math.abs(a._matriz[i][i] - a._matriz[j][j]) <= e) {
        teta = Math.PI / 4
    }
    else {
        let angulo = (-2 * a._matriz[i][j]) / (a._matriz[i][i] - a._matriz[j][j])
        teta = Math.atan(angulo) / 2
    }

    Jij._matriz[i][i] = Math.cos(teta)
    Jij._matriz[j][j] = Math.cos(teta)
    Jij._matriz[i][j] = Math.sin(teta)
    Jij._matriz[j][i] = Math.sin(teta) * -1

    return Jij
}

function somaDosQuadradosDosTermosAbaixoDaDiagonal(a_novo) {
    let matriz = a_novo._matriz
    let n = a_novo._matriz.length

    let somatorio = 0
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (i > j) {
                somatorio += Math.pow(matriz[i][j], 2)
            }
        }
    }
    return somatorio
}

Jacobi(ex)