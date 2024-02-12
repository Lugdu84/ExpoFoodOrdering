import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Order } from '@/types';

type OrderListItemProps = {
	order: Order;
};

const OrderListItem = ({ order }: OrderListItemProps) => {
	return (
		<View style={styles.container}>
			<View style={styles.aboutOrder}>
				<Text style={styles.orderId}>Order #{order.id}</Text>
				<Text>{order.created_at}</Text>
			</View>
			<Text style={styles.statusText}>{order.status}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
	},
	aboutOrder: {
		gap: 5,
	},
	orderId: {
		fontWeight: 'bold',
		fontSize: 16,
	},
	statusText: {
		fontWeight: '600',
		fontSize: 16,
	},
});

export default OrderListItem;
