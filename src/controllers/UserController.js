const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../models')

const UserController = {
/*    mostrarId: (req,res) => {
        const { id } = req.params

        const showById = produtos.find(item => String(item.id) === id)

        if(showById){
        return res.render('detalhes', {showById})
        } else {
            res.redirect('/')
        }
    }, */
    criarUsuario: async (req, res) => {
        const errors = validationResult(req)
    if (!errors.isEmpty())
        res.status(400).json({ error: errors.mapped() }) // ou array()

    try {
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      }) // encontra o usuário através do e-mail - e retorna o objeto

      if (!user) {
          let newUser = {
            ...req.body
          }
          // delete newUser.pwdConfirm // remove propriedade pwdConfirm - porque não é necessário gravar no banco

          const hash = bcrypt.hashSync(newUser.pwd, 10) // gera o hash da senha
          newUser.pwd = hash // salva na propriedade senha

          await User.create(newUser) // cria o registro no banco de dados

      } else res.status(400).json({ error: "Usuário já cadastrado!" })
    } catch (error) {
      res.status(400).json({ error })
    }
      },

      
    login: async (req, res) => {
      try {
        const user = await User.findOne({
          where: {
            email: req.body.email
          }
        }) 
        
        if (user && bcrypt.compareSync(req.body.pwd, user.pwd)) {

          const token = jwt.sign({ id: user.id, email: user.email }, 'segredo') 

          res.status(200).json({ token })
          
        } else res.status(400).json({ error: "Usuário ou Senha incorretos!" })
        
      } catch (error) {
        res.status(400).json({ error })
      } 
      }
}

module.exports = UserController