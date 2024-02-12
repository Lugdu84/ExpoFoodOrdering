import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { OrderItem } from '@/types';
import { defaultPizzaImage } from '@/constants/Images';
import Colors from '@/constants/Colors';

type OrderItemListItemProps = {
	orderItem: OrderItem;
};

const OrderItemListItem = ({ orderItem }: OrderItemListItemProps) => {
	return (
		<View style={styles.container}>
			<View style={styles.leftBlock}>
				<Image
					style={styles.image}
					source={{ uri: defaultPizzaImage }}
				/>
				<View style={styles.product}>
					<Text style={styles.name}>{orderItem.products.name}</Text>
					<View style={styles.infoProduct}>
						<Text style={styles.price}>${orderItem.products.price}</Text>
						<Text style={styles.size}>Size: {orderItem.size}</Text>
					</View>
				</View>
			</View>
			<View style={styles.containerQuantity}>
				<Text style={styles.quantity}>{orderItem.quantity}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: 'white',
		padding: 5,
		borderRadius: 10,
	},
	leftBlock: {
		flexDirection: 'row',
		gap: 10,
	},
	image: {
		width: 60,
		alignSelf: 'center',
		aspectRatio: 1,
	},
	product: {
		justifyContent: 'center',
		gap: 5,
	},
	name: {
		fontWeight: 'bold',
		fontSize: 16,
	},
	infoProduct: {
		flexDirection: 'row',
		gap: 10,
	},
	price: {
		fontWeight: 'bold',
		color: Colors.light.tint,
		fontSize: 16,
	},
	size: {
		fontSize: 16,
	},
	containerQuantity: {
		justifyContent: 'center',
	},
	quantity: {
		fontWeight: 'bold',
		fontSize: 16,
	},
});

export default OrderItemListItem;
