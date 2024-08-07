---
title: Delete Pages | How Tos | PDF Services API | Adobe PDF Services
---
# Delete Pages

Delete one or more pages from a document

## Rest API

See our public API Reference for [Delete Pages](../../../apis/#tag/Page-Manipulation)

## Delete Pages in a PDF

The delete pages operation selectively removes pages from a PDF file.

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.deletepages.DeletePDFPages
 
     
   public class DeletePDFPages {

   // Initialize the logger.
   private static final Logger LOGGER = LoggerFactory.getLogger(DeletePDFPages.class);

   public static void main(String[] args) {
       try {
           // Initial setup, create credentials instance.
           Credentials credentials = Credentials.servicePrincipalCredentialsBuilder()
                .withClientId("PDF_SERVICES_CLIENT_ID")
                .withClientSecret("PDF_SERVICES_CLIENT_SECRET")
                .build();

           // Create an ExecutionContext using credentials and create a new operation instance.
           ExecutionContext executionContext = ExecutionContext.create(credentials);
           DeletePagesOperation deletePagesOperation = DeletePagesOperation.createNew();

           // Set operation input from a source file.
           FileRef source = FileRef.createFromLocalFile("src/main/resources/deletePagesInput.pdf");
           deletePagesOperation.setInput(source);

           // Delete pages of the document (as specified by PageRanges).
           PageRanges pageRangeForDeletion = getPageRangeForDeletion();
           deletePagesOperation.setPageRanges(pageRangeForDeletion);

           // Execute the operation.
           FileRef result = deletePagesOperation.execute(executionContext);

           // Save the result to the specified location.
           result.saveAs("output/deletePagesOutput.pdf");

       } catch (IOException | ServiceApiException | SdkException | ServiceUsageException e) {
           LOGGER.error("Exception encountered while executing operation", e);
       }
   }

   private static PageRanges getPageRangeForDeletion() {
       // Specify pages for deletion.
       PageRanges pageRangeForDeletion = new PageRanges();
       // Add page 1.
       pageRangeForDeletion.addSinglePage(1);

       // Add pages 3 to 4.
       pageRangeForDeletion.addRange(3, 4);
       return pageRangeForDeletion;
   }
 }
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd DeletePDFPages/
// dotnet run DeletePDFPages.csproj

    namespace DeletePDFPages
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
                  DeletePagesOperation deletePagesOperation = DeletePagesOperation.CreateNew();
   
                  // Set operation input from a source file.
                  FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"deletePagesInput.pdf");
                  deletePagesOperation.SetInput(sourceFileRef);
   
                  // Delete pages of the document (as specified by PageRanges).
                  PageRanges pageRangeForDeletion = GetPageRangeForDeletion();
                  deletePagesOperation.SetPageRanges(pageRangeForDeletion);
   
                  // Execute the operation.
                  FileRef result = deletePagesOperation.Execute(executionContext);
   
                  // Save the result to the specified location.
                  result.SaveAs(Directory.GetCurrentDirectory() + "/output/deletePagesOutput.pdf");
              }
              catch (ServiceUsageException ex)
              {
                  log.Error("Exception encountered while executing operation", ex);
              }
              // Catch more errors here . . .
          }
   
          private static PageRanges GetPageRangeForDeletion()
          {
              // Specify pages for deletion.
              PageRanges pageRangeForDeletion = new PageRanges();
              // Add page 1.
              pageRangeForDeletion.AddSinglePage(1);
   
              // Add pages 3 to 4.
              pageRangeForDeletion.AddRange(3, 4);
              return pageRangeForDeletion;
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
// node src/replacepages/replace-pdf-pages.js

 const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');

 const getPageRangesForDeletion = () => {
   // Specify pages for deletion.
   const pageRangesForDeletion = new PDFServicesSdk.PageRanges();
   // Add page 1.
   pageRangesForDeletion.addSinglePage(1);

   // Add pages 3 to 4.
   pageRangesForDeletion.addPageRange(3, 4);
   return pageRangesForDeletion;
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
       deletePagesOperation = PDFServicesSdk.DeletePages.Operation.createNew();

   // Set operation input from a source file.
   const input = PDFServicesSdk.FileRef.createFromLocalFile('resources/deletePagesInput.pdf');
   deletePagesOperation.setInput(input);

   // Delete pages of the document (as specified by PageRanges).
   const pageRangesForDeletion = getPageRangesForDeletion();
   deletePagesOperation.setPageRanges(pageRangesForDeletion);

   // Execute the operation and Save the result to the specified location.
   deletePagesOperation.execute(executionContext)
       .then(result => result.saveAsFile('output/deletePagesOutput.pdf'))
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
// Please refer our Rest API docs for more information 
// https://developer.adobe.com/document-services/docs/apis/#tag/Page-Manipulation

curl --location --request POST 'https://pdf-services.adobe.io/operation/pagemanipulation' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718",
    "pageActions": [
        {
            "delete": {
                "pageRanges": [
                    {
                        "start": 1,
                        "end": 2
                    }
                ]
            }
        }
    ]
}'

// Legacy API can be found here 
// https://documentcloud.adobe.com/document-services/index.html#post-pageManipulation
```
