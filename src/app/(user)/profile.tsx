import { StyleSheet } from 'react-native';

import EditScreenInfo from '@components/EditScreenInfo';
import { Text, View } from '@components/Themed';
import Button from '@/components/Button';
import { supabase } from '@/lib/supabase';

export default function TabTwoScreen() {
	const handleLogout = () => {
		supabase.auth.signOut();
	};
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Tab Two</Text>
			<View
				style={styles.separator}
				lightColor="#eee"
				darkColor="rgba(255,255,255,0.1)"
			/>
			<Button
				text="Logout"
				onPress={handleLogout}
			/>
			<EditScreenInfo path="app/(tabs)/two.tsx" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
