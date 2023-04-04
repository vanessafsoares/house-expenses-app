const { Pessoa, Transacao } = require('./models');

const criarPessoa = async (req, res) => {
  const { nome, idade } = req.body;
  try {
    const pessoa = await Pessoa.create({ nome, idade });
    res.status(201).json(pessoa);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const listarPessoas = async (req, res) => {
  try {
    const pessoas = await Pessoa.findAll();
    res.json(pessoas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const criarTransacao = async (req, res) => {
  const { descricao, valor, tipo, pessoaId } = req.body;
  try {
    const pessoa = await Pessoa.findByPk(pessoaId);
    if (!pessoa) throw new Error('Pessoa não encontrada.');
    const transacao = await Transacao.create({ descricao, valor, tipo });
    await pessoa.addTransacao(transacao);
    res.status(201).json(transacao);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const listarTransacoes = async (req, res) => {
  try {
    const transacoes = await Transacao.findAll({ include: Pessoa });
    res.json(transacoes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { criarPessoa, listarPessoas, criarTransacao, listarTransacoes };
