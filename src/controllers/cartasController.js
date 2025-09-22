import dados from "../models/dados.js";
const { cartas } = dados;

const getAllCartas = (req,res) => {
    const {nomeCarta, raridade, edicao, preco, jogo, tipo, poder, condicao} = req.query;

    let resultado = cartas

    if (raridade) {
        resultado = resultado.filter((l) => l.raridade.toLocaleLowerCase().includes(raridade.toLocaleLowerCase()));
    }

    if (preco) {
        resultado = resultado.filter((l) => l.preco.toLocaleLowerCase().includes(preco.toLocaleLowerCase()));
    }


    res.status(200).json({
        total: cartas.length,
        cartas: resultado
    })
}

const getCartasById = (req, res) => {
    let id = parseInt(req.params.id);

    const carta = cartas.find(l => l.id === id);

    if (carta) {
        res.status(200).json({
            success: true,
            carta: carta
        })

    res.status(400).json({
        success: false,
        message: "Carta não encontrada"
    })
    }
}

const createCartas = (req, res) => {
    const {nomeCarta, raridade, edicao, preco, jogo, tipo, poder, condicao} = req.body;

    if(!nomeCarta || !raridade) {
        return res.status(400).json({
            sucess: false,
            message: "nome e raridade são obrigatórios"
        })
    }

     if(nomeCarta) {
        if (nomeCarta.length < 5) {
            return res.status(400).json({
                success: false,
                message: `O nome deve ter ao menos 5 caracteres`
            })
        }
    }

    if(preco) {
        if (preco < 1) {
            return res.status(400).json({
                success: false,
                message: `O preço deve ser maior que 0`
            })
        }
    }

    const novaCarta = {
        id: nomeCarta.length + 1,
        nomeCarta, raridade, edicao, preco, jogo, tipo, poder, condicao
    }

    cartas.push(novaCarta);

    res.status(201).json({
        sucess: true,
        message: "Carta cadastrada com sucesso!",
        carta: novaCarta
    })
}

const updateCarta = (req, res) => {
    const id = parseInt(req.params.id);
    const {nomeCarta, raridade, edicao, preco, jogo, tipo, poder, condicao} = req.body;

    const idParaEditar = id;

    if(isNaN(idParaEditar)) {
        return res.status(400).json({
            success: false,
            message: "O id deve ser válido!!"
        })
    }

    const cartaExiste = cartas.find(livro => cartas.id === id);

    if(!cartaExiste) {
        return res.status(400).json({
            success: false,
            message: "A carta não existe"
        })
    }

    if(edicao) { //errado
        if (edicao > Date().getFullYear()) {
            return res.status(400).json({
                success: false,
                message: `A edição não pode ser uma data futura`
            })
        }
    }

    if(nomeCarta) {
        if (nomeCarta.length < 5) {
            return res.status(400).json({
                success: false,
                message: `O nome deve ter ao menos 5 caracteres`
            })
        }
    }

    if(preco) {
        if (preco < 1) {
            return res.status(400).json({
                success: false,
                message: `O preço deve ser maior que 0`
            })
        }
    }

    const cartasAtualizadas = cartas.map(cartas => {
        return cartas.id === id
      ? {
            ...carta,
            ...(nomeCarta && { nomeCarta }),
            ...(raridade &&  { raridade }),
            ...(edicao && { edicao }),
            ...(preco && { preco }),
            ...(jogo && { jogo }),
            ...(tipo && { tipo}),
            ...(poder && { poder }),
            ...(condicao && { condicao}),
        } :carta
    })

    cartas.splice(0, cartas.length, ...cartasAtualizadas);

    const cartaNova = cartas.find(carta => carta.id === id);

    res.status(200).json({
        success: true,
        message: "Dados atualizados com sucesso",
        carta: cartaNova
    })
}

const deleteCartas = (req, res) => {
    let id = parseInt(req.params.id);

    const cartaRemover = cartas.find(c => c.id === id);

    if (!cartaRemover) {
        return res.status(404).json({
            sucess: false,
            message: `Essa carta não existe, ${id}`
        })
    }

    const cartasFiltrados = cartas.filter(carta => carta.id !== id);

   cartas.splice(0, cartas.length, ...cartasFiltradas);

    res.status(200).json({
        sucess: true,
        message: "A carta foi removida com sucesso",
        cartaRemovida: cartaRemover
    })
}

export {getAllCartas, getCartasById, updateCarta, createCartas, deleteCartas}


