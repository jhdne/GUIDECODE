function DocumentForm({ onSubmit }) {
    try {
        const language = localStorage.getItem('language') || 'en';
        const [formData, setFormData] = React.useState({
            projectName: '',
            productType: '',
            projectDescription: '',
            targetAudience: '',
            mainFeatures: '',
            externalResources: ''
        });
        const [isSubmitting, setIsSubmitting] = React.useState(false);
        const [error, setError] = React.useState(null);

        const translations = {
            en: {
                projectName: "Project Name",
                productType: "Product Type",
                projectDescription: "Project Description",
                targetAudience: "Target Audience",
                mainFeatures: "Main Features",
                externalResources: "External Resources & APIs",
                submit: "Generate Documentation",
                generating: "Generating...",
                required: "is required",
                website: "Website",
                app: "Application",
                plugin: "Plugin/Extension",
                describeProject: "Describe your project",
                projectOverview: "Provide a brief overview of your project",
                whoIsFor: "Who is this product for?",
                listFeatures: "List main features (comma separated)",
                featuresExample: "Example: user authentication, product search, payment integration",
                listResources: "List external resources and APIs needed",
                resourcesExample: "Example: payment gateway, map API, authentication service"
            },
            zh: {
                projectName: "项目名称",
                productType: "产品类型",
                projectDescription: "项目描述",
                targetAudience: "目标用户",
                mainFeatures: "主要功能",
                externalResources: "外部资源和API",
                submit: "生成文档",
                generating: "正在生成...",
                required: "为必填项",
                website: "网站",
                app: "应用程序",
                plugin: "插件/扩展",
                describeProject: "描述您的项目",
                projectOverview: "提供项目的简要概述",
                whoIsFor: "这个产品适合谁？",
                listFeatures: "列出主要功能（用逗号分隔）",
                featuresExample: "示例：用户认证、产品搜索、支付集成",
                listResources: "列出需要的外部资源和API",
                resourcesExample: "示例：支付网关、地图API、认证服务"
            }
        };

        const productTypes = [
            { value: 'website', label: translations[language].website },
            { value: 'app', label: translations[language].app },
            { value: 'plugin', label: translations[language].plugin }
        ];

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
            setError(null);
        };

        const validateForm = () => {
            if (!formData.projectName.trim()) {
                throw new Error(`${translations[language].projectName} ${translations[language].required}`);
            }
            if (!formData.productType) {
                throw new Error(`${translations[language].productType} ${translations[language].required}`);
            }
            if (!formData.projectDescription.trim()) {
                throw new Error(`${translations[language].projectDescription} ${translations[language].required}`);
            }
            if (!formData.mainFeatures.trim()) {
                throw new Error(`${translations[language].mainFeatures} ${translations[language].required}`);
            }
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setError(null);
            setIsSubmitting(true);

            try {
                validateForm();
                await onSubmit({ ...formData, language }); // Pass language to onSubmit
            } catch (error) {
                setError(error.message);
                console.error('Form submission error:', error);
            } finally {
                setIsSubmitting(false);
            }
        };

        return (
            <form onSubmit={handleSubmit} className="form-container" data-name="document-form">
                {error && (
                    <div className="error-message mb-4 p-3 bg-red-600 text-white rounded" data-name="form-error">
                        {error}
                    </div>
                )}

                <div className="form-grid">
                    <FormInput
                        label={translations[language].projectName}
                        name="projectName"
                        placeholder={translations[language].projectName}
                        required={true}
                        value={formData.projectName}
                        onChange={handleChange}
                    />
                    <FormSelect
                        label={translations[language].productType}
                        name="productType"
                        options={productTypes}
                        required={true}
                        value={formData.productType}
                        onChange={handleChange}
                    />
                </div>

                <FormTextarea
                    label={translations[language].projectDescription}
                    name="projectDescription"
                    placeholder={translations[language].describeProject}
                    hint={translations[language].projectOverview}
                    required={true}
                    value={formData.projectDescription}
                    onChange={handleChange}
                    rows={4}
                />

                <FormTextarea
                    label={translations[language].targetAudience}
                    name="targetAudience"
                    placeholder={translations[language].whoIsFor}
                    required={true}
                    value={formData.targetAudience}
                    onChange={handleChange}
                />

                <FormTextarea
                    label={translations[language].mainFeatures}
                    name="mainFeatures"
                    placeholder={translations[language].listFeatures}
                    hint={translations[language].featuresExample}
                    required={true}
                    value={formData.mainFeatures}
                    onChange={handleChange}
                />

                <FormTextarea
                    label={translations[language].externalResources}
                    name="externalResources"
                    placeholder={translations[language].listResources}
                    hint={translations[language].resourcesExample}
                    value={formData.externalResources}
                    onChange={handleChange}
                />

                <button 
                    type="submit" 
                    className={`submit-button w-full mt-4 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                    data-name="submit-button"
                >
                    {isSubmitting ? translations[language].generating : translations[language].submit}
                </button>
            </form>
        );
    } catch (error) {
        console.error('DocumentForm component error:', error);
        reportError(error);
        return null;
    }
}
