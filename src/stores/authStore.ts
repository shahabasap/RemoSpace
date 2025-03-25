import { defineStore } from 'pinia';
import { directus, readMe } from '../services/directus';


export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {},
    token: null as string | null,
    isAuthenticated: false,
  }),


  actions: {
    
    // login
    async login(credentials: { email: string; password: string }) {
      try {
        const response = await directus.login(credentials.email, credentials.password);
        const user = await directus.request(readMe());
        const token = response.access_token;
        console.log(response);

        this.token = token;
        this.user = user;
        this.isAuthenticated = true;
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },

    // logout 
    async logout() {
      await directus.logout();
      this.user = {};
      this.isAuthenticated = false;
    },

    // ✅ Load user state when app starts
    async loadUser() {
      try {
        const user = await directus.request(readMe());
        this.user = user;
        this.isAuthenticated = true;
      } catch (error) {
        console.log('No active session found.', error);
        this.user = {};
        this.isAuthenticated = false;
      }
    }
  },
  persist: true
});