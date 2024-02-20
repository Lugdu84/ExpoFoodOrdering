import { Tables } from './supabase';

export type Product = Tables<'products'>;
export type Order = Tables<'orders'>;
export type OrderItem = Tables<'order_items'>;

export type PizzaSize = 'S' | 'M' | 'L' | 'XL';

export type CartItem = {
	id: string;
	product: Product;
	product_id: number;
	size: PizzaSize;
	quantity: number;
};

export const OrderStatusList: OrderStatus[] = [
	'New',
	'Cooking',
	'Delivering',
	'Delivered',
];

export type OrderStatus = 'New' | 'Cooking' | 'Delivering' | 'Delivered';

// export type Order = {
// 	id: number;
// 	created_at: string;
// 	total: number;
// 	user_id: string;
// 	status: OrderStatus;

// 	order_items?: OrderItem[];
// };

// export type OrderItem = {
// 	created_at: string;
// 	id: number;
// 	product_id: number;
// 	products: Product | null;
// 	order_id: number | null;
// 	size: string;
// 	quantity: number;
// 	user_id: string | null;
// };

export type Profile = {
	id: string;
	group: string;
};
