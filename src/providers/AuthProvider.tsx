import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';

type AuthData = {
	session: Session | null;
	profile: any;
	loading: boolean;
	isAdmin: boolean;
};

const AuthContext = createContext<AuthData>({
	session: null,
	profile: null,
	loading: true,
	isAdmin: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
	const [session, setSession] = useState<Session | null>(null);
	const [profile, setProfile] = useState<any | null>(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const fetchSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setSession(session);

			if (session) {
				const { data: profile } = await supabase
					.from('profiles')
					.select('*')
					.eq('id', session.user.id)
					.single();
				setProfile(profile || null);
			}
			setLoading(false);
		};
		fetchSession();
		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);
	return (
		<AuthContext.Provider
			value={{
				session,
				profile,
				isAdmin: profile?.group === 'ADMIN',
				loading,
			}}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
