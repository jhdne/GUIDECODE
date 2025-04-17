function DocumentPreview({ document }) {
    try {
        if (!document) return null;

        return (
            <div className="preview-container" data-name="preview-container">
                <h2 className="text-2xl font-bold mb-4" data-name="preview-title">Generated Documentation</h2>
                <div className="preview-content" data-name="preview-content">
                    {document}
                </div>
            </div>
        );
    } catch (error) {
        console.error('DocumentPreview component error:', error);
        reportError(error);
        return null;
    }
}
