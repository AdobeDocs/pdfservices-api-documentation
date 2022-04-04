# Create PDF

## Create a PDF

Use the sample below to create PDFs from Microsoft Office documents
(Word, Excel and PowerPoint) and other [supported file
formats](https://opensource.adobe.com/pdfservices-java-sdk-samples/apidocs/latest/com/adobe/pdfservices/operation/pdfops/CreatePDFOperation.SupportedSourceFormat.html).
While the example shows .docx file conversion, the SDK supports the
following formats:

-   Microsoft Word (DOC, DOCX)
-   Microsoft PowerPoint (PPT, PPTX)
-   Microsoft Excel (XLS, XLSX)
-   Text (TXT, RTF)
-   Image (BMP, JPEG, GIF, TIFF, PNG)

<InlineAlert slots="text"/>

If a Microsoft Word/PowerPoint input file has an embedded TrueType font, the output pdf will also contain the same embedded TrueType font.
For more information, refer [Benefits of embedding custom fonts](https://support.microsoft.com/en-us/office/benefits-of-embedding-custom-fonts-cb3982aa-ea76-4323-b008-86670f222dbc#OfficeVersion=Windows).

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.createpdf.CreatePDFFromDOCX

public class CreatePDFFromDOCX {

    // Initialize the logger. 
    private static final Logger LOGGER = LoggerFactory.getLogger(CreatePDFFromDOCX .class);

    public static void main(String[] args) {

        try {

            // Initial setup, create credentials instance. 
            Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
                    .fromFile("pdfservices-api-credentials.json").build();

            //Create an ExecutionContext using credentials and create a new operation instance.
            ExecutionContext executionContext = ExecutionContext.create(credentials);
            CreatePDFOperation createPdfOperation = CreatePDFOperation.createNew();

            // Set operation input from a source file. 
            FileRef source = FileRef.createFromLocalFile("src/main/resources/createPDFInput.docx");
            createPdfOperation.setInput(source);

            // Execute the operation. 
            FileRef result = createPdfOperation.execute(executionContext);

            // Save the result to the specified location.
            result.saveAs("output/createPDFFromDOCX.pdf");

        } catch (ServiceApiException | IOException | SdkException | ServiceUsageException ex) {
            LOGGER.error("Exception encountered while executing
                    operation", ex);
        }
    }
}
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd CreatePDFFromDocx/
// dotnet run CreatePDFFromDocx.csproj

namespace CreatePDFFromDocx
 {
   class Program
   {
     private static readonly ILog log = LogManager.GetLogger(typeof(Program));
     static void Main()
     {
       //Configure the logging
       ConfigureLogging();
       try
       {
         // Initial setup, create credentials instance.
         Credentials credentials = Credentials.ServiceAccountCredentialsBuilder()
                 .FromFile(Directory.GetCurrentDirectory() + "/pdfservices-api-credentials.json")
                 .Build();

         //Create an ExecutionContext using credentials and create a new operation instance.
         ExecutionContext executionContext = ExecutionContext.Create(credentials);
         CreatePDFOperation createPdfOperation = CreatePDFOperation.CreateNew();

         // Set operation input from a source file.
         FileRef source = FileRef.CreateFromLocalFile(@"createPdfInput.docx");
         createPdfOperation.SetInput(source);

         // Execute the operation.
         FileRef result = createPdfOperation.Execute(executionContext);

         // Save the result to the specified location.
         result.SaveAs(Directory.GetCurrentDirectory() + "/output/createPdfOutput.pdf");
       }
       catch (ServiceUsageException ex)
       {
         log.Error("Exception encountered while executing operation", ex);
       }
       // Catch more errors here. . .
     }

     static void ConfigureLogging()
     {
       ILoggerRepository logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
       XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));
     }
   }
 }
```

#### Node JS

```javascript
// Get the samples from http://www.adobe.com/go/pdftoolsapi_node_sample
// Run the sample:
// node src/createpdf/create-pdf-from-docx.js 

const PDFservicesSdk = require('@adobe/pdfservices-node-sdk');

 try {
   // Initial setup, create credentials instance.
   const credentials =  PDFServicesSdk.Credentials
       .serviceAccountCredentialsBuilder()
       .fromFile("pdfservices-api-credentials.json")
       .build();

   // Create an ExecutionContext using credentials and create a new operation instance.
   const executionContext = PDFServicesSdk.ExecutionContext.create(credentials),
       createPdfOperation = PDFServicesSdk.CreatePDF.Operation.createNew();

   // Set operation input from a source file.
   const input = PDFServicesSdk.FileRef.createFromLocalFile('resources/createPDFInput.docx');
   createPdfOperation.setInput(input);

   // Execute the operation and Save the result to the specified location.
   createPdfOperation.execute(executionContext)
       .then(result => result.saveAsFile('output/createPDFFromDOCX.pdf'))
       .catch(err => {
           if(err instanceof PDFServicesSdk.Error.ServiceApiError
               || err instanceof PDFServicesSdk.Error.ServiceUsageError) {
               console.log('Exception encountered while executing operation', err);
           } else {
               console.log('Exception encountered while executing operation', err);
           }
       });
 } catch (err) {
   console.log('Exception encountered while executing operation', err);
 }
```

#### Rest API

```javascript
// Please refer our Rest API docs for more information
// https://documentcloud.adobe.com/document-services/index.html#post-createPDF

curl --location --request POST 'https://cpf-ue1.adobe.io/ops/:create?respondWith=%7B%22reltype%22%3A%20%22http%3A%2F%2Fns.adobe.com%2Frel%2Fprimary%22%7D' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--header 'Accept: application/json, text/plain, */*' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Prefer: respond-async,wait=0' \
--form 'contentAnalyzerRequests="{
	\"cpf:inputs\": {
		\"documentIn\": {
			\"cpf:location\": \"InputFile0\",
			\"dc:format\": \"application/vnd.openxmlformats-officedocument.wordprocessingml.document\"
		}
	},
	\"cpf:engine\": {
		\"repo:assetId\": \"urn:aaid:cpf:Service-1538ece812254acaac2a07799503a430\"
	},
	\"cpf:outputs\": {
		\"documentOut\": {
			\"cpf:location\": \"multipartLabelOut\",
			\"dc:format\": \"application/pdf\"
		}
	}
}"' \
--form 'InputFile0=@"{{Placeholder for input file (absolute path)}}"'
```

## Create PDF with DocumentLanguage

Use the sample below to create PDFs with supported documentLanguage from
Microsoft Office documents (Word, Excel and PowerPoint). The example
shows .docx file conversion with english as the language of the input
file, the SDK supports the following formats:

-   Microsoft Word (DOC, DOCX)
-   Microsoft PowerPoint (PPT, PPTX)
-   Microsoft Excel (XLS, XLSX)
-   Text (TXT, RTF)



<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.createpdf.CreatePDFFromDOCXWithOptions

public class CreatePDFFromDOCXWithOptions {

      // Initialize the logger.
      private static final Logger LOGGER = LoggerFactory.getLogger(CreatePDFFromDOCXWithOptions.class);

      public static void main(String[] args) {

        try {

          // Initial setup, create credentials instance.
          Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
              .fromFile("pdfservices-api-credentials.json")
              .build();

          //Create an ExecutionContext using credentials and create a new operation instance.
          ExecutionContext executionContext = ExecutionContext.create(credentials);
          CreatePDFOperation createPdfOperation = CreatePDFOperation.createNew();

          // Set operation input from a source file.
          FileRef source = FileRef.createFromLocalFile("src/main/resources/createPDFInput.docx");
          createPdfOperation.setInput(source);

          // Provide any custom configuration options for the operation.
          setCustomOptions(createPdfOperation);

          // Execute the operation.
          FileRef result = createPdfOperation.execute(executionContext);

          // Save the result to the specified location.
          result.saveAs("output/createPDFFromDOCXWithOptionsOutput.pdf");

        } catch (ServiceApiException | IOException | SdkException | ServiceUsageException ex) {
          LOGGER.error("Exception encountered while executing operation", ex);
        }
      }

      private static void setCustomOptions(CreatePDFOperation createPdfOperation) {
        // Select the documentLanguage for input file.
        SupportedDocumentLanguage documentLanguage = SupportedDocumentLanguage.EN_US;

        // Set the desired Word-to-PDF conversion options.
        CreatePDFOptions wordOptions = CreatePDFOptions.wordOptionsBuilder().
        withDocumentLanguage(documentLanguage).
        build();

        createPdfOperation.setOptions(wordOptions);
   }
 }
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd CreatePDFFromDocxWithOptions/
// dotnet run CreatePDFFromDocxWithOptions.csproj

namespace CreatePDFFromDocxWithOptions
 {
   class Program
   {
     private static readonly ILog log = LogManager.GetLogger(typeof(Program));
     static void Main()
     {
       //Configure the logging
       ConfigureLogging();
       try
       {
         // Initial setup, create credentials instance.
         Credentials credentials = Credentials.ServiceAccountCredentialsBuilder()
                 .FromFile(Directory.GetCurrentDirectory() + "/pdfservices-api-credentials.json")
                 .Build();

         //Create an ExecutionContext using credentials and create a new operation instance.
         ExecutionContext executionContext = ExecutionContext.Create(credentials);
         CreatePDFOperation createPdfOperation = CreatePDFOperation.CreateNew();

         // Set operation input from a source file.
         FileRef source = FileRef.CreateFromLocalFile(@"createPdfInput.docx");
         createPdfOperation.SetInput(source);
         
         //Provide any custom conifguration option for the operation.
         SetCustomOptions(createPdfOperation);  

         // Execute the operation.
         FileRef result = createPdfOperation.Execute(executionContext);

         // Save the result to the specified location.
         result.SaveAs(Directory.GetCurrentDirectory() + "/output/createPDFFromDOCXWithOptionsOutput.pdf");
       }
       catch (ServiceUsageException ex)
       {
         log.Error("Exception encountered while executing operation", ex);
       }
       // Catch more errors here. . .
     }

     private static void SetCustomOptions(CreatePDFOperation createPdfOperation)
     {
       // Select the documentLanguage for input file.
       SupportedDocumentLanguage documentLanguage = SupportedDocumentLanguage.EN_US;

       // Set the desired Word-to-PDF conversion options.
       CreatePDFOptions createPDFOptions = CreatePDFOptions.WordOptionsBuilder()
       .WithDocumentLanguage(documentLanguage)
       .Build();
       createPdfOperation.SetOptions(createPDFOptions);
     }

     static void ConfigureLogging()
     {
       ILoggerRepository logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
       XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));
     }
   }
 }
```

#### Node JS

```javascript
// Get the samples from http://www.adobe.com/go/pdftoolsapi_node_sample
// Run the sample:
// node src/createpdf/create-pdf-from-docx-with-options.js

const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');

const setCustomOptions = (createPdfOperation) => {
    // Select the documentLanguage for input file.
    const documentLanguage = PDFServicesSdk.CreatePDF.options.word.SupportedDocumentLanguage.EN_US;

    // Set the desired WORD-to-PDF conversion options with documentLanguage.
    const createPdfOptions = new PDFServicesSdk.CreatePDF.options.word.CreatePDFFromWordOptions.Builder()
        .withDocumentLanguage(documentLanguage).build();
    createPdfOperation.setOptions(createPdfOptions);
};

try {
    // Initial setup, create credentials instance.
    const credentials =  PDFServicesSdk.Credentials
        .serviceAccountCredentialsBuilder()
        .fromFile("pdfservices-api-credentials.json")
        .build();

    // Create an ExecutionContext using credentials and create a new operation instance.
    const executionContext = PDFServicesSdk.ExecutionContext.create(credentials),
        createPdfOperation = PDFServicesSdk.CreatePDF.Operation.createNew();

    // Set operation input from a source file.
        const input = PDFServicesSdk.FileRef.createFromLocalFile('resources/createPDFInput.docx');
    createPdfOperation.setInput(input);

    // Provide any custom configuration options for the operation.
    setCustomOptions(createPdfOperation);

    // Execute the operation and Save the result to the specified location.
    createPdfOperation.execute(executionContext)
        .then(result => result.saveAsFile('output/createPDFFromDOCXWithOptionsOutput.pdf'))
        .catch(err => {
            if(err instanceof PDFServicesSdk.Error.ServiceApiError
                || err instanceof PDFServicesSdk.Error.ServiceUsageError) {
                console.log('Exception encountered while executing operation', err);
            } else {
                console.log('Exception encountered while executing operation', err);
            }
        });
} catch (err) {
    console.log('Exception encountered while executing operation', err);
}
```

#### Rest API

```javascript
// Please refer our Rest API docs for more information
// https://documentcloud.adobe.com/document-services/index.html#post-createPDF

curl --location --request POST 'https://cpf-ue1.adobe.io/ops/:create?respondWith=%7B%22reltype%22%3A%20%22http%3A%2F%2Fns.adobe.com%2Frel%2Fprimary%22%7D' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--header 'Accept: application/json, text/plain, */*' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Prefer: respond-async,wait=0' \
--form 'contentAnalyzerRequests="{
	\"cpf:inputs\": {
		\"params\": {
			\"cpf:inline\": {
				\"wordFormatOptions\": {
					\"documentLanguage\": \"ja-JP\"
				}
			}
		},
		\"documentIn\": {
			\"cpf:location\": \"InputFile0\",
			\"dc:format\": \"application/vnd.openxmlformats-officedocument.wordprocessingml.document\"
		}
	},
	\"cpf:engine\": {
		\"repo:assetId\": \"urn:aaid:cpf:Service-1538ece812254acaac2a07799503a430\"
	},
	\"cpf:outputs\": {
		\"documentOut\": {
			\"cpf:location\": \"multipartLabelOut\",
			\"dc:format\": \"application/pdf\"
		}
	}
}"' \
--form 'InputFile0=@"{{Placeholder for input file (absolute path)}}"'
```

## Create a PDF from static HTML

The sample below creates a PDF file from a static HTML file. The file
must be local. Since HTML/web pages typically contain external assets,
the input file must be a zip file containing an index.html at the top
level of the archive as well as any dependencies such as images, css
files, and so on.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.createpdf.CreatePDFFromStaticHTML

public class CreatePDFFromStaticHTML {

   // Initialize the logger.
   private static final Logger LOGGER = LoggerFactory.getLogger(CreatePDFFromStaticHTML.class);

   public static void main(String[] args) {

     try {

       // Initial setup, create credentials instance.
       Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
           .fromFile("pdfservices-api-credentials.json")
           .build();

       //Create an ExecutionContext using credentials and create a new operation instance.
       ExecutionContext executionContext = ExecutionContext.create(credentials);
       CreatePDFOperation htmlToPDFOperation = CreatePDFOperation.createNew();

       // Set operation input from a source file.
       FileRef source = FileRef.createFromLocalFile("src/main/resources/createPDFFromStaticHtmlInput.zip");
       htmlToPDFOperation.setInput(source);

       // Provide any custom configuration options for the operation.
       setCustomOptions(htmlToPDFOperation);

       // Execute the operation.
       FileRef result = htmlToPDFOperation.execute(executionContext);

       // Save the result to the specified location.
       result.saveAs("output/createPDFFromStaticHtmlOutput.pdf");

     } catch (ServiceApiException | IOException | SdkException | ServiceUsageException ex) {
       LOGGER.error("Exception encountered while executing operation", ex);
     }
   }

   private static void setCustomOptions(CreatePDFOperation htmlToPDFOperation) {
     // Define the page layout, in this case an 8 x 11.5 inch page (effectively portrait orientation).
     PageLayout pageLayout = new PageLayout();
     pageLayout.setPageSize(8, 11.5);

     // Set the desired HTML-to-PDF conversion options.
     CreatePDFOptions htmlToPdfOptions = CreatePDFOptions.htmlOptionsBuilder()
         .includeHeaderFooter(true)
         .withPageLayout(pageLayout)
         .build();
     htmlToPDFOperation.setOptions(htmlToPdfOptions);
   }
 }
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd CreatePDFFromStaticHtml/
// dotnet run CreatePDFFromStaticHtml.csproj

namespace CreatePDFFromStaticHtml
 {
   class Program
   {
     private static readonly ILog log = LogManager.GetLogger(typeof(Program));
     static void Main()
     {
       //Configure the logging
       ConfigureLogging();
       try
       {
         // Initial setup, create credentials instance.
         Credentials credentials = Credentials.ServiceAccountCredentialsBuilder()
                 .FromFile(Directory.GetCurrentDirectory() + "/pdfservices-api-credentials.json")
                 .Build();

         //Create an ExecutionContext using credentials and create a new operation instance.
         ExecutionContext executionContext = ExecutionContext.Create(credentials);
         CreatePDFOperation htmlToPDFOperation = CreatePDFOperation.CreateNew();

         // Set operation input from a source file.
         FileRef source = FileRef.CreateFromLocalFile(@"createPDFFromStaticHtmlInput.zip");
         htmlToPDFOperation.SetInput(source);

         // Provide any custom configuration options for the operation.
         SetCustomOptions(htmlToPDFOperation);

         // Execute the operation.
         FileRef result = htmlToPDFOperation.Execute(executionContext);

         // Save the result to the specified location.
         result.SaveAs(Directory.GetCurrentDirectory() + "/output/createPdfFromStaticHtmlOutput.pdf");
       }
       catch (ServiceUsageException ex)
       {
         log.Error("Exception encountered while executing operation", ex);
       }
        // Catch more errors here. . .
     }

     private static void SetCustomOptions(CreatePDFOperation htmlToPDFOperation)
     {
       // Define the page layout, in this case an 8 x 11.5 inch page (effectively portrait orientation).
       PageLayout pageLayout = new PageLayout();
       pageLayout.SetPageSize(8, 11.5);

       // Set the desired HTML-to-PDF conversion options.
       CreatePDFOptions htmlToPdfOptions = CreatePDFOptions.HtmlOptionsBuilder()
           .IncludeHeaderFooter(true)
           .WithPageLayout(pageLayout)
           . Build();
       htmlToPDFOperation.SetOptions(htmlToPdfOptions);
     }

     static void ConfigureLogging()
     {
       ILoggerRepository logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
       XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));
     }
   }
 }
```

#### Node JS

```javascript
// Get the samples from http://www.adobe.com/go/pdftoolsapi_node_sample
// Run the sample:
// node src/createpdf/create-pdf-from-static-html.js

const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');

 const setCustomOptions = (htmlToPDFOperation) => {
   // Define the page layout, in this case an 8 x 11.5 inch page (effectively portrait orientation).
   const pageLayout = new PDFServicesSdk.CreatePDF.options.PageLayout();
   pageLayout.setPageSize(8, 11.5);

   // Set the desired HTML-to-PDF conversion options.
   const htmlToPdfOptions = new PDFServicesSdk.CreatePDF.options.html.CreatePDFFromHtmlOptions.Builder()
     .includesHeaderFooter(true)
     .withPageLayout(pageLayout)
     .build();
   htmlToPDFOperation.setOptions(htmlToPdfOptions);
 };


 try {
   // Initial setup, create credentials instance.
   const credentials =  PDFServicesSdk.Credentials
     .serviceAccountCredentialsBuilder()
     .fromFile("pdfservices-api-credentials.json")
     .build();

   // Create an ExecutionContext using credentials and create a new operation instance.
   const executionContext = PDFServicesSdk.ExecutionContext.create(credentials),
     htmlToPDFOperation = PDFServicesSdk.CreatePDF.Operation.createNew();

   // Set operation input from a source file.
   const input = PDFServicesSdk.FileRef.createFromLocalFile('resources/createPDFFromStaticHtmlInput.zip');
   htmlToPDFOperation.setInput(input);

   // Provide any custom configuration options for the operation.
   setCustomOptions(htmlToPDFOperation);

   // Execute the operation and Save the result to the specified location.
   htmlToPDFOperation.execute(executionContext)
     .then(result => result.saveAsFile('output/createPdfFromStaticHtmlOutput.pdf'))
     .catch(err => {
       if(err instanceof PDFServicesSdk.Error.ServiceApiError
         || err instanceof PDFServicesSdk.Error.ServiceUsageError) {
         console.log('Exception encountered while executing operation', err);
       } else {
         console.log('Exception encountered while executing operation', err);
       }
     });
 } catch (err) {
   console.log('Exception encountered while executing operation', err);
 }
```

#### Rest API

```javascript
// Please refer our Rest API docs for more information
// https://documentcloud.adobe.com/document-services/index.html#post-htmlToPDF

curl --location --request POST 'https://cpf-ue1.adobe.io/ops/:create?respondWith=%7B%22reltype%22%3A%20%22http%3A%2F%2Fns.adobe.com%2Frel%2Fprimary%22%7D' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--header 'Accept: application/json, text/plain, */*' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Prefer: respond-async,wait=0' \
--form 'contentAnalyzerRequests="{
  \"cpf:inputs\": {
    \"params\": {
      \"cpf:inline\": {
        \"print\": {
          \"includeHeaderFooter\": true
        },
        \"pageLayout\": {
          \"pageHeight\": 8.5,
          \"pageWidth\": 11
        },
        \"json\": \"{\\\"k1\\\": \\\"v1\\\", \\\"k2\\\": \\\"v2\\\"}\"
      }
    },
    \"documentIn\": {
      \"cpf:location\": \"InputFile0\",
      \"dc:format\": \"application/zip\"
    }
  },
  \"cpf:engine\": {
    \"repo:assetId\": \"urn:aaid:cpf:Service-e2ee120a2b06427cb449592f5db967e7\"
  },
  \"cpf:outputs\": {
    \"documentOut\": {
      \"cpf:location\": \"multipartLabelOut\",
      \"dc:format\": \"application/pdf\"
    }
  }
}"' \
--form 'InputFile0=@"{{Placeholder for input file (absolute path)}}"'
```

## Create a PDF from static HTML with inline CSS

The sample below creates a PDF file from a static HTML file with inline CSS. The file must be local.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.createpdf.CreatePDFFromHTMLWithInlineCSS

   public class CreatePDFFromHTMLWithInlineCSS {

    // Initialize the logger.
    private static final Logger LOGGER = LoggerFactory.getLogger(CreatePDFFromStaticHTML.class);

    public static void main(String[] args) {

      try {

        // Initial setup, create credentials instance.
        Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
            .fromFile("pdfservices-api-credentials.json")
            .build();

        //Create an ExecutionContext using credentials and create a new operation instance.
        ExecutionContext executionContext = ExecutionContext.create(credentials);
        CreatePDFOperation htmlToPDFOperation = CreatePDFOperation.createNew();

        // Set operation input from a source file.
        FileRef source = FileRef.createFromLocalFile("src/main/resources/createPDFFromHTMLWithInlineCSSInput.html");
        htmlToPDFOperation.setInput(source);

        // Provide any custom configuration options for the operation.
        setCustomOptions(htmlToPDFOperation);

        // Execute the operation.
        FileRef result = htmlToPDFOperation.execute(executionContext);

        // Save the result to the specified location.
        result.saveAs("output/createPDFFromHTMLWithInlineCSSOutput.pdf");

      } catch (ServiceApiException | IOException | SdkException | ServiceUsageException ex) {
        LOGGER.error("Exception encountered while executing operation", ex);
      }
    }

    private static void setCustomOptions(CreatePDFOperation htmlToPDFOperation) {
      // Define the page layout, in this case an 20 x 25 inch page (effectively portrait orientation).
      PageLayout pageLayout = new PageLayout();
      pageLayout.setPageSize(20, 25);

      // Set the desired HTML-to-PDF conversion options.
      CreatePDFOptions htmlToPdfOptions = CreatePDFOptions.htmlOptionsBuilder()
          .includeHeaderFooter(true)
          .withPageLayout(pageLayout)
          .build();
      htmlToPDFOperation.setOptions(htmlToPdfOptions);
    }
  }
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd CreatePDFFromHTMLWithInlineCSS/
// dotnet run CreatePDFFromHTMLWithInlineCSS.csproj

namespace CreatePDFFromHTMLWithInlineCSS
  {
    class Program
    {
      private static readonly ILog log = LogManager.GetLogger(typeof(Program));
      static void Main()
      {
        //Configure the logging
        ConfigureLogging();
        try
        {
          // Initial setup, create credentials instance.
          Credentials credentials = Credentials.ServiceAccountCredentialsBuilder()
                  .FromFile(Directory.GetCurrentDirectory() + "/pdfservices-api-credentials.json")
                  .Build();

          //Create an ExecutionContext using credentials and create a new operation instance.
          ExecutionContext executionContext = ExecutionContext.Create(credentials);
          CreatePDFOperation htmlToPDFOperation = CreatePDFOperation.CreateNew();

          // Set operation input from a source file.
          FileRef source = FileRef.CreateFromLocalFile(@"createPDFFromHTMLWithInlineCSSInput.html");
          htmlToPDFOperation.SetInput(source);

          // Provide any custom configuration options for the operation.
          SetCustomOptions(htmlToPDFOperation);

          // Execute the operation.
          FileRef result = htmlToPDFOperation.Execute(executionContext);

          // Save the result to the specified location.
          result.SaveAs(Directory.GetCurrentDirectory() + "/output/createPDFFromHTMLWithInlineCSSOutput.pdf");
        }
        catch (ServiceUsageException ex)
        {
          log.Error("Exception encountered while executing operation", ex);
        }
         // Catch more errors here. . .
      }

      private static void SetCustomOptions(CreatePDFOperation htmlToPDFOperation)
      {
        // Define the page layout, in this case an 20 x 25 inch page (effectively portrait orientation).
        PageLayout pageLayout = new PageLayout();
        pageLayout.SetPageSize(20, 25);

        // Set the desired HTML-to-PDF conversion options.
        CreatePDFOptions htmlToPdfOptions = CreatePDFOptions.HtmlOptionsBuilder()
            .IncludeHeaderFooter(true)
            .WithPageLayout(pageLayout)
            . Build();
        htmlToPDFOperation.SetOptions(htmlToPdfOptions);
      }

      static void ConfigureLogging()
      {
        ILoggerRepository logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
        XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));
      }
    }
  }
```

#### Node JS

```javascript
// Get the samples from http://www.adobe.com/go/pdftoolsapi_node_sample
// Run the sample:
// node src/create-pdf-from-html-with-inline-css.js

const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');

const setCustomOptions = (htmlToPDFOperation) => {
    // Define the page layout, in this case an 20 x 25 inch page (effectively portrait orientation).
    const pageLayout = new PDFServicesSdk.CreatePDF.options.PageLayout();
    pageLayout.setPageSize(20, 25);

    // Set the desired HTML-to-PDF conversion options.
    const htmlToPdfOptions = new PDFServicesSdk.CreatePDF.options.html.CreatePDFFromHtmlOptions.Builder()
        .includesHeaderFooter(true)
        .withPageLayout(pageLayout)
        .build();
    htmlToPDFOperation.setOptions(htmlToPdfOptions);
};


try {
    // Initial setup, create credentials instance.
    const credentials =  PDFServicesSdk.Credentials
        .serviceAccountCredentialsBuilder()
        .fromFile("pdfservices-api-credentials.json")
        .build();

    // Create an ExecutionContext using credentials and create a new operation instance.
    const executionContext = PDFServicesSdk.ExecutionContext.create(credentials),
        htmlToPDFOperation = PDFServicesSdk.CreatePDF.Operation.createNew();

    // Set operation input from a source file.
    const input = PDFServicesSdk.FileRef.createFromLocalFile('resources/createPDFFromHTMLWithInlineCSSInput.html');
    htmlToPDFOperation.setInput(input);

    // Provide any custom configuration options for the operation.
    setCustomOptions(htmlToPDFOperation);

    // Execute the operation and Save the result to the specified location.
    htmlToPDFOperation.execute(executionContext)
        .then(result => result.saveAsFile('output/createPDFFromHTMLWithInlineCSSOutput.pdf'))
        .catch(err => {
            if(err instanceof PDFServicesSdk.Error.ServiceApiError
                || err instanceof PDFServicesSdk.Error.ServiceUsageError) {
                console.log('Exception encountered while executing operation', err);
            } else {
                console.log('Exception encountered while executing operation', err);
            }
        });
} catch (err) {
    console.log('Exception encountered while executing operation', err);
}
```

#### Rest API

```javascript
// Please refer our Rest API docs for more information
// https://documentcloud.adobe.com/document-services/index.html#post-htmlToPDF

curl --location --request POST 'https://cpf-ue1.adobe.io/ops/:create?respondWith=%7B%22reltype%22%3A%20%22http%3A%2F%2Fns.adobe.com%2Frel%2Fprimary%22%7D' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--header 'Accept: application/json, text/plain, */*' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Prefer: respond-async,wait=0' \
--form 'contentAnalyzerRequests="{
  \"cpf:inputs\": {
    \"params\": {
      \"cpf:inline\": {
        \"print\": {
          \"includeHeaderFooter\": true
        },
        \"pageLayout\": {
          \"pageHeight\": 8.5,
          \"pageWidth\": 11
        },
        \"json\": \"{\\\"k1\\\": \\\"v1\\\", \\\"k2\\\": \\\"v2\\\"}\"
      }
    },
    \"documentIn\": {
      \"cpf:location\": \"InputFile0\",
      \"dc:format\": \"application/zip\"
    }
  },
  \"cpf:engine\": {
    \"repo:assetId\": \"urn:aaid:cpf:Service-e2ee120a2b06427cb449592f5db967e7\"
  },
  \"cpf:outputs\": {
    \"documentOut\": {
      \"cpf:location\": \"multipartLabelOut\",
      \"dc:format\": \"application/pdf\"
    }
  }
}"' \
--form 'InputFile0=@"{{Placeholder for input file (absolute path)}}"'
```

## Create a PDF File From HTML specified via URL

The sample below creates a PDF file from a HTML file specified via URL.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.createpdf.CreatePDFFromURL

  public class CreatePDFFromURL {

    // Initialize the logger.
    private static final Logger LOGGER = LoggerFactory.getLogger(CreatePDFFromStaticHTML.class);

    public static void main(String[] args) {

      try {

        // Initial setup, create credentials instance.
        Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
            .fromFile("pdfservices-api-credentials.json")
            .build();

        //Create an ExecutionContext using credentials and create a new operation instance.
        ExecutionContext executionContext = ExecutionContext.create(credentials);
        CreatePDFOperation htmlToPDFOperation = CreatePDFOperation.createNew();

        // Set operation input from a source URL.
        FileRef source = FileRef.createFromURL(new URL("https://www.adobe.io"));
        htmlToPDFOperation.setInput(source);

        // Provide any custom configuration options for the operation.
        setCustomOptions(htmlToPDFOperation);

        // Execute the operation.
        FileRef result = htmlToPDFOperation.execute(executionContext);

        // Save the result to the specified location.
        result.saveAs("output/createPDFFromURLOutput.pdf");

      } catch (ServiceApiException | IOException | SdkException | ServiceUsageException ex) {
        LOGGER.error("Exception encountered while executing operation", ex);
      }
    }

    private static void setCustomOptions(CreatePDFOperation htmlToPDFOperation) {
      // Define the page layout, in this case an 20 x 25 inch page (effectively portrait orientation).
      PageLayout pageLayout = new PageLayout();
      pageLayout.setPageSize(20, 25);

      // Set the desired HTML-to-PDF conversion options.
      CreatePDFOptions htmlToPdfOptions = CreatePDFOptions.htmlOptionsBuilder()
          .includeHeaderFooter(true)
          .withPageLayout(pageLayout)
          .build();
      htmlToPDFOperation.setOptions(htmlToPdfOptions);
    }
  }
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd CreatePDFFromURL/
// dotnet run CreatePDFFromURL.csproj

namespace CreatePDFFromURL
{
    class Program
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(Program));
        static void Main()
    {
        //Configure the logging
        ConfigureLogging();
        try
        {
            // Initial setup, create credentials instance.
            Credentials credentials = Credentials.ServiceAccountCredentialsBuilder()
            .FromFile(Directory.GetCurrentDirectory() + "/pdfservices-api-credentials.json")
            .Build();

            //Create an ExecutionContext using credentials and create a new operation instance.
            ExecutionContext executionContext = ExecutionContext.Create(credentials);
            CreatePDFOperation htmlToPDFOperation = CreatePDFOperation.CreateNew();

            // Set operation input from a source URL.
            FileRef source = FileRef.CreateFromURI(new Uri("https://www.adobe.io"));
            htmlToPDFOperation.SetInput(source);

            // Provide any custom configuration options for the operation.
            SetCustomOptions(htmlToPDFOperation);

            // Execute the operation.
            FileRef result = htmlToPDFOperation.Execute(executionContext);

            // Save the result to the specified location.
            result.SaveAs(Directory.GetCurrentDirectory() + "/output/createPdfFromURLOutput.pdf");
        }
        catch (ServiceUsageException ex)
        {
            log.Error("Exception encountered while executing operation", ex);
        }
        // Catch more errors here. . .
    }

        private static void SetCustomOptions(CreatePDFOperation htmlToPDFOperation)
    {
        // Define the page layout, in this case an 20 x 25 inch page (effectively portrait orientation).
        PageLayout pageLayout = new PageLayout();
        pageLayout.SetPageSize(20, 25);

        // Set the desired HTML-to-PDF conversion options.
        CreatePDFOptions htmlToPdfOptions = CreatePDFOptions.HtmlOptionsBuilder()
        .IncludeHeaderFooter(true)
        .WithPageLayout(pageLayout)
        . Build();
        htmlToPDFOperation.SetOptions(htmlToPdfOptions);
    }

    static void ConfigureLogging()
    {
        ILoggerRepository logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
        XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));
    }
}
}
```

#### Node JS

```javascript
// Get the samples from http://www.adobe.com/go/pdftoolsapi_node_sample
// Run the sample:
// node src/create-pdf-from-url.js
const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');

const setCustomOptions = (htmlToPDFOperation) => {
    // Define the page layout, in this case an 20 x 25 inch page (effectively portrait orientation).
    const pageLayout = new PDFServicesSdk.CreatePDF.options.PageLayout();
    pageLayout.setPageSize(20, 25);

    // Set the desired HTML-to-PDF conversion options.
    const htmlToPdfOptions = new PDFServicesSdk.CreatePDF.options.html.CreatePDFFromHtmlOptions.Builder()
        .includesHeaderFooter(true)
        .withPageLayout(pageLayout)
        .build();
    htmlToPDFOperation.setOptions(htmlToPdfOptions);
};


try {
    // Initial setup, create credentials instance.
    const credentials =  PDFServicesSdk.Credentials
        .serviceAccountCredentialsBuilder()
        .fromFile("pdfservices-api-credentials.json")
        .build();

    // Create an ExecutionContext using credentials and create a new operation instance.
    const executionContext = PDFServicesSdk.ExecutionContext.create(credentials),
        htmlToPDFOperation = PDFServicesSdk.CreatePDF.Operation.createNew();

    // Set operation input from a source file.
    const input = PDFServicesSdk.FileRef.createFromURL(
        "https://www.adobe.io"
    );
    htmlToPDFOperation.setInput(input);

    // Provide any custom configuration options for the operation.
    setCustomOptions(htmlToPDFOperation);

    // Execute the operation and Save the result to the specified location.
    htmlToPDFOperation.execute(executionContext)
        .then(result => result.saveAsFile('output/createPdfFromURLOutput.pdf'))
        .catch(err => {
            if(err instanceof PDFServicesSdk.Error.ServiceApiError
                || err instanceof PDFServicesSdk.Error.ServiceUsageError) {
                console.log('Exception encountered while executing operation', err);
            } else {
                console.log('Exception encountered while executing operation', err);
            }
        });
} catch (err) {
    console.log('Exception encountered while executing operation', err);
}
```

#### Rest API

```javascript
// Please refer our Rest API docs for more information
// https://documentcloud.adobe.com/document-services/index.html#post-htmlToPDF

curl --location --request POST 'https://cpf-ue1.adobe.io/ops/:create?respondWith=%7B%22reltype%22%3A%20%22http%3A%2F%2Fns.adobe.com%2Frel%2Fprimary%22%7D' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--header 'Accept: application/json, text/plain, */*' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Prefer: respond-async,wait=0' \
--form 'contentAnalyzerRequests="{
  \"cpf:inputs\": {
    \"params\": {
      \"cpf:inline\": {
        \"print\": {
          \"includeHeaderFooter\": true
        },
        \"pageLayout\": {
          \"pageHeight\": 8.5,
          \"pageWidth\": 11
        },
        \"json\": \"{\\\"k1\\\": \\\"v1\\\", \\\"k2\\\": \\\"v2\\\"}\"
      }
    },
    \"inputUrl\": \"{{Placeholder for inputUrl}}\"
  },
  \"cpf:engine\": {
    \"repo:assetId\": \"urn:aaid:cpf:Service-e2ee120a2b06427cb449592f5db967e7\"
  },
  \"cpf:outputs\": {
    \"documentOut\": {
      \"cpf:location\": \"multipartLabelOut\",
      \"dc:format\": \"application/pdf\"
    }
  }
}"'
```

## Create a PDF from dynamic HTML

To support workflows with dynamic data, `CreatePDFFromDynamicHTML`
creates PDFs from dynamic HTML. It's a common scenario for enterprise to
provide end users with an HTML template with form fields. This API
allows you to capture the users unique data entries and then save it as
PDF. Collected data is stored in a JSON file, and the source HTML file
must include `<script src='./json.js' type='text/javascript'></script>`.
Refer to the API docs for usage.

The sample `CreatePDFFromDynamicHTML` converts a zip file, containing
the input HTML file and its resources, along with the input data to a
PDF file. The input data is used by the JavaScript in the HTML file to
manipulate the HTML DOM, thus effectively updating the source HTML file.
This mechanism can be used to provide data to the template HTML
dynamically prior to PDF conversion.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.createpdf.CreatePDFFromDynamicHTML
 public class CreatePDFFromDynamicHTML {

   // Initialize the logger.
   private static final Logger LOGGER = LoggerFactory.getLogger(CreatePDFFromDynamicHTML.class);

   public static void main(String[] args) {

     try {

       // Initial setup, create credentials instance.
       Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
           .fromFile("pdfservices-api-credentials.json")
           .build();

       //Create an ExecutionContext using credentials and create a new operation instance.
       ExecutionContext executionContext = ExecutionContext.create(credentials);
       CreatePDFOperation htmlToPDFOperation = CreatePDFOperation.createNew();

       // Set operation input from a source file.
       FileRef source = FileRef.createFromLocalFile("src/main/resources/createPDFFromDynamicHtmlInput.zip");
       htmlToPDFOperation.setInput(source);

       // Provide any custom configuration options for the operation.
       setCustomOptions(htmlToPDFOperation);

       // Execute the operation.
       FileRef result = htmlToPDFOperation.execute(executionContext);

       // Save the result to the specified location.
       result.saveAs("output/createPDFFromDynamicHtmlOutput.pdf");

     } catch (ServiceApiException | IOException | SdkException | ServiceUsageException ex) {
       LOGGER.error("Exception encountered while executing operation", ex);
     }
   }

   private static void setCustomOptions(CreatePDFOperation htmlToPDFOperation) {
     // Define the page layout, in this case an 8 x 11.5 inch page (effectively portrait orientation).
     PageLayout pageLayout = new PageLayout();
     pageLayout.setPageSize(8, 11.5);

     //Set the dataToMerge field that needs to be populated in the HTML before its conversion
     JSONObject dataToMerge = new JSONObject();
     dataToMerge.put("title","Create, Convert PDFs and More!");
     dataToMerge.put("sub_title","Easily integrate PDF actions within your document workflows.");

     // Set the desired HTML-to-PDF conversion options.
     CreatePDFOptions htmlToPdfOptions = CreatePDFOptions.htmlOptionsBuilder()
         .includeHeaderFooter(true)
         .withPageLayout(pageLayout)
         .withDataToMerge(dataToMerge)
         .build();
     htmlToPDFOperation.setOptions(htmlToPdfOptions);
   }
 }
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd CreatePDFFromDynamicHtml/
// dotnet run CreatePDFFromDynamicHtml.csproj

 namespace CreatePDFFromDynamicHtml
 {
   class Program
   {
     private static readonly ILog log = LogManager.GetLogger(typeof(Program));
     static void Main()
     {
       //Configure the logging
       ConfigureLogging();
       try
       {
         // Initial setup, create credentials instance.
         Credentials credentials = Credentials.ServiceAccountCredentialsBuilder()
                 .FromFile(Directory.GetCurrentDirectory() + "/pdfservices-api-credentials.json")
                 .Build();

         //Create an ExecutionContext using credentials and create a new operation instance.
         ExecutionContext executionContext = ExecutionContext.Create(credentials);
         CreatePDFOperation htmlToPDFOperation = CreatePDFOperation.CreateNew();

         // Set operation input from a source file.
         FileRef source = FileRef.CreateFromLocalFile(@"createPDFFromDynamicHtmlInput.zip");
         htmlToPDFOperation.SetInput(source);

         // Provide any custom configuration options for the operation.
         SetCustomOptions(htmlToPDFOperation);

         // Execute the operation.
         FileRef result = htmlToPDFOperation.Execute(executionContext);

         // Save the result to the specified location.
         result.SaveAs(Directory.GetCurrentDirectory() + "/output/createPdfFromDynamicHtmlOutput.pdf");
       }
       catch (ServiceUsageException ex)
       {
         log.Error("Exception encountered while executing operation", ex);
       }
       // errors continued. . .
     }

     private static void SetCustomOptions(CreatePDFOperation htmlToPDFOperation)
     {
       // Define the page layout, in this case an 8 x 11.5 inch page (effectively portrait orientation).
       PageLayout pageLayout = new PageLayout();
       pageLayout.SetPageSize(8, 11.5);

       //Set the dataToMerge field that needs to be populated in the HTML before its conversion
       JObject dataToMerge = new JObject
       {
         { "title", "Create, Convert PDFs and More!" },
         { "sub_title", "Easily integrate PDF actions within your document workflows." }
       };

       // Set the desired HTML-to-PDF conversion options.
       CreatePDFOptions htmlToPdfOptions = CreatePDFOptions.HtmlOptionsBuilder()
           .IncludeHeaderFooter(true)
           .WithPageLayout(pageLayout)
           .WithDataToMerge(dataToMerge)
           .Build();
       htmlToPDFOperation.SetOptions(htmlToPdfOptions);
     }

     static void ConfigureLogging()
     {
       ILoggerRepository logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
       XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));
     }
   }
 }
```

#### Node JS

```javascript
// Get the samples from http://www.adobe.com/go/pdftoolsapi_node_sample
// Run the sample:
// node src/createpdf/create-pdf-from-dynamic-html.js

const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');

 const setCustomOptions = (htmlToPDFOperation) => {
   // Define the page layout, in this case an 8 x 11.5 inch page (effectively portrait orientation).
   const pageLayout = new PDFServicesSdk.CreatePDF.options.PageLayout();
   pageLayout.setPageSize(8, 11.5);
   //Set the dataToMerge field that needs to be populated in the HTML before its conversion.
   const dataToMerge = {
       "title":"Create, Convert PDFs and More!",
       "sub_title": "Easily integrate PDF actions within your document workflows."
   };
   // Set the desired HTML-to-PDF conversion options.
   const htmlToPdfOptions = new PDFServicesSdk.CreatePDF.options.html.CreatePDFFromHtmlOptions.Builder()
       .includesHeaderFooter(true)
       .withPageLayout(pageLayout)
       .withDataToMerge(dataToMerge)
       .build();
   htmlToPDFOperation.setOptions(htmlToPdfOptions);
 };


 try {
   // Initial setup, create credentials instance.
   const credentials =  PDFServicesSdk.Credentials
       .serviceAccountCredentialsBuilder()
       .fromFile("pdfservices-api-credentials.json")
       .build();

   // Create an ExecutionContext using credentials and create a new operation instance.
   const executionContext = PDFServicesSdk.ExecutionContext.create(credentials),
       htmlToPDFOperation = PDFServicesSdk.CreatePDF.Operation.createNew();

   // Set operation input from a source file.
   const input = PDFServicesSdk.FileRef.createFromLocalFile('resources/createPDFFromDynamicHtmlInput.zip');
   htmlToPDFOperation.setInput(input);

   // Provide any custom configuration options for the operation.
   setCustomOptions(htmlToPDFOperation);

   // Execute the operation and Save the result to the specified location.
   htmlToPDFOperation.execute(executionContext)
       .then(result => result.saveAsFile('output/createPdfFromDynamicHtmlOutput.pdf'))
       .catch(err => {
           if(err instanceof PDFServicesSdk.Error.ServiceApiError
               || err instanceof PDFServicesSdk.Error.ServiceUsageError) {
               console.log('Exception encountered while executing operation', err);
           } else {
               console.log('Exception encountered while executing operation', err);
           }
       });
 } catch (err) {
   console.log('Exception encountered while executing operation', err);
 }
```

#### Rest API 

```javascript
// Please refer our Rest API docs for more information
// https://documentcloud.adobe.com/document-services/index.html#post-htmlToPDF

curl --location --request POST 'https://cpf-ue1.adobe.io/ops/:create?respondWith=%7B%22reltype%22%3A%20%22http%3A%2F%2Fns.adobe.com%2Frel%2Fprimary%22%7D' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--header 'Accept: application/json, text/plain, */*' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Prefer: respond-async,wait=0' \
--form 'contentAnalyzerRequests="{
  \"cpf:inputs\": {
    \"params\": {
      \"cpf:inline\": {
        \"print\": {
          \"includeHeaderFooter\": true
        },
        \"pageLayout\": {
          \"pageHeight\": 8.5,
          \"pageWidth\": 11
        },
        \"json\": \"{\\\"k1\\\": \\\"v1\\\", \\\"k2\\\": \\\"v2\\\"}\"
      }
    },
    \"documentIn\": {
      \"cpf:location\": \"InputFile0\",
      \"dc:format\": \"application/zip\"
    }
  },
  \"cpf:engine\": {
    \"repo:assetId\": \"urn:aaid:cpf:Service-e2ee120a2b06427cb449592f5db967e7\"
  },
  \"cpf:outputs\": {
    \"documentOut\": {
      \"cpf:location\": \"multipartLabelOut\",
      \"dc:format\": \"application/pdf\"
    }
  }
}"' \
--form 'InputFile0=@"{{Placeholder for input file (absolute path)}}"'
```