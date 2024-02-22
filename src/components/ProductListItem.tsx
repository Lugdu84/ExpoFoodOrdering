import { Text } from './Themed';
import { Image, Pressable, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { Link, useSegments } from 'expo-router';
import { defaultPizzaImage } from '@/constants/Images';
import { Product } from '@/types';
import RemoteImage from './RemoteImage';

type ProductListItemProps = {
	product: Product;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
	const segments = useSegments();

	return (
		<Link
			//@ts-ignore
			// TODO: Fix error in segment route
			href={`/${segments[0]}/menu/${product.id}`}
			asChild>
			<Pressable style={styles.container}>
				<RemoteImage
					fallback={defaultPizzaImage}
					path={product.image}
					style={styles.image}
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
