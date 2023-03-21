---
title: Node.js | Quickstarts | Document Generation API | Adobe PDF Services
---

# Quickstart for Adobe Document Generation API (Node.js)

To get started using Adobe Document Generation API, let's walk through a simple scenario - using a Word document as a template for dynamic receipt generation in PDF. In this guide, we will walk you through the complete process for creating a program that will accomplish this task. 

## Prerequisites

To complete this guide, you will need:

* [Node.js](https://nodejs.org) - Node.js version 10.13.0 or higher is required. 
* An Adobe ID. If you do not have one, the credential setup will walk you through creating one.
* A way to edit code. No specific editor is required for this guide.

## Step One: Getting credentials

1) To begin, open your browser to <https://documentservices.adobe.com/dc-integration-creation-app-cdn/main.html?api=document-generation-api>. If you are not already logged in to Adobe.com, you will need to sign in or create a new user. Using a personal email account is recommend and not a federated ID.

![Sign in](./shot1.png)

2) After registering or logging in, you will then be asked to name your new credentials. Use the name, "New Project". 

3) Change the "Choose language" setting to "Node.js". 

4) Also note the checkbox by, "Create personalized code sample." This will include a large set of samples along with your credentials. These can be helpful for learning more later. 

5) Click the checkbox saying you agree to the developer terms and then click "Create credentials."

![Project setup](./shot2.png)

6) After your credentials are created, they are automatically downloaded:

![alt](./shot3.png)

## Step Two: Setting up the project

1) In your Downloads folder, find the ZIP file with your credentials: PDFServicesSDK-Node.jsSamples.zip. If you unzip that archive, you will find a README file, your private key, and a folder of samples:

![alt](./shot5.png)

2) We need two things from this download. The `private.key` file (as shown in the screenshot above, and the `pdfservices-api-credentials.json` file found in the samples directory:

![alt](./shot6.png)

<InlineAlert slots="text" />

Note that that private key is *also* found in this directory so feel free to copy them both from here.

3) Take these two files and place them in a new directory. Remember that these credential files are important and should be stored safely.

4) At the command line, change to the directory you created, and initialize a new Node.js project with `npm init -y`

![alt](shot7.png)

5) Install the Adobe PDF Services Node.js SDK by typing `npm install --save @adobe/pdfservices-node-sdk` at the command line.

![alt](./shot8.png)

At this point, we've installed the Node.js SDK for Adobe PDF Services API as a dependency for our project and have copied over our credentials files. 

Our application will take a Word document, `receiptTemplate.docx` (downloadable from [here](/receiptTemplate.docx)), and combine it with data in a JSON file, `receipt.json` (downloadable from [here](/receipt.json)), to be sent to the Acrobat Services API and generate a receipt PDF.

7) In your editor, open the directory where you previously copied the credentials. Create a new file, `generatePDF.js`.

Now you're ready to begin coding.

## Step Three: Creating the application

1) Let's start by looking at the Word template. If you open the document in Microsoft Word, you'll notice multiple tokens throughout the document (called out by the use of `{{` and `}}`).

![Example of tokens](./shot10.png)

When the Document Generation API is used, these tokens are replaced with the JSON data sent to the API. These tokens support simple replacements, for example, `{{Customer.Name}}` will be replaced by a customer's name passed in JSON. You can also have dynamic tables. In the Word template, the table uses invoice items as a way to dynamically render whatever items were ordered. Conditions can also be used to hide or show content as you can see two conditions at the end of the document. Finally, basic math can be also be dynamically applied, as seen in the "Grand Total". 

2) Next, let's look at our sample data: 

```json
{
  "author": "Gary Lee",
  "Company": {
    "Name": "Projected",
    "Address": "19718 Mandrake Way",
    "PhoneNumber": "+1-100000098"
  },
  "Invoice": {
    "Date": "January 15, 2021",
    "Number": 123,
    "Items": [
      {
        "item": "Gloves",
        "description": "Microwave gloves",
        "UnitPrice": 5,
        "Quantity": 2,
        "Total": 10
      },
      {
        "item": "Bowls",
        "description": "Microwave bowls",
        "UnitPrice": 10,
        "Quantity": 2,
        "Total": 20
      }
    ]
  },
  "Customer": {
    "Name": "Collins Candy",
    "Address": "315 Dunning Way",
    "PhoneNumber": "+1-200000046",
    "Email": "cc@abcdef.co.dw"
  },
  "Tax": 5,
  "Shipping": 5,
  "clause": {
    "overseas": "The shipment might take 5-10 more than informed."
  },
  "paymentMethod": "Cash"
}
```

Notice how the tokens in the Word document match up with values in our JSON. While our example will use a hard coded set of data in a file, production applications can get their data from anywhere. Now let's get into our code.

3) We'll begin by including our required dependencies:

```js
const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
const fs = require('fs');
```

The first line includes the Adobe PDF Services Node.js SDK. The second third include Node's `filesystem` package. 

2) Now let's define our input and output:

```js
const OUTPUT = './generatedReceipt.pdf';

// If our output already exists, remove it so we can run the application again.
if(fs.existsSync(OUTPUT)) fs.unlinkSync(OUTPUT);

const INPUT = './receiptTemplate.docx';

const JSON_INPUT = require('./receipt.json');
```

These lines are hard coded but in a real application would typically be dynamic.

3) Next, we setup the SDK to use our credentials.

```js
const credentials = PDFServicesSdk.Credentials
		.serviceAccountCredentialsBuilder()
		.fromFile('pdfservices-api-credentials.json')
		.build();

// Create an ExecutionContext using credentials
const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);
```

This code both points to the credentials downloaded previously as well as sets up an execution context object that will be used later.

4) Now, let's create the operation:

```js
const documentMerge = PDFServicesSdk.DocumentMerge,
       documentMergeOptions = documentMerge.options,
       options = new documentMergeOptions.DocumentMergeOptions(JSON_INPUT, documentMergeOptions.OutputFormat.PDF);

// Create a new operation instance using the options instance.
const documentMergeOperation = documentMerge.Operation.createNew(options);

// Set operation input document template from a source file.
const input = PDFServicesSdk.FileRef.createFromLocalFile(INPUT);
documentMergeOperation.setInput(input);
```

This set of code defines what we're doing (a document merge operation, the SDK's way of describing Document Generation), points to our local JSON file and specifies the output is a PDF. It also points to the Word file used as a template.

5) The next code block executes the operation:

```js
// Execute the operation and Save the result to the specified location.
documentMergeOperation.execute(executionContext)
.then(result => result.saveAsFile(OUTPUT))
.catch(err => {
	if(err instanceof PDFServicesSdk.Error.ServiceApiError
		|| err instanceof PDFServicesSdk.Error.ServiceUsageError) {
		console.log('Exception encountered while executing operation', err);
	} else {
		console.log('Exception encountered while executing operation', err);
	}
});
```

This code runs the document generation process and then stores the result PDF document to the file system. 

![Example running at the command line](./shot9.png)

Here's the complete application (`export.js`):

```js
const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
const fs = require('fs');

const OUTPUT = './Bodea Brochure.docx';

// If our output already exists, remove it so we can run the application again.
if(fs.existsSync(OUTPUT)) fs.unlinkSync(OUTPUT);

const INPUT = './Bodea Brochure.pdf';


console.log(`About to export ${INPUT} to ${OUTPUT}.`);

// Set up our credentials object.
const credentials =  PDFServicesSdk.Credentials
	.serviceAccountCredentialsBuilder()
	.fromFile('pdfservices-api-credentials.json')
	.build();

// An exectuionContext object wraps our credentials
const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);

// This creates an instance of the Export operation we're using, as well as specifying output type (DOCX)
const exportPdfOperation = PDFServicesSdk.ExportPDF.Operation.createNew(PDFServicesSdk.ExportPDF.SupportedTargetFormats.DOCX);

// Set operation input from a source file
const inputPDF = PDFServicesSdk.FileRef.createFromLocalFile(INPUT);
exportPdfOperation.setInput(inputPDF);

try {

	exportPdfOperation.execute(executionContext)
	.then(result => result.saveAsFile(OUTPUT))
	.then(() => {
		console.log('Export Done')
	})
	.catch(err => {
		console.log('Exception encountered while executing operation', err);
	});

} catch(err) {
	console.error('Error:', err);
}
```

## Next Steps

Now that you've successfully performed your first operation, [review the documentation](https://developer.adobe.com/document-services/docs/overview/document-generation-api/) for many other examples and reach out on our [forums](https://community.adobe.com/t5/document-services-apis/ct-p/ct-Document-Cloud-SDK) with any questions. Also remember the samples you downloaded while creating your credentials also have many demos.
