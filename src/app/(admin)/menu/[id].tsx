import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import products from '@assets/data/products';
import { defaultPizzaImage } from '@/constants/Images';
import { useState } from 'react';
import { useCart } from '@/providers/CartProvider';
import { PizzaSize } from '@/types';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
	const { id } = useLocalSearchParams();
	const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
	const { addItem } = useCart();
	const router = useRouter();

	const product = products.find((p) => p.id.toString() === id);

	const addToCart = () => {
		if (!product) return;
		addItem(product, selectedSize);
		router.push(`/cart`);
	};

	if (!product) {
		return (
			<View>
				<Stack.Screen options={{ title: 'Product not found' }} />
				<Text>Product not found</Text>
			</View>
		);
	}
	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: product.name }} />
			<Image
				source={{ uri: product.image ?? defaultPizzaImage }}
				style={styles.image}
				resizeMode="contain"
			/>
			<Text style={styles.name}>${product.name}</Text>
			<Text style={styles.price}>${product.price}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1,
		padding: 10,
	},
	image: {
		aspectRatio: 1,
	},
	name: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	price: {
		fontSize: 18,
		fontWeight: 'bold',
	},
});

export default ProductDetailsScreen;
