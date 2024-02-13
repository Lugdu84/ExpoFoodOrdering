import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import orders from '@assets/data/orders';
import OrderListItem from '@/components/OrderListItem';
import OrderItemListItem from '@/components/OrderItemListItem';
import { OrderStatusList } from '@/types';
import Colors from '@/constants/Colors';

const OrderDetailScreen = () => {
	const { id } = useLocalSearchParams();

	const order = orders.find((o) => o.id.toString() === id);

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

			<FlatList
				data={order.order_items}
				contentContainerStyle={{ gap: 10 }}
				renderItem={({ item }) => <OrderItemListItem orderItem={item} />}
				ListHeaderComponent={<OrderListItem order={order} />}
				ListFooterComponent={() => (
					<>
						<Text style={{ fontWeight: 'bold' }}>Status</Text>
						<View style={{ flexDirection: 'row', gap: 5 }}>
							{OrderStatusList.map((status) => (
								<Pressable
									key={status}
									onPress={() => console.warn('Update status')}
									style={{
										borderColor: Colors.light.tint,
										borderWidth: 1,
										padding: 10,
										borderRadius: 5,
										marginVertical: 10,
										backgroundColor:
											order.status === status
												? Colors.light.tint
												: 'transparent',
									}}>
									<Text
										style={{
											color:
												order.status === status ? 'white' : Colors.light.tint,
										}}>
										{status}
									</Text>
								</Pressable>
							))}
						</View>
					</>
				)}
			/>
			<View></View>
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
