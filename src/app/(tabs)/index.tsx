import { StyleSheet } from 'react-native';
import { View } from '@components/Themed';
import products from '@assets/data/products';

import ProductListItem from '@/components/ProductListItem';

const product = products[0];

export default function MenuScreen() {
	return (
		<View>
			<ProductListItem product={products[0]} />
		</View>
	);
}

const styles = StyleSheet.create({});
