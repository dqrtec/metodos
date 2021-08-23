import React, { useEffect } from 'react'
import * as d3 from 'd3'
import { Solve } from '../Integral/tarefa14';
import 'katex/dist/katex.min.css'
import Latex from 'react-latex-next'

export default class Tarefa14 extends React.Component {
    myRef: React.RefObject<HTMLDivElement>;
    formula: any;
    isSimple: boolean;
    formula2: string;

    constructor(props: any) {
        super(props)
        this.myRef = React.createRef();

        this.formula = "$ \\int_{-1}^{1} \\frac{dx}{\\sqrt[3]{x}}  $";
        this.isSimple = true;
        this.formula2 = "$dx = \\frac {b-(-a)}{2 \\cosh{x}^2} $ $x=y$"
    }
    componentDidMount() {
    }
    render() {
        return (<>
            Selecione o exemplo 
            <select>
                <option value='1'>Exemplo 1</option>
                <option value='2'>Exemplo 2</option>
            </select>
            <br />
            <Latex>{this.formula}</Latex>

            <p>Iremos mudar a variável dessa integral para a exponencial {this.isSimple? "Simples" : "Dupla" }</p>
            lembrando que<br/>  
            <Latex>{this.formula2}</Latex>
        </>);
    }
}