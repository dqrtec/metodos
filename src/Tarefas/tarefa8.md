# Aula 15 - Calculo de Área - Tarefa 8

Iremos detalhar os passos necessários para calcular a área sobre a região $U = \{(x,y) ∈ \frac{x^2}{1600} + \frac{y^2}{1600} ≤ 1\}$

## Passo 1
Note que a fórmula que compoe U coincide com a fórmula da Elipse. Para facilitar os cálculos, faremos uma mudança de variável.

Ao invés de duas integrais definidas (uma para a variável *x* e outra *y*) utilizaremos as variáveis **α** e **β** onde variam de $[0,1]$ e $[0,2π]$ . Note que para fazer justa correlação entre as duas variáveis temos a seguinte formula: 
${x}\choose{y}$ = ${40α \cos{β}}\choose{ 40α \sin{β} }$

Basta fazer a mudança de variável Jacobbiana.
$$
\int_{ 0 }^{1} \int_{ 0 }^{2π} |J| dΩ
$$
onde Ω = dα.dβ. E J = 1600α.
Ficando:
$$
\int_{ 0 }^{1} \int_{ 0 }^{2π} 1600 *α * dα dβ
$$

## Passo 2
Iremos realizar uma segunda mudança de variável de modo a preparar para aplicar Gauss-Legendre. Para isso, precisamos que as novas variáveis estejam entre $[-1,1]$ para tanto utilizaremos a seguinte transformação:

${x(α,β)}\choose{y(α,β)}$ = ${ \frac{0+1}{2}+\frac{1-0}{2} α}\choose{ \frac{0+2π}{2} + \frac{2π-0}{2} β }$ = ${ \frac{α+1}{2} }\choose{ (β+1)π }$

Com isso temos: $|J|$ = $\frac{π}{2}$ e Ω = dx.dy
ficando:
$$
\int_{ -1 }^{1} \int_{ -1 }^{1} \sqrt{ (0.4)^2*(x^2+y^2)+1 } * 1600 * \frac{π}{2} dx dy
$$

## Passo 3 - Aplicando Gauss
Utilizaremos 3 direções em Gauss-Legendre temos os seguintes $w=\{ \frac{5}{9},\frac{8}{9}\}$ e x,y =$\{ -\sqrt\frac{3}{5}, 0, \sqrt\frac{3}{5}\}$

|x,y|ww|g(x,y)|ww*g()|1600*$\frac{π}{2}$|
|-|-|-|-|-|
|$-\sqrt\frac{3}{5}$,$-\sqrt\frac{3}{5}$|$\frac{5}{9}*\frac{5}{9}$|2.061|0.63|-|
|0,$-\sqrt\frac{3}{5}$|$\frac{5}{9}*\frac{8}{9}$|8.06|3.98|-|
|$\sqrt\frac{3}{5}$,$-\sqrt\frac{3}{5}$|$\frac{5}{9}*\frac{5}{9}$|14.23|4.39|-|
|$-\sqrt\frac{3}{5}$,0|$\frac{5}{9}*\frac{8}{9}$|2.06|1.01|-|
|0,0|$\frac{8}{9}*\frac{8}{9}$|8.06|6.37|-|
|$\sqrt\frac{3}{5}$,0|$\frac{5}{9}*\frac{8}{9}$|14.23|4.39|-|
|$\sqrt\frac{3}{5}$,$\sqrt\frac{3}{5}$|$\frac{5}{9}*\frac{5}{9}$|14.23|4.39|-|
|0,$\sqrt\frac{3}{5}$|$\frac{5}{9}*\frac{8}{9}$|8.062|3.98|-|
|$\sqrt\frac{3}{5}$,$\sqrt\frac{3}{5}$|$\frac{5}{9}*\frac{5}{9}$|14.23|4.39|-|
|-|-|-|-|53924.00|

# Código
```py
def r_to_alfa(r):
	return (1)/2 + (1)*r/2
def s_to_beta(s):
	return math.pi + math.pi*s
```
```py
def x(alfa, beta):
	return 40*alfa*math.cos(beta)
def y(alfa, beta):
	return 40*alfa*math.sin(beta)
```
```py
v = [-math.sqrt(3/5),  0, math.sqrt(3/5)]
w = [5/9,  8/9,  5/9]
```
```py
somatorio = 0
for index1, r in  enumerate(v):
	for index2, s in  enumerate(v):
		soma = g(r,s) *w[index1]*w[index2] * 1600 #* r_to_alfa(r)
	somatorio += soma
somatorio *= math.pi/2
```