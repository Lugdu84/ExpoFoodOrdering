import { View, Platform, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '@/providers/CartProvider';
import CardListItem from '@/components/CardListItem';

const CartScreen = () => {
	const { items } = useCart();

	console.log(items);

	return (
		<View>
			<FlatList
				data={items}
				renderItem={({ item }) => <CardListItem cartItem={item} />}
				contentContainerStyle={{ padding: 10 }}
			/>
			<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
		</View>
	);
};

export default CartScreen;
