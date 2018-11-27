const products = require('../models/products')

let cart = []

module.exports = {
	Query: {
		products() {
			return products
		},
		product(_, { id }) {
			let index = products.findIndex(product => +id === +product.id)
			if (index !== -1) {
				return products[index]
			} else {
				throw new Error(`Product with ID ${id}, does not exits.`)
			}
		},
		cart() {
			return cart
		}
	},
	Mutation: {
		addProductToCart(_, { id }) {
			const index = products.findIndex(product => +id === +product.id);
			const cartIndex = cart.findIndex(product => +id === +product.id);

			if (index !== -1) {
				if (cartIndex !== -1) {
					cart[cartIndex].quantity += 1;
				} else {
					cart.push({ ...products[index], quantity: 1 });
				}
				return cart;
			} else {
				throw new Error(`Product with ID ${id}, does not exits.`);
			}
		},
		removeProductFromCart(_, { id }) {
			let index = cart.findIndex(product => +id === +product.id);
			if (index !== -1) {
				cart.splice(index, 1);
				return id;
			} else {
				throw new Error(`Product with ID ${id}, does not exits.`);
			}
		},
		updateQuantity(_, { id, change }) {
			let index = cart.findIndex(product => +id === +product.id);
			if (index !== -1) {
				console.log('entered')
				if (change === "up") {
					cart[index].quantity += 1;
					return cart[index];
				} else if (change === "down") {
					if (cart[index].quantity === 1) {
						console.log('quantity === 1')
						return cart.splice(index, 1)[0];
					} else {
						console.log('quantity > 1')
						cart[index].quantity -= 1;
						return cart[index];
					}
				}
			} else {
				throw new Error(`Product with ID ${id}, does not exits.`);
			}
		}
	}
}