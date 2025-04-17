function Header() {
    try {
        return (
            <header className="mb-8" data-name="header">
                <h1 className="app-title" data-name="app-title">Product Documentation Generator</h1>
                <p className="app-description" data-name="app-description">
                    Generate professional product documentation effortlessly. Input your project details and let our AI-powered system create comprehensive documentation tailored to your needs.
                </p>
            </header>
        );
    } catch (error) {
        console.error('Header component error:', error);
        reportError(error);
        return null;
    }
}
