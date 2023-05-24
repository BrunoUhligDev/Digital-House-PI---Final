
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const {Product} = require('../models')

const PagesController = {
    productPage: async(req, res) => {
        try {
            const products = await Product.findAll()
            
            res.render('productPage', {
                products,
                toThousand
            });
        } catch (error) {
            res.status(400).json({error})
        }

      }

};





module.exports = PagesController;
