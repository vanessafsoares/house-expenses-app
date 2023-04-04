const { criarPessoa, listarPessoas, criarTransacao, listarTransacoes } = require('./src/controllers');

const Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 3000;

// Define o diretório estático
const publicDir = path.join(__dirname, 'public');

// Define o middleware para servir arquivos estáticos
app.use(express.static(publicDir));

// Define o middleware para analisar os corpos de solicitações HTTP
app.use(bodyParser.urlencoded({ extended: true }));

// Define as rotas da sua aplicação
router.post('/pessoas', criarPessoa);
router.get('/pessoas', listarPessoas);

router.post('/transacoes', criarTransacao);
router.get('/transacoes', listarTransacoes);

app.use(express.json());
app.use('/', router);


const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'residential.sqlite'
});

sequelize.sync()
  .then(() => {
    console.log('Todas as tabelas foram sincronizadas com sucesso!');
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  })
  .catch((err) => {
    console.error('Erro ao sincronizar as tabelas: ', err);
  });
