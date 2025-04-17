const AUTH_KEY = 'doc_generator_auth';

const auth = {
    login: (email, password) => {
        try {
            // Simulated login - in real app, this would be an API call
            const user = {
                id: 'user_' + Math.random().toString(36).substr(2, 9),
                email,
                name: email.split('@')[0]
            };
            localStorage.setItem(AUTH_KEY, JSON.stringify(user));
            return user;
        } catch (error) {
            console.error('Login error:', error);
            throw new Error('Login failed. Please try again.');
        }
    },

    register: (email, password, name) => {
        try {
            // Simulated registration - in real app, this would be an API call
            const user = {
                id: 'user_' + Math.random().toString(36).substr(2, 9),
                email,
                name
            };
            localStorage.setItem(AUTH_KEY, JSON.stringify(user));
            return user;
        } catch (error) {
            console.error('Registration error:', error);
            throw new Error('Registration failed. Please try again.');
        }
    },

    updateProfile: async (userId, profileData) => {
        try {
            const currentUser = auth.getCurrentUser();
            if (!currentUser || currentUser.id !== userId) {
                throw new Error('Unauthorized');
            }

            const updatedUser = {
                ...currentUser,
                ...profileData
            };

            localStorage.setItem(AUTH_KEY, JSON.stringify(updatedUser));
            return updatedUser;
        } catch (error) {
            console.error('Update profile error:', error);
            throw new Error('Failed to update profile');
        }
    },

    logout: () => {
        try {
            localStorage.removeItem(AUTH_KEY);
        } catch (error) {
            console.error('Logout error:', error);
            throw new Error('Logout failed. Please try again.');
        }
    },

    getCurrentUser: () => {
        try {
            const user = localStorage.getItem(AUTH_KEY);
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Get current user error:', error);
            return null;
        }
    }
};
