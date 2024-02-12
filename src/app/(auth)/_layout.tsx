import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const AuthLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name="sign-in"
				options={{ title: 'Sign in' }}
			/>
		</Stack>
	);
};

export default AuthLayout;
