const {
    extractVariables,
    renderTemplate,
    processHTMLWithCheerio,
} = require('./templateUtils');

describe('Template Parser Utilities', () => {
    const template = `<p>Welcome to {{companyName}}. Your appointment is on {{appointmentDay}}.</p>`;
    const data = {
        companyName: 'Apurba',
        appointmentDay: 'Sunday',
    };

    test('should extract all Handlebars variables', () => {
        const result = extractVariables(template);
        expect(result).toContain('companyName');
        expect(result).toContain('appointmentDay');
        expect(result.length).toBe(2);
    });

    test('should render template with provided data', () => {
        const html = renderTemplate(template, data);
        expect(html).toBe(
            `<p>Welcome to Apurba. Your appointment is on Sunday.</p>`
        );
    });

    test('should process final HTML using Cheerio', () => {
        const renderedHTML = renderTemplate(template, data);
        const finalHTML = processHTMLWithCheerio(renderedHTML);
        expect(finalHTML).toContain('Apurba');
        expect(finalHTML).toContain('Sunday');
    });
});
