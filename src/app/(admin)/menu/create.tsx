import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import React, { useState } from 'react';
import Button from '@/components/Button';
import { defaultPizzaImage } from '@/constants/Images';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack } from 'expo-router';

const CreateProductScreen = () => {
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [errors, setErrors] = useState('');
	const [image, setImage] = useState<string | null>(null);

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

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: 'Create Product' }} />
			<Image
				source={{ uri: image ?? defaultPizzaImage }}
				style={styles.image}
			/>
			<Text
				onPress={pickImage}
				style={styles.textButton}>
				Select an image
			</Text>
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
	image: {
		width: '50%',
		aspectRatio: 1,
		alignSelf: 'center',
	},
	textButton: {
		alignSelf: 'center',
		fontWeight: 'bold',
		color: Colors.light.tint,
		marginVertical: 10,
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
