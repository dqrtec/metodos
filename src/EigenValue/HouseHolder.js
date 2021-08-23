let Matriz = require('../Matriz/Matriz')

let ex = [
    [40, 8, 4, 2, 1],
    [8, 30, 12, 6, 2],
    [4, 12, 20, 1, 2],
    [2, 6, 1, 25, 4],
    [1, 2, 2, 4, 5]
]

function metodoHouseHolder(a, n) {
    let H = new Matriz().I(n)
    let A = new Matriz(a)

    for (let i = 0; i < n - 2; i++) {
        let Hi = matrizHouseholderBaseadaNaCol_iDaMatrizDoPassoAnterior(A, i)

        console.log(Hi)

        A = Hi.T().Pm(A.Pm(H))

        H = H.Pm(Hi)
    }

    return { A, H }
}

function matrizHouseholderBaseadaNaCol_iDaMatrizDoPassoAnterior(A, i) {
    let n = A.n()
    let w = []
    let w_ = []
    let e = []

    for (let index = 0; index < n; index++) {
        w.push([0])
        w_.push([0])
        e.push([0])
    }
    w = new Matriz(w)
    w_ = new Matriz(w_)
    e = new Matriz(e)

    for (let index = i + 1; index < n; index++) {
        w._matriz[index][0] = A._matriz[index][i]
    }

    let Lw = w.comprimento()

    w_._matriz[i + 1] = [Lw]

    let N = w.subtrair(w_)

    let H = new Matriz().I(n)


    let _2NNT = N.Pm(N.T()).Me(2)

    H = H.subtrair(_2NNT)

    return H
}

metodoHouseHolder(ex, ex.length)