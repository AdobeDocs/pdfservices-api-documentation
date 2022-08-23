---
title: Document Services APIs | How Tos | Insert Pages
---
# Insert Pages

Insert one or more pages into an existing document

## Rest API 

See our public API Reference for [Insert Pages](../../../apis/#tag/combinepdf)

## Insert Pages in PDF

The insert operation inserts additional pages from different PDFs into
an existing PDF.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.insertpages.InsertPDFPages
 
    public class InsertPDFPages {
  
     // Initialize the logger.
     private static final Logger LOGGER = LoggerFactory.getLogger(InsertPDFPages.class);
  
     public static void main(String[] args) {
         try {
             // Initial setup, create credentials instance.
             Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
                     .fromFile("pdfservices-api-credentials.json")
                     .build();
  
             // Create an ExecutionContext using credentials and create a new operation instance.
             ExecutionContext executionContext = ExecutionContext.create(credentials);
             InsertPagesOperation insertPagesOperation = InsertPagesOperation.createNew();
  
             // Set operation base input from a source file.
             FileRef baseSourceFile = FileRef.createFromLocalFile("src/main/resources/baseInput.pdf");
             insertPagesOperation.setBaseInput(baseSourceFile);
  
             // Create a FileRef instance using a local file.
             FileRef firstFileToInsert = FileRef.createFromLocalFile("src/main/resources/firstFileToInsertInput.pdf");
             PageRanges pageRanges = getPageRangeForFirstFile();
  
             // Adds the pages (specified by the page ranges) of the input PDF file to be inserted at
             // the specified page of the base PDF file.
             insertPagesOperation.addPagesToInsertAt(firstFileToInsert, pageRanges, 2);
  
             // Create a FileRef instance using a local file.
             FileRef secondFileToInsert = FileRef.createFromLocalFile("src/main/resources/secondFileToInsertInput.pdf");
  
             // Adds all the pages of the input PDF file to be inserted at the specified page of the
             // base PDF file.
             insertPagesOperation.addPagesToInsertAt(secondFileToInsert, 3);
  
             // Execute the operation.
             FileRef result = insertPagesOperation.execute(executionContext);
  
             // Save the result to the specified location.
             result.saveAs("output/insertPagesOutput.pdf");
  
         } catch (IOException | ServiceApiException | SdkException | ServiceUsageException e) {
             LOGGER.error("Exception encountered while executing operation", e);
         }
     }
  
     private static PageRanges getPageRangeForFirstFile() {
         // Specify which pages of the first file are to be inserted in the base file.
         PageRanges pageRanges = new PageRanges();
         // Add pages 1 to 3.
         pageRanges.addRange(1, 3);
  
         // Add page 4.
         pageRanges.addSinglePage(4);
  
         return pageRanges;
     }
   }
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd InsertPDFPages/
// dotnet run InsertPDFPages.csproj

  namespace InsertPDFPages
  {
    class Program
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(Program));
        static void Main()
        {
            // Configure the logging
            ConfigureLogging();
            try
            {
                // Initial setup, create credentials instance.
                Credentials credentials = Credentials.ServiceAccountCredentialsBuilder()
                                .FromFile(Directory.GetCurrentDirectory() + "/pdfservices-api-credentials.json")
                                .Build();
 
                // Create an ExecutionContext using credentials.
                ExecutionContext executionContext = ExecutionContext.Create(credentials);
 
                // Create a new operation instance
                InsertPagesOperation insertPagesOperation = InsertPagesOperation.CreateNew();
 
                // Set operation base input from a source file.
                FileRef baseSourceFile = FileRef.CreateFromLocalFile(@"baseInput.pdf");
                insertPagesOperation.SetBaseInput(baseSourceFile);
 
                // Create a FileRef instance using a local file.
                FileRef firstFileToInsert = FileRef.CreateFromLocalFile(@"firstFileToInsertInput.pdf");
                PageRanges pageRanges = GetPageRangeForFirstFile();
 
                // Adds the pages (specified by the page ranges) of the input PDF file to be inserted at
                // the specified page of the base PDF file.
                insertPagesOperation.AddPagesToInsertAt(firstFileToInsert, pageRanges, 2);
 
                // Create a FileRef instance using a local file.
                FileRef secondFileToInsert = FileRef.CreateFromLocalFile(@"secondFileToInsertInput.pdf");
 
                // Adds all the pages of the input PDF file to be inserted at the specified page of the
                // base PDF file.
                insertPagesOperation.AddPagesToInsertAt(secondFileToInsert, 3);
 
                // Execute the operation.
                FileRef result = insertPagesOperation.Execute(executionContext);
 
                // Save the result to the specified location.
                result.SaveAs(Directory.GetCurrentDirectory() + "/output/insertPagesOutput.pdf");
            }
            catch (ServiceUsageException ex)
            {
                log.Error("Exception encountered while executing operation", ex);
            // Catch more errors here . . .
        }
 
        private static PageRanges GetPageRangeForFirstFile()
        {
            // Specify which pages of the first file are to be inserted in the base file.
            PageRanges pageRanges = new PageRanges();
            // Add pages 1 to 3.
            pageRanges.AddRange(1, 3);
 
            // Add page 4.
            pageRanges.AddSinglePage(4);
 
            return pageRanges;
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
// node src/insertpages/insert-pdf-pages.js

    const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
   
    const getPageRangesForFirstFile = () => {
      // Specify which pages of the first file are to be inserted in the base file.
      const pageRangesForFirstFile = new PDFServicesSdk.PageRanges();
      // Add pages 1 to 3.
      pageRangesForFirstFile.addPageRange(1, 3);
   
      // Add page 4.
      pageRangesForFirstFile.addSinglePage(4);
   
      return pageRangesForFirstFile;
    };
   
    try {
      // Initial setup, create credentials instance.
      const credentials = PDFServicesSdk.Credentials
          .serviceAccountCredentialsBuilder()
          .fromFile("pdfservices-api-credentials.json")
          .build();
   
      // Create an ExecutionContext using credentials and create a new operation instance.
      const executionContext = PDFServicesSdk.ExecutionContext.create(credentials),
          insertPagesOperation = PDFServicesSdk.InsertPages.Operation.createNew();
   
      // Set operation base input from a source file.
      const baseInputFile = PDFServicesSdk.FileRef.createFromLocalFile('resources/baseInput.pdf');
      insertPagesOperation.setBaseInput(baseInputFile);
   
      // Create a FileRef instance using a local file.
      const firstFileToInsert = PDFServicesSdk.FileRef.createFromLocalFile('resources/firstFileToInsertInput.pdf'),
          pageRanges = getPageRangesForFirstFile();
   
      // Adds the pages (specified by the page ranges) of the input PDF file to be inserted at
      // the specified page of the base PDF file.
      insertPagesOperation.addPagesToInsertAt(2, firstFileToInsert, pageRanges);
   
      // Create a FileRef instance using a local file.
      const secondFileToInsert = PDFServicesSdk.FileRef.createFromLocalFile('resources/secondFileToInsertInput.pdf');
   
      // Adds all the pages of the input PDF file to be inserted at the specified page of the
      // base PDF file.
      insertPagesOperation.addPagesToInsertAt(3, secondFileToInsert);
   
      // Execute the operation and Save the result to the specified location.
      insertPagesOperation.execute(executionContext)
          .then(result => result.saveAsFile('output/insertPagesOutput.pdf'))
          .catch(err => {
              if (err instanceof PDFServicesSdk.Error.ServiceApiError
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
curl --location --request POST 'https://pdf-services.adobe.io/operation/combinepdf' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assets": [
        {
            "assetID": "ce8fe9da-99f2-4d01-999e-42b9ce22ec5f",
            "pageRanges": [
                {
                    "start": 1,
                    "end": 1
                }
            ]
        },
        {
            "assetID": "4f497053-8359-47ed-bc05-c34a0e5e4a8c",
            "pageRanges": [
                {
                    "start": 4
                }
            ]
        },
        {
            "assetID": "527a6ad0-086f-4682-be5c-8d340c9c08a1",
            "pageRanges": [
                {
                    "start": 1
                }
            ]
        },
        {
            "assetID": "aefd44fb-49ea-43c8-b4aa-ede453ff47b2",
            "pageRanges": [
                {
                    "start": 2
                }
            ]
        }
    ]
}'

//Please refer our legacy APIs here : https://documentcloud.adobe.com/document-services/index.html#post-combinePDF
```
