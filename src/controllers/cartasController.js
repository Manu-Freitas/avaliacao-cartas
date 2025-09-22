import dados from "../models/dados.js";
const {cartas} = dados;

const getAllCartas = (req, res) => {
    const resultado = cartas;
  
    res.status(200).json({
      total: resultado.length,
      cartas: resultado,
    });
  };

  const getCartasById = (req, res) => {
    let id = parseInt(req.params.id);
  
    const Carta = cartas.find((c) => c.id === id);
  
    res.status(200).json({
      sucess: true,
      Carta: Carta,
    });
  };

  const createCartas = (req, res) => {
    const { id, nomeCarta, raridade, edicao, preco, jogo, tipo, poder, condicao } = req.body;
  
    if (!nomeCarta || !tipo) {
      return res.status(400).json({
        sucess: false,
        message: "Nome e tipo são obrigatórios!",
      });
    }
    const novaCarta = {
      id: cartas.length + 1,
      nomeCarta: nomeCarta,
      raridade: raridade,
      edicao: edicao,
      preco: preco,
      jogo: jogo,
      tipo: tipo,
      poder: poder,
      condicao: condicao
    };
    cartas.push(novaCarta);
  
    res.status(201).json({
      sucess: true,
      messagem: "Carta cadastrada com sucesso!",
      carta: novaCarta,
    });
  };

  const deleteCartas = (req, res) => {
    let id = parseInt(req.params.id);
  
    const cartaParaRemover = cartas.find((c) => c.id === id);
  
    if (!cartaParaRemover) {
      return res.status(404).json({
        sucess: false,
        message: `Essa carta não existe, ${id}`,
      });
    }
  
    const cartasFiltradas = cartas.filter((carta) => carta.id !== id);
  
    cartas.splice(0, cartas.length, ...cartasFiltradas);
  
    res.status(200).json({
      sucess: true,
      message: "A carta foi removida com sucesso",
      cartaRemovida: cartaParaRemover,
    });
  };
  
  const updateCarta = (req, res) => {

    const id = parseInt(req.params.id);
    const {nomeCarta, raridade, edicao, preco, jogo, tipo, poder, condicao} = req.body;
    const idParaEditar = id;
  
    if(isNaN(idParaEditar)){
      return res.status(400).json({
        sucess: false,
        message: "O id deve ser um número válido!"
      })
    }
  
  const cartaExistente = cartas.find(carta => carta.id === idParaEditar);
  
  if(!cartaExistente) {
    return res.status(404).json({
      sucess: false,
      message: `Carta com Id: ${id} não existe.`
    })
  }
  
  const cartasAtualizadas = cartas.map(carta=> carta.id === idParaEditar ? {
    ...carta,
    ...(nomeCarta && {nomeCarta}),
    ...(tipo && {tipo}),
    ...(edicao && {edicao: parseInt (edicao)})
  } : carta)
  
  cartas.splice(0, cartas.length, ...cartasAtualizadas);
  
  const cartaNova = cartas.find(carta => carta.id === idParaEditar);
  
  res.status(200).json({
    sucess: true,
    message: `Dados da carta ID ${idParaEditar}atualizado com sucesso!`,
    carta: cartaNova
  })
  }
  export { getAllCartas, getCartasById, createCartas, deleteCartas, updateCarta };


