import { CartItem, PizzaSize, Product } from '@/types';
import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { randomUUID } from 'expo-crypto';

type Quantity = 1 | -1;

type CartType = {
	items: CartItem[];
	addItem: (product: Product, size: PizzaSize) => void;
	updateQuantity: (itemId: string, amount: Quantity) => void;
};

const CartContext = createContext<CartType>({
	items: [],
	addItem: () => {},
	updateQuantity: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
	const [items, setItems] = useState<CartItem[]>([]);

	const addItem = (product: Product, size: PizzaSize) => {
		const existingItem = items.find(
			(item) => item.product === product && item.size === size
		);
		if (existingItem) {
			updateQuantity(existingItem.id, 1);
			return;
		}
		const newCardItem: CartItem = {
			id: randomUUID(),
			product_id: product.id,
			product,
			quantity: 1,
			size,
		};
		setItems([...items, newCardItem]);
	};

	const updateQuantity = (itemId: string, amount: Quantity) => {
		const newItems = items
			.map((item) => {
				if (item.id === itemId) {
					return { ...item, quantity: item.quantity + amount };
				}
				return item;
			})
			.filter((item) => item.quantity > 0);
		setItems(newItems);
	};
	return (
		<CartContext.Provider value={{ items, addItem, updateQuantity }}>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
