function Footer() {
    try {
        const language = localStorage.getItem('language') || 'en';
        const [showPrivacy, setShowPrivacy] = React.useState(false);
        const [showTerms, setShowTerms] = React.useState(false);

        const texts = {
            en: {
                privacy: {
                    title: "Privacy Policy",
                    content: "We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our service."
                },
                terms: {
                    title: "Terms of Service",
                    content: "By using our service, you agree to these terms. We provide this service as is, and we reserve the right to modify or discontinue it at any time."
                },
                contact: "Contact Us",
                rights: "All Rights Reserved."
            },
            zh: {
                privacy: {
                    title: "隐私政策",
                    content: "我们尊重您的隐私并致力于保护您的个人数据。本隐私政策说明了我们在您使用我们的服务时如何收集、使用和保护您的信息。"
                },
                terms: {
                    title: "服务条款",
                    content: "使用我们的服务即表示您同意这些条款。我们按原样提供此服务，并保留随时修改或终止服务的权利。"
                },
                contact: "联系我们",
                rights: "保留所有权利。"
            }
        };

        const Modal = ({ title, content, onClose }) => (
            <div className="modal-overlay" onClick={onClose} data-name="modal-overlay">
                <div className="modal-content" onClick={e => e.stopPropagation()} data-name="modal-content">
                    <h3 className="modal-title">{title}</h3>
                    <p className="modal-text">{content}</p>
                    <button className="modal-close" onClick={onClose} data-name="modal-close">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </div>
        );

        return (
            <footer className="footer" data-name="footer">
                <div className="footer-content">
                    <div className="footer-info">
                        <p>© 2025 GuideCode. {texts[language].rights}</p>
                    </div>
                    <div className="footer-links">
                        <button 
                            onClick={() => setShowPrivacy(true)}
                            className="footer-link"
                            data-name="footer-privacy"
                        >
                            {texts[language].privacy.title}
                        </button>
                        <button 
                            onClick={() => setShowTerms(true)}
                            className="footer-link"
                            data-name="footer-terms"
                        >
                            {texts[language].terms.title}
                        </button>
                        <a 
                            href="mailto:contact@guidecode.com" 
                            className="footer-link"
                            data-name="footer-contact"
                        >
                            {texts[language].contact}
                        </a>
                    </div>
                </div>

                {showPrivacy && (
                    <Modal 
                        title={texts[language].privacy.title}
                        content={texts[language].privacy.content}
                        onClose={() => setShowPrivacy(false)}
                    />
                )}

                {showTerms && (
                    <Modal 
                        title={texts[language].terms.title}
                        content={texts[language].terms.content}
                        onClose={() => setShowTerms(false)}
                    />
                )}
            </footer>
        );
    } catch (error) {
        console.error('Footer component error:', error);
        reportError(error);
        return null;
    }
}
