//PARA IMPORTAR FUNCAO, NÃO PRECISA DE { }
//SE IMPORTAR ARQUIVO TODO, USA { }
//import imprimeCotacao from "./imprimeCotacao.js";
import selecionaCotacao from "./imprimeCotacao.js";

//USANDO O CHART JS COMO GRÁFICO
const graficoDolar = document.getElementById('graficoDolar');

const graficoParaDolar = new Chart (graficoDolar, {
    type: 'line', //TIPOS DE GRÁFICO - EM LINHA
    data: {
      labels: [], //LABELS => LEGENDA ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], // CORES DO GRÁFICO
      datasets: [{
        label: 'Dólar',
        data: [], //REMOVER OS DADOS DE VALORES QUE VEM PADRÃO[12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
 
});

//PODE APAGAR ESSE TRECHO, PORQUE SERA USADO PELO WORKER DOLAR - SIMUTHREADS

//PARA CHAMAR O CÓDIGO A CADA 5 SEGUNDOS;
//setInterval(() => conectaAPI(), 5000);

//PARA CONECTAR COM A API
/*async function conectaAPI() {
  const conecta = await fetch ("https://economia.awesomeapi.com.br/json/last/USD-BRL");
  const conectaConvertido = await conecta.json();
  //PARA TESTAR console.log(conectaConvertido);
  let tempo = geraHorario();
  let valor = conectaConvertido.USDBRL.ask;
  adicionarDados(graficoParaDolar, tempo, valor)
  
  //CHAMAR A FUNCAO AQUI DENTRO PARA RENDERIZAR NA TELA
  imprimeCotacao("dólar", valor);
}*/

function geraHorario() {
    let data = new Date();
    let horario = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
    return horario;
}
//geraHorario(); USAR ESSA FUNÇÃO EM OUTRA FUNÇÃO

function adicionarDados(grafico, legenda, dados) {
  grafico.data.labels.push(legenda);
  grafico.data.datasets.forEach((dataset) => {
    dataset.data.push(dados)
  })
  //NA DOCUMENTAÇÃO DO CHART JS, PEDE PARA FAZER O GRAFICO UPDATE
  grafico.update();
}

//WEB WORKER SERVE PARA EXECUTAR SCRIPTS EM THREADS EM 2° PLANO
//DEPOIS DE CRIADO, UM TRABALHADOR PODE ENVIAR VÁRIAS MENSAGENS PARA O CÓDIGO
//JAVASCRIPT QUE O CRIOU E VICE-VERSA
let workerDolar = new Worker('./js/workers/workerDolar.js');
//POST MESSAGE ENVIA A MENSAGEM
workerDolar.postMessage('usd');
//addEventListener RECEBE A MENSAGEM
workerDolar.addEventListener("message", event => {
  let tempo = geraHorario();
  let valor = event.data.ask;
  selecionaCotacao("dolar", valor);

  //ADICIONAR DADOS NO GRÁFICO
  adicionarDados(graficoParaDolar, tempo, valor);
})


//PARA FAZER O GRÁFICO DA COTAÇÃO DO EURO
const graficoEuro = document.getElementById('graficoEuro');
const graficoParaEuro = new Chart (graficoEuro, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Euro',
      data: [],
      borderWidth: 1
    }]
  }
});

let workerEuro = new Worker('./js/workers/workerEuro.js');
workerEuro.postMessage("euro");

workerEuro.addEventListener("message", event => {
  let tempo = geraHorario();
  let valor = event.data.ask;
  //ADICIONAR DADOS NO GRÁFICO
  adicionarDados(graficoParaEuro, tempo, valor);
  selecionaCotacao("euro", valor);
  
})
