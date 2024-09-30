import Shop from '../models/shopModels.js';

const shopControllers = {
    getAllProducts: (req, res) => {
        const products = Shop.getAll();
        const token = req.cookies.token;
        res.status(200).render('products', { products, token });
    },
    getProductById: (req, res) => {
        const { id } = req.params;
        const product = Shop.getProductById(id);
        if (product) {
            res.status(200).render('product', { product });
        } else {
            res.status(404).render('404', {
                title: '404',
                message: 'Product not found'
            });
        }
    },
    addProductForm: (req, res) => {
        res.status(200).render('add-product-form');
    },
    addProduct: (req, res) => {
        const { name, price, description, img } = req.body;

        if (name && price && description && img) {
            Shop.addProduct({ name, price, description, img });
            res.status(302).redirect('/api/products');
        } else {
            res.status(400).render('404', {
                title: 'Bad request',
                message: 'All fields are required'
            });
        }
    }
};

export default shopControllers;
