import { CartItem, PizzaSize, Product } from '@/types';
import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { randomUUID } from 'expo-crypto';
import { Tables } from '@/supabase';
import { useInsertOrder } from '@/api/orders';
import { useRouter, useSegments } from 'expo-router';

type Quantity = 1 | -1;

type CartType = {
	items: CartItem[];
	addItem: (product: Tables<'products'>, size: PizzaSize) => void;
	updateQuantity: (itemId: string, amount: Quantity) => void;
	total: number;
	checkout: () => void;
};

const CartContext = createContext<CartType>({
	items: [],
	addItem: () => {},
	updateQuantity: () => {},
	total: 0,
	checkout: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
	const [items, setItems] = useState<CartItem[]>([]);
	const { mutate: insertOrder } = useInsertOrder();
	const router = useRouter();
	const segments = useSegments();

	const clearCart = () => {
		setItems([]);
	};

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

	const total = items.reduce(
		(sum, item) => sum + item.product.price * item.quantity,
		0
	);

	const checkout = () => {
		insertOrder(
			{ total },
			{
				onSuccess: (data) => {
					clearCart();
					// TODO: fix this, no back route and no hide Cart Page
					router.push(`/(user)/orders/${data?.id}`);
				},
			}
		);
	};
	return (
		<CartContext.Provider
			value={{ items, addItem, updateQuantity, checkout, total }}>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
