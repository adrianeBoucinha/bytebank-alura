//addEventListener RECEBE A MENSAGEM
addEventListener("message", event => {
    conectaAPI();
    setInterval(() => conectaAPI(), 5000);
});

async function conectaAPI() {
    const conecta = await fetch ('https://economia.awesomeapi.com.br/last/EUR-BRL');
    const conectaConvertido = await conecta.json();
    postMessage(conectaConvertido.EURBRL);
}