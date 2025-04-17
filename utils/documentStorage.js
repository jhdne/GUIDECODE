const DOC_STORAGE_KEY = 'doc_generator_storage';

const documentStorage = {
    saveDocument: async (userId, document, formData) => {
        try {
            const existingDocs = await documentStorage.getUserDocuments(userId);
            const newDoc = {
                id: 'doc_' + Date.now(),
                userId,
                content: document,
                metadata: {
                    projectName: formData.projectName,
                    productType: formData.productType,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            };

            const updatedDocs = [newDoc, ...existingDocs];
            localStorage.setItem(
                `${DOC_STORAGE_KEY}_${userId}`,
                JSON.stringify(updatedDocs)
            );

            return newDoc;
        } catch (error) {
            console.error('Save document error:', error);
            throw new Error('Failed to save document');
        }
    },

    getUserDocuments: async (userId) => {
        try {
            const docs = localStorage.getItem(`${DOC_STORAGE_KEY}_${userId}`);
            return docs ? JSON.parse(docs) : [];
        } catch (error) {
            console.error('Get user documents error:', error);
            return [];
        }
    },

    deleteDocument: async (userId, docId) => {
        try {
            const docs = await documentStorage.getUserDocuments(userId);
            const updatedDocs = docs.filter(doc => doc.id !== docId);
            
            if (docs.length === updatedDocs.length) {
                throw new Error('Document not found');
            }

            localStorage.setItem(
                `${DOC_STORAGE_KEY}_${userId}`,
                JSON.stringify(updatedDocs)
            );

            return true;
        } catch (error) {
            console.error('Delete document error:', error);
            throw error;
        }
    },

    getDocument: async (userId, docId) => {
        try {
            const docs = await documentStorage.getUserDocuments(userId);
            const doc = docs.find(doc => doc.id === docId);
            
            if (!doc) {
                throw new Error('Document not found');
            }

            return doc;
        } catch (error) {
            console.error('Get document error:', error);
            throw error;
        }
    },

    viewDocument: async (userId, docId) => {
        try {
            return await documentStorage.getDocument(userId, docId);
        } catch (error) {
            console.error('View document error:', error);
            throw error;
        }
    }
};
