## 🛠️ Installation

### 1. Clone the repository or copy the files:

```bash
git clone https://github.com/your-username/template-parser.git
cd template-parser
```


### 2. Install dependencies:
```bash
npm install
```

### 3. Running the Project:
```bash
node index.js
```

It will:

Read template.html

Extract variable placeholders

Inject data from index.js

Process the final HTML using Cheerio

Save the result to output.html


✅ Example console output:
```bash
📦 Extracted Variables: [ 'companyName', 'appointmentDay' ]
✅ Output written to: output.html
```

🧪 Running Tests

Run tests:
```bash
npm test
```

Sample test output:
```bash
 PASS  ./templateUtils.test.js
  Template Parser Utilities
    ✓ should extract all Handlebars variables
    ✓ should render template with provided data
    ✓ should process final HTML using Cheerio

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
```
