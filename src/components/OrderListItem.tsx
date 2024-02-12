import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Order } from '@/types';
import RelativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { Link, useSegments } from 'expo-router';

dayjs.extend(RelativeTime);

type OrderListItemProps = {
	order: Order;
};

const OrderListItem = ({ order }: OrderListItemProps) => {
	const segments = useSegments();
	return (
		<Link
			// @ts-ignore
			// TODO: Fix error in segment route
			href={`/${segments[0]}/orders/${order.id}`}
			asChild>
			<Pressable style={styles.container}>
				<View style={styles.aboutOrder}>
					<Text style={styles.title}>Order #{order.id}</Text>
					<Text style={styles.time}>{dayjs(order.created_at).fromNow()}</Text>
				</View>
				<Text style={styles.statusText}>{order.status}</Text>
			</Pressable>
		</Link>
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
	title: {
		fontWeight: 'bold',
		fontSize: 16,
	},
	time: {
		color: 'grey',
	},
	statusText: {
		fontWeight: '500',
		fontSize: 16,
	},
});

export default OrderListItem;
