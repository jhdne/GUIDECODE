function FormTextarea({ label, name, placeholder, hint, required, value, onChange, rows = 4 }) {
    try {
        return (
            <div className="input-group" data-name={`textarea-group-${name}`}>
                <label className="input-label" htmlFor={name} data-name={`label-${name}`}>
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    rows={rows}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    data-name={`textarea-${name}`}
                />
                {hint && <p className="input-hint" data-name={`hint-${name}`}>{hint}</p>}
            </div>
        );
    } catch (error) {
        console.error('FormTextarea component error:', error);
        reportError(error);
        return null;
    }
}
