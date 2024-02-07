import { Image, StyleSheet } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import Colors from '@/src/constants/Colors';
import products from '@/assets/data/products';

const product = products[0];

export default function TabOneScreen() {
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
}

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
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
