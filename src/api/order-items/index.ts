import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { CartItem } from '@/types';
import { useMutation } from '@tanstack/react-query';

export const useInsertOrderItems = () => {
	const { user } = useAuth();

	return useMutation({
		async mutationFn({
			items,
			order_id,
		}: {
			items: CartItem[];
			order_id: number;
		}) {
			if (!user) {
				throw new Error('User not found');
			}
			//TODO: check other solution for user_id (in supabase)
			const { error } = await supabase.from('order_items').insert(
				items.map((item) => ({
					size: item.size,
					quantity: item.quantity,
					order_id: order_id,
					product_id: item.product_id,
					user_id: user.id,
				}))
			);

			if (error) {
				throw error;
			}
		},
		onError(error) {
			console.log(error);
		},
	});
};
