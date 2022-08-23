---
title: Document Services APIs | How Tos | Export PDF
---
# Export PDF

Export a source PDF file into doc, docx, jpeg, png, pptx, rtf, xlsx.

## Rest API 

See our public API Reference for : 
- [Export PDF to Office format or text files](../../../apis/#tag/exportpdf).
- [Export PDF to Images](../../../apis/#tag/pdftoimages).

## Export a PDF

The sample below converts a PDF file into a number of [supported
formats](https://opensource.adobe.com/pdfservices-java-sdk-samples/apidocs/latest/com/adobe/pdfservices/operation/pdfops/options/exportpdf/ExportPDFTargetFormat.html)
such as:

-   Microsoft Office file formats
-   Text files

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
       Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
           .fromFile("pdfservices-api-credentials.json")
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
          Credentials credentials = Credentials.ServiceAccountCredentialsBuilder()
                  .FromFile(Directory.GetCurrentDirectory() + "/pdfservices-api-credentials.json")
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
       .serviceAccountCredentialsBuilder()
       .fromFile("pdfservices-api-credentials.json")
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
curl --location --request POST 'https://pdf-services.adobe.io/operation/exportpdf' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "ce8fe9da-99f2-4d01-999e-42b9ce22ec5f",
    "targetFormat": "docx"
}'
```

## Export a PDF to images

The sample below converts a PDF file to one or more jpeg or png images.
Exporting to an image produces a zip archive containing one image per
page. Each image file name ends with
"\_\<unpadded\_page\_index\_number\>". For example, a PDF file with 15
pages will generate 15 image files. The first file's name ends with
"\_1" and the last file's name ends with "\_15".

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.exportpdf.ExportPDFToJPEG

 public class ExportPDFToJPEG {

   // Initialize the logger.
   private static final Logger LOGGER = LoggerFactory.getLogger(ExportPDFToJPEG.class);

   public static void main(String[] args) {
     try {

       // Initial setup, create credentials instance.
       Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
           .fromFile("pdfservices-api-credentials.json")
           .build();

       //Create an ExecutionContext using credentials and create a new operation instance.
       ExecutionContext executionContext = ExecutionContext.create(credentials);
       ExportPDFOperation exportPdfOperation = ExportPDFOperation.createNew(ExportPDFTargetFormat.JPEG);

       // Set operation input from a source file.
       FileRef sourceFileRef = FileRef.createFromLocalFile("src/main/resources/exportPDFToImageInput.pdf");
       exportPdfOperation.setInput(sourceFileRef);

       // Execute the operation.
       FileRef result = exportPdfOperation.execute(executionContext);

       // Save the result to the specified location.
       result.saveAs("output/exportPDFToJPEG.zip");

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
// cd ExportPDFToImage/
// dotnet run ExportPDFToImage.csproj

 namespace ExportPDFToImage
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
          ExportPDFOperation exportPdfOperation = ExportPDFOperation.CreateNew(ExportPDFTargetFormat.JPEG);
 
          // Set operation input from a source file.
          FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"exportPdfToImageInput.pdf");
          exportPdfOperation.SetInput(sourceFileRef);
 
          // Execute the operation.
          FileRef result = exportPdfOperation.Execute(executionContext);
 
          // Save the result to the specified location.
          result.SaveAs(Directory.GetCurrentDirectory() + "/output/exportPdfToImageOutput.zip");
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
// node src/exportpdf/export-pdf-to-jpeg.js

 const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');

 try {
   // Initial setup, create credentials instance.
   const credentials =  PDFServicesSdk.Credentials
       .serviceAccountCredentialsBuilder()
       .fromFile("pdfservices-api-credentials.json")
       .build();

   //Create an ExecutionContext using credentials and create a new operation instance.
   const executionContext = PDFServicesSdk.ExecutionContext.create(credentials),
       exportPDF = PDFServicesSdk.ExportPDF,
       exportPdfOperation = exportPDF.Operation.createNew(exportPDF.SupportedTargetFormats.JPEG);

   // Set operation input from a source file
   const input = PDFServicesSdk.FileRef.createFromLocalFile('resources/exportPDFToImageInput.pdf');
   exportPdfOperation.setInput(input);

   // Execute the operation and Save the result to the specified location.
   exportPdfOperation.execute(executionContext)
       .then(result => result.saveAsFile('output/exportPDFToJPEG.zip'))
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
curl --location --request POST 'https://pdf-services.adobe.io/operation/pdftoimages' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "ce8fe9da-99f2-4d01-999e-42b9ce22ec5f",
    "targetFormat": "jpeg",
    "outputType": "zipOfPageImages"
}'
```

## Export a PDF to list of images

The sample below converts a PDF file to one or more jpeg or png images.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.exportpdf.ExportPDFToJPEGList

  public class ExportPDFToJPEGList {

    // Initialize the logger.
    private static final Logger LOGGER = LoggerFactory.getLogger(ExportPDFToJPEG.class);

    public static void main(String[] args) {
      try {

        // Initial setup, create credentials instance.
        Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
            .fromFile("pdfservices-api-credentials.json")
            .build();

        //Create an ExecutionContext using credentials and create a new operation instance.
        ExecutionContext executionContext = ExecutionContext.create(credentials);
        ExportPDFToImagesOperation exportPDFToImagesOperation = ExportPDFToImagesOperation.createNew(ExportPDFToImagesTargetFormat.JPEG);

        // Set operation input from a source file.
        FileRef sourceFileRef = FileRef.createFromLocalFile("src/main/resources/exportPDFToImageInput.pdf");
        exportPDFToImagesOperation.setInput(sourceFileRef);

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
// cd ExportPDFToJPEGList/
// dotnet run ExportPDFToJPEGList.csproj

namespace
{
    class Program ExportPDFToJPEGList
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
                ExportPDFToImagesOperation exportPDFToImagesOperation = ExportPDFToImagesOperation.CreateNew(ExportPDFToImagesTargetFormat.JPEG);

                // Set operation input from a source file.
                FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"exportPDFToImagesInput.pdf");
                exportPDFToImagesOperation.SetInput(sourceFileRef);

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
// node src/exportpdf/export-pdf-to-jpeg-list.js

const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');

try {
    // Initial setup, create credentials instance.
    const credentials =  PDFServicesSdk.Credentials
        .serviceAccountCredentialsBuilder()
        .fromFile("pdfservices-api-credentials.json")
        .build();

    //Create an ExecutionContext using credentials and create a new operation instance.
    const executionContext = PDFServicesSdk.ExecutionContext.create(credentials),
        exportPDF = PDFServicesSdk.ExportPDF,
        exportPdfToImagesOperation = exportPDFToImages.Operation.createNew(exportPDFToImages.SupportedTargetFormats.JPEG);

    // Set operation input from a source file
    const input = PDFServicesSdk.FileRef.createFromLocalFile('resources/exportPDFToImageInput.pdf');
    exportPdfToImagesOperation.setInput(input);

    // Execute the operation and Save the result to the specified location.
    exportPdfToImagesOperation.execute(executionContext)
        .then(result => {
            let saveFilesPromises = [];
            for(let i = 0; i < result.length; i++){
                saveFilesPromises.push(result[i].saveAsFile(`output/exportPDFToJPEGOutput_${i}.jpeg`));
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
curl --location --request POST 'https://pdf-services.adobe.io/operation/pdftoimages' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "ce8fe9da-99f2-4d01-999e-42b9ce22ec5f",
    "targetFormat": "jpeg",
    "outputType": "listOfPageImages"
}'
```
