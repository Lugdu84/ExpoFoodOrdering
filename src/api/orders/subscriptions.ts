import { supabase } from '@/lib/supabase';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const useInsertOrderSubscription = () => {
	const query = useQueryClient();
	useEffect(() => {
		const orders = supabase
			.channel('custom-insert-channel')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'orders' },
				(payload) => {
					query.invalidateQueries({
						queryKey: ['orders'],
					});
				}
			)
			.subscribe();
		return () => {
			orders.unsubscribe();
		};
	}, []);
};

export const useUpdateAllOrdersSubscription = () => {
	const query = useQueryClient();
	useEffect(() => {
		const orders = supabase
			.channel('custom-update-channel')
			.on(
				'postgres_changes',
				{ event: 'UPDATE', schema: 'public', table: 'orders' },
				(payload) => {
					query.invalidateQueries({
						queryKey: ['orders'],
					});
				}
			)
			.subscribe();
		return () => {
			orders.unsubscribe();
		};
	}, []);
};

export const useUpdateOrderSubscription = (id: number) => {
	const query = useQueryClient();
	useEffect(() => {
		const orders = supabase
			.channel('custom-filter-channel')
			.on(
				'postgres_changes',
				{
					event: 'UPDATE',
					schema: 'public',
					table: 'orders',
					filter: `id=eq.${id}`,
				},
				(payload) => {
					query.invalidateQueries({
						queryKey: ['order', id],
					});
				}
			)
			.subscribe();

		return () => {
			orders.unsubscribe();
		};
	}, []);
};
