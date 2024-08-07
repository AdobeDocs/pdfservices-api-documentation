---
title: Compress PDF | How Tos | PDF Services API | Adobe PDF Services
---
# Compress PDFs

Reduce the size of PDF files by compressing to smaller sizes for lower bandwidth viewing, downloading, and sharing.

Support for multiple compression levels to retain the quality of images and graphics

## Rest API

See our public API Reference for [Compress PDF](../../../apis/#tag/Compress-PDF)

## Compress PDFs

Compress PDFs to reduce the file size prior to performing workflow
operations that use bandwidth or memory.

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" />

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.compresspdf.CompressPDF
 
   public class CompressPDF {
     // Initialize the logger.
     private static final Logger LOGGER = LoggerFactory.getLogger(CompressPDF.class);
  
     public static void main(String[] args) {
  
         try {
             // Initial setup, create credentials instance.
            Credentials credentials = Credentials.servicePrincipalCredentialsBuilder()
                .withClientId("PDF_SERVICES_CLIENT_ID")
                .withClientSecret("PDF_SERVICES_CLIENT_SECRET")
                .build();
  
             // Create an ExecutionContext using credentials and create a new operation instance.
             ExecutionContext executionContext = ExecutionContext.create(credentials);
             CompressPDFOperation compressPDFOperation = CompressPDFOperation.createNew();
  
             // Set operation input from a source file.
             FileRef source = FileRef.createFromLocalFile("src/main/resources/compressPDFInput.pdf");
             compressPDFOperation.setInput(source);
  
             // Execute the operation
             FileRef result = compressPDFOperation.execute(executionContext);
  
             // Save the result at the specified location
             result.saveAs("output/compressPDFOutput.pdf");
  
         } catch (ServiceApiException | IOException | SdkException | ServiceUsageException ex) {
             LOGGER.error("Exception encountered while executing operation", ex);
         }
     }
   }
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd CompressPDF/
// dotnet run CompressPDF.csproj

 namespace CompressPDF
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
               
               // Create an ExecutionContext using credentials and create a new operation instance.
               ExecutionContext executionContext = ExecutionContext.Create(credentials);
               CompressPDFOperation compressPDFOperation = CompressPDFOperation.CreateNew();

               // Set operation input from a source file.
               FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"compressPDFInput.pdf");
               compressPDFOperation.SetInput(sourceFileRef);

               // Execute the operation.
               FileRef result = compressPDFOperation.Execute(executionContext);

               // Save the result to the specified location.
               result.SaveAs(Directory.GetCurrentDirectory() + "/output/compressPDFOutput.pdf");
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
// node src/compresspdf/compress-pdf.js

   const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
  
   try {
     // Initial setup, create credentials instance.
       const credentials =  PDFServicesSdk.Credentials
           .servicePrincipalCredentialsBuilder()
           .withClientId("PDF_SERVICES_CLIENT_ID")
           .withClientSecret("PDF_SERVICES_CLIENT_SECRET")
           .build();
  
     // Create an ExecutionContext using credentials and create a new operation instance.
     const executionContext = PDFServicesSdk.ExecutionContext.create(credentials),
         compressPDF = PDFServicesSdk.CompressPDF,
         compressPDFOperation = compressPDF.Operation.createNew();
  
     // Set operation input from a source file.
     const input = PDFServicesSdk.FileRef.createFromLocalFile('resources/compressPDFInput.pdf');
     compressPDFOperation.setInput(input);
  
     // Execute the operation and Save the result to the specified location.
     compressPDFOperation.execute(executionContext)
         .then(result => result.saveAsFile('output/compressPDFOutput.pdf'))
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
// https://developer.adobe.com/document-services/docs/apis/#tag/Compress-PDF

curl --location --request POST 'https://pdf-services.adobe.io/operation/compresspdf' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718"
}'

// Legacy API can be found here 
// https://documentcloud.adobe.com/document-services/index.html#post-compressPDF
```

## Compress PDFs with Compression Level

Compress PDFs to reduce the file size on the basis of provided
compression level, prior to performing workflow operations that use
bandwidth or memory. Refer to `CompressionLevel` in the API docs for a
list of supported compression levels.

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.compresspdf.CompressPDFWithOptions
 
    public class CompressPDFWithOptions {
      // Initialize the logger.
      private static final Logger LOGGER = LoggerFactory.getLogger(CompressPDFWithOptions.class);
   
      public static void main(String[] args) {
   
          try {
              // Initial setup, create credentials instance.
            Credentials credentials = Credentials.servicePrincipalCredentialsBuilder()
                .withClientId("PDF_SERVICES_CLIENT_ID")
                .withClientSecret("PDF_SERVICES_CLIENT_SECRET")
                .build();
   
              // Create an ExecutionContext using credentials and create a new operation instance.
              ExecutionContext executionContext = ExecutionContext.create(credentials);
              CompressPDFOperation compressPDFOperation = CompressPDFOperation.createNew();
   
              // Set operation input from a source file.
              FileRef source = FileRef.createFromLocalFile("src/main/resources/compressPDFInput.pdf");
              compressPDFOperation.setInput(source);
   
              // Build CompressPDF options from supported compression levels and set them into the operation
              CompressPDFOptions compressPDFOptions = CompressPDFOptions.compressPDFOptionsBuilder()
                      .withCompressionLevel(CompressionLevel.LOW)
                      .build();
              compressPDFOperation.setOptions(compressPDFOptions);
   
              // Execute the operation
              FileRef result = compressPDFOperation.execute(executionContext);
   
              // Save the result at the specified location
              result.saveAs("output/compressPDFWithOptionsOutput.pdf");
   
          } catch (ServiceApiException | IOException | SdkException | ServiceUsageException ex) {
              LOGGER.error("Exception encountered while executing operation", ex);
          }
      }
    }
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd CompressPDF/
// dotnet run CompressPDFWithOptions.csproj

  namespace CompressPDFWithOptions
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
 
                // Create an ExecutionContext using credentials and create a new operation instance.
                ExecutionContext executionContext = ExecutionContext.Create(credentials);
                CompressPDFOperation compressPDFOperation = CompressPDFOperation.CreateNew();
 
                // Set operation input from a source file.
                FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"compressPDFInput.pdf");
                compressPDFOperation.SetInput(sourceFileRef);
 
                // Build CompressPDF options from supported compression levels and set them into the operation
                CompressPDFOptions compressPDFOptions = CompressPDFOptions.CompressPDFOptionsBuilder()
                        .WithCompressionLevel(CompressionLevel.LOW)
                        .Build();
                compressPDFOperation.SetOptions(compressPDFOptions);
 
                // Execute the operation.
                FileRef result = compressPDFOperation.Execute(executionContext);
 
                // Save the result to the specified location.
                result.SaveAs(Directory.GetCurrentDirectory() + "/output/compressPDFWithOptionsOutput.pdf");
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
// node src/compresspdf/compress-pdf-with-options.js

 const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');

 try {
   // Initial setup, create credentials instance.
     const credentials =  PDFServicesSdk.Credentials
         .servicePrincipalCredentialsBuilder()
         .withClientId("PDF_SERVICES_CLIENT_ID")
         .withClientSecret("PDF_SERVICES_CLIENT_SECRET")
         .build();

   // Create an ExecutionContext using credentials and create a new operation instance.
   const executionContext = PDFServicesSdk.ExecutionContext.create(credentials),
       compressPDF = PDFServicesSdk.CompressPDF,
       compressPDFOperation = compressPDF.Operation.createNew();

   // Set operation input from a source file.
   const input = PDFServicesSdk.FileRef.createFromLocalFile('resources/compressPDFInput.pdf');
   compressPDFOperation.setInput(input);

   // Provide any custom configuration options for the operation.
   const options = new compressPDF.options.CompressPDFOptions.Builder()
       .withCompressionLevel(PDFServicesSdk.CompressPDF.options.CompressionLevel.MEDIUM)
       .build();
   compressPDFOperation.setOptions(options);

   // Execute the operation and Save the result to the specified location.
   compressPDFOperation.execute(executionContext)
       .then(result => result.saveAsFile('output/compressPDFWithOptionsOutput.pdf'))
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
// https://developer.adobe.com/document-services/docs/apis/#tag/Compress-PDF

curl --location --request POST 'https://pdf-services.adobe.io/operation/compresspdf' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718",
    "compressionLevel": "MEDIUM"
}'

// Legacy API can be found here 
// https://documentcloud.adobe.com/document-services/index.html#post-compressPDF
```
