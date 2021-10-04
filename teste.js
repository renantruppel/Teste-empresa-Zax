/*Não foi especificado o número máximo de atendimentos que cada motoboy pode fazer e nem uma 
regra de distribuição para os motoboys, apenas que nenhum deles poderiam ficar sem pedidos
e a prioridade do motoboy 4 com a loja 1.
Logo o motoboy 4 entregará para a loja 1
e as outras duas lojas entregarão seus pedidos aos restantes dos motoboys
*/

const motoboys = [
    {
        num: 1,
        custoPorEntrega: 2,
        exclusividades: [],
        entregas: [],
        receitaTotal: 0
    },
    {
        num: 2,
        custoPorEntrega: 2,
        exclusividades: [],
        entregas: [],
        receitaTotal: 0
    },
    {
        num: 3,
        custoPorEntrega: 2,
        exclusividades: [],
        entregas: [],
        receitaTotal: 0 
    },
    {
        num: 4,
        custoPorEntrega: 2,
        exclusividades: ['loja01'],
        entregas: [],
        receitaTotal: 0 
    },
    {
        num: 5,
        custoPorEntrega: 2,
        exclusividades: [],
        entregas: [],
        receitaTotal: 0 
    }
]

const lojas = [
    {
        nome: 'loja01' ,
        comissaoEmPorcentagem:0.05,
        motoboysComPrioridade: [4],
        ValoresDosPedidos: [
            50,50,50
        ]
    },
    {
        nome: 'loja02' ,
        comissaoEmPorcentagem:0.05,
        motoboysComPrioridade: [],
        ValoresDosPedidos: [
            50,50,50
        ]
    },
    {
        nome: 'loja03' ,
        comissaoEmPorcentagem: 0.15,
        motoboysComPrioridade: [],
        ValoresDosPedidos: [
            50,50,50
        ]
    }
]

/*Checando se algum motoboy ficará sem pedido para anular prioridade de entregas*/
function checarMotoboySemPedido(totalEntregas) {
    let motoboysSemEntrega = 0
    for (let motoboy in motoboys) {    
        if(motoboys[motoboy].entregas.count === 0) {
            motoboysSemEntrega += 1 
        }
    }
    if (totalEntregas > motoboysSemEntrega) {
        console.log('false')
        return false
    }
    return true
}


function aplicarEntrega(loja, motoboyEscolhido, pedido) {
    for (let motoboy in motoboys) {
        console.log(motoboyEscolhido)
        if(motoboys[motoboy].num === motoboyEscolhido) {
            motoboys[motoboy].entregas.push({
                numMotoboy: motoboys[motoboy].num,
                lojaContratante: lojas[loja].nome,
                valor: motoboys[motoboy].custoPorEntrega + 
                (lojas[loja].ValoresDosPedidos[pedido]*lojas[loja].comissaoEmPorcentagem),

            })
        }
    }
}

//definindo a prioridade do motoboy de uma loja
function indexPrioridadeMotoboy(loja, indexMotoboy) {
    if(indexMotoboy && indexMotoboy + 1 < lojas[loja].motoboysComPrioridade) {
        indexMotoboy += 1
        return indexMotoboy
    }
    else {
        return 0
    }
}

function distribuirEntregas(totalEntregas) {
    let proxMotoboy = 1 
    for (let loja in lojas) {

        let indexPrioridade = null
        for (let pedido in lojas[loja].ValoresDosPedidos) {
            if(lojas[loja].motoboysComPrioridade.length > 0 && checarMotoboySemPedido(totalEntregas) === false) {           
                indexPrioridade = indexPrioridadeMotoboy(loja, indexPrioridadeMotoboy)          
                aplicarEntrega(loja, lojas[loja].motoboysComPrioridade[indexPrioridade], pedido)
            }
            else {
                aplicarEntrega(loja, proxMotoboy, pedido)
                if(proxMotoboy === 5) {
                    proxMotoboy = 1
                }
                else {
                    proxMotoboy += 1
                }
            }
            totalEntregas -= 1
        }
    }

    for (let motoboy in motoboys) {


        console.log("Receitas do motoboy - " + motoboys[motoboy].num)

        for(let entrega in motoboys[motoboy].entregas) {
            console.log("loja contratante: " + motoboys[motoboy].entregas[entrega].lojaContratante)
            console.log("valor recebido: " + motoboys[motoboy].entregas[entrega].valor)
            motoboys[motoboy].receitaTotal += motoboys[motoboy].entregas[entrega].valor
        }
        console.log("receita total: " + motoboys[motoboy].receitaTotal + " \n")      
    }
}


//aqui inicio dizendo que há 10 entregas a serem feitas
distribuirEntregas(10)
