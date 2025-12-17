/**
 * Simple authentication helper for the Hub Ebooks Area.
 * Uses localStorage to persist the "logged in" state, compatible with the main Ebook app logic.
 */

const STORAGE_KEY = 'ebook_user_email';
const PRODUCTS_KEY = 'ebook_user_products';

export interface User {
    email: string;
    ownedProducts: string[];
}

export const hubAuth = {
    login: (email: string, products: string[] = ['astronomia-basica']) => {
        localStorage.setItem(STORAGE_KEY, email.toLowerCase().trim());
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    },

    logout: () => {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(PRODUCTS_KEY);
    },

    getUser: (): User | null => {
        const email = localStorage.getItem(STORAGE_KEY);
        if (!email) return null;

        const productsStr = localStorage.getItem(PRODUCTS_KEY);
        const ownedProducts = productsStr ? JSON.parse(productsStr) : ['astronomia-basica']; // Default fallback

        return { email, ownedProducts };
    },

    isAuthenticated: (): boolean => {
        return !!localStorage.getItem(STORAGE_KEY);
    },

    hasAccess: (productId: string): boolean => {
        const user = hubAuth.getUser();
        if (!user) return false;
        return user.ownedProducts.includes(productId);
    }
};
