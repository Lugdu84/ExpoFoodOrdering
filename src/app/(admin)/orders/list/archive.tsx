import { Text, FlatList, ActivityIndicator } from 'react-native';
import React from 'react';
import OrderListItem from '@/components/OrderListItem';
import { useAdminOrderList } from '@/api/orders';

const ListOrdersScreen = () => {
	const {
		data: orders,
		isLoading,
		error,
	} = useAdminOrderList({ archived: true });

	if (isLoading) {
		return <ActivityIndicator />;
	}

	if (error) {
		return <Text>Fail to fetch orders</Text>;
	}
	return (
		<FlatList
			data={orders}
			contentContainerStyle={{ padding: 10, gap: 10 }}
			renderItem={({ item }) => <OrderListItem order={item} />}
		/>
	);
};

export default ListOrdersScreen;
