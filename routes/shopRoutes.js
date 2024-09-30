import express from 'express';

import shopControllers from '../controllers/shopControllers.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

const { getAllProducts, getProductById, addProductForm, addProduct } =
    shopControllers;

router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);

router.get('/add-product', verifyToken, addProductForm);
router.post('/add-product', addProduct);

export default router;
