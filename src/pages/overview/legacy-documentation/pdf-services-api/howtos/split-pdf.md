---
title: Split PDF | How Tos | PDF Services API | Adobe PDF Services
---
# Split PDF

Split a PDF document into multiple smaller documents by simply specifying either the number of files, pages per file, or page ranges.

## Rest API 

See our public API Reference for [Split PDF](../../../apis/#tag/Split-PDF).

## Split PDF by number of pages

This operation splits a PDF into multiple smaller documents. Simply use
the page count to specify the maximum number of pages of each output
file.

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.splitpdf.SplitPDFByNumberOfPages
 
   public class SplitPDFByNumberOfPages {
  
     // Initialize the logger.
     private static final Logger LOGGER = LoggerFactory.getLogger(SplitPDFByNumberOfPages.class);
  
     public static void main(String[] args) {
         try {
             // Initial setup, create credentials instance.
             Credentials credentials = Credentials.servicePrincipalCredentialsBuilder()
                    .withClientId("PDF_SERVICES_CLIENT_ID")
                    .withClientSecret("PDF_SERVICES_CLIENT_SECRET")
                    .build();
  
             // Create an ExecutionContext using credentials and create a new operation instance.
             ExecutionContext executionContext = ExecutionContext.create(credentials);
             SplitPDFOperation splitPDFOperation = SplitPDFOperation.createNew();
  
             // Set operation input from a source file.
             FileRef source = FileRef.createFromLocalFile("src/main/resources/splitPDFInput.pdf");
             splitPDFOperation.setInput(source);
  
             // Set the maximum number of pages each of the output files can have.
             splitPDFOperation.setPageCount(2);
  
             // Execute the operation.
             List result = splitPDFOperation.execute(executionContext);
  
             // Save the result to the specified location.
             int index = 0;
             for (FileRef fileRef : result) {
                 fileRef.saveAs("output/SplitPDFByNumberOfPagesOutput_" + index + ".pdf");
                 index++;
             }
  
         } catch (IOException| ServiceApiException | SdkException | ServiceUsageException e) {
             LOGGER.error("Exception encountered while executing operation", e);
         }
     }
  
   }
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd SplitPDFByNumberOfPages/
// dotnet run SplitPDFByNumberOfPages.csproj

   namespace SplitPDFByNumberOfPages
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
                 Credentials credentials = Credentials.ServicePrincipalCredentialsBuilder()
                        .WithClientId("PDF_SERVICES_CLIENT_ID")
                        .WithClientSecret("PDF_SERVICES_CLIENT_SECRET")
                        .Build();
  
                 // Create an ExecutionContext using credentials.
                 ExecutionContext executionContext = ExecutionContext.Create(credentials);
  
                 // Create a new operation instance
                 SplitPDFOperation splitPDFOperation = SplitPDFOperation.CreateNew();
  
                 // Set operation input from a source file.
                 FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"splitPDFInput.pdf");
                 splitPDFOperation.SetInput(sourceFileRef);
  
                 // Set the maximum number of pages each of the output files can have.
                 splitPDFOperation.SetPageCount(2);
  
                 // Execute the operation.
                 List result = splitPDFOperation.Execute(executionContext);
  
                 // Save the result to the specified location.
                 int index = 0;
                 foreach (FileRef fileRef in result)
                 {
                     fileRef.SaveAs(Directory.GetCurrentDirectory() + "/output/SplitPDFByNumberOfPagesOutput_" + index + ".pdf");
                     index++;
                 }
  
             }
             catch (ServiceUsageException ex)
             {
                 log.Error("Exception encountered while executing operation", ex);
             }
             // Catch more errors here . . .
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
// node src/splitpdf/split-pdf-by-number-of-pages.js

 const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');

 try {
   // Initial setup, create credentials instance.
     const credentials =  PDFServicesSdk.Credentials
         .servicePrincipalCredentialsBuilder()
         .withClientId("PDF_SERVICES_CLIENT_ID")
         .withClientSecret("PDF_SERVICES_CLIENT_SECRET")
         .build();

   // Create an ExecutionContext using credentials
   const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);

   // Create a new operation instance.
   const splitPDFOperation = PDFServicesSdk.SplitPDF.Operation.createNew(),
       input = PDFServicesSdk.FileRef.createFromLocalFile(
           'resources/splitPDFInput.pdf',
           PDFServicesSdk.SplitPDF.SupportedSourceFormat.pdf
       );
   // Set operation input from a source file.
   splitPDFOperation.setInput(input);

   // Set the maximum number of pages each of the output files can have.
   splitPDFOperation.setPageCount(2);

   // Execute the operation and Save the result to the specified location.
   splitPDFOperation.execute(executionContext)
       .then(result => {
           let saveFilesPromises = [];
           for(let i = 0; i < result.length; i++){
               saveFilesPromises.push(result[i].saveAsFile(`output/SplitPDFByNumberOfPagesOutput_${i}.pdf`));
           }
           return Promise.all(saveFilesPromises);
       })
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
// https://developer.adobe.com/document-services/docs/apis/#tag/Split-PDF

curl --location --request POST 'https://pdf-services.adobe.io/operation/splitpdf' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718",
    "splitoption": {
        "pageCount": 9
    }
}'

// Legacy API can be found here 
// https://documentcloud.adobe.com/document-services/index.html#post-splitPDF
```

## Split PDF by page ranges

As an alternative to creating smaller PDFs with a set number of pages,
you can split PDFs into multiple smaller documents by specifying page
ranges where each page range corresponds to a single output file.

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.splitpdf.SplitPDFByPageRanges
 
    public class SplitPDFByPageRanges {
   
      // Initialize the logger.
      private static final Logger LOGGER = LoggerFactory.getLogger(SplitPDFByPageRanges.class);
   
      public static void main(String[] args) {
          try {
              // Initial setup, create credentials instance.
              Credentials credentials = Credentials.servicePrincipalCredentialsBuilder()
                    .withClientId("PDF_SERVICES_CLIENT_ID")
                    .withClientSecret("PDF_SERVICES_CLIENT_SECRET")
                    .build();
   
              // Create an ExecutionContext using credentials and create a new operation instance.
              ExecutionContext executionContext = ExecutionContext.create(credentials);
              SplitPDFOperation splitPDFOperation = SplitPDFOperation.createNew();
   
              // Set operation input from a source file.
              FileRef source = FileRef.createFromLocalFile("src/main/resources/splitPDFInput.pdf");
              splitPDFOperation.setInput(source);
   
              // Set the page ranges where each page range corresponds to a single output file.
              PageRanges pageRanges = getPageRanges();
              splitPDFOperation.setPageRanges(pageRanges);
   
              // Execute the operation.
              List result = splitPDFOperation.execute(executionContext);
   
              // Save the result to the specified location.
              int index = 0;
              for (FileRef fileRef : result) {
                  fileRef.saveAs("output/SplitPDFByPageRangesOutput_" + index + ".pdf");
                  index++;
              }
   
          } catch (IOException | ServiceApiException | SdkException | ServiceUsageException e) {
              LOGGER.error("Exception encountered while executing operation", e);
          }
      }
   
      private static PageRanges getPageRanges() {
          // Specify page ranges.
          PageRanges pageRanges = new PageRanges();
          // Add page 1.
          pageRanges.addSinglePage(1);
   
          // Add pages 3 to 4.
          pageRanges.addRange(3, 4);
          return pageRanges;
      }
   
    }
      
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd SplitPDFByPageRanges/
// dotnet run SplitPDFByPageRanges.csproj

 namespace SplitPDFByPageRanges
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
                Credentials credentials = Credentials.ServicePrincipalCredentialsBuilder()
                        .WithClientId("PDF_SERVICES_CLIENT_ID")
                        .WithClientSecret("PDF_SERVICES_CLIENT_SECRET")
                        .Build();
 
                // Create an ExecutionContext using credentials.
                ExecutionContext executionContext = ExecutionContext.Create(credentials);
 
                // Create a new operation instance
                SplitPDFOperation splitPDFOperation = SplitPDFOperation.CreateNew();
 
                // Set operation input from a source file.
                FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"splitPDFInput.pdf");
                splitPDFOperation.SetInput(sourceFileRef);
 
                // Set the page ranges where each page range corresponds to a single output file.
                PageRanges pageRanges = GetPageRanges();
                splitPDFOperation.SetPageRanges(pageRanges);
 
                // Execute the operation.
                List result = splitPDFOperation.Execute(executionContext);
 
                // Save the result to the specified location.
                int index = 0;
                foreach (FileRef fileRef in result)
                {
                    fileRef.SaveAs(Directory.GetCurrentDirectory() + "/output/SplitPDFByPageRangesOutput_" + index + ".pdf");
                    index++;
                }
 
            }
            catch (ServiceUsageException ex)
            {
                log.Error("Exception encountered while executing operation", ex);
            }
            // Catch more errors here . . .
        }
 
        static void ConfigureLogging()
        {
            ILoggerRepository logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
            XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));
        }
 
        private static PageRanges GetPageRanges()
        {
            // Specify page ranges.
            PageRanges pageRanges = new PageRanges();
            // Add page 1.
            pageRanges.AddSinglePage(1);
 
            // Add pages 3 to 4.
            pageRanges.AddRange(3, 4);
            return pageRanges;
        }
    }
  }
```

#### Node JS

```javascript
// Get the samples from http://www.adobe.com/go/pdftoolsapi_node_sample
// Run the sample:
// node src/splitpdf/split-pdf-by-page-ranges.js

  const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');

  const getPageRanges = () => {
    // Specify pages ranges.
    const pageRanges = new PDFServicesSdk.PageRanges();
    // Add page 1.
    pageRanges.addSinglePage(1);
 
    // Add pages 3 to 4.
    pageRanges.addPageRange(3, 4);
    return pageRanges;
  };
  try {
    // Initial setup, create credentials instance.
      const credentials =  PDFServicesSdk.Credentials
          .servicePrincipalCredentialsBuilder()
          .withClientId("PDF_SERVICES_CLIENT_ID")
          .withClientSecret("PDF_SERVICES_CLIENT_SECRET")
          .build();
 
    // Create an ExecutionContext using credentials
    const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);
 
    // Create a new operation instance.
    const splitPDFOperation = PDFServicesSdk.SplitPDF.Operation.createNew(),
        input = PDFServicesSdk.FileRef.createFromLocalFile(
            'resources/splitPDFInput.pdf',
            PDFServicesSdk.SplitPDF.SupportedSourceFormat.pdf
        );
    // Set operation input from a source file.
    splitPDFOperation.setInput(input);
 
    // Set the page ranges where each page range corresponds to a single output file.
    const pageRanges = getPageRanges();
    splitPDFOperation.setPageRanges(pageRanges);
 
    // Execute the operation and Save the result to the specified location.
    splitPDFOperation.execute(executionContext)
        .then(result => {
            let saveFilesPromises = [];
            for(let i = 0; i < result.length; i++){
                saveFilesPromises.push(result[i].saveAsFile(`output/SplitPDFByPageRangesOutput_${i}.pdf`));
            }
            return Promise.all(saveFilesPromises);
        })
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
// https://developer.adobe.com/document-services/docs/apis/#tag/Split-PDF

curl --location --request POST 'https://pdf-services.adobe.io/operation/splitpdf' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718",
    "splitoption": {
        "pageRanges": [
            {
                "start": 2,
                "end": 4
            },
            {
                "start": 7,
                "end": 9
            }
        ]
    }
}'

// Legacy API can be found here 
// https://documentcloud.adobe.com/document-services/index.html#post-splitPDF
```

## Split PDF into number of files

As an alternative to creating smaller PDFs by specifying a set number of
pages or a page range, you can split PDFs by file count. In this case,
the operation creates the specified number of files with each containing
an identical number of pages (if possible).

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.splitpdf.SplitPDFIntoNumberOfFiles
 
     public class SplitPDFIntoNumberOfFiles {
    
       // Initialize the logger.
       private static final Logger LOGGER = LoggerFactory.getLogger(SplitPDFIntoNumberOfFiles.class);
    
       public static void main(String[] args) {
           try {
               // Initial setup, create credentials instance.
               Credentials credentials = Credentials.servicePrincipalCredentialsBuilder()
                    .withClientId("PDF_SERVICES_CLIENT_ID")
                    .withClientSecret("PDF_SERVICES_CLIENT_SECRET")
                    .build();
    
               // Create an ExecutionContext using credentials and create a new operation instance.
               ExecutionContext executionContext = ExecutionContext.create(credentials);
               SplitPDFOperation splitPDFOperation = SplitPDFOperation.createNew();
    
               // Set operation input from a source file.
               FileRef source = FileRef.createFromLocalFile("src/main/resources/splitPDFInput.pdf");
               splitPDFOperation.setInput(source);
    
               // Set the number of documents to split the input PDF file into.
               splitPDFOperation.setFileCount(2);
    
               // Execute the operation.
               List result = splitPDFOperation.execute(executionContext);
    
               // Save the result to the specified location.
               int index = 0;
               for (FileRef fileRef : result) {
                   fileRef.saveAs("output/SplitPDFIntoNumberOfFilesOutput_" + index + ".pdf");
                   index++;
               }
    
           } catch (IOException | ServiceApiException | SdkException | ServiceUsageException e) {
               LOGGER.error("Exception encountered while executing operation", e);
           }
       }
    
     }
      
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd SplitPDFIntoNumberOfFiles/
// dotnet run SplitPDFIntoNumberOfFiles.csproj

  namespace SplitPDFIntoNumberOfFiles
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
                Credentials credentials = Credentials.ServicePrincipalCredentialsBuilder()
                        .WithClientId("PDF_SERVICES_CLIENT_ID")
                        .WithClientSecret("PDF_SERVICES_CLIENT_SECRET")
                        .Build();
 
                // Create an ExecutionContext using credentials.
                ExecutionContext executionContext = ExecutionContext.Create(credentials);
 
                // Create a new operation instance
                SplitPDFOperation splitPDFOperation = SplitPDFOperation.CreateNew();
 
                // Set operation input from a source file.
                FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"splitPDFInput.pdf");
                splitPDFOperation.SetInput(sourceFileRef);
 
                // Set the number of documents to split the input PDF file into.
                splitPDFOperation.SetFileCount(2);
 
                // Execute the operation.
                List result = splitPDFOperation.Execute(executionContext);
 
                // Save the result to the specified location.
                int index = 0;
                foreach (FileRef fileRef in result)
                {
                    fileRef.SaveAs(Directory.GetCurrentDirectory() + "/output/SplitPDFIntoNumberOfFilesOutput_" + index + ".pdf");
                    index++;
                }
 
            }
            catch (ServiceUsageException ex)
            {
                log.Error("Exception encountered while executing operation", ex);
            }
             // Catch more errors here . . .
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
// node src/splitpdf/split-pdf-into-number-of-files.js

   const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
  
   try {
     // Initial setup, create credentials instance.
       const credentials =  PDFServicesSdk.Credentials
           .servicePrincipalCredentialsBuilder()
           .withClientId("PDF_SERVICES_CLIENT_ID")
           .withClientSecret("PDF_SERVICES_CLIENT_SECRET")
           .build();
  
     // Create an ExecutionContext using credentials
     const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);
  
     // Create a new operation instance.
     const splitPDFOperation = PDFServicesSdk.SplitPDF.Operation.createNew(),
         input = PDFServicesSdk.FileRef.createFromLocalFile(
             'resources/splitPDFInput.pdf',
             PDFServicesSdk.SplitPDF.SupportedSourceFormat.pdf
         );
     // Set operation input from a source file.
     splitPDFOperation.setInput(input);
  
     // Set the number of documents to split the input PDF file into.
     splitPDFOperation.setFileCount(2);
  
     // Execute the operation and Save the result to the specified location.
     splitPDFOperation.execute(executionContext)
         .then(result => {
             let saveFilesPromises = [];
             for(let i = 0; i < result.length; i++){
                 saveFilesPromises.push(result[i].saveAsFile(`output/SplitPDFIntoNumberOfFilesOutput_${i}.pdf`));
             }
             return Promise.all(saveFilesPromises);
         })
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
// https://developer.adobe.com/document-services/docs/apis/#tag/Split-PDF

curl --location --request POST 'https://pdf-services.adobe.io/operation/splitpdf' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718",
    "splitoption": {
        "fileCount": 3
    }
}'

// Legacy API can be found here 
// https://documentcloud.adobe.com/document-services/index.html#post-splitPDF
```
