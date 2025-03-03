'use client';

import { GetUserAndStore } from '@/lib/functions';
import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from 'react'; 

const AuthContext = createContext<{
    user: any;
    store: any;
    loading: boolean;
    error: Error | null;
} | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [store, setStore] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchAuthData = async () => {
            try {
                const { user, store } = await GetUserAndStore();
                setUser(user);
                setStore(store);
            } catch (err: any) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthData();
    }, []);

    return (
        <AuthContext.Provider value={{ user, store, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export { AuthProvider, useAuth };