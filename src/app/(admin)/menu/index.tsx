import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import ProductListItem from '@components/ProductListItem';
import { useProductList } from '@/api/products';

export default function MenuScreen() {
	const { products, isLoading, error } = useProductList();

	if (isLoading) {
		return <ActivityIndicator />;
	}

	if (error) {
		return <Text>Fail to fetch products</Text>;
	}
	return (
		<FlatList
			data={products}
			numColumns={2}
			renderItem={({ item }) => <ProductListItem product={item} />}
			columnWrapperStyle={{ gap: 10 }}
			contentContainerStyle={{ gap: 10, padding: 10 }}
		/>
	);
}

const styles = StyleSheet.create({});
