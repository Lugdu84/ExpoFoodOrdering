import { Product } from '@/src/types';
import { View, Text } from './Themed';
import { Image, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

type ProductListItemProps = {
	product: Product;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<View style={styles.container}>
			<Image
				style={styles.image}
				source={{ uri: product.image }}
			/>
			<Text style={styles.title}>{product.name}</Text>
			<Text style={styles.price}>${product.price}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 20,
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
		resizeMode: 'contain',
	},
});
