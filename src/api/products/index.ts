import { supabase } from '@/lib/supabase';
import { Product } from '@/types';
import { useQuery } from '@tanstack/react-query';

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

export const useProduct = (id: number) => {
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
