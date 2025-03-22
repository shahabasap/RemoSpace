import { defineStore } from 'pinia';
import { directus } from '../services/directusServices';
import { readMe } from '@directus/sdk';

export interface AuthState {
  user: Record<string, QueryObject> | null;
  isLoggedIn: boolean;
}

interface QueryObject {
  fields: string[];
}

const query_object: QueryObject = {
  fields: ['id', 'email', 'first_name', 'last_name', 'role']
};

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {},
    isLoggedIn: false,
  }),

  actions: {
    // login
    async login(email: string, password: string) {
      try {
        await directus.login(email, password);
        const user = await directus.request(readMe(query_object));

        this.user = user;
        this.isLoggedIn = true;
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },

    // logout 
    async logout() {
      await directus.logout();
      this.user = {};
      this.isLoggedIn = false;
    },

    // ✅ Load user state when app starts
    async loadUser() {
      try {
        const user = await directus.request(readMe());
        this.user = user;
        this.isLoggedIn = true;
      } catch (error) {
        console.log('No active session found.', error);
        this.user = {};
        this.isLoggedIn = false;
      }
    }
  },
  persist: true
});
