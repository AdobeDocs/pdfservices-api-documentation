---
title: Reorder Pages | How Tos | PDF Services API | Adobe PDF Services
---
# Reorder Pages

Reorder the pages of a PDF file to reorganize.

## Rest API

See our public API Reference for [Reorder Pages](../../../apis/#tag/Combine-PDF)

## Reorder Pages in PDF

The reorder pages operation moves pages from one location to another in
a PDF file.

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.reorderpages.ReorderPDFPages
 
 public class ReorderPDFPages {

   // Initialize the logger.
   private static final Logger LOGGER = LoggerFactory.getLogger(ReorderPDFPages.class);

   public static void main(String[] args) {
       try {
           // Initial setup, create credentials instance.
           Credentials credentials = Credentials.servicePrincipalCredentialsBuilder()
                    .withClientId("PDF_SERVICES_CLIENT_ID")
                    .withClientSecret("PDF_SERVICES_CLIENT_SECRET")
                    .build();

           // Create an ExecutionContext using credentials and create a new operation instance.
           ExecutionContext executionContext = ExecutionContext.create(credentials);
           ReorderPagesOperation reorderPagesOperation = ReorderPagesOperation.createNew();

           // Set operation input from a source file, along with specifying the order of the pages for
           // rearranging the pages in a PDF file.
           FileRef source = FileRef.createFromLocalFile("src/main/resources/reorderPagesInput.pdf");
           PageRanges pageRanges = getPageRangeForReorder();
           reorderPagesOperation.setInput(source);
           reorderPagesOperation.setPagesOrder(pageRanges);

           // Execute the operation.
           FileRef result = reorderPagesOperation.execute(executionContext);

           // Save the result to the specified location.
           result.saveAs("output/reorderPagesOutput.pdf");

       } catch (IOException | ServiceApiException | SdkException | ServiceUsageException e) {
           LOGGER.error("Exception encountered while executing operation", e);
       }
   }

   private static PageRanges getPageRangeForReorder() {
       // Specify order of the pages for an output document.
       PageRanges pageRanges = new PageRanges();
       // Add pages 3 to 4.
       pageRanges.addRange(3, 4);

       // Add page 1.
       pageRanges.addSinglePage(1);

       return pageRanges;
   }
 }
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd ReorderPages/
// dotnet run ReorderPDFPages.csproj

 namespace ReorderPDFPages
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
               Credentials credentials = Credentials.ServicePrincipalCredentialsBuilder()
                    .WithClientId("PDF_SERVICES_CLIENT_ID")
                    .WithClientSecret("PDF_SERVICES_CLIENT_SECRET")
                    .Build();

               // Create an ExecutionContext using credentials.
               ExecutionContext executionContext = ExecutionContext.Create(credentials);

               // Create a new operation instance
               ReorderPagesOperation reorderPagesOperation = ReorderPagesOperation.CreateNew();

               // Set operation input from a source file, along with specifying the order of the pages for
               // rearranging the pages in a PDF file.
               FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"reorderPagesInput.pdf");
               reorderPagesOperation.SetInput(sourceFileRef);
               PageRanges pageRanges = GetPageRangeForReorder();
               reorderPagesOperation.SetPagesOrder(pageRanges);

               // Execute the operation.
               FileRef result = reorderPagesOperation.Execute(executionContext);

               // Save the result to the specified location.
               result.SaveAs(Directory.GetCurrentDirectory() + "/output/reorderPagesOutput.pdf");
           }
           catch (ServiceUsageException ex)
           {
               log.Error("Exception encountered while executing operation", ex);
           }
           // Catch more errors here . . .
       }

       private static PageRanges GetPageRangeForReorder()
       {
           // Specify order of the pages for an output document.
           PageRanges pageRanges = new PageRanges();
           // Add pages 3 to 4.
           pageRanges.AddRange(3, 4);

           // Add page 1.
           pageRanges.AddSinglePage(1);

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
// node src/reorderpages/reorder-pdf-pages.js

 const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');

 const getPageRangeForReorder = () => {
   // Specify order of the pages for an output document.
   const pageRanges = new PDFServicesSdk.PageRanges();

   // Add pages 3 to 4.
   pageRanges.addPageRange(3, 4);

   // Add page 1.
   pageRanges.addSinglePage(1);

   return pageRanges;
 };
 try {
   // Initial setup, create credentials instance.
     const credentials =  PDFServicesSdk.Credentials
         .servicePrincipalCredentialsBuilder()
         .withClientId("PDF_SERVICES_CLIENT_ID")
         .withClientSecret("PDF_SERVICES_CLIENT_SECRET")
         .build();

   // Create an ExecutionContext using credentials and create a new operation instance.
   const executionContext = PDFServicesSdk.ExecutionContext.create(credentials),
       reorderPagesOperation = PDFServicesSdk.ReorderPages.Operation.createNew();

   // Set operation input from a source file, along with specifying the order of the pages for
   // rearranging the pages in a PDF file.
   const input = PDFServicesSdk.FileRef.createFromLocalFile('resources/reorderPagesInput.pdf');
   const pageRanges = getPageRangeForReorder();
   reorderPagesOperation.setInput(input);
   reorderPagesOperation.setPagesOrder(pageRanges);

   // Execute the operation and Save the result to the specified location.
   reorderPagesOperation.execute(executionContext)
       .then(result => result.saveAsFile('output/reorderPagesOutput.pdf'))
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
// https://developer.adobe.com/document-services/docs/apis/#tag/Combine-PDF

curl --location --request POST 'https://pdf-services.adobe.io/operation/combinepdf' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assets": [
        {
            "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718",
            "pageRanges": [
                {
                    "start": 3,
                    "end": 3
                },
                {
                    "start": 1,
                    "end": 1
                },
                {
                    "start": 4,
                    "end": 4
                }
            ]
        }
    ]
}'

// Legacy API can be found here 
// https://documentcloud.adobe.com/document-services/index.html#post-combinePDF
```
