const Cart = require('../models/cart-model')

getProductsFromCart = async (req, res) => {
    try {
        const cart = await Cart.find({ userId: req.params.userId });

        if (!cart || cart.length === 0) {
            return res.status(404).json({ success: false, error: `Cart not found` });
        }

        return res.status(200).json({ success: true, data: cart });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
}
addProductsToCart = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a cart',
        });
    }

    try {
        const cart = new Cart(body);
        console.log(cart);

        const savedCart = await cart.save();

        return res.status(201).json({
            success: true,
            id: savedCart._id,
            message: 'Cart created!',
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            error: error.message || 'Cart not created!',
        });
    }
}

checkServiceRunning = (req, res) => {
    res.send('Hello World! - from shopping cart service.');
}

module.exports = {
    getProductsFromCart,
    addProductsToCart,
    checkServiceRunning
};
