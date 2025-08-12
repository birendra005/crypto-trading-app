import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import CryptoJS from 'crypto-js';

const STORAGE_KEY = 'auth';
const SECRET_KEY = 'my-secret-key-123';

export type User = {
  email: string;
  password: string;
  name: string;
};

 interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const encrypt = (data: any) => {
  const stringified = JSON.stringify(data);
  return CryptoJS.AES.encrypt(stringified, SECRET_KEY).toString();
};

const decrypt = (cipher: string) => {
  const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted);
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      login: (user) => set({ user, isLoggedIn: true }),
      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: STORAGE_KEY,
      storage: {
        getItem: (name) => {
          const encrypted = localStorage.getItem(name);
          if (!encrypted) return null;
          try {
            const parsed = decrypt(encrypted);
            return { state: parsed };
          } catch {
            return null;
          }
        },
        setItem: (name, value) => {
          const encrypted = encrypt(value.state);
          localStorage.setItem(name, encrypted);
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);
