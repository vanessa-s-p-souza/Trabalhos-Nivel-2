function add() {
    var inputValor = document.getElementById('valor');
    var valor = inputValor.value;

    if (valor !== '') {
        adicionarItemNaLista('valores', valor);
        inputValor.value = ''; // Limpar o campo após adicionar
    }
}

function adicionarItemNaLista(listaId, valor) {
    var lista = document.getElementById(listaId);
    var novoItem = document.createElement('li');
    novoItem.textContent = valor;
    lista.appendChild(novoItem);
}

function ordenar() {
    var metodoOrdenacao = document.getElementById('metodoOrdenacao').value;
    var lista = document.getElementById('valores');
    var valores = [];

    // Coletar valores da lista
    for (var i = 0; i < lista.children.length; i++) {
        valores.push(parseInt(lista.children[i].textContent));
    }

    // Chamar a função de ordenação selecionada
    if (metodoOrdenacao === 'bubbleSort') {
        bubbleSort(valores);
    } else if (metodoOrdenacao === 'selectionSort') {
        selectionSort(valores);
    } else if (metodoOrdenacao === 'quickSort') {
        valores = quickSort(valores);
    }

    // Atualizar a lista com os valores ordenados
    for (var i = 0; i < lista.children.length; i++) {
        lista.children[i].textContent = valores[i];
    }
}

// Função de ordenação Bubble Sort
function bubbleSort(array) {

    var n = array.length;
    var swapped;
    do {
        swapped = false;

        for (var i = 0; i < n - 1; i++) {
            if (array[i] > array[i + 1]) {
                // Troca os elementos se estiverem fora de ordem
                var temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapped = true;
            }
        }

        // Após uma iteração completa, o maior elemento está no final, então podemos reduzir o tamanho da próxima iteração
        n--;
    } while (swapped);

    return array;
}

// Função de ordenação Selection Sort
function selectionSort(array) {

    var n = array.length;
    for (var i = 0; i < n - 1; i++) {
        // Encontrar o índice do menor elemento no restante do array
        var minIndex = i;

        for (var j = i + 1; j < n; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }

        // Trocar o menor elemento encontrado com o primeiro elemento não ordenado
        var temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;
    }

    return array;
}

// Retornando as funções que serão expostas para uso externo

function quickSort(array) {

    console.log(array)
    if (array.length <= 1) {
        return array;
    }

    var pivot = array[0];

    var left = [];
    var right = [];

    for (var i = 1; i < array.length; i++) {
        array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
    }

    return quickSort(left).concat(pivot, quickSort(right));

};

// Função para embaralhar um array
function shuffle(array) {

    var shuffledArray = array.slice();

    for (var i = shuffledArray.length - 1; i > 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var temp = shuffledArray[i];
        shuffledArray[i] = shuffledArray[randomIndex];
        shuffledArray[randomIndex] = temp;
    }

    return shuffledArray;
}


function misturar() {
    var metodoOrdenacao = document.getElementById('metodoOrdenacao').value;
    var lista = document.getElementById('valores');
    var valores = [];


    // Coletar valores da lista
    for (var i = 0; i < lista.children.length; i++) {
        valores.push(parseInt(lista.children[i].textContent));
    }

    // Chamar a função de ordenação selecionada
    shuffle(valores);

    // Atualizar a lista com os valores ordenados
    for (var i = 0; i < lista.children.length; i++) {
        lista.children[i].textContent = valores[i];
    }

    // a) Capturar a lista de valores via getElementById
    var listaValores = document.getElementById('valores');

    // b) Através do atributo children, obter cada nó da lista de valores e adicionar o conteúdo do item, convertido para inteiro, em um vetor
    var vetor = Array.from(listaValores.children).map(item => eval(item.innerHTML));

    // d) Aplicar a função shuffle ao vetor
    vetor = shuffle(vetor);

    // e) Utilizar os operadores map e reduce, do vetor, para gerar os novos itens da lista de valores, substituindo o conteúdo da lista via innerHTML
    listaValores.innerHTML = vetor.map(item => `<li>${item}</li>`).reduce((acc, val) => acc + val, '');
}

