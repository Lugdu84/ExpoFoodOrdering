import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { useClientOnlyValue } from '@components/useClientOnlyValue';
import { useAuth } from '@/providers/AuthProvider';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>['name'];
	color: string;
}) {
	return (
		<FontAwesome
			size={28}
			style={{ marginBottom: -3 }}
			{...props}
		/>
	);
}

export default function TabLayout() {
	const { isAdmin } = useAuth();

	if (!isAdmin) {
		return <Redirect href={'/'} />;
	}

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors.light.background,
				tabBarInactiveTintColor: 'gainsboro',
				// Disable the static render of the header on web
				// to prevent a hydration error in React Navigation v6.
				headerShown: useClientOnlyValue(false, true),
				tabBarStyle: {
					backgroundColor: Colors.light.tint,
				},
			}}>
			<Tabs.Screen
				name="index"
				options={{ href: null }}
			/>
			<Tabs.Screen
				name="menu"
				options={{
					headerShown: false,
					title: 'Menu',
					tabBarIcon: ({ color }) => (
						<TabBarIcon
							name="cutlery"
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="orders"
				options={{
					headerShown: false,
					title: 'Orders',
					tabBarIcon: ({ color }) => (
						<TabBarIcon
							name="list"
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="two"
				options={{
					title: 'Profile',
					tabBarIcon: ({ color }) => (
						<TabBarIcon
							name="user"
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
