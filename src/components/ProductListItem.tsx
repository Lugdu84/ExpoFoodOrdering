import { Product } from '@/types';
import { View, Text } from './Themed';
import { Image, Pressable, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { Link } from 'expo-router';
import { defaultPizzaImage } from '@/constants/Images';

type ProductListItemProps = {
	product: Product;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<Link
			href={`/menu/${product.id}`}
			asChild>
			<Pressable style={styles.container}>
				<Image
					style={styles.image}
					source={{ uri: product.image ?? defaultPizzaImage }}
					resizeMode="contain"
				/>
				<Text style={styles.title}>{product.name}</Text>
				<Text style={styles.price}>${product.price}</Text>
			</Pressable>
		</Link>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 20,
		flex: 1,
		maxWidth: '50%',
	},
	title: {
		fontSize: 18,
		fontWeight: '600',
		marginVertical: 10,
	},
	price: {
		color: Colors.light.tint,
		fontWeight: 'bold',
	},
	image: {
		width: '100%',
		aspectRatio: 1,
		// resizeMode: 'contain',
	},
});

export default ProductListItem;
