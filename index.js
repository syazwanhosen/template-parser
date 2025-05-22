const fs = require('fs');
const Handlebars = require('handlebars');
const cheerio = require('cheerio');
const path = require('path');

/**
 * Read HTML template from file
 */
function loadTemplate(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

/**
 * Extract Handlebars variables from the template
 * e.g., {{companyName}} -> companyName
 */
function extractVariables(template) {
    const variablePattern = /{{\s*([\w.]+)\s*}}/g;
    const variables = new Set();
    let match;

    while ((match = variablePattern.exec(template)) !== null) {
        variables.add(match[1]);
    }

    return Array.from(variables);
}

/**
 * Inject dynamic data into the Handlebars template
 */
function renderTemplate(template, data) {
    const compiled = Handlebars.compile(template);
    return compiled(data);
}

/**
 * Use Cheerio to inspect/manipulate final HTML
 */
function processHTMLWithCheerio(html) {
    const $ = cheerio.load(html);
    // You can inspect/manipulate HTML here
    return $.html(); // Return cleaned final HTML
}

/**
 * Export final HTML to file
 */
function exportToFile(outputPath, html) {
    fs.writeFileSync(outputPath, html, 'utf8');
    console.log(`✅ Output written to: ${outputPath}`);
}

// ------------------ Main Execution ------------------

const templatePath = path.join(__dirname, 'template.html');
const outputPath = path.join(__dirname, 'output.html');

// Step 1: Load HTML Template
const template = loadTemplate(templatePath);

// Step 2: Extract Template Variables
const variables = extractVariables(template);
console.log('📦 Extracted Variables:', JSON.stringify(variables, null, 2));

// Step 3: Inject Dynamic Data
const data = {
    "company_name": "Apple Inc.",
    "form_type": "10-K",
    "filing_date": "2024-10-25",
    "cik_number": "0000320193",
    "filing_url": "https://www.sec.gov/Archives/edgar/data/320193/000032019324000096/aapl-20240930.htm",
    "revenue": "394,328,000,000",
    "net_income": "99,803,000,000",
    "dividend": "0.96",
    "risk_factors": "Global economic conditions, supply chain disruptions, dependency on iPhone sales, regulatory changes, and competitive pressures."
}

const renderedHTML = renderTemplate(template, data);

// Step 4: Inspect/Process Final HTML
const finalHTML = processHTMLWithCheerio(renderedHTML);

// Step 5: Export Final HTML
exportToFile(outputPath, finalHTML);


module.exports = {
    loadTemplate,
    extractVariables,
    renderTemplate,
    processHTMLWithCheerio,
};