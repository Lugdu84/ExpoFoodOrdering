import {
	View,
	Text,
	Image,
	StyleSheet,
	Pressable,
	ActivityIndicator,
} from 'react-native';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';

import { defaultPizzaImage } from '@/constants/Images';
import { useState } from 'react';
import { useCart } from '@/providers/CartProvider';
import { PizzaSize } from '@/types';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useProduct } from '@/api/products';
import { getId } from '@/lib/products';
import RemoteImage from '@/components/RemoteImage';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
	const { id } = useLocalSearchParams();
	const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
	const { addItem } = useCart();
	const router = useRouter();

	const { data: product, error, isLoading } = useProduct(getId(id));

	if (isLoading) {
		return <ActivityIndicator />;
	}

	const addToCart = () => {
		if (!product) return;
		addItem(product, selectedSize);
		router.push(`/cart`);
	};

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
			<Stack.Screen
				options={{
					title: product.name,
					headerRight: () => (
						<Link
							href={`/menu/create?id=${id}`}
							asChild>
							<Pressable>
								{({ pressed }) => (
									<FontAwesome
										name="pencil"
										size={25}
										color={Colors.light.tint}
										style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
									/>
								)}
							</Pressable>
						</Link>
					),
				}}
			/>
			{/* <Stack.Screen options={{ title: product.name }} /> */}
			<RemoteImage
				fallback={defaultPizzaImage}
				path={product.image}
				style={styles.image}
				resizeMode="contain"
			/>
			<Text style={styles.name}>{product.name}</Text>
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
