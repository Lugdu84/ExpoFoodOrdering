import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { Order } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useAdminOrderList = ({ archived }: { archived: boolean }) => {
	const statuses = archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering'];

	return useQuery({
		queryKey: ['orders', { archived }],
		queryFn: async () => {
			const { data, error } = await supabase
				.from('orders')
				.select('*')
				.in('status', statuses)
				.order('created_at', { ascending: false });
			if (error) {
				throw new Error(error.message);
			}
			return data;
		},
	});
};

// or add useAuth hook to get the user id and filter the orders by user id, but there is row level security in place
export const useOrderList = () => {
	return useQuery({
		queryKey: ['orders'],
		queryFn: async () => {
			const { data, error } = await supabase
				.from('orders')
				.select('*')
				.order('created_at', { ascending: false });
			if (error) {
				throw new Error(error.message);
			}
			return data;
		},
	});
};

export const useOrderDetails = (id: number) => {
	return useQuery({
		queryKey: ['order', id],
		queryFn: async () => {
			const { data, error } = await supabase
				.from('orders')
				.select('*, order_items(*, products(*))')
				.eq('id', id)
				.single();
			if (error) {
				throw new Error(error.message);
			}
			return data;
		},
	});
};

export const useInsertOrder = () => {
	const queryClient = useQueryClient();
	const { user } = useAuth();
	return useMutation({
		async mutationFn({ total }: Pick<Order, 'total'>) {
			if (!user) return null;
			const { data, error } = await supabase
				.from('orders')
				.insert({
					total,
					user_id: user.id,
				})
				.select()
				.single();
			if (error) {
				throw new Error(error.message);
			}
			return data;
		},
		async onSuccess() {
			await queryClient.invalidateQueries({ queryKey: ['orders'] });
		},
		onError: (error) => {
			console.error('Error inserting order', error);
		},
	});
};

export const useUpdateOrder = () => {
	const queryClient = useQueryClient();

	return useMutation({
		async mutationFn({ id, status }: Pick<Order, 'id' | 'status'>) {
			const { data, error } = await supabase
				.from('orders')
				.update({ status })
				.eq('id', id)
				.select();

			if (error) {
				throw error;
			}
			return data;
		},
		async onSuccess(_, { id }) {
			await queryClient.invalidateQueries({ queryKey: ['orders'] });
			await queryClient.invalidateQueries({ queryKey: ['order', id] });
		},
		onError(error) {
			console.log(error);
		},
	});
};
