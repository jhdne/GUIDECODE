function FAQ() {
    try {
        const [openQuestion, setOpenQuestion] = React.useState(null);
        const language = localStorage.getItem('language') || 'en';

        const faqData = {
            en: [
                {
                    question: "What is GuideCode?",
                    answer: "GuideCode is an AI-powered documentation generator that helps developers, product managers, and technical writers create comprehensive documentation quickly and efficiently. It uses advanced AI technology to transform your product specifications into well-structured, professional documentation."
                },
                {
                    question: "How to use GuideCode?",
                    answer: "Using GuideCode is simple: 1) Sign up for an account, 2) Fill in your project details including name, type, and key features, 3) Click 'Generate Documentation' and our AI will create comprehensive documentation for you, 4) Review and download your documentation in your preferred format (PDF or TXT)."
                },
                {
                    question: "How to manage the documents?",
                    answer: "GuideCode provides a user-friendly document management system. You can access all your generated documents from your profile, view them online, download in different formats, and delete when no longer needed. All documents are securely stored and easily accessible."
                },
                {
                    question: "Are the documents provided by GuideCode of high quality?",
                    answer: "Yes! GuideCode generates high-quality documentation following industry best practices. Our AI is trained on professional documentation standards and continuously updated to ensure the output meets modern documentation requirements. Each document is structured logically and includes all necessary sections."
                },
                {
                    question: "Can GuideCode significantly improve programming?",
                    answer: "GuideCode significantly improves the development process by providing clear, structured documentation that serves as a solid foundation for programming. Good documentation reduces misunderstandings, speeds up onboarding, and helps maintain code quality throughout the project lifecycle."
                },
                {
                    question: "For which people is GuideCode most beneficial?",
                    answer: "GuideCode is particularly beneficial for: 1) Software Developers who need to document their code and APIs, 2) Product Managers who need to create product specifications, 3) Technical Writers who want to speed up documentation creation, 4) Team Leaders who want to maintain consistent documentation standards."
                }
            ],
            zh: [
                {
                    question: "什么是GuideCode?",
                    answer: "GuideCode是一个AI驱动的文档生成器，帮助开发人员、产品经理和技术写作人员快速高效地创建全面的文档。它使用先进的AI技术将您的产品规格转化为结构良好的专业文档。"
                },
                {
                    question: "如何使用GuideCode?",
                    answer: "使用GuideCode很简单: 1) 注册账户, 2) 填写项目详细信息，包括名称、类型和主要功能, 3) 点击'生成文档'，我们的AI将为您创建全面的文档, 4) 查看并以您喜欢的格式(PDF或TXT)下载文档。"
                },
                {
                    question: "如何管理文档?",
                    answer: "GuideCode提供用户友好的文档管理系统。您可以从个人资料中访问所有生成的文档，在线查看，以不同格式下载，并在不需要时删除。所有文档都安全存储且易于访问。"
                },
                {
                    question: "GuideCode提供的文档质量高吗?",
                    answer: "是的! GuideCode遵循行业最佳实践生成高质量文档。我们的AI经过专业文档标准培训，并不断更新以确保输出满足现代文档要求。每个文档都有逻辑结构并包含所有必要的部分。"
                },
                {
                    question: "GuideCode能显著改善编程吗?",
                    answer: "GuideCode通过提供清晰、结构化的文档作为编程的坚实基础，显著改善了开发过程。良好的文档减少误解，加快入职速度，并帮助在整个项目生命周期中维护代码质量。"
                },
                {
                    question: "GuideCode最适合哪些人使用?",
                    answer: "GuideCode特别有益于: 1) 需要记录代码和API的软件开发人员, 2) 需要创建产品规格的产品经理, 3) 想要加快文档创建速度的技术写作人员, 4) 想要保持一致文档标准的团队负责人。"
                }
            ]
        };

        const toggleQuestion = (index) => {
            setOpenQuestion(openQuestion === index ? null : index);
        };

        return (
            <section className="faq-section" data-name="faq">
                <h2 className="text-2xl font-bold text-center mb-8">
                    {language === 'en' ? 'Frequently Asked Questions' : '常见问题'}
                </h2>
                <div className="faq-list">
                    {faqData[language].map((item, index) => (
                        <div 
                            key={index} 
                            className="faq-item"
                            data-name={`faq-item-${index}`}
                        >
                            <button
                                className="faq-question"
                                onClick={() => toggleQuestion(index)}
                                data-name={`faq-question-${index}`}
                            >
                                <span>{item.question}</span>
                                <i className={`fas fa-chevron-${openQuestion === index ? 'up' : 'down'}`}></i>
                            </button>
                            {openQuestion === index && (
                                <div className="faq-answer" data-name={`faq-answer-${index}`}>
                                    {item.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        );
    } catch (error) {
        console.error('FAQ component error:', error);
        reportError(error);
        return null;
    }
}
