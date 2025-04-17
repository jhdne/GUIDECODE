function DocumentPreviewPage({ documents }) {
    try {
        if (!documents || !documents.productRequirements) {
            return (
                <div className="error-message p-4" data-name="doc-preview-error">
                    No documents available. Please generate documents first.
                </div>
            );
        }

        const language = localStorage.getItem('language') || 'en';
        const [activeDocument, setActiveDocument] = React.useState('productRequirements');

        const translations = {
            en: {
                title: 'Generated Documentation',
                download: 'Download PDF',
                productRequirements: 'Product Requirements',
                frontendGuidelines: 'Frontend Guidelines',
                backendStructure: 'Backend Structure',
                appFlow: 'Application Flow',
                techStack: 'Tech Stack',
                fileStructure: 'File Structure',
                selectDocument: 'Select Document Type'
            },
            zh: {
                title: '生成的文档',
                download: '下载PDF',
                productRequirements: '产品需求文档',
                frontendGuidelines: '前端指南',
                backendStructure: '后端结构文档',
                appFlow: '应用流程文档',
                techStack: '技术栈文档',
                fileStructure: '文件结构文档',
                selectDocument: '选择文档类型'
            }
        };

        const documentTypes = [
            { key: 'productRequirements', icon: 'fa-file-lines' },
            { key: 'frontendGuidelines', icon: 'fa-code' },
            { key: 'backendStructure', icon: 'fa-server' },
            { key: 'appFlow', icon: 'fa-diagram-project' },
            { key: 'techStack', icon: 'fa-layer-group' },
            { key: 'fileStructure', icon: 'fa-folder-tree' }
        ];

        const handleDownloadPDF = async () => {
            try {
                const content = documents[activeDocument];
                const title = translations[language][activeDocument];
                
                // Create a new window for PDF preview
                const printWindow = window.open('', '_blank');
                if (!printWindow) {
                    throw new Error('Popup blocked. Please allow popups and try again.');
                }

                const htmlContent = `
                    <!DOCTYPE html>
                    <html lang="${language}">
                    <head>
                        <meta charset="UTF-8">
                        <title>${title}</title>
                        <style>
                            @media print {
                                @page {
                                    margin: 2.5cm;
                                }
                            }
                            body {
                                font-family: ${language === 'zh' ? '"Source Han Serif"' : '"Times New Roman"'}, serif;
                                line-height: 1.6;
                                color: #000;
                                max-width: 210mm;
                                margin: 0 auto;
                                padding: 20px;
                                font-size: 16px;
                            }
                            h1 {
                                text-align: center;
                                font-size: 24px;
                                margin: 30px 0;
                            }
                            h2 {
                                font-size: 20px;
                                margin: 25px 0 15px;
                            }
                            h3 {
                                font-size: 18px;
                                margin: 20px 0 10px;
                            }
                            p {
                                margin: 12px 0;
                                text-align: justify;
                                text-indent: 2em;
                            }
                            ul, ol {
                                margin: 12px 0;
                                padding-left: 2em;
                            }
                            li {
                                margin: 8px 0;
                            }
                            .section {
                                margin: 20px 0;
                            }
                            .subsection {
                                margin: 15px 0;
                                padding-left: 20px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="document">
                            ${content.split('\n').map(line => {
                                if (line.match(/^#\s/)) {
                                    return `<h1>${line.replace(/^#\s/, '')}</h1>`;
                                } else if (line.match(/^##\s/)) {
                                    return `<h2>${line.replace(/^##\s/, '')}</h2>`;
                                } else if (line.match(/^###\s/)) {
                                    return `<h3>${line.replace(/^###\s/, '')}</h3>`;
                                } else if (line.match(/^\d+\.\s/)) {
                                    return `<div class="section">${line}</div>`;
                                } else if (line.match(/^\d+\.\d+\s/)) {
                                    return `<div class="subsection">${line}</div>`;
                                } else {
                                    return `<p>${line}</p>`;
                                }
                            }).join('')}
                        </div>
                    </body>
                    </html>
                `;

                printWindow.document.write(htmlContent);
                printWindow.document.close();

                // Wait for content to load then print
                setTimeout(() => {
                    printWindow.print();
                    // Close window after print dialog is closed
                    setTimeout(() => {
                        printWindow.close();
                    }, 1000);
                }, 500);
            } catch (error) {
                console.error('PDF generation error:', error);
                alert('Failed to generate PDF. Please try again.');
            }
        };

        return (
            <div className="preview-page" data-name="preview-page" lang={language}>
                <div className="preview-header" data-name="preview-header">
                    <h1>{translations[language].title}</h1>
                    <div className="document-selector" data-name="document-selector">
                        <div className="document-tabs">
                            {documentTypes.map(docType => (
                                <button
                                    key={docType.key}
                                    className={`doc-tab ${activeDocument === docType.key ? 'active' : ''}`}
                                    onClick={() => setActiveDocument(docType.key)}
                                    data-name={`tab-${docType.key}`}
                                >
                                    <i className={`fas ${docType.icon} mr-2`}></i>
                                    {translations[language][docType.key]}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="document-content" data-name="document-content">
                    <div className="markdown-content">
                        {documents[activeDocument].split('\n').map((line, index) => {
                            if (line.match(/^#\s/)) {
                                return <h1 key={index} className="doc-h1">{line.replace(/^#\s/, '')}</h1>;
                            } else if (line.match(/^##\s/)) {
                                return <h2 key={index} className="doc-h2">{line.replace(/^##\s/, '')}</h2>;
                            } else if (line.match(/^###\s/)) {
                                return <h3 key={index} className="doc-h3">{line.replace(/^###\s/, '')}</h3>;
                            } else if (line.match(/^\d+\.\s/)) {
                                return <div key={index} className="doc-section">{line}</div>;
                            } else if (line.match(/^\d+\.\d+\s/)) {
                                return <div key={index} className="doc-subsection">{line}</div>;
                            } else {
                                return <p key={index} className="doc-paragraph">{line}</p>;
                            }
                        })}
                    </div>
                </div>

                <div className="preview-footer" data-name="preview-footer">
                    <button 
                        onClick={handleDownloadPDF}
                        className="download-button"
                        data-name="download-pdf"
                    >
                        <i className="fas fa-file-pdf mr-2"></i>
                        {translations[language].download}
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('DocumentPreviewPage component error:', error);
        reportError(error);
        return null;
    }
}
