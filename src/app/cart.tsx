import { View, Platform, FlatList, StyleSheet } from 'react-native';
import { Text } from '@/components/Themed';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '@/providers/CartProvider';
import CardListItem from '@/components/CardListItem';
import Button from '@/components/Button';

const CartScreen = () => {
	const { items, total } = useCart();

	return (
		<View style={styles.container}>
			<FlatList
				data={items}
				renderItem={({ item }) => <CardListItem cartItem={item} />}
				contentContainerStyle={{ gap: 10 }}
			/>
			<Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
			<Button
				text="Checkout"
				onPress={() => {}}
			/>
			<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
	total: {
		marginTop: 20,
		fontSize: 20,
		fontWeight: '500',
	},
});

export default CartScreen;
