import { defineStore } from 'pinia';
import { directus, readMe } from '../services/directus';
import { ref, computed } from 'vue';

interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role?: string;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem('directus_token'));
  const loading = ref(false);
  const error = ref<string | null>(null);

  // ✅ Computed property to check authentication status
  const isAuthenticated = computed(() => !!token.value);

  // ✅ Login 
  async function login(credentials: { email: string; password: string }): Promise<boolean> {
    loading.value = true;
    error.value = null;

    try {
      const response = await directus.login(credentials.email, credentials.password, { mode: 'json' });

      if (response?.access_token) {
        token.value = response.access_token;
        localStorage.setItem('directus_token', token.value);
        await fetchCurrentUser();
        return true;
      }

      throw new Error('No access token received');
    } catch (err) {
      console.error('Login failed:', err);
      error.value = err instanceof Error ? err.message : 'Authentication failed';
      return false;
    } finally {
      loading.value = false;
    }
  }

  // ✅ Fetch authenticated user
  async function fetchCurrentUser() {
    if (!token.value) return;

    try {
      const me = await directus.request(readMe()); // ✅ Correct API call

      if (me && typeof me === 'object' && 'email' in me) {
        user.value = {
          id: me.id,
          email: me.email,
          first_name: me.first_name || '',
          last_name: me.last_name || '',
          role: me.role || '',
        };
      } else {
        throw new Error('Invalid user data received');
      }
    } catch (err) {
      console.error('Error fetching current user:', err);
      await logout();
    }
  }

  // ✅ Logout
  async function logout() {
    try {
      await directus.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      user.value = null;
      token.value = null;
      localStorage.removeItem('directus_token');
    }
  }

  // ✅ Auto-load user session on startup
  async function init() {
    if (token.value) {
      try {
        await fetchCurrentUser();
      } catch (err) {
        console.log('Session not found or invalid:', err);
        await logout();
      }
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    init,
  };
});
