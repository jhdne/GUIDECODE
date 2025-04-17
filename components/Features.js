function Features() {
    try {
        const language = localStorage.getItem('language') || 'en';

        const features = {
            en: [
                {
                    title: 'Lightning Fast',
                    description: 'Generate complete documentation in minutes, not hours'
                },
                {
                    title: 'AI-Powered',
                    description: 'Smart templates that adapt to your product needs'
                },
                {
                    title: 'Multiple Formats',
                    description: 'Export your documentation in PDF, Word, or Markdown'
                },
                {
                    title: 'Customizable',
                    description: 'Tailor templates to match your requirements'
                }
            ],
            zh: [
                {
                    title: '快速生成',
                    description: '几分钟内生成完整文档，而不是几小时'
                },
                {
                    title: 'AI智能',
                    description: '智能模板适应您的产品需求'
                },
                {
                    title: '多种格式',
                    description: '以PDF、Word或Markdown格式导出文档'
                },
                {
                    title: '可定制化',
                    description: '根据需求定制模板'
                }
            ]
        };

        return (
            <section id="features" className="features-section" data-name="features">
                <h2>
                    {language === 'en' 
                        ? 'Why Choose Our Documentation Generator?' 
                        : '为什么选择我们的文档生成器？'}
                </h2>
                <div className="features-grid">
                    {features[language].map((feature, index) => (
                        <div key={index} className="feature-card" data-name={`feature-${index}`}>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        );
    } catch (error) {
        console.error('Features component error:', error);
        reportError(error);
        return null;
    }
}
