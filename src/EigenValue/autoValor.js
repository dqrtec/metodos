let ex1 = [[5, 2, 1], [2, 3, 1], [1, 1, 2]]
let ex2 = [
    [40, 8, 4, 2, 1],
    [8, 30, 12, 6, 2],
    [4, 12, 20, 1, 2],
    [2, 6, 1, 25, 4],
    [1, 2, 2, 4, 5],
]

function PotenciaRegular(A, v0, e = 10 ** -10) {//1
    let valor = e; //2
    let vk = new vetor([v0])//3
    let a = new vetor(A)

    let dif = e
    let valor_velho
    let v_velho
    let interacao = 0;
    while (dif >= e && interacao++ != 100000) {

        valor_velho = valor //4
        v_velho = vk//5
        let x = normalizar(v_velho)//6

        vk = a.Pm(x) //7

        valor = x.Pe(vk)//8
        dif = Math.abs((valor - valor_velho) / valor_velho)
    }
    console.log(valor)
    console.log( normalizar(vk) )
    return {}
}

function normalizar(vetor) {
    return vetor.Me(1 / Math.sqrt( vetor.Pe(vetor) ) )
}

class vetor {
    constructor(matriz) {
        this._matriz = matriz
    }

    n() {
        return this._matriz.length
    }

    T() {
        let n_matriz = this.n()
        let result = []
        for (let index = 0; index < n_matriz; index++) {
            result.push([])
        }
        this._matriz.forEach(element => {
            for (let index = 0; index < element.length; index++) {
                result[index].push(element[index])
            }
        });
        return new vetor(result)
    }

    Pe(m2v) {
        let m1 = this._matriz;
        let m2 = m2v._matriz;
        let result = 0;
        for (let i = 0; i < m1.length; i++) {
            let row = m1[i];
            for (let j = 0; j < row.length; j++) {
                result += row[j] * m2[0][j];
            }
        }
        return result
    }

    Pm(m2) {
        let result = this._matriz.map((row) => {

            return row.reduce((acumulado, atual, index) => {

                return acumulado + (atual * m2._matriz[0][index])
            }, 0)
        });
        return new vetor([result])
    }

    Me(escalar) {
        return new vetor(this._matriz.map((row) => {
            return row.map((cell) => {
                return cell * escalar
            })
        })
        )
    }
}

PotenciaRegular(ex1, [1, 1, 1])