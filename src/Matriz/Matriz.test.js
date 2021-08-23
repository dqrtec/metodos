let Matriz = require('./Matriz')

//T
test("Matriz, Transposta", () => {
    let matrizA = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    let A = new Matriz(matrizA)
    A.T()
    expect(A.T()._matriz).toEqual([[1, 4, 7], [2, 5, 8], [3, 6, 9]]);
})

test("Matriz, Transposta assimetrica", () => {
    let matrizA = [[1, 2, 3], [4, 5, 6]]
    let A = new Matriz(matrizA)
    A.T()
    expect(A.T()._matriz).toEqual([[1, 4], [2, 5], [3, 6]]);
})

test("Vetor, Transposto", () => {
    let matrizA = [[1], [5]]
    let A = new Matriz(matrizA)
    A.T()
    expect(A.T()._matriz).toEqual([[1, 5]]);
})

test("Vetor, Transposto duplo", () => {
    let matrizA = [[1, 5]]
    let A = new Matriz(matrizA)
    A.T()
    expect(A.T()._matriz).toEqual([[1], [5]]);
})

//I
test("Identidade", () => {
    let A = new Matriz()
    expect((A.I(3))._matriz).toEqual([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
})

//multiplicacao escalar
test("Identidade x escalar", () => {
    let A = new Matriz().I(3).Me(5)
    expect(A._matriz).toEqual([[5, 0, 0], [0, 5, 0], [0, 0, 5]])
})

test("matriz x escalar", () => {
    let A = new Matriz([[1, 2, 3], [4, 5, 6], [7, 8, 9]]).Me(5)
    expect(A._matriz).toEqual([[5, 10, 15], [20, 25, 30], [35, 40, 45]])
})

test("vetor x escalar", () => {
    let A = new Matriz([[2], [3], [5]]).Me(5)
    expect(A._matriz).toEqual([[10], [15], [25]])
})

//produto Matricial resultado Escalar
test("vetor T x vetor", () => {
    let A = new Matriz([[2], [3], [5]]).T()
    let B = new Matriz([[2], [3], [5]])
    expect(A.Pe(B)).toEqual(4 + 9 + 25)
})

//produto Matricial resultado Matriz
test("Matriz x vetor", () => {
    let A = new Matriz([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
    let B = new Matriz([[3, 7, 10], [-5, -3, -8], [20, 25, 50]])
    expect(A.Pm(B)._matriz).toEqual([[53, 76, 144], [107, 163, 300], [161, 250, 456]])
})

test("Matriz x vetor", () => {
    let A = new Matriz([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
    let B = new Matriz([[3, 7], [-5, -3], [20, 25]])
    expect(A.Pm(B)._matriz).toEqual([[53, 76], [107, 163], [161, 250]])
})

// decompose LU
test("decompose LU", () => {
    let A = new Matriz([[3, 2, 4], [1, 1, 2], [4, 3, 2]])
    expect(A.LUDecompose()).toEqual([[[1, 0, 0], [(1 / 3).toFixed(6), 1, 0], [(4 / 3).toFixed(6), (1).toFixed(6), 1]], [[3, 2, 4], [(0).toFixed(6), (1 / 3).toFixed(6), (2 / 3).toFixed(6)], [(0).toFixed(6), (0).toFixed(6), (-4).toFixed(6)]]])
})

// solve LU
test("Solve LU", () => {
    let LU = new Matriz([[3, 2, 4], [1, 1, 2], [4, 3, 2]]).LUDecompose()
    let Lower = new Matriz(LU[0])
    let Upper = new Matriz(LU[1])
    let y = new Matriz([[1, 2, 3]]).T()

    let result = new Matriz().solveLU(Lower, Upper, y).T()._matriz

    expect(result).toEqual([[(-3).toFixed(4)], [(5).toFixed(4)], [(0).toFixed(4)]])
})