function DownloadButtons({ document, filename = 'documentation' }) {
    try {
        const language = localStorage.getItem('language') || 'en';

        const translations = {
            en: {
                downloadMd: "Download MD",
                downloadPdf: "Download PDF",
                error: "Failed to download. Please try again."
            },
            zh: {
                downloadMd: "下载MD",
                downloadPdf: "下载PDF",
                error: "下载失败，请重试。"
            }
        };

        const downloadMarkdown = () => {
            try {
                // Convert content to Markdown format
                const markdownContent = document;
                const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
                const url = URL.createObjectURL(blob);

                // Use direct download method
                const link = document.createElement('a');
                link.setAttribute('href', url);
                link.setAttribute('download', `${filename || 'documentation'}.md`);
                link.style.display = 'none';
                document.body.appendChild(link);

                // Trigger click synchronously
                link.click();

                // Clean up
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            } catch (error) {
                console.error('Download error:', error);
                alert(translations[language].error);
            }
        };

        const downloadPDF = () => {
            try {
                const printWindow = window.open('', '_blank');
                if (!printWindow) {
                    throw new Error('Popup blocked. Please allow popups and try again.');
                }

                const htmlContent = `
                    <!DOCTYPE html>
                    <html>
                        <head>
                            <meta charset="UTF-8">
                            <title>${filename}</title>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    line-height: 1.6;
                                    padding: 20px;
                                    white-space: pre-wrap;
                                    max-width: 800px;
                                    margin: 0 auto;
                                }
                                @media print {
                                    body {
                                        padding: 0;
                                    }
                                }
                            </style>
                        </head>
                        <body>
                            ${document.replace(/\n/g, '<br>')}
                        </body>
                    </html>
                `;

                printWindow.document.write(htmlContent);
                printWindow.document.close();

                // Delay print to ensure content is loaded
                setTimeout(() => {
                    printWindow.print();
                    // Close window after print dialog is closed
                    setTimeout(() => {
                        printWindow.close();
                    }, 1000);
                }, 250);
            } catch (error) {
                console.error('Print error:', error);
                alert(translations[language].error);
            }
        };

        return (
            <div className="download-buttons" data-name="download-buttons">
                <button 
                    onClick={downloadMarkdown} 
                    className="download-button md"
                    data-name="download-md"
                >
                    <i className="fas fa-file-alt"></i>
                    {translations[language].downloadMd}
                </button>
                <button 
                    onClick={downloadPDF} 
                    className="download-button pdf"
                    data-name="download-pdf"
                >
                    <i className="fas fa-file-pdf"></i>
                    {translations[language].downloadPdf}
                </button>
            </div>
        );
    } catch (error) {
        console.error('DownloadButtons component error:', error);
        reportError(error);
        return null;
    }
}
