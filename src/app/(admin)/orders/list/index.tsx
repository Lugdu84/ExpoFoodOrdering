import { Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import OrderListItem from '@/components/OrderListItem';
import { useAdminOrderList } from '@/api/orders';
import { supabase } from '@/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { useInsertOrderSubscription } from '@/api/orders/subscriptions';

const ListOrdersScreen = () => {
	const {
		data: orders,
		isLoading,
		error,
	} = useAdminOrderList({ archived: false });

	const query = useQueryClient();
	useInsertOrderSubscription();

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
