import {
	View,
	Text,
	StyleSheet,
	FlatList,
	ActivityIndicator,
} from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import OrderListItem from '@/components/OrderListItem';
import OrderItemListItem from '@/components/OrderItemListItem';
import { useOrderDetails } from '@/api/orders';
import { getId } from '@/lib/products';

const OrderDetailScreen = () => {
	const { id } = useLocalSearchParams();

	const { data: order, isLoading, error } = useOrderDetails(getId(id));

	if (isLoading) {
		return <ActivityIndicator />;
	}

	if (error) {
		return <Text>Fail to fetch orders</Text>;
	}

	if (!order) {
		return (
			<View>
				<Stack.Screen options={{ title: 'Product not found' }} />
				<Text>Product not found</Text>
			</View>
		);
	}
	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: `Order #${order.id}` }} />
			<OrderListItem order={order} />
			<FlatList
				data={order.order_items}
				contentContainerStyle={{ gap: 10 }}
				renderItem={({ item }) => <OrderItemListItem orderItem={item} />}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		gap: 20,
	},
});

export default OrderDetailScreen;
