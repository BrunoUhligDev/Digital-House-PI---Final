const { body } = require('express-validator')

var express = require('express');
const router = express.Router();

//criando a const do controller
const MainController = require('../controllers/MainController');
const PagesController = require('../controllers/PagesController');
const productController = require('../controllers/ProductController');
const UserController = require('../controllers/UserController');



/**
 * Multer
 * Middlewares
 */ 


const upload = require('../middlewares/upload')
const log = require('../middlewares/log')
const auth = require('../middlewares/auth')


// # chamando a primeira pag (Main)
// router.get('/', MainController.index); 
// 

router.get('/product', MainController.index);

// GET - EJS Detail producto - View
router.get('/product/:id', productController.detailEJS)
router.get('/productPage/:type', PagesController.productPage);
// POST - EJS Create
router.post(  
  '/product', 
  auth,
  upload.any(), 
  body('name')
  .notEmpty()
  .withMessage('Nome do produto deve ser informado!'),
  productController.createEJS
  )
// PUT - EJS Update
router.put('/product/:id',auth, upload.any(), productController.updateEJS)
// DELETE - EJS Delete
router.delete('/product/:id',auth, productController.deleteEJS)






//* Rota para listar todos os usuários

/*router.get('/', UserController.index); */


// Rota para mostrar um usuário
 
/*router.get('/show/:id', UserController.show); */





//* Rota para mostrar formulário de edição de usuário
/*router.get('/edit/:id', UserController.editForm); */


//* Rota para criar um usuário
router.post('/create', UserController.criarUsuario)

router.post('/login', UserController.login)

router.get('/user', UserController.userById)


//* Rota para atualizar um usuário
/*router.put('/:id', upload.single('avatar'), UserController.update);*/


//* Rota para deletar um usuário

/*router.delete('/:id', UserController.delete);*/




module.exports = router;
