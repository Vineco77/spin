// 1° Depositar o dinheiro
// 2° Determinar o numero de linhas que será apostado
// 3° Recolher o quanto foi apostado
// 4° Girar a roleta
// 5° Checar se o jogador ganhou
// 6° Se sim, o valor se mutiplicado e somado para o jogador
// 7° Jogar novamente

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const pegarDeposito = () => {
  while (true) {
    const quantidadeDeposito = prompt("Quanto deseja depositar: ");
    const numeroQuantidadeDeposito = parseFloat(quantidadeDeposito);

    if (isNaN(numeroQuantidadeDeposito) || numeroQuantidadeDeposito <= 0) {
      console.log("Valor Invalido tentar novamente");
    } else {
      return numeroQuantidadeDeposito;
    }
  }
};

const pegarONumeroDeLinhas = () => {
  while (true) {
    const linhas = prompt("Quantas linhas deseja apostar (1-3): ");
    const numeroDeLinhas = parseFloat(linhas);

    if (isNaN(numeroDeLinhas) || numeroDeLinhas <= 0 || numeroDeLinhas > 3) {
      console.log("Valor Invalido tentar novamente");
    } else {
      return numeroDeLinhas;
    }
  }
};

const pegarAposta = (deposito, linhas) => {
  while (true) {
    const aposta = prompt("O Total da aposta por linha: ");
    const numeroDaAposta = parseFloat(aposta);

    if (
      isNaN(numeroDaAposta) ||
      numeroDaAposta <= 0 ||
      numeroDaAposta > deposito / linhas
    ) {
      console.log("Valor Invalido da aposta invalido");
    } else {
      return numeroDaAposta;
    }
  }
};

const spin = () => {
  const simbulos = [];
  for (const [simbulo, contador] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < contador; i++) {
      simbulos.push(simbulo);
    }
  }
  const campoDaRoleta = [];
  for (let i = 0; i < COLS; i++) {
    campoDaRoleta.push([]);
    const campoDaRoletaymbols = [...simbulos];
    for (let j = 0; j < ROWS; j++) {
      const indexAleatorio = Math.floor(Math.random() * campoDaRoletaymbols.length);
      const simbuloSelecionado = campoDaRoletaymbols[indexAleatorio];
      campoDaRoleta[i].push(simbuloSelecionado);
      campoDaRoletaymbols.splice(indexAleatorio, 1);
    }
  }

  return campoDaRoleta;
};

const transpose = (campoDaRoleta) => {
  const rows = [];

  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(campoDaRoleta[j][i]);
    }
  }

  return rows;
};

const apareçaLinhas = (rows) => {
  for (const row of rows) {
    let linhasEscritas = "";
    for (const [i, simbulo] of row.entries()) {
      linhasEscritas += simbulo;
      if (i != row.length - 1) {
        linhasEscritas += " | ";
      }
    }
    console.log(linhasEscritas);
  }
};

const pegarVencedores = (rows, aposta, linhas) => {
  let vencedores = 0;

  for (let row = 0; row < linhas; row++) {
    const simbulos = rows[row];
    let todosIguais = true;

    for (const simbulo of simbulos) {
      if (simbulo != simbulos[0]) {
        todosIguais = false;
        break;
      }
    }

    if (todosIguais) {
      vencedores += aposta * SYMBOL_VALUES[simbulos[0]];
    }
  }

  return vencedores;
};

const game = () => {
  let deposito = pegarDeposito();

  while (true) {
    console.log("Você tem R$" + deposito);
    const numeroDeLinhas = pegarONumeroDeLinhas();
    const aposta = pegarAposta(deposito, numeroDeLinhas);
    deposito -= aposta * numeroDeLinhas;
    const campoDaRoleta = spin();
    const rows = transpose(campoDaRoleta);
    apareçaLinhas(rows);
    const vencedores = pegarVencedores(rows, aposta, numeroDeLinhas);
    deposito += vencedores;
    console.log("Você ganhou, R$" + vencedores.toString());

    if (deposito <= 0) {
        console.log("Você perdeu todo o seu dinheiro!");
        break
    } 

    let jogarNovamente = prompt("Você quer jogar novamente (s/n)? ")
    if (jogarNovamente != "s") break;
  }
};

game();
