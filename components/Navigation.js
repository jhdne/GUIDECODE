function Navigation({ user, onLogout }) {
    try {
        const [language, setLanguage] = React.useState(localStorage.getItem('language') || 'en');

        const handleLanguageChange = (lang) => {
            setLanguage(lang);
            localStorage.setItem('language', lang);
            window.location.reload();
        };

        const navItems = {
            en: {
                features: "Features",
                cases: "Case Studies",
                login: "Login",
                register: "Register",
                profile: "Profile",
                logout: "Logout"
            },
            zh: {
                features: "功能特点",
                cases: "案例研究",
                login: "登录",
                register: "注册",
                profile: "个人资料",
                logout: "退出"
            }
        };

        return (
            <nav className="bg-gray-900 py-4" data-name="navigation">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <a href="#" className="text-xl font-bold" data-name="nav-logo">
                        GUIDECODE
                    </a>
                    <div className="flex items-center space-x-6">
                        <a href="#features" className="nav-link" data-name="nav-features">
                            {navItems[language].features}
                        </a>
                        <a href="#cases" className="nav-link" data-name="nav-cases">
                            {navItems[language].cases}
                        </a>

                        {user ? (
                            <div className="flex items-center space-x-4" data-name="nav-user-menu">
                                <a 
                                    href="#profile" 
                                    className="nav-link"
                                    data-name="nav-profile"
                                >
                                    {user.name}
                                </a>
                                <button 
                                    onClick={onLogout}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                    data-name="nav-logout"
                                >
                                    {navItems[language].logout}
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4" data-name="nav-auth">
                                <a 
                                    href="#login" 
                                    className="nav-link"
                                    data-name="nav-login"
                                >
                                    {navItems[language].login}
                                </a>
                                <a 
                                    href="#register" 
                                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                                    data-name="nav-register"
                                >
                                    {navItems[language].register}
                                </a>
                            </div>
                        )}

                        <div className="language-switcher flex border border-gray-700 rounded-md overflow-hidden" data-name="language-switcher">
                            <button
                                onClick={() => handleLanguageChange('en')}
                                className={`px-2 py-1 text-sm ${language === 'en' ? 'bg-purple-600 text-white' : 'hover:bg-gray-800'}`}
                                data-name="lang-en"
                            >
                                EN
                            </button>
                            <button
                                onClick={() => handleLanguageChange('zh')}
                                className={`px-2 py-1 text-sm ${language === 'zh' ? 'bg-purple-600 text-white' : 'hover:bg-gray-800'}`}
                                data-name="lang-zh"
                            >
                                中
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        );
    } catch (error) {
        console.error('Navigation component error:', error);
        reportError(error);
        return null;
    }
}
