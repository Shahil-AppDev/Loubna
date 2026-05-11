import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'super_admin';
}

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const response = await fetch('/api/auth/me');
      const data = await response.json();
      
      if (response.ok && data.user) {
        setUser(data.user);
        setIsAdmin(true);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Error checking user:', error);
      setUser(null);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setIsAdmin(false);
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  return {
    user,
    loading,
    isAdmin,
    signOut,
  };
}
