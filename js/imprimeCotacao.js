const lista = document.querySelectorAll('[data-lista]');

function selecionaCotacao (nome, valor) {
    lista.forEach((listaEscolhida) => {
        if(listaEscolhida.id == nome) {
            imprimeCotacao(listaEscolhida, nome, valor);
        }
    })
}

            //NOME DA MOEDA, VALOR QUE ESTA NO MOMENTO
function imprimeCotacao(lista, nome, valor) {
    lista.innerHTML = "";

    const plurais = { 
        "dolar": "dolares",
        "euro": "euros"
    }

    //MULTIPLICADOR SERIA O DOLAR, ENQUANTO DOLAR <=1000, MULTIPLICADO * 10, PARA CHEGAR NO VALOR EM R$ 
    for(let multiplicador = 1; multiplicador <= 1000; multiplicador *= 10) {
        const listaItem = document.createElement('li');
        //PARA APARECER NA TELA, VALOR DO DOLAR : R$ VALOR EM REAIS  //FAZER EM PLURAL
        let atual = ((valor * multiplicador).toFixed(2));
        let atualConvertido = new Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(atual);
        listaItem.innerHTML = `${multiplicador} ${multiplicador == 1 ? nome : plurais[nome]}: ${atualConvertido}`;
        lista.appendChild(listaItem);

    }
}

export default selecionaCotacao;