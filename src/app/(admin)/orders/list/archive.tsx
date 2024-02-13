import { Text, FlatList } from 'react-native';
import React from 'react';
import orders from '@assets/data/orders';
import OrderListItem from '@/components/OrderListItem';

const ListOrdersScreen = () => {
	return (
		<FlatList
			data={orders}
			contentContainerStyle={{ padding: 10, gap: 10 }}
			renderItem={({ item }) => <OrderListItem order={item} />}
		/>
	);
};

export default ListOrdersScreen;
