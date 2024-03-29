import {
	View,
	Text,
	Image,
	StyleSheet,
	Pressable,
	ActivityIndicator,
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { defaultPizzaImage } from '@/constants/Images';
import { useState } from 'react';
import Button from '@/components/Button';
import { useCart } from '@/providers/CartProvider';
import { PizzaSize } from '@/types';
import { useProduct } from '@/api/products';
import RemoteImage from '@/components/RemoteImage';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
	const { id } = useLocalSearchParams();
	const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
	const { addItem } = useCart();
	const router = useRouter();

	const {
		data: product,
		error,
		isLoading,
	} = useProduct(parseInt(typeof id === 'string' ? id : id[0]));

	const addToCart = () => {
		if (!product) return;
		addItem(product, selectedSize);
		router.push(`/cart`);
	};

	if (isLoading) {
		return <ActivityIndicator />;
	}

	if (error || !product) {
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
			<RemoteImage
				path={product.image}
				fallback={defaultPizzaImage}
				style={styles.image}
				resizeMode="contain"
			/>
			<Text>Select size</Text>
			<View style={styles.sizes}>
				{sizes.map((size) => (
					<Pressable
						onPress={() => setSelectedSize(size)}
						key={size}
						style={[
							styles.size,
							{
								backgroundColor: selectedSize === size ? 'gainsboro' : 'white',
							},
						]}>
						<Text
							style={[
								styles.sizeText,
								{ color: selectedSize === size ? 'black' : 'gray' },
							]}>
							{size}
						</Text>
					</Pressable>
				))}
			</View>
			<Text style={styles.price}>${product.price}</Text>
			<Button
				onPress={addToCart}
				text="Add to cart"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1,
		padding: 10,
	},
	sizes: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginVertical: 10,
	},
	size: {
		width: 50,
		aspectRatio: 1,
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
	},
	sizeText: {
		fontSize: 20,
		fontWeight: '500',
	},
	image: {
		aspectRatio: 1,
	},
	price: {
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 'auto',
	},
});

export default ProductDetailsScreen;
