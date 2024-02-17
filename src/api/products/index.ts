import { supabase } from '@/lib/supabase';
import { Product } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useProductList = () => {
	const {
		data: products,
		isLoading,
		error,
	} = useQuery<Product[]>({
		queryKey: ['products'],
		queryFn: async () => {
			const { data, error } = await supabase.from('products').select('*');
			if (error) {
				throw new Error(error.message);
			}
			return data;
		},
	});
	return { products, isLoading, error };
};

export const useProduct = (id: number | undefined) => {
	return useQuery<Product>({
		queryKey: ['product', id],
		queryFn: async () => {
			const { data, error } = await supabase
				.from('products')
				.select('*')
				.eq('id', id)
				.single();
			if (error) {
				throw new Error(error.message);
			}
			return data;
		},
	});
};

export const useInsertProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		async mutationFn(data: Omit<Product, 'id'>) {
			const { error } = await supabase
				.from('products')
				.insert({
					name: data.name,
					price: data.price,
					image: data.image,
				})
				.single();
			if (error) {
				throw new Error(error.message);
			}
		},
		async onSuccess() {
			await queryClient.invalidateQueries({ queryKey: ['products'] });
		},
		onError: (error) => {
			console.error('Error inserting product', error);
		},
	});
};

export const useUpdateProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		async mutationFn({ id, ...update }: Product) {
			const { data, error } = await supabase
				.from('products')
				.update(update)
				.eq('id', id)
				.select();
			if (error) {
				throw new Error(error.message);
			}
			return data;
		},
		async onSuccess(_, { id }) {
			await queryClient.invalidateQueries({ queryKey: ['products'] });
			await queryClient.invalidateQueries({ queryKey: ['product', id] });
		},
		onError: (error) => {
			console.error('Error updating product', error);
		},
	});
};
