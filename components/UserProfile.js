function UserProfile({ user, onUpdateProfile }) {
    try {
        const [formData, setFormData] = React.useState({
            name: user.name || '',
            email: user.email || ''
        });
        const [documents, setDocuments] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState(null);
        const [selectedDoc, setSelectedDoc] = React.useState(null);
        const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
        const [docToDelete, setDocToDelete] = React.useState(null);
        const [documentContent, setDocumentContent] = React.useState(null);
        const language = localStorage.getItem('language') || 'en';

        const translations = {
            en: {
                setting: 'Setting',
                displayName: 'Display Name',
                email: 'Email',
                update: 'Update',
                documents: 'Documents',
                loading: 'Loading documents...',
                noDocuments: 'No documents generated yet.',
                deleteConfirm: 'Are you sure you want to delete this document?',
                delete: 'Delete',
                cancel: 'Cancel',
                view: 'View',
                created: 'Created',
                updated: 'Updated',
                download: 'Download'
            },
            zh: {
                setting: '设置',
                displayName: '显示名称',
                email: '邮箱',
                update: '更新',
                documents: '文档',
                loading: '加载文档中...',
                noDocuments: '暂无生成的文档',
                deleteConfirm: '确定要删除这个文档吗？',
                delete: '删除',
                cancel: '取消',
                view: '查看',
                created: '创建于',
                updated: '更新于',
                download: '下载'
            }
        };

        React.useEffect(() => {
            loadUserDocuments();
        }, []);

        const loadUserDocuments = async () => {
            try {
                setLoading(true);
                const docs = await documentStorage.getUserDocuments(user.id);
                setDocuments(docs);
            } catch (error) {
                setError('Failed to load documents');
                console.error('Load documents error:', error);
            } finally {
                setLoading(false);
            }
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                await onUpdateProfile(formData);
                alert('Profile updated successfully');
            } catch (error) {
                alert('Failed to update profile');
                console.error('Update profile error:', error);
            }
        };

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        };

        const handleViewDocument = async (doc) => {
            try {
                if (selectedDoc?.id === doc.id) {
                    setSelectedDoc(null);
                    setDocumentContent(null);
                } else {
                    setSelectedDoc(doc);
                    setDocumentContent(doc.content);
                }
            } catch (error) {
                console.error('View document error:', error);
                alert('Failed to view document');
            }
        };

        const handleDeleteClick = (doc) => {
            setDocToDelete(doc);
            setShowDeleteConfirm(true);
        };

        const handleConfirmDelete = async () => {
            try {
                await documentStorage.deleteDocument(user.id, docToDelete.id);
                setShowDeleteConfirm(false);
                setDocToDelete(null);
                await loadUserDocuments();
            } catch (error) {
                console.error('Delete document error:', error);
                alert('Failed to delete document');
            }
        };

        const formatDate = (dateString) => {
            return new Date(dateString).toLocaleString(language === 'zh' ? 'zh-CN' : 'en-US');
        };

        const DeleteConfirmModal = () => (
            <div className="modal-overlay" data-name="delete-confirm-modal">
                <div className="modal-content">
                    <h3>{translations[language].deleteConfirm}</h3>
                    <div className="modal-actions">
                        <button 
                            onClick={handleConfirmDelete}
                            className="delete-confirm-btn"
                            data-name="confirm-delete"
                        >
                            {translations[language].delete}
                        </button>
                        <button 
                            onClick={() => {
                                setShowDeleteConfirm(false);
                                setDocToDelete(null);
                            }}
                            className="cancel-btn"
                            data-name="cancel-delete"
                        >
                            {translations[language].cancel}
                        </button>
                    </div>
                </div>
            </div>
        );

        return (
            <div className="user-profile-container" data-name="user-profile">
                <div className="profile-section" data-name="profile-info">
                    <h2 className="section-title">
                        {translations[language].setting}
                    </h2>
                    <form onSubmit={handleSubmit} className="profile-form">
                        <FormInput
                            label={translations[language].displayName}
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required={true}
                        />
                        <FormInput
                            label={translations[language].email}
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required={true}
                            disabled={true}
                        />
                        <button 
                            type="submit" 
                            className="update-profile-btn"
                            data-name="update-profile-btn"
                        >
                            {translations[language].update}
                        </button>
                    </form>
                </div>

                <div className="documents-container" data-name="documents-container">
                    <h2 className="section-title">
                        {translations[language].documents}
                    </h2>
                    {loading ? (
                        <div className="loading-state" data-name="loading">
                            <span>{translations[language].loading}</span>
                        </div>
                    ) : error ? (
                        <div className="error-state" data-name="error">
                            {error}
                        </div>
                    ) : documents.length === 0 ? (
                        <div className="empty-state" data-name="empty">
                            <p>{translations[language].noDocuments}</p>
                        </div>
                    ) : (
                        <div className="documents-list" data-name="documents-list">
                            {documents.map(doc => (
                                <div 
                                    key={doc.id} 
                                    className="document-item"
                                    data-name={`doc-${doc.id}`}
                                >
                                    <div className="document-info">
                                        <div>
                                            <h3>{doc.metadata.projectName}</h3>
                                            <span className="document-type">{doc.metadata.productType}</span>
                                            <span className="document-date">
                                                {translations[language].created}: {formatDate(doc.metadata.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="document-actions">
                                        <button
                                            onClick={() => handleViewDocument(doc)}
                                            className="view-btn"
                                            data-name={`view-${doc.id}`}
                                        >
                                            {translations[language].view}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(doc)}
                                            className="delete-btn"
                                            data-name={`delete-${doc.id}`}
                                        >
                                            {translations[language].delete}
                                        </button>
                                    </div>
                                    
                                    {selectedDoc?.id === doc.id && documentContent && (
                                        <div className="document-content" data-name={`content-${doc.id}`}>
                                            <DocumentPreview document={documentContent} />
                                            <div className="download-section">
                                                <DownloadButtons 
                                                    document={documentContent} 
                                                    filename={doc.metadata.projectName}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {showDeleteConfirm && <DeleteConfirmModal />}
            </div>
        );
    } catch (error) {
        console.error('UserProfile component error:', error);
        reportError(error);
        return null;
    }
}
