function FormSelect({ label, name, options, required, value, onChange }) {
    try {
        return (
            <div className="input-group" data-name={`select-group-${name}`}>
                <label className="input-label" htmlFor={name} data-name={`label-${name}`}>
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    data-name={`select-${name}`}
                >
                    <option value="">Select {label}</option>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        );
    } catch (error) {
        console.error('FormSelect component error:', error);
        reportError(error);
        return null;
    }
}
