function ThemeToggle() {
    try {
        const [isDark, setIsDark] = React.useState(localStorage.getItem('theme') === 'dark');

        React.useEffect(() => {
            const theme = isDark ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        }, [isDark]);

        return (
            <button 
                onClick={() => setIsDark(!isDark)}
                className="theme-toggle"
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                data-name="theme-toggle"
            >
                <i className="fas fa-eye"></i>
            </button>
        );
    } catch (error) {
        console.error('ThemeToggle component error:', error);
        reportError(error);
        return null;
    }
}
