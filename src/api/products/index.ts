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
	// if (!id) return undefined;
	return useQuery<Product>({
		queryKey: ['product', id],
		queryFn: async () => {
			if (!id) {
				throw new Error('No id provided');
			}
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
		async mutationFn(data: Omit<Product, 'id' | 'created_at'>) {
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
		async mutationFn({ id, ...update }: Omit<Product, 'created_at'>) {
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

export const useDeleteProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		async mutationFn(id: number) {
			const { error } = await supabase.from('products').delete().eq('id', id);
			if (error) {
				throw new Error(error.message);
			}
		},
		async onSuccess() {
			await queryClient.invalidateQueries({ queryKey: ['products'] });
		},
		onError: (error) => {
			console.error('Error deleting product', error);
		},
	});
};
