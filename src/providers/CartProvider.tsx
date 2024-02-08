import { CartItem, PizzaSize, Product } from '@/types';
import { PropsWithChildren, createContext, useContext, useState } from 'react';

type CartType = {
	items: CartItem[];
	addItem: (product: Product, size: PizzaSize) => void;
};

const CartContext = createContext<CartType>({
	items: [],
	addItem: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
	const [items, setItems] = useState<CartItem[]>([]);

	const addItem = (product: Product, size: PizzaSize) => {
		// if already in cart, increase quantity
		const newCardItem: CartItem = {
			id: '1', // generate
			product_id: product.id,
			product,
			quantity: 1,
			size,
		};
		setItems([...items, newCardItem]);
	};

	// update quantity
	return (
		<CartContext.Provider value={{ items, addItem }}>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
