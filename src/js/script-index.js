let masculino = false;
let feminino = false;

let clickCalcular = false;

function atualizarValorRange() {
  const input = document.getElementById("input-altura");
  let h1 = document.getElementById("valor-range");
  input.addEventListener("change", function () {
    h1.textContent = input.value;
  });
}
atualizarValorRange();

//Abaixo os códigos para incrementar o peso
const btnAumentarPeso = document.getElementById("btn-aumentar-peso");
btnAumentarPeso.addEventListener("click", function () {
  const mostrarValor = document.getElementById("mostrar-peso");
  let convertTextMostrarValor = parseInt(mostrarValor.textContent);
  let incrementValor = convertTextMostrarValor + 1;
  if (incrementValor !== -1 && incrementValor < 400) {
    mostrarValor.textContent = incrementValor;
  }
});

//Abaixo os códigos para decrementar o peso
const btnDiminuirPeso = document.getElementById("btn-diminuir-peso");
btnDiminuirPeso.addEventListener("click", function () {
  const mostrarValorPeso = document.getElementById("mostrar-peso");
  let convertTextMostrarValor = parseInt(mostrarValorPeso.textContent);
  let decrementarValor = convertTextMostrarValor - 1;
  if (decrementarValor !== -1 && decrementarValor < 400) {
    mostrarValorPeso.textContent = decrementarValor;
  }
});

//Abaixo os códigos para incrementar a idade
const btnAumentarIdade = document.getElementById("btn-aumentar-idade");
btnAumentarIdade.addEventListener("click", function () {
  const mostrarValorIdade = document.getElementById("mostrar-idade");
  let convertTextMostrarIdade = parseInt(mostrarValorIdade.textContent);
  let incrementarValor = convertTextMostrarIdade + 1;
  if (incrementarValor !== 17 && incrementarValor < 400) {
    mostrarValorIdade.textContent = incrementarValor;
  }
});

//Aqui vai o código para decrementar idade
const btnDiminuirIdade = document.getElementById("btn-diminuir-idade");
btnDiminuirIdade.addEventListener("click", function () {
  const mostrarValorIdade = document.getElementById("mostrar-idade");
  let convertTextMostrarIdade = parseInt(mostrarValorIdade.textContent);
  let decrementarIdade = convertTextMostrarIdade - 1;
  if (decrementarIdade !== 17 && decrementarIdade < 400) {
    mostrarValorIdade.textContent = decrementarIdade;
  }
});

//evento de click da div sexo feminino
const divFeminino = document.getElementById("div-sexo-feminino");
divFeminino.addEventListener("click", function () {
  if (feminino === false) {
    let titulo = document.getElementById("titulo-feminino");
    titulo.style.color = "rgb(255, 255, 255)";
    divFeminino.style.backgroundColor = "#F2226E";
    feminino = true;
    divMasculino.style.pointerEvents = "none";
  } else {
    let titulo = document.getElementById("titulo-feminino");
    titulo.style.color = "#77798c";
    divFeminino.style.backgroundColor = "#111328";
    feminino = false;
    divMasculino.style.pointerEvents = "auto";
  }
});

//evento de click da div sexo masculino
const divMasculino = document.getElementById("div-sexo-masculino");
divMasculino.addEventListener("click", function () {
  if (masculino === false) {
    let titulo = document.getElementById("titulo-masculino");
    titulo.style.color = "rgb(255, 255, 255)";
    divMasculino.style.backgroundColor = "rgb(0, 85, 255)";
    masculino = true;
    divFeminino.style.pointerEvents = "none";
  } else {
    let titulo = document.getElementById("titulo-masculino");
    titulo.style.color = "#77798c";
    divMasculino.style.backgroundColor = "#111328";
    masculino = false;
    divFeminino.style.pointerEvents = "auto";
  }
});

//evento de click do botão calcular
const btnCalcularIMC = document.getElementById("btn-final");
btnCalcularIMC.addEventListener("click", function (event) {
  const valorAltura = document.getElementById("input-altura").value;
  const valuePeso = document.getElementById("mostrar-peso").textContent;
  const valueIdade = document.getElementById("mostrar-idade").textContent;

  if (!clickCalcular) {
    //convertendo os valores para Number

    let altura = centimetroConvertParaMetro(Number(valorAltura));
    let peso = Number(valuePeso);
    let idade = Number(valueIdade);

    const calcIMC = peso / (altura * altura);
    const resutado = calcIMC.toFixed(1);

    if (feminino) {
      mudarEstrutura(resutado, idade);
    } else if (masculino) {
      mudarEstrutura(resutado, idade);
    } else {
      alert("Preencha todos os campos");
      event.preventDefault();
    }
    clickCalcular = true;
  } else {
    window.location.reload();
    clickCalcular = false;
  }
});

function centimetroConvertParaMetro(valor) {
  return valor / 100;
}

//Baixo a função que ira mudar a estrutura da página
function mudarEstrutura(imc, idade) {
  const divSexoFem = document.getElementById("div-sexo-feminino");
  const divSexoMas = document.getElementById("div-sexo-masculino");
  //alterando o display das divs masculino e feminino
  divSexoFem.style.display = "none";
  divSexoMas.style.display = "none";

  const divPeso = document.getElementById("div-peso");
  const divIdade = document.getElementById("div-idade");
  //alterando o display das divs peso e idade
  divPeso.style.display = "none";
  divIdade.style.display = "none";

  const h4Cm = document.getElementById("h3-cm");
  const inputRange = document.getElementById("input-altura");
  //alterando o display do h4 e do input[type='range']
  h4Cm.style.display = "none";
  inputRange.style.display = "none";

  //alterando classes
  const divTit = document.getElementById("div-topo");
  divTit.classList.toggle("caixa-titulo-calculadora-2");

  //alterando texto do h1
  const h1Tit = document.getElementById("h1-titulo");
  h1Tit.textContent = "Resultado";

  //alterando a classe da div altura para resultado
  const divAltura = document.getElementById("div-altura");
  divAltura.classList.toggle("resultado");

  const btn = document.getElementById("btn-final");
  btn.textContent = "RECALCULAR";

  //alterando o tipo de imc
  const h3TipoIMC = document.getElementById("h3-imc-tipo");
  if (masculino) {
    h3TipoIMC.textContent = imcMasculino(imc, idade);

    //criando um paragrafo na div .resultado
    const paragrafo = document.createElement("p");
    divAltura.appendChild(paragrafo);
    paragrafo.textContent = gerarFraseDeEfeito(imcMasculino(imc, idade));
  } else if (feminino) {
    h3TipoIMC.textContent = imcFeminino(imc, idade);

    //criando um paragrafo na div .resultado
    const paragrafo = document.createElement("p");
    divAltura.appendChild(paragrafo);
    paragrafo.textContent = gerarFraseDeEfeito(imcFeminino(imc, idade));
  }
  //alterando o valor do h1 para o IMC

  const h1IMC = document.getElementById("valor-range");
  h1IMC.textContent = imc;
}

function imcMasculino(imc, idade) {
  if (idade >= 18 && idade <= 24) {
    if (imc < 17) {
      return "Abaixo do Peso";
    } else if (imc >= 17 && imc < 20.5) {
      return "Peso Normal";
    } else if (imc >= 20.5 && imc < 25) {
      return "Sobrepeso";
    } else if (imc >= 25 && imc < 30) {
      return "Obesidade Grau I";
    } else if (imc >= 30 && imc < 40) {
      return "Obesidade Grau II";
    } else if (imc >= 40) {
      return "Obesidade Grau III";
    }
  } else if (idade >= 25 && idade <= 34) {
    if (imc < 17.5) {
      return "Abaixo do Peso";
    } else if (imc >= 17.5 && imc < 21) {
      return "Peso Normal";
    } else if (imc <= 21 && imc < 26) {
      return "Sobrepeso";
    } else if (imc >= 26 && imc < 31) {
      return "Obesidade Grau I";
    } else if (imc >= 31 && imc < 41) {
      return "Obesidade Grau II";
    } else if (imc >= 41) {
      return "Obesidade Grau III";
    }
  } else if (idade >= 35 && idade <= 44) {
    if (imc < 18) {
      return "Abaixo do Peso";
    } else if (imc >= 18 && imc < 22) {
      return "Peso Normal";
    } else if (imc >= 22 && imc < 27) {
      return "Sobrepeso";
    } else if (imc >= 27 && imc < 32) {
      return "Obesidade Grau I";
    } else if (imc >= 32 && imc < 42) {
      return "Obesidade Grau II";
    } else if (imc >= 42) {
      return "Obesidade Grau III";
    }
  } else if (idade >= 45 && idade <= 54) {
    if (imc < 18.5) {
      return "Abaixo do Peso";
    } else if (imc >= 18.5 && imc < 22.5) {
      return "Peso Normal";
    } else if (imc >= 22.5 && imc < 27.5) {
      return "Sobrepeso";
    } else if (imc >= 27.5 && imc < 32.5) {
      return "Obesidade Grau I";
    } else if (imc >= 32.5 && imc < 42.5) {
      return "Obesidade Grau II";
    } else if (imc >= 42.5) {
      return "Obesidade Grau III";
    }
  } else if (idade >= 55 && idade <= 64) {
    if (imc < 19) {
      return "Abaixo do Peso";
    } else if (imc >= 19 && imc < 23) {
      return "Peso Normal";
    } else if (imc >= 23 && imc < 28) {
      return "Sobrepeso";
    } else if (imc >= 28 && imc < 33) {
      return "Obesidade Grau I";
    } else if (imc >= 33 && imc < 43) {
      return "Obesidade Grau II";
    } else if (imc >= 43) {
      return "Obesidade Grau III";
    }
  } else if (idade >= 65) {
    if (imc < 19.5) {
      return "Abaixo do Peso";
    } else if (imc >= 19.5 && imc < 23.5) {
      return "Peso Normal";
    } else if (imc >= 23.5 && imc < 28.5) {
      return "Sobrepeso";
    } else if (imc >= 28.5 && imc < 33.5) {
      return "Obesidade Grau I";
    } else if (imc >= 33.5 && imc < 43.5) {
      return "Obesidade Grau II";
    } else if (imc >= 43.5) {
      return "Obesidade Grau III";
    }
  }
}

function imcFeminino(imc, idade) {
  if (idade >= 18 && idade < 25) {
    if (imc < 16) {
      return "Abaixo do Peso";
    } else if (imc >= 16 && imc < 19) {
      return "Peso Normal";
    } else if (imc >= 19 && imc < 24) {
      return "Sobrepeso";
    } else if (imc >= 24 && imc < 29) {
      return "Obesidade Grau I";
    } else if (imc >= 29 && imc < 39) {
      return "Obesidade Grau II";
    } else if (imc >= 39) {
      return "Obesidade Grau III";
    }
  } else if (idade >= 25 && idade < 35) {
    if (imc < 16.5) {
      return "Abaixo do Peso";
    } else if (imc >= 16.5 && imc < 20) {
      return "Peso Normal";
    } else if (imc >= 20 && imc < 25) {
      return "Sobrepeso";
    } else if (imc >= 25 && imc < 30) {
      return "Obesidade Grau I";
    } else if (imc >= 30 && imc < 40) {
      return "Obesidade Grau II";
    } else if (imc >= 40) {
      return "Obesidade Grau III";
    }
  } else if (idade >= 35 && idade < 45) {
    if (imc < 17) {
      return "Abaixo do Peso";
    } else if (imc >= 17 && imc < 21) {
      return "Peso Normal";
    } else if (imc >= 21 && imc < 26) {
      return "Sobrepeso";
    } else if (imc >= 26 && imc < 31) {
      return "Obesidade Grau I";
    } else if (imc >= 31 && imc < 41) {
      return "Obesidade Grau II";
    } else if (imc >= 41) {
      return "Obesidade Grau III";
    }
  } else if (idade >= 45 && idade < 55) {
    if (imc < 17.5) {
      return "Abaixo do Peso";
    } else if (imc >= 17.5 && imc < 21.5) {
      return "Peso Normal";
    } else if (imc >= 21.5 && imc < 26.5) {
      return "Sobrepeso";
    } else if (imc >= 26.5 && imc < 31.5) {
      return "Obesidade Grau I";
    } else if (imc >= 31.5 && imc < 41.5) {
      return "Obesidade Grau II";
    } else if (imc >= 41.5) {
      return "Obesidade Grau III";
    }
  } else if (idade >= 55 && idade < 65) {
    if (imc < 18) {
      return "Abaixo do Peso";
    } else if (imc >= 18 && imc < 22) {
      return "Peso Normal";
    } else if (imc >= 22 && imc < 27) {
      return "Sobrepeso";
    } else if (imc >= 27 && imc < 32) {
      return "Obesidade Grau I";
    } else if (imc >= 32 && imc < 42) {
      return "Obesidade Grau II";
    } else if (imc >= 42) {
      return "Obesidade Grau III";
    }
  } else if (idade >= 65) {
    if (imc < 18.5) {
      return "Abaixo do Peso";
    } else if (imc >= 18.5 && imc < 22.5) {
      return "Peso Normal";
    } else if (imc >= 22.5 && imc < 27.5) {
      return "Sobrepeso";
    } else if (imc >= 27.5 && imc < 32.5) {
      return "Obesidade Grau I";
    } else if (imc >= 32.5 && imc < 42.5) {
      return "Obesidade Grau II";
    } else if (imc >= 42.5) {
      return "Obesidade Grau III";
    }
  }
}

function gerarFraseDeEfeito(tipoIMC) {
  let numeroAleatorio = Math.floor(Math.random() * 10) + 0;

  let abaixoDoPeso = [
    "Você está voando leve! Que tal dar um boost na nutrição?",
    "Hora de fortalecer! Seu corpo pede um pouco mais de atenção.",
    "Leveza é bom, mas saúde é fundamental. Vamos equilibrar?",
    "Seu corpo é uma obra em progresso. Vamos construir mais saúde?",
    "O caminho para a saúde é constante. Vamos avançar juntos?",
    "Cuidar de si é um ato de amor. Vamos nutrir esse carinho?",
    "Pequenos passos levam a grandes conquistas. Vamos começar?",
    "A jornada para o equilíbrio começa agora. Vamos nessa?",
    "Seu bem-estar merece toda atenção. Vamos cuidar disso?",
    "Você é capaz de transformar sua saúde. Vamos começar hoje mesmo?",
  ];

  let pesoNormal = [
    "Parabéns pela manutenção! Continue assim, em equilíbrio.",
    "Seu IMC está sorrindo! Mantenha o ritmo saudável.",
    "Equilíbrio é chave! Continue cuidando bem desse templo.",
    "Você está na faixa ideal! Siga nutrindo essa harmonia.",
    "Cada escolha conta na busca pela saúde. Vamos fazer boas escolhas?",
    "Sua saúde reflete seus cuidados diários. Vamos manter essa rotina?",
    "O equilíbrio traz harmonia ao corpo. Vamos buscar essa harmonia?",
    "Seu corpo agradece pelos bons cuidados. Vamos continuar assim?",
    "Manter-se saudável é uma jornada diária. Vamos seguir em frente?",
    "A busca pela saúde é uma escolha diária. Vamos fazer escolhas saudáveis?",
  ];

  let sobrepeso = [
    "Hora de dar um gás! Vamos trabalhar nessa equação?",
    "Equilíbrio é a meta! Vamos ajustar para uma saúde plena.",
    "Seu corpo pede um ajuste fino. Vamos equilibrar?",
    "Cuidado é carinho! Seu corpo merece uma atenção extra.",
    "Pequenas mudanças fazem grandes diferenças. Vamos começar?",
    "O bem-estar está ao seu alcance. Vamos buscar esse equilíbrio?",
    "A saúde é uma conquista diária. Vamos conquistá-la juntos?",
    "Seu corpo reflete suas escolhas. Vamos fazer escolhas mais saudáveis?",
    "Transforme seu estilo de vida para uma saúde melhor. Vamos lá?",
    "Sua saúde merece ser prioridade. Vamos cuidar dela?",
  ];

  let obesidadeGrauI = [
    "Hora de focar na saúde! Vamos trabalhar nesse novo capítulo?",
    "Juntos, podemos redefinir essa jornada para mais saúde.",
    "Cuidar de si é prioridade! Vamos transformar essa realidade?",
    "Seu bem-estar é valioso! Vamos cuidar desse tesouro.",
    "A saúde é uma jornada constante. Vamos avançar juntos?",
    "Cada passo conta na busca por um estilo de vida mais saudável. Vamos começar?",
    "O equilíbrio é essencial para uma vida plena. Vamos buscar esse equilíbrio?",
    "Sua saúde está em suas mãos. Vamos fazer escolhas saudáveis?",
    "Pequenas mudanças diárias levam a grandes resultados. Vamos começar hoje?",
    "Você é capaz de transformar sua saúde. Vamos começar essa transformação?",
  ];

  let obesidadeGrauII = [
    "Hora de virar o jogo! Vamos traçar novas metas para seu bem-estar?",
    "A jornada para uma vida saudável começa agora. Vamos juntos?",
    "Cuidado é o primeiro passo para a transformação. Vamos começar?",
    "Sua saúde merece o melhor! Vamos buscar esse equilíbrio.",
    "Transforme sua vida um passo de cada vez. Vamos começar?",
    "O caminho para a saúde é feito de escolhas diárias. Vamos fazer escolhas melhores?",
    "Sua determinação molda sua jornada. Vamos buscar a saúde juntos?",
    "Pequenas mudanças levam a grandes resultados. Vamos começar agora?",
    "A busca pela saúde é um compromisso diário. Vamos nos comprometer?",
    "Sua saúde é seu maior tesouro. Vamos cuidar dela juntos?",
  ];

  let obesidadeGrauIII = [
    "É hora de uma mudança radical para o bem da sua saúde.",
    "Cuidar de si é um compromisso sério. Vamos começar?",
    "Juntos, podemos vencer qualquer desafio. Vamos buscar a saúde?",
    "Seu corpo é seu templo. Vamos restaurar essa harmonia.",
    "A jornada para a saúde começa com um passo corajoso. Vamos dar esse passo?",
    "Sua determinação define sua transformação. Vamos transformar juntos?",
    "O caminho para uma vida saudável começa agora. Vamos começar?",
    "Acredite na sua capacidade de mudança. Vamos fazer isso acontecer?",
    "Cada dia é uma nova oportunidade para melhorar. Vamos começar hoje?",
    "Sua saúde é seu maior patrimônio. Vamos cuidar dela?",
  ];

  if (tipoIMC === "Abaixo do Peso") {
    return abaixoDoPeso[numeroAleatorio];
  } else if (tipoIMC === "Peso Normal") {
    return pesoNormal[numeroAleatorio];
  } else if (tipoIMC === "Sobrepeso") {
    return sobrepeso[numeroAleatorio];
  } else if (tipoIMC === "Obesidade Grau I") {
    return obesidadeGrauI[numeroAleatorio];
  } else if (tipoIMC === "Obesidade Grau II") {
    return obesidadeGrauII[numeroAleatorio];
  } else if (tipoIMC === "Obesidade Grau III") {
    return obesidadeGrauIII[numeroAleatorio];
  }
}

