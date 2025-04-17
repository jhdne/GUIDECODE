function DocumentLibrary({ userId }) {
    try {
        const [documents, setDocuments] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState(null);
        const [selectedDoc, setSelectedDoc] = React.useState(null);

        const loadDocuments = async () => {
            try {
                setLoading(true);
                const docs = await documentStorage.getUserDocuments(userId);
                setDocuments(docs);
            } catch (error) {
                setError('Failed to load documents');
                console.error('Load documents error:', error);
            } finally {
                setLoading(false);
            }
        };

        React.useEffect(() => {
            loadDocuments();
        }, [userId]);

        const handleDelete = async (docId) => {
            try {
                if (!confirm('Are you sure you want to delete this document?')) {
                    return;
                }
                await documentStorage.deleteDocument(userId, docId);
                await loadDocuments();
            } catch (error) {
                alert('Failed to delete document');
                console.error('Delete document error:', error);
            }
        };

        const formatDate = (dateString) => {
            return new Date(dateString).toLocaleString();
        };

        if (loading) {
            return (
                <div className="text-center py-8" data-name="doc-library-loading">
                    <i className="fas fa-spinner fa-spin fa-2x"></i>
                    <p className="mt-2">Loading documents...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="error-message p-4" data-name="doc-library-error">
                    {error}
                </div>
            );
        }

        return (
            <div className="document-library" data-name="doc-library">
                <h2 className="text-xl font-bold mb-4">Your Documents</h2>
                
                {documents.length === 0 ? (
                    <p className="text-gray-400" data-name="doc-library-empty">
                        No documents generated yet.
                    </p>
                ) : (
                    <div className="grid gap-4" data-name="doc-list">
                        {documents.map(doc => (
                            <div 
                                key={doc.id} 
                                className="doc-item bg-gray-800 p-4 rounded-lg"
                                data-name={`doc-item-${doc.id}`}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            {doc.metadata.projectName}
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            {doc.metadata.productType}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Created: {formatDate(doc.metadata.createdAt)}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setSelectedDoc(selectedDoc?.id === doc.id ? null : doc)}
                                            className="text-blue-400 hover:text-blue-300"
                                            data-name={`view-btn-${doc.id}`}
                                        >
                                            <i className="fas fa-eye"></i>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(doc.id)}
                                            className="text-red-400 hover:text-red-300"
                                            data-name={`delete-btn-${doc.id}`}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                                
                                {selectedDoc?.id === doc.id && (
                                    <div className="mt-4" data-name={`doc-content-${doc.id}`}>
                                        <DocumentPreview document={doc.content} />
                                        <DownloadButtons document={doc.content} filename={doc.metadata.projectName} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('DocumentLibrary component error:', error);
        reportError(error);
        return null;
    }
}
