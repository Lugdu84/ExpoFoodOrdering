import { View, Text, StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import Button from '@/components/Button';

const CreateProductScreen = () => {
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [errors, setErrors] = useState('');

	const handleSetPrice = (text: string) => {
		const priceWithDot = text.replace(',', '.');
		setPrice(priceWithDot);
	};

	const validateInput = () => {
		if (!name && !price) {
			setErrors('Name and Price are required');
			return false;
		}
		if (!name) {
			setErrors('Name is required');
			return false;
		}
		if (!price) {
			setErrors('Price is required');
			return false;
		}
		if (isNaN(Number(price))) {
			setErrors('Price must be a number');
			return false;
		}
		setErrors('');
		return true;
	};
	const onCreate = () => {
		if (!validateInput()) return;
		console.warn('Create Product', name, price);

		// Save the product to the database
		resetFields();
	};

	const resetFields = () => {
		setName('');
		setPrice('');
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Name :</Text>
			<TextInput
				value={name}
				placeholder="Name"
				onChangeText={setName}
				style={styles.input}
			/>
			<Text style={styles.label}>Price :</Text>
			<TextInput
				value={price}
				onChangeText={handleSetPrice}
				placeholder="9.99"
				keyboardType="numeric"
				style={styles.input}
			/>
			<Text style={styles.error}>{errors}</Text>
			<Button
				onPress={onCreate}
				text="Create Product"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 10,
	},
	label: {
		color: 'gray',
		fontSize: 16,
	},
	input: {
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: 'lightgrey',
		padding: 10,
		borderRadius: 10,
		marginTop: 5,
		marginBottom: 20,
	},
	error: {
		color: 'red',
	},
});

export default CreateProductScreen;
