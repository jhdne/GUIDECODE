function App() {
    try {
        const [currentUser, setCurrentUser] = React.useState(auth.getCurrentUser());
        const [currentPage, setCurrentPage] = React.useState(window.location.hash || '#home');
        const [generatedDocs, setGeneratedDocs] = React.useState(null);
        const [isGenerating, setIsGenerating] = React.useState(false);
        const [error, setError] = React.useState(null);

        React.useEffect(() => {
            const handleHashChange = () => {
                setCurrentPage(window.location.hash || '#home');
            };

            window.addEventListener('hashchange', handleHashChange);
            return () => window.removeEventListener('hashchange', handleHashChange);
        }, []);

        const handleLogin = async (credentials) => {
            try {
                const user = await auth.login(credentials.email, credentials.password);
                setCurrentUser(user);
                window.location.hash = '#generator';
            } catch (error) {
                alert(error.message);
            }
        };

        const handleRegister = async (userData) => {
            try {
                const user = await auth.register(userData.email, userData.password, userData.name);
                setCurrentUser(user);
                window.location.hash = '#login';
            } catch (error) {
                alert(error.message);
            }
        };

        const handleLogout = () => {
            auth.logout();
            setCurrentUser(null);
            setGeneratedDocs(null);
            window.location.hash = '#home';
        };

        const handleUpdateProfile = async (profileData) => {
            try {
                const updatedUser = await auth.updateProfile(currentUser.id, profileData);
                setCurrentUser(updatedUser);
            } catch (error) {
                throw error;
            }
        };

        const handleDocumentSubmit = async (formData) => {
            try {
                if (!currentUser) {
                    window.location.hash = '#login';
                    return;
                }
                setIsGenerating(true);
                setError(null);
                const documents = await generateDocument(formData);
                const savedDoc = await documentStorage.saveDocument(currentUser.id, documents, formData);
                setGeneratedDocs(documents);
                // Redirect to preview page with the generated document
                window.location.hash = '#preview';
            } catch (error) {
                console.error('Error in document generation:', error);
                setError(error.message || 'Failed to generate documentation. Please try again.');
            } finally {
                setIsGenerating(false);
            }
        };

        const renderContent = () => {
            try {
                switch (currentPage) {
                    case '#home':
                        return <HomePage />;
                    
                    case '#login':
                        return <AuthForm mode="login" onSubmit={handleLogin} />;
                    
                    case '#register':
                        return <AuthForm mode="register" onSubmit={handleRegister} />;
                    
                    case '#profile':
                        if (!currentUser) {
                            window.location.hash = '#login';
                            return null;
                        }
                        return <UserProfile user={currentUser} onUpdateProfile={handleUpdateProfile} />;
                    
                    case '#generator':
                        if (!currentUser) {
                            window.location.hash = '#login';
                            return null;
                        }
                        return (
                            <div>
                                <DocumentForm onSubmit={handleDocumentSubmit} />
                                {error && (
                                    <div className="error-message mt-4 p-3 bg-red-600 text-white rounded" data-name="generation-error">
                                        {error}
                                    </div>
                                )}
                                {isGenerating && (
                                    <div className="text-center py-8" data-name="loading">
                                        <i className="fas fa-spinner fa-spin fa-2x"></i>
                                        <p className="mt-2">Generating documentation...</p>
                                    </div>
                                )}
                            </div>
                        );

                    case '#preview':
                        if (!generatedDocs) {
                            window.location.hash = '#generator';
                            return null;
                        }
                        return <DocumentPreviewPage documents={generatedDocs} />;
                    
                    case '#features':
                        return <Features />;
                    
                    case '#cases':
                        return <CaseStudies />;
                    
                    default:
                        return <HomePage />;
                }
            } catch (error) {
                console.error('renderContent error:', error);
                reportError(error);
                return <div>Something went wrong. Please try again.</div>;
            }
        };

        return (
            <div data-name="app">
                <Navigation user={currentUser} onLogout={handleLogout} />
                <div className="container mx-auto px-4">
                    {renderContent()}
                </div>
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
        return null;
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
