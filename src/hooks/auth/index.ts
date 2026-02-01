export const useAuthStatus = () => {
    const token = sessionStorage.getItem('token');
    const tokenExpiration = sessionStorage.getItem('tokenExpiration');

    let isAuthenticated, isLoading, isError;
    if (token && tokenExpiration) {
        const expirationDate = new Date(tokenExpiration);
        const now = new Date();
        isAuthenticated = now < expirationDate;
    } else {
        isAuthenticated = false;
    }
    isLoading = false;
    isError = false;

    return (token) ? {
        isAuthenticated,
        isLoading,
        isError,
    } : {
        isAuthenticated: false,
        isLoading: false,
        isError: false,
    };
};
