function AuthForm({ mode = 'login', onSubmit }) {
    try {
        const language = localStorage.getItem('language') || 'en';
        const [formData, setFormData] = React.useState({
            email: '',
            password: '',
            name: '',
            verificationCode: ''
        });
        const [errors, setErrors] = React.useState({});
        const [isVerificationSent, setIsVerificationSent] = React.useState(false);
        const [countdown, setCountdown] = React.useState(0);

        const translations = {
            en: {
                login: "Login",
                register: "Create Account",
                name: "Name",
                email: "Email",
                password: "Password",
                enterName: "Enter your name",
                enterEmail: "Enter your email",
                enterPassword: "Enter your password",
                verificationCode: "Verification Code",
                enterVerificationCode: "Enter verification code",
                getCode: "Get Code",
                resendIn: "Resend in",
                seconds: "s",
                submit: "Submit",
                haveAccount: "Already have an account?",
                noAccount: "Don't have an account?",
                errors: {
                    emailInvalid: "Please enter a valid email address",
                    passwordInvalid: "Password must be at least 8 characters long and contain uppercase, lowercase, number and special character",
                    nameRequired: "Name is required",
                    verificationRequired: "Verification code is required",
                    verificationFailed: "Failed to send verification code"
                }
            },
            zh: {
                login: "登录",
                register: "创建账号",
                name: "姓名",
                email: "邮箱",
                password: "密码",
                enterName: "请输入姓名",
                enterEmail: "请输入邮箱",
                enterPassword: "请输入密码",
                verificationCode: "验证码",
                enterVerificationCode: "请输入验证码",
                getCode: "获取验证码",
                resendIn: "重新发送",
                seconds: "秒",
                submit: "提交",
                haveAccount: "已有账号？",
                noAccount: "没有账号？",
                errors: {
                    emailInvalid: "请输入有效的邮箱地址",
                    passwordInvalid: "密码至少8位，必须包含大小写字母、数字和特殊字符",
                    nameRequired: "姓名不能为空",
                    verificationRequired: "验证码不能为空",
                    verificationFailed: "验证码发送失败"
                }
            }
        };

        const validateEmail = (email) => {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            return emailRegex.test(email);
        };

        const validatePassword = (password) => {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            return passwordRegex.test(password);
        };

        const handleVerificationRequest = async () => {
            if (!validateEmail(formData.email)) {
                setErrors({ email: translations[language].errors.emailInvalid });
                return;
            }

            try {
                setIsVerificationSent(true);
                setCountdown(60);

                const countdownInterval = setInterval(() => {
                    setCountdown((prev) => {
                        if (prev <= 1) {
                            clearInterval(countdownInterval);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
            } catch (error) {
                setErrors({ verification: translations[language].errors.verificationFailed });
            }
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            const newErrors = {};

            if (!validateEmail(formData.email)) {
                newErrors.email = translations[language].errors.emailInvalid;
            }

            if (mode === 'register') {
                if (!validatePassword(formData.password)) {
                    newErrors.password = translations[language].errors.passwordInvalid;
                }
                if (!formData.name.trim()) {
                    newErrors.name = translations[language].errors.nameRequired;
                }
                if (!formData.verificationCode) {
                    newErrors.verificationCode = translations[language].errors.verificationRequired;
                }
            }

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }

            onSubmit(formData);
        };

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        };

        return (
            <div className="auth-container" data-name="auth-form">
                <form onSubmit={handleSubmit} className="auth-form">
                    <h2 className="auth-title">
                        {mode === 'login' ? translations[language].login : translations[language].register}
                    </h2>
                    
                    {mode === 'register' && (
                        <div>
                            <FormInput
                                label={translations[language].name}
                                name="name"
                                placeholder={translations[language].enterName}
                                required={true}
                                value={formData.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            {errors.name && (
                                <p className="error-message text-red-500 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>
                    )}

                    <div>
                        <FormInput
                            label={translations[language].email}
                            name="email"
                            type="email"
                            placeholder={translations[language].enterEmail}
                            required={true}
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        {errors.email && (
                            <p className="error-message text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    {mode === 'register' && (
                        <div className="verification-section">
                            <div className="flex gap-2">
                                <FormInput
                                    label={translations[language].verificationCode}
                                    name="verificationCode"
                                    placeholder={translations[language].enterVerificationCode}
                                    required={true}
                                    value={formData.verificationCode}
                                    onChange={handleChange}
                                    error={errors.verificationCode}
                                />
                                <button
                                    type="button"
                                    onClick={handleVerificationRequest}
                                    disabled={countdown > 0}
                                    className="verification-button"
                                    data-name="verification-button"
                                >
                                    {countdown > 0 ? `${translations[language].resendIn} ${countdown}${translations[language].seconds}` : translations[language].getCode}
                                </button>
                            </div>
                            {errors.verificationCode && (
                                <p className="error-message text-red-500 text-sm mt-1">{errors.verificationCode}</p>
                            )}
                        </div>
                    )}

                    <div>
                        <FormInput
                            label={translations[language].password}
                            name="password"
                            type="password"
                            placeholder={translations[language].enterPassword}
                            required={true}
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        {errors.password && (
                            <p className="error-message text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        className="auth-submit"
                        data-name="auth-submit"
                    >
                        {mode === 'login' ? translations[language].login : translations[language].register}
                    </button>

                    <p className="auth-switch">
                        {mode === 'login' ? (
                            <span>
                                {translations[language].noAccount} <a href="#register">{translations[language].register}</a>
                            </span>
                        ) : (
                            <span>
                                {translations[language].haveAccount} <a href="#login">{translations[language].login}</a>
                            </span>
                        )}
                    </p>
                </form>
            </div>
        );
    } catch (error) {
        console.error('AuthForm component error:', error);
        reportError(error);
        return null;
    }
}
