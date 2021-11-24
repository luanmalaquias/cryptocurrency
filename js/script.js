document.getElementById("plataformas").hidden = true

const fetchBitcoin = () => {
    const urlUsd = 'https://api.cryptonator.com/api/full/btc-usd'
    const urlBrl = 'https://api.cryptonator.com/api/full/btc-brl'

    function fetchDoubleUrl(url, local, moeda){
        fetch(url).then(response => response.json()).then(bitcoin => {
            // adicionando os valores no card
            list = fixList(bitcoin)
            document.getElementById("price"+local).textContent = list[0]["price"] 
            document.getElementById("platform"+local).textContent = list[0]["market"]
    
            // adicionando os valores na tabela
            for(var i=0; i<list.length; i++){
                var tabela = document.getElementById("tabela"+local);
                var numeroLinhas = tabela.rows.length;
                var linha = tabela.insertRow(numeroLinhas);
                var celula1 = linha.insertCell(0);
                var celula2 = linha.insertCell(1);   
                var celula3 = linha.insertCell(2); 
                celula1.innerHTML = list[i]["market"]
                celula2.innerHTML =  moeda + " " + list[i]["price"] + " " + local
                celula3.innerHTML =  moeda + " " + list[i]["volume"] + " " + local
            }
        })
    }

    fetchDoubleUrl(urlUsd, 'Usd', '$')
    fetchDoubleUrl(urlBrl, 'Brl', 'R$')

}

function fixList(listJson){
    list = listJson["ticker"]["markets"]

    // organizando a lista em ordem crescente
    for(var i=0; i<list.length; i++){
        for(var j=0; j<list.length-1-i; j++) {
            if(parseFloat(list[j]['price']) > parseFloat(list[j + 1]['price'])) {
                var aux = list[j];
                list[j] = list[j + 1];
                list[j + 1] = aux;
            }
        }
    }

    // removendo casas decimais
    for(var i=0; i<list.length; i++){

        var item = list[i]['price']
        item = parseFloat(item).toLocaleString("pt-br", {minimumFractionDigits: 2 , style: 'currency', currency: 'BRL'})
        item = item.replace("R$","")
        list[i]['price'] = item


        item = list[i]['volume']
        item = item.toLocaleString("pt-br", {minimumFractionDigits: 2 , style: 'currency', currency: 'BRL'})
        item = item.replace("R$","")
        list[i]['volume'] = item
    }    

    return list
}

fetchBitcoin()

function hideComponent(elemento){
    if(elemento == "principal"){
        document.getElementById("principal").hidden = true
        document.getElementById("canvas").hidden = true
        document.getElementById("plataformas").hidden = false
    }else{
        document.getElementById("principal").hidden = false
        document.getElementById("canvas").hidden = false
        document.getElementById("plataformas").hidden = true
    }
}

function visitSite(elementId){
    var search = "https://www.google.com/search?q=Bitcoin+" + document.getElementById(elementId).textContent
    window.open(search, '_blank').focus();
    console.log("clicou")
}