function CaseStudies() {
    try {
        const language = localStorage.getItem('language') || 'en';

        const cases = {
            en: [
                {
                    company: 'TechStart Solutions',
                    product: 'Mobile Application',
                    description: 'Generated complete product documentation in 2 hours instead of 2 weeks. Their team was able to streamline the development process and improve collaboration across departments.',
                    impact: 'Reduced documentation time by 90% and improved team productivity by 40%.'
                },
                {
                    company: 'DevFlow Systems',
                    product: 'Web Platform',
                    description: 'Standardized documentation process across 5 product teams, leading to better consistency and reduced onboarding time for new team members.',
                    impact: 'Achieved 60% faster onboarding and 30% fewer documentation-related queries.'
                },
                {
                    company: 'CloudScale Technologies',
                    product: 'SaaS Platform',
                    description: 'Reduced documentation time by 80% for their enterprise solution while maintaining high quality and consistency across all product modules.',
                    impact: 'Saved over 200 hours per month in documentation efforts.'
                },
                {
                    company: 'FinTech Innovations Ltd',
                    product: 'Banking Platform',
                    description: 'Automated the creation of complex financial product documentation, ensuring compliance with regulatory requirements while saving significant time.',
                    impact: 'Achieved 100% compliance and reduced documentation costs by 65%.'
                }
            ],
            zh: [
                {
                    company: '启航科技',
                    product: '移动应用平台',
                    description: '在2小时内完成了原本需要2周的产品文档生成。他们的团队能够简化开发流程，改善部门间的协作。',
                    impact: '文档编写时间减少90%，团队生产力提高40%。'
                },
                {
                    company: '流程科技',
                    product: '网络平台',
                    description: '在5个产品团队中标准化文档流程，提高一致性，减少新团队成员的入职时间。',
                    impact: '入职速度提高60%，文档相关查询减少30%。'
                },
                {
                    company: '云创科技',
                    product: '企业服务平台',
                    description: '企业解决方案的文档时间减少80%，同时保持所有产品模块的高质量和一致性。',
                    impact: '每月节省200多小时的文档工作时间。'
                },
                {
                    company: '金融创新科技',
                    product: '银行业务平台',
                    description: '自动创建复杂的金融产品文档，确保符合监管要求，同时节省大量时间。',
                    impact: '实现100%合规，文档成本降低65%。'
                }
            ]
        };

        return (
            <section id="cases" className="cases-section" data-name="cases">
                <h2>{language === 'en' ? 'Success Stories' : '成功案例'}</h2>
                <div className="cases-grid">
                    {cases[language].map((case_, index) => (
                        <div key={index} className="case-card" data-name={`case-${index}`}>
                            <h3>{case_.company}</h3>
                            <span className="case-product">{case_.product}</span>
                            <p className="case-description">{case_.description}</p>
                            <p className="case-impact">{case_.impact}</p>
                        </div>
                    ))}
                </div>
            </section>
        );
    } catch (error) {
        console.error('CaseStudies component error:', error);
        reportError(error);
        return null;
    }
}
