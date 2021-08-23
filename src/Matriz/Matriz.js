module.exports = class Matriz {
    constructor(matriz) {
        this._matriz = matriz
    }
    n() {
        return this._matriz[0].length
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
        return new Matriz(result)
    }
    I(n) {
        let result = []
        for (let i = 0; i < n; i++) {
            let row = []
            for (let j = 0; j < n; j++) {
                row.push(i == j ? 1 : 0)
            }
            result.push(row)
        }
        this._matriz = result
        return new Matriz(result)
    }
    Me(escalar) {
        return new Matriz(this._matriz.map((row) => {
            return row.map((cell) => {
                return cell * escalar
            })
        })
        )
    }

    Pe(m2v) {
        let m1 = this._matriz;
        let m2 = m2v._matriz;
        let result = 0;
        for (let i = 0; i < m1[0].length; i++) {
            result += m1[0][i] * m2[i][0];
        }
        return result
    }

    Pm(mv2) {
        let m2 = mv2._matriz
        let result = this._matriz.map((row, indexRow) => {
            let resultLine = []
            for (let indexColB = 0; indexColB < m2[0].length; indexColB++) {
                let somatorio = row.reduce((valorAcumulado, valorAtual, indexRowB) => {
                    return valorAcumulado + (valorAtual * m2[indexRowB][indexColB])
                }, 0)
                resultLine.push(somatorio)
            }
            return resultLine
        });
        return new Matriz(result)
    }

    LUDecompose() {
        let result = []

        let size = this.n()
        let m1 = this._matriz
        let L = this.I(size)._matriz


        for (let i = 0; i < size - 1; i++) {
            let pivo = m1[i][i]
            for (let i2 = i + 1; i2 < size; i2++) {
                let multiplicador = m1[i2][i] / pivo
                L[i2][i] = multiplicador.toFixed(6)
                // console.log(`${i2} ${i} [${L}]`)
                // console.log(`  `)
                for (let j = i; j < size; j++) {
                    m1[i2][j] = (m1[i2][j] - (multiplicador * m1[i][j])).toFixed(6)
                }
            }
            // console.log(i)
        }

        return [L, m1]
    }

    solveLU(lower, upper, y) {
        let result = []
        let size = lower.n()

        let ml = lower._matriz
        // result.push(y._matriz[0][0])

        for (let indexVariavel = 0; indexVariavel < size; indexVariavel++) {
            let somatorio = y._matriz[indexVariavel][0]
            for (let index = indexVariavel; index > 0; index--) {
                somatorio -= ml[indexVariavel][index - 1] * result[index - 1]
            }
            result.push(somatorio)
        }

        let mu = upper._matriz
        let b = []
        for (let indexVariavel = size - 1; indexVariavel >= 0; indexVariavel--) {
            let somatorio = result[indexVariavel]

            for (let index = 0; index < size - indexVariavel - 1; index++) {
                somatorio -= mu[indexVariavel][size - index - 1] * b[index]
            }
            somatorio /= mu[indexVariavel][indexVariavel]
            b.push((somatorio).toFixed(4))
        }



        return new Matriz([b.reverse()]).T()
    }

    comprimento() {
        return Math.sqrt(this.T().Pe(this))
    }

    normalizar() {
        let divisor = this.comprimento()//Math.sqrt(this.T().Pe(this))
        let result = this.Me(1 / divisor)
        return result
    }

    subtrair(mv2) {
        let m1 = this._matriz
        let m2 = mv2._matriz
        let size = m1.length

        let result = []

        for (let i = 0; i < size; i++) {
            let rowResult = []
            for (let j = 0; j < m1[i].length; j++) {
                rowResult.push(m1[i][j] - m2[i][j])
            }
            // console.log(size);
            result.push(rowResult)
        }

        return new Matriz(result)
    }
}