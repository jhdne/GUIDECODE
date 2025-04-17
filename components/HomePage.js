function HomePage() {
    try {
        const language = localStorage.getItem('language') || 'en';

        // Make sure all components are accessible in this scope
        if (!Features || !CaseStudies || !FAQ || !Footer) {
            throw new Error('Required components are not loaded');
        }

        return (
            <div className="home-container" data-name="home">
                <section className="hero" data-name="hero">
                    <div className="hero-content">
                        <h1>
                            {language === 'en' 
                                ? 'Create Professional Documentation in Minutes' 
                                : '几分钟内创建专业文档'}
                        </h1>
                        <p>
                            {language === 'en'
                                ? 'Transform your product ideas into comprehensive documentation with our AI-powered generator. Perfect for developers, product managers, and technical writers.'
                                : '使用我们的AI驱动生成器将您的产品创意转化为全面的文档。完美适合开发人员、产品经理和技术作者。'}
                        </p>
                        <div className="hero-buttons">
                            <a href="#generator" className="btn-primary btn-large" data-name="get-started">
                                {language === 'en' ? 'Get Started Free' : '免费开始'}
                            </a>
                        </div>
                    </div>
                </section>

                <Features />
                <CaseStudies />
                
                <section className="create-section" data-name="create-section">
                    <a href="#generator" className="create-button" data-name="create-button">
                        {language === 'en' ? 'CREATE' : '创建'}
                    </a>
                </section>

                <FAQ />
                <Footer />
            </div>
        );
    } catch (error) {
        console.error('HomePage component error:', error);
        reportError(error);
        return null;
    }
}
