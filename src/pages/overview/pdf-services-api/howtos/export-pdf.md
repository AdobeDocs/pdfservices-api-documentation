---
title: Export PDF | How Tos | PDF Services API | Adobe PDF Services
---
# Export PDF

Export a source PDF file into doc, docx, jpeg, png, pptx, rtf, xlsx.

## Rest API 

See our public API Reference for : 
- [Export PDF to Office format or text files](../../../apis/#tag/Export-PDF)
- [Export PDF to Images](../../../apis/#tag/PDF-To-Images)

## Export a PDF

The sample below converts a PDF file into a number of [supported
formats](https://opensource.adobe.com/pdfservices-java-sdk-samples/apidocs/latest/com/adobe/pdfservices/operation/pdfops/options/exportpdf/ExportPDFTargetFormat.html)
such as:

-   Microsoft Office file formats
-   Text files

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.exportpdf.ExportPDFToDOCX

public class ExportPDFToDOCX {

   // Initialize the logger.
   private static final Logger LOGGER = LoggerFactory.getLogger(ExportPDFToDOCX.class);

   public static void main(String[] args) {

     try {
       // Initial setup, create credentials instance.
       Credentials credentials = Credentials.servicePrincipalCredentialsBuilder()
          .withClientId("PDF_SERVICES_CLIENT_ID")
          .withClientSecret("PDF_SERVICES_CLIENT_SECRET")
          .build();
       //Create an ExecutionContext using credentials and create a new operation instance.
       ExecutionContext executionContext = ExecutionContext.create(credentials);
       ExportPDFOperation exportPdfOperation = ExportPDFOperation.createNew(ExportPDFTargetFormat.DOCX);

       // Set operation input from a local PDF file
       FileRef sourceFileRef = FileRef.createFromLocalFile("src/main/resources/exportPDFInput.pdf");
       exportPdfOperation.setInput(sourceFileRef);

       // Execute the operation.
       FileRef result = exportPdfOperation.execute(executionContext);

       // Save the result to the specified location.
       result.saveAs("output/exportPdfOutput.docx");

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
// cd ExportPDFToDocx/
// dotnet run ExportPDFToDocx.csproj

 namespace ExportPDFToDocx
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
 
          //Create an ExecutionContext using credentials and create a new operation instance.
          ExecutionContext executionContext = ExecutionContext.Create(credentials);
          ExportPDFOperation exportPdfOperation = ExportPDFOperation.CreateNew(ExportPDFTargetFormat.DOCX);
 
          // Set operation input from a local PDF file
          FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"exportPdfInput.pdf");
          exportPdfOperation.SetInput(sourceFileRef);
 
          // Execute the operation.
          FileRef result = exportPdfOperation.Execute(executionContext);
 
          // Save the result to the specified location.
          result.SaveAs(Directory.GetCurrentDirectory() + "/output/exportPdfOutput.docx");
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
// node src/exportpdf/export-pdf-to-docx.js

const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');

 try {
   // Initial setup, create credentials instance.
     const credentials =  PDFServicesSdk.Credentials
         .servicePrincipalCredentialsBuilder()
         .withClientId("PDF_SERVICES_CLIENT_ID")
         .withClientSecret("PDF_SERVICES_CLIENT_SECRET")
         .build();

   //Create an ExecutionContext using credentials and create a new operation instance.
   const executionContext = PDFServicesSdk.ExecutionContext.create(credentials),
       exportPDF = PDFServicesSdk.ExportPDF,
       exportPdfOperation = exportPDF.Operation.createNew(exportPDF.SupportedTargetFormats.DOCX);

   // Set operation input from a source file
   const input = PDFServicesSdk.FileRef.createFromLocalFile('resources/exportPDFInput.pdf');
   exportPdfOperation.setInput(input);

   // Execute the operation and Save the result to the specified location.
   exportPdfOperation.execute(executionContext)
       .then(result => result.saveAsFile('output/exportPdfOutput.docx'))
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
// https://developer.adobe.com/document-services/docs/apis/#tag/Export-PDF

curl --location --request POST 'https://pdf-services.adobe.io/operation/exportpdf' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718",
    "targetFormat": "docx"
}'

// Legacy API can be found here 
// https://documentcloud.adobe.com/document-services/index.html#post-exportPDF
```

## Export a PDF file to a DOCX file (apply OCR on the PDF file)

The sample below converts a PDF file into a number of [supported
formats](https://opensource.adobe.com/pdfservices-java-sdk-samples/apidocs/latest/com/adobe/pdfservices/operation/pdfops/options/exportpdf/ExportPDFTargetFormat.html)
such as:

-   Microsoft Office file formats
-   Text files

OCR processing is also performed on the input PDF file to extract text from images in the document.

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.exportpdf.ExportPDFToDOCXWithOCROption

public class ExportPDFToDOCXWithOCROption {

    // Initialize the logger.
    private static final Logger LOGGER = LoggerFactory.getLogger(ExportPDFToDOCXWithOCROption.class);

    public static void main(String[] args) {

        try {

            // Initial setup, create credentials instance.
            Credentials credentials = Credentials.servicePrincipalCredentialsBuilder()
                .withClientId("PDF_SERVICES_CLIENT_ID")
                .withClientSecret("PDF_SERVICES_CLIENT_SECRET")
                .build();
            //Create an ExecutionContext using credentials and create a new operation instance.
            ExecutionContext executionContext = ExecutionContext.create(credentials);
            ExportPDFOperation exportPDFOperation = ExportPDFOperation.createNew(ExportPDFTargetFormat.DOCX);

            // Set operation input from a source file.
            FileRef sourceFileRef = FileRef.createFromLocalFile("src/main/resources/exportPDFInput.pdf");
            exportPDFOperation.setInput(sourceFileRef);

            // Create a new ExportPDFOptions instance from the specified OCR locale and set it into the operation.
            ExportPDFOptions exportPDFOptions = new ExportPDFOptions(ExportOCRLocale.EN_US);
            exportPDFOperation.setOptions(exportPDFOptions);
            
            // Create a new ExportPDFOptions instance from the specified OCR locale and set it into the operation.
            ExportPDFOptions exportPDFOptions = new ExportPDFOptions(ExportOCRLocale.EN_US);
            exportPDFOperation.setOptions(exportPDFOptions);

            // Execute the operation.
            FileRef result = exportPDFOperation.execute(executionContext);

            // Save the result to the specified location.
            result.saveAs("output/exportPDFWithOCROptionsOutput.docx");

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
// cd ExportPDFToDocx/
// dotnet run ExportPDFToDocxWithOCROption.csproj

 namespace ExportPDFToDocxWithOCROption
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
 
          //Create an ExecutionContext using credentials and create a new operation instance.
          ExecutionContext executionContext = ExecutionContext.Create(credentials);
          ExportPDFOperation exportPdfOperation = ExportPDFOperation.CreateNew(ExportPDFTargetFormat.DOCX);
 
          // Set operation input from a local PDF file
          FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"exportPdfInput.pdf");
          exportPdfOperation.SetInput(sourceFileRef);

          // Create a new ExportPDFOptions instance from the specified OCR locale and set it into the operation.
          ExportPDFOptions exportPdfOptions = new ExportPDFOptions(ExportOCRLocale.EN_US);
          exportPdfOperation.SetOptions(exportPdfOptions);
 
          // Execute the operation.
          FileRef result = exportPdfOperation.Execute(executionContext);
 
          // Save the result to the specified location.
          result.SaveAs(Directory.GetCurrentDirectory() + "/output/ExportPDFToDOCXWithOCROption.docx");
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
// node src/exportpdf/export-docx-to-pdf-with-ocr-options.js

const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');

 try {
   // Initial setup, create credentials instance.
     const credentials =  PDFServicesSdk.Credentials
         .servicePrincipalCredentialsBuilder()
         .withClientId("PDF_SERVICES_CLIENT_ID")
         .withClientSecret("PDF_SERVICES_CLIENT_SECRET")
         .build();

   //Create an ExecutionContext using credentials and create a new operation instance.
   const executionContext = PDFServicesSdk.ExecutionContext.create(credentials),
       exportPDF = PDFServicesSdk.ExportPDF,
       exportPdfOperation = exportPDF.Operation.createNew(exportPDF.SupportedTargetFormats.DOCX);

   // Set operation input from a source file
   const input = PDFServicesSdk.FileRef.createFromLocalFile('resources/exportPDFInput.pdf');
   exportPdfOperation.setInput(input);

   // Create a new ExportPDFOptions instance from the specified OCR locale and set it into the operation.
   const options = new exportPDF.options.ExportPDFOptions(exportPDF.options.ExportPDFOptions.OCRSupportedLocale.EN_US);
   exportPdfOperation.setOptions(options);
   
   // Execute the operation and Save the result to the specified location.
   exportPdfOperation.execute(executionContext)
       .then(result => result.saveAsFile('output/exportPdfWithOCROptionsOutput.docx'))
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
// https://developer.adobe.com/document-services/docs/apis/#tag/Export-PDF

curl --location --request POST 'https://pdf-services.adobe.io/operation/exportpdf' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718",
    "targetFormat": "docx",
    "ocrLang": "en-US"
}'

// Legacy API can be found here 
// https://documentcloud.adobe.com/document-services/index.html#post-exportPDF
```

## Export a PDF to images

The sample below converts a PDF file's pages to a list of JPEG images. 
Each image file name ends with "\_\<unpadded\_page\_index\_number\>". For example, a PDF file with 15
pages will generate 15 image files. The first file's name ends with
"\_1" and the last file's name ends with "\_15".

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.exportpdftoimages.ExportPDFToJPEG

 public class ExportPDFToJPEG {

   // Initialize the logger.
   private static final Logger LOGGER = LoggerFactory.getLogger(ExportPDFToJPEG.class);

   public static void main(String[] args) {
     try {

       // Initial setup, create credentials instance.
       Credentials credentials = Credentials.servicePrincipalCredentialsBuilder()
          .withClientId("PDF_SERVICES_CLIENT_ID")
          .withClientSecret("PDF_SERVICES_CLIENT_SECRET")
          .build();

       // Create an ExecutionContext using credentials and create a new operation instance.
       ExecutionContext executionContext = ExecutionContext.create(credentials);
       ExportPDFOperation exportPdfOperation = ExportPDFOperation.createNew(ExportPDFTargetFormat.JPEG);

       // Set operation input from a source file.
       FileRef sourceFileRef = FileRef.createFromLocalFile("src/main/resources/exportPDFToImageInput.pdf");
       exportPdfOperation.setInput(sourceFileRef);

       // Execute the operation.
       List<FileRef> results = exportPDFToImagesOperation.execute(executionContext);

       // Save the result to the specified location.
       int index = 0;
       for(FileRef result : results) {
           result.saveAs("output/exportPDFToImagesOutput_" + index + ".jpeg");
           index++;
       }

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
// cd ExportPDFToJPEG/
// dotnet run ExportPDFToJPEG.csproj

 namespace ExportPDFToJPEG
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
 
          //Create an ExecutionContext using credentials and create a new operation instance.
          ExecutionContext executionContext = ExecutionContext.Create(credentials);
          ExportPDFOperation exportPdfOperation = ExportPDFOperation.CreateNew(ExportPDFTargetFormat.JPEG);
 
          // Set operation input from a source file.
          FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"exportPdfToImageInput.pdf");
          exportPdfOperation.SetInput(sourceFileRef);
 
          // Execute the operation.
          List<FileRef> result = exportPDFToImagesOperation.Execute(executionContext);  
 
          // Save the result to the specified location.
          int index = 0;
          foreach (FileRef fileRef in result)
            {
                fileRef.SaveAs(Directory.GetCurrentDirectory() + "/output/exportPDFToImagesOutput_" + index + ".jpeg");
                index++;
            }
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
// node src/exportpdftoimages/export-pdf-to-jpeg.js

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
        exportPDFToImages = PDFServicesSdk.ExportPDFToImages,
        exportPDFToImagesOperation = exportPDFToImages.Operation.createNew(exportPDFToImages.SupportedTargetFormats.JPEG);

    // Set operation input from a source file.
    const input = PDFServicesSdk.FileRef.createFromLocalFile('resources/exportPDFToImageInput.pdf');
    exportPDFToImagesOperation.setInput(input);

    // Execute the operation and Save the result to the specified location.
    exportPDFToImagesOperation.execute(executionContext)
        .then(result => {
            let saveFilesPromises = [];
            for(let i = 0; i < result.length; i++){
                saveFilesPromises.push(result[i].saveAsFile(`output/exportPDFToImagesOutput_${i}.jpeg`));
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
// https://developer.adobe.com/document-services/docs/apis/#tag/PDF-To-Images

curl --location --request POST 'https://pdf-services.adobe.io/operation/pdftoimages' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718",
    "targetFormat": "jpeg",
    "outputType": "listOfPageImages"
}'

// Legacy API can be found here 
// https://documentcloud.adobe.com/document-services/index.html#post-exportPDF
```

## Export a PDF to zip of page images

The sample below converts a PDF file to one or more jpeg or png images. The resulting file is a ZIP archive containing one image per page of the source PDF file.

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.exportpdftoimages.ExportPDFToJPEGZip

  public class ExportPDFToJPEGZip {

    // Initialize the logger.
    private static final Logger LOGGER = LoggerFactory.getLogger(ExportPDFToJPEGZip.class);

    public static void main(String[] args) {
      try {

        // Initial setup, create credentials instance.
       Credentials credentials = Credentials.servicePrincipalCredentialsBuilder()
          .withClientId("PDF_SERVICES_CLIENT_ID")
          .withClientSecret("PDF_SERVICES_CLIENT_SECRET")
          .build();

        //Create an ExecutionContext using credentials and create a new operation instance.
        ExecutionContext executionContext = ExecutionContext.create(credentials);
        ExportPDFToImagesOperation exportPDFToImagesOperation = ExportPDFToImagesOperation.createNew(ExportPDFToImagesTargetFormat.JPEG);

        // Set operation input from a source file.
        FileRef sourceFileRef = FileRef.createFromLocalFile("src/main/resources/exportPDFToImageInput.pdf");
        exportPDFToImagesOperation.setInput(sourceFileRef);
        
        // Set the output type to create zip of images.
        exportPDFToImagesOperation.setOutputType(OutputType.ZIP_OF_PAGE_IMAGES);

        // Execute the operation.
        List<FileRef> results = exportPDFToImagesOperation.execute(executionContext);

        // Save the result to the specified location.
        results.get(0).saveAs("output/exportPDFToJPEGOutput.zip");
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
// cd ExportPDFToJPEGZip/
// dotnet run ExportPDFToJPEGZip.csproj

namespace
{
    class Program ExportPDFToJPEGZip
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

                //Create an ExecutionContext using credentials and create a new operation instance.
                ExecutionContext executionContext = ExecutionContext.Create(credentials);
                ExportPDFToImagesOperation exportPDFToImagesOperation = ExportPDFToImagesOperation.CreateNew(ExportPDFToImagesTargetFormat.JPEG);

                // Set operation input from a source file.
                FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"exportPDFToImagesInput.pdf");
                exportPDFToImagesOperation.SetInput(sourceFileRef);

                // Set the output type to create zip of images.
                exportPDFToImagesOperation.SetOutputType(ExportPDFToImagesOutputType.ZIP_OF_IMAGES);

                // Execute the operation.
                List<FileRef> result = exportPDFToImagesOperation.Execute(executionContext);

                // Save the result to the specified location.
                results[0].SaveAs(Directory.GetCurrentDirectory() + "/output/exportPDFToJPEGOutput.zip");
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
// node src/exportpdftoimages/export-pdf-to-jpeg-zip.js

const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');

try {
    // Initial setup, create credentials instance.
    const credentials =  PDFServicesSdk.Credentials
        .servicePrincipalCredentialsBuilder()
        .withClientId("PDF_SERVICES_CLIENT_ID")
        .withClientSecret("PDF_SERVICES_CLIENT_SECRET")
        .build();

    //Create an ExecutionContext using credentials and create a new operation instance.
    const executionContext = PDFServicesSdk.ExecutionContext.create(credentials),
        exportPDF = PDFServicesSdk.ExportPDF,
        exportPdfToImagesOperation = exportPDFToImages.Operation.createNew(exportPDFToImages.SupportedTargetFormats.JPEG);

    // Set the output type to create zip of images.
    exportPDFToImagesOperation.setOutputType(exportPDFToImages.OutputType.ZIP_OF_PAGE_IMAGES);

    // Set operation input from a source file
    const input = PDFServicesSdk.FileRef.createFromLocalFile('resources/exportPDFToImageInput.pdf');
    exportPdfToImagesOperation.setInput(input);

    // Execute the operation and Save the result to the specified location.
    exportPdfToImagesOperation.execute(executionContext)
        .then(result => result[0].saveAsFile('output/exportPDFToJPEG.zip'))
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
// https://developer.adobe.com/document-services/docs/apis/#tag/PDF-To-Images

curl --location --request POST 'https://pdf-services.adobe.io/operation/pdftoimages' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718",
    "targetFormat": "jpeg",
    "outputType": "zipOfPageImages"
}'

// Legacy API can be found here 
// https://documentcloud.adobe.com/document-services/index.html#post-exportPDF
```
