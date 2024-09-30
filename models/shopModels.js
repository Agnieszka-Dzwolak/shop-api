import { v4 as Id } from 'uuid';

const products = [
    {
        id: Id(),
        name: 'Mechanical Keyboard',
        price: 120,
        description:
            'A high-quality mechanical keyboard with customizable RGB lighting and tactile switches for a responsive typing experience.',
        img: 'https://www.shutterstock.com/image-photo/gaming-keyboard-rgb-light-isolated-260nw-2172968125.jpg'
    },
    {
        id: Id(),
        name: 'Gaming Mouse',
        price: 60,
        description:
            'An ergonomic gaming mouse with customizable DPI settings, RGB lighting, and six programmable buttons for ultimate control.',
        img: 'https://media.croma.com/image/upload/v1681412995/Croma%20Assets/Computers%20Peripherals/Computer%20Accessories%20and%20Tablets%20Accessories/Images/225662_0_dyzgte.png'
    },
    {
        id: Id(),
        name: '4K Monitor',
        price: 400,
        description:
            'A stunning 27-inch 4K UHD monitor with ultra-thin bezels and HDR support for vivid colors and sharp details.',
        img: 'https://images.philips.com/is/image/philipsconsumer/faf6ce31f42f47baa7a5b01c00fc79e4?$pnglarge$&wid=960'
    },
    {
        id: Id(),
        name: 'Wireless Headset',
        price: 150,
        description:
            'A noise-canceling wireless headset with 30-hour battery life, deep bass, and crystal-clear audio quality for music or gaming.',
        img: 'https://media.istockphoto.com/id/1372906882/photo/modern-blue-wireless-headphones-isolated-on-white-background-with-clipping-path.jpg?s=612x612&w=0&k=20&c=0k-2JFElEQ0QTvXsgtLx3i2JotQo_Eb8aEwyN-BOZjA='
    }
];

class Shop {
    static getAll() {
        return products;
    }

    static getProductById(id) {
        return products.find((product) => product.id === id);
    }

    static addProduct(product) {
        const newProduct = {
            id: Id(),
            ...product
        };
        products.unshift(newProduct);
        return newProduct;
    }
}

export default Shop;
