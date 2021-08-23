let Matriz = require('../Matriz/Matriz')

let ex1 = [[5, 2, 1], [2, 3, 1], [1, 1, 2]]

function potenciaDeslocado(matrizA, v0, u, e = 10 ** -6) {
    let A = new vector(matrizA)
    let v = new vector(v0)

    let a = A - u * I
    let { l, x } = potenciaInversa(a, v0, e)
    l = l + u
    return { l, x }
}

function potenciaInversa(matrizA, v0, e = 10 ** -6) {
    //1
    let A = new Matriz(matrizA)
    let v = new Matriz(v0)
    
    //2
    let LU = A.LUDecompose()
    let L = new Matriz(LU[0])
    let U = new Matriz(LU[1])
    
    //3
    let lambda_novo = 0
    
    //4
    let v_novo = v
    
    let lambda_velho = lambda_novo;
    let v_velho = v_novo
    do {
        //5
        lambda_velho = lambda_novo
        
        //6
        v_velho = v_novo
        
        //7
        let x_velho = v_velho.normalizar();
        
        //8
        v_novo = new Matriz().solveLU(L, U, x_velho)
        console.log( v_novo )

        //9
        lambda_novo = x_velho.T().Pe(v_novo)

        //10
    } while (diferencaRelativa(lambda_novo, lambda_velho) > e);

    lambda = 1 / lambda_novo;
}

function diferencaRelativa(valorNovo, valorAntigo) {
    return Math.abs((valorNovo - valorAntigo) / valorNovo)
}

potenciaInversa(ex1, [[1], [1], [1]])