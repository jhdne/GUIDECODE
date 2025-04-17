async function generateDocument(formData) {
    try {
        if (!formData.projectName || !formData.productType || !formData.projectDescription) {
            throw new Error('Missing required fields');
        }

        const language = formData.language || 'en';

        // Generate all document types
        const documents = await Promise.all([
            generateProductRequirements(formData, language),
            generateFrontendGuidelines(formData, language),
            generateBackendStructure(formData, language),
            generateAppFlow(formData, language),
            generateTechStack(formData, language),
            generateFileStructure(formData, language)
        ]);

        return {
            productRequirements: documents[0],
            frontendGuidelines: documents[1],
            backendStructure: documents[2],
            appFlow: documents[3],
            techStack: documents[4],
            fileStructure: documents[5]
        };
    } catch (error) {
        console.error('Document generation error:', error);
        throw new Error('Failed to generate documentation. Please check your input and try again.');
    }
}

async function generateProductRequirements(formData, language) {
    const systemPrompt = `You are a professional technical writer and product manager. Generate a comprehensive product requirements document in ${language === 'en' ? 'English' : 'Chinese'} language.`;

    const userPrompt = `Generate product requirements documentation for:
Project Name: ${formData.projectName}
Product Type: ${formData.productType}
Description: ${formData.projectDescription}
Target Audience: ${formData.targetAudience}
Main Features: ${formData.mainFeatures}
External Resources: ${formData.externalResources}`;

    try {
        let doc = await invokeAIAgent(systemPrompt, userPrompt);
        return doc.trim();
    } catch (error) {
        console.error('Product requirements generation error:', error);
        throw error;
    }
}

async function generateFrontendGuidelines(formData, language) {
    const systemPrompt = `You are a senior frontend architect. Generate comprehensive frontend guidelines in ${language === 'en' ? 'English' : 'Chinese'} language.`;

    const userPrompt = `Generate frontend guidelines for:
Project Name: ${formData.projectName}
Product Type: ${formData.productType}
Description: ${formData.projectDescription}
Main Features: ${formData.mainFeatures}
External Resources: ${formData.externalResources}`;

    try {
        let doc = await invokeAIAgent(systemPrompt, userPrompt);
        return doc.trim();
    } catch (error) {
        console.error('Frontend guidelines generation error:', error);
        throw error;
    }
}

async function generateBackendStructure(formData, language) {
    const systemPrompt = `You are a senior backend architect. Generate comprehensive backend structure documentation in ${language === 'en' ? 'English' : 'Chinese'} language.`;

    const userPrompt = `Generate backend structure documentation for:
Project Name: ${formData.projectName}
Product Type: ${formData.productType}
Description: ${formData.projectDescription}
Main Features: ${formData.mainFeatures}
External Resources: ${formData.externalResources}`;

    try {
        let doc = await invokeAIAgent(systemPrompt, userPrompt);
        return doc.trim();
    } catch (error) {
        console.error('Backend structure generation error:', error);
        throw error;
    }
}

async function generateAppFlow(formData, language) {
    const systemPrompt = `You are a senior system architect. Generate comprehensive application flow documentation in ${language === 'en' ? 'English' : 'Chinese'} language.`;

    const userPrompt = `Generate application flow documentation for:
Project Name: ${formData.projectName}
Product Type: ${formData.productType}
Description: ${formData.projectDescription}
Main Features: ${formData.mainFeatures}
External Resources: ${formData.externalResources}`;

    try {
        let doc = await invokeAIAgent(systemPrompt, userPrompt);
        return doc.trim();
    } catch (error) {
        console.error('App flow generation error:', error);
        throw error;
    }
}

async function generateTechStack(formData, language) {
    const systemPrompt = `You are a senior technical architect. Generate comprehensive technology stack documentation in ${language === 'en' ? 'English' : 'Chinese'} language.`;

    const userPrompt = `Generate technology stack documentation for:
Project Name: ${formData.projectName}
Product Type: ${formData.productType}
Description: ${formData.projectDescription}
Main Features: ${formData.mainFeatures}
External Resources: ${formData.externalResources}`;

    try {
        let doc = await invokeAIAgent(systemPrompt, userPrompt);
        return doc.trim();
    } catch (error) {
        console.error('Tech stack generation error:', error);
        throw error;
    }
}

async function generateFileStructure(formData, language) {
    const systemPrompt = `You are a senior software architect. Generate comprehensive file structure documentation in ${language === 'en' ? 'English' : 'Chinese'} language.`;

    const userPrompt = `Generate file structure documentation for:
Project Name: ${formData.projectName}
Product Type: ${formData.productType}
Description: ${formData.projectDescription}
Main Features: ${formData.mainFeatures}
External Resources: ${formData.externalResources}`;

    try {
        let doc = await invokeAIAgent(systemPrompt, userPrompt);
        return doc.trim();
    } catch (error) {
        console.error('File structure generation error:', error);
        throw error;
    }
}
