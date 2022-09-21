// Exclui caracteres especiais, acentos e numeros para cada tecla clicada (input);
// To improve: special characters, accents and numbers are not processed by this function if the input is made by paste (ctrl+v). One possibility is to do one more check when the button is pressed to save.
let event = document.addEventListener('onkeydown', mantemLetrasComuns);

function mantemLetrasComuns(event) {

    let tecla = event.key;
    const caracteresEspeciais = /([\u0300-\u036f]|[^a-zA-Z])/;
    
    if (!isNaN(tecla)) {
        alert('Por favor, use apenas letras!');
        event.preventDefault();    
    } else if (caracteresEspeciais.test(tecla)) {
        alert('Acentos e caracteres especiais não são permitidos!');
        event.preventDefault();
    }  
}


function salvarPalavra() {
  location.href='jogo-da-forca.html';
  let palavraAdicionada = document.getElementById('input-palavra').value;
  palavraAdicionada = palavraAdicionada.toUpperCase();
  listaPalavras.push(palavraAdicionada);
  //console.log(listaPalavras);
}



//Script do jogo

const palavra = document.getElementById('palavra');
const incorreto = document.getElementById('incorreto');
const letraIncorretaP = document.querySelector('#incorreto p');
const panoFundo = document.getElementById('pano-de-fundo');
const mensagemFinal = document.getElementById('mensagem-final');
const mensagemInfo = document.getElementById('mensagem-info');
const playBtn = document.getElementById('play');
const indicacao = document.getElementById('indicacao');
const parteDoCorpo = document.getElementsByClassName('parte-do-corpo');

// Lista de palavras
const listaPalavras = [
  'MERCADO',
  'LAVANDA',
  'ABELHA',
  'SABONETE',
  'MOEDA',
  'JOGAR',
  'BARULHO',
  'AMARRAR',
  'OCEANO',
  'GASOLINA',
  'FEMUR',
  'CLIMA',
  'VERGONHA',
  'BASTARDO',
  'PERFUME',
  'VIAGEM',
  'ROSCA',
  'APALPAR',
  'CONTROLE',
  'LOSANGO',
];

// Palavra selecionada para o jogo
let palavraSelecionada = null;
// Guarda o número de contagem de letras digitadas que são incorretas
let contagemIncorreta = 0;
// Letras corretas digitadas pelo jogador(a)
const letrasCorretas = [];
// Letras incorretas digitadas pelo jogador(a)
const letrasIncorretas = [];

// Seleciona a palavra aleatoriamente do array listaPalavras e inicializa no DOM
function inicializaPalavra() {
  palavraSelecionada = listaPalavras[Math.floor(Math.random() * listaPalavras.length)];
  const numeroLetras = palavraSelecionada.length;
  for (let i = 0; i < numeroLetras; i++) {
    const listaItem = document.createElement('li');
    listaItem.classList.add('letra');
    palavra.append(listaItem);
  }
}

// Mostra uma indicação que desliza pela parte de baixo da tela
function mostraIndicacao() {
  indicacao.classList.add('visivel');

  setTimeout(() => {
    indicacao.classList.remove('visivel');
  }, 2400);
}

// Atualiza a figura quando letras incorretas são digitadas
function atualizaFigura() {
  try {
    parteDoCorpo[contagemIncorreta].style.display = 'block';
    contagemIncorreta++;
  } catch (error) {}
}

// Quando o(a) jogador(a) ganha
function msgSucesso() {
  setTimeout(() => {
    panoFundo.classList.add('visivel');
    mensagemFinal.classList.add('visivel');
    mensagemInfo.textContent = 'Uhul! Você ganhou!';
  }, 400);
}

// Quando o(a) jogador(a) perde
function msgFracasso() {
  setTimeout(() => {
    panoFundo.classList.add('visivel');
    mensagemFinal.classList.add('visivel');
    mensagemInfo.textContent = `Oops! Você perdeu. A palavra correta é "${palavraSelecionada}"`;
  }, 400);
}

// Verifica se a tecla/letra digitada faz parte da palavra selecionada e atualiza no DOM se necessário
function check(ev) {
  const lettraElementos = document.querySelectorAll('.palavra .letra');
  const caractere = ev.key.toUpperCase();

  // Manipula eventos de teclado
  if (
    !panoFundo.classList.contains('visivel') &&
    !indicacao.classList.contains('visivel') &&
    ev.keyCode >= 65 &&
    ev.keyCode <= 90
  ) {
    if (palavraSelecionada.includes(caractere)) {
      if (letrasCorretas.includes(caractere)) {
        mostraIndicacao();
      } else {
        letrasCorretas.push(caractere);
        const indexes = [];
        [...palavraSelecionada].forEach((value, index) => {
          if (value === caractere) {
            indexes.push(index);
          }
        });
        indexes.forEach((value) => {
          lettraElementos[value].textContent = caractere;
        });
      }
    } else {
      if (letrasIncorretas.includes(caractere)) {
        mostraIndicacao();
      } else {
        letrasIncorretas.push(caractere);
        if (!incorreto.classList.contains('visivel')) {
          incorreto.classList.add('visivel');
        }
        letraIncorretaP.textContent = `${letrasIncorretas.join(', ')}`;
        atualizaFigura();
      }
    }
  }

  // Cria uma palavra a partir de todas as letras itens
  let palavraFormada = '';
  lettraElementos.forEach((value) => {
    palavraFormada += value.textContent;
  });

  // Verifica se a palavra criada está correta
  if (palavraFormada === palavraSelecionada) {
    msgSucesso();
  }

  // Verifica se a figura foi enforcada
  if (contagemIncorreta >= 6) {
    msgFracasso();
  }
}

// Redefine todas as  variantes and começa um novo jogo
function comecaNovoJogo() {
  palavraSelecionada = null;
  contagemIncorreta = 0;
  letrasCorretas.splice(0);
  letrasIncorretas.splice(0);
  palavra.innerHTML = '';
  Array.from(parteDoCorpo).forEach((value) => {
    value.style.display = 'none';
  });
  incorreto.classList.remove('visivel');
  panoFundo.classList.remove('visivel');
  mensagemFinal.classList.remove('visivel');
  inicializaPalavra();
}

// Começa o jogo
inicializaPalavra();

// Event Listeners
window.addEventListener('keyup', check);
playBtn.addEventListener('click', comecaNovoJogo);

