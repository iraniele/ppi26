const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))

const produtos = [
  {
    id: '1',
    nome: 'geladeira',
    preco: '7000',
    descricao: 'geladeira ultra moderna'
  },
  {
    id: '2',
    nome: 'tablet',
    preco: '3000',
    descricao: 'tablet 10 polegadas'
  },
  {
    id: '3',
    nome: 'televisão',
    preco: '5000',
    descricao: 'televisão 50 polegadas'
  }
]

app.get('/', (req, res) => {
  res.render('home', { produtos })
})

app.get('/produto/:id', (req, res) => {
  const idProduto = req.params.id
  const produto = produtos.find(item => item.id === idProduto)

  if (!produto) {
    return res.status(404).send('Produto não encontrado!')
  }

  res.render('produto', { produto })
})

app.listen(port, () => {
  console.log(`O servidor está rodando na porta ${port}`)
})

app.get('/dashboard', (req, res) => {
  res.render('dashboard', { produtos })
})