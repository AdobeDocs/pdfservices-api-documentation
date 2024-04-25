---
title: OCR PDF | How Tos | PDF Services API | Adobe PDF Services
---
# OCR PDF

Use built-in optical character recognition (OCR) to convert images to text and enable fully text searchable documents for archiving and creation of searchable indexes.

## REST API 

See our public API Reference for [OCR PDF](../../../apis/#tag/OCR)

## Text recognition (OCR)

Optical character recognition (OCR) converts images to text so that you
and your users can fully interact with the PDF file. After performing
OCR, the PDF may be fully editable and searchable. The input format must
be `application/pdf`.

This sample defaults to the en-us locale. For other languages, see [OCR with specific language.](#ocr-with-specific-language)

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, REST API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.ocrpdf.OcrPDF
 
public class OcrPDF {
 
  // Initialize the logger.
  private static final Logger LOGGER = LoggerFactory.getLogger(OcrPDF.class);
 
  public static void main(String[] args) {
        try (InputStream inputStream = Files.newInputStream(new File("src/main/resources/ocrInput.pdf").toPath())) {
             // Initial setup, create credentials instance
            Credentials credentials = new ServicePrincipalCredentials(
                    System.getenv("PDF_SERVICES_CLIENT_ID"),
                    System.getenv("PDF_SERVICES_CLIENT_SECRET"));

            // Creates a PDF Services instance
            PDFServices pdfServices = new PDFServices(credentials);

            // Creates an asset(s) from source file(s) and upload
            Asset asset = pdfServices.upload(inputStream, PDFServicesMediaType.PDF.getMediaType());

            // Creates a new job instance
            OCRJob ocrJob = new OCRJob(asset);

            // Submit the job and gets the job result
            String location = pdfServices.submit(ocrJob);
            PDFServicesResponse<OCRResult> pdfServicesResponse = pdfServices.getJobResult(location, OCRResult.class);

            // Get content from the resulting asset(s)
            Asset resultAsset = pdfServicesResponse.getResult().getAsset();
            StreamAsset streamAsset = pdfServices.getContent(resultAsset);

            // Creates an output stream and copy stream asset's content to it
            Files.createDirectories(Paths.get("output/"));
            OutputStream outputStream = Files.newOutputStream(new File("output/ocrOutput.pdf").toPath());
            LOGGER.info("Saving asset at output/ocrOutput.pdf");
            IOUtils.copy(streamAsset.getInputStream(), outputStream); 
            outputStream.close();
       } catch (ServiceApiException | IOException | SDKException | ServiceUsageException ex) {
        LOGGER.error("Exception encountered while executing operation", ex);
       }
  }
}
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd OcrPDF/
// dotnet run OcrPDF.csproj

 namespace OcrPDF
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
         OCROperation ocrOperation = OCROperation.CreateNew();

         // Set operation input from a source file.
         FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"ocrInput.pdf");
         ocrOperation.SetInput(sourceFileRef);

         // Execute the operation.
         FileRef result = ocrOperation.Execute(executionContext);

         // Save the result to the specified location.
         result.SaveAs(Directory.GetCurrentDirectory() + "/output/ocrOperationOutput.pdf");
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
// node src/ocr/ocr-pdf.js

const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    OCRJob,
    OCRResult,
    SDKError,
    ServiceUsageError,
    ServiceApiError
} = require("@adobe/pdfservices-node-sdk");
const fs = require("fs");

(async () => {
    let readStream;
    try {
        // Initial setup, create credentials instance
        const credentials = new ServicePrincipalCredentials({
            clientId: process.env.PDF_SERVICES_CLIENT_ID,
            clientSecret: process.env.PDF_SERVICES_CLIENT_SECRET
        });

        // Creates a PDF Services instance
        const pdfServices = new PDFServices({credentials});

        // Creates an asset(s) from source file(s) and upload
        readStream = fs.createReadStream("./ocrInput.pdf");
        const inputAsset = await pdfServices.upload({
            readStream,
            mimeType: MimeType.PDF
        });

        // Creates a new job instance
        const job = new OCRJob({inputAsset});

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: OCRResult
        });

        // Get content from the resulting asset(s)
        const resultAsset = pdfServicesResponse.result.asset;
        const streamAsset = await pdfServices.getContent({asset: resultAsset});

        // Creates a write stream and copy stream asset's content to it
        const outputFilePath = "./ocrOutput.pdf";
        console.log(`Saving asset at ${outputFilePath}`);

        const writeStream = fs.createWriteStream(outputFilePath);
        streamAsset.readStream.pipe(writeStream);
    } catch (err) {
        if (err instanceof SDKError || err instanceof ServiceUsageError || err instanceof ServiceApiError) {
            console.log("Exception encountered while executing operation", err);
        } else {
            console.log("Exception encountered while executing operation", err);
        }
    } finally {
        readStream?.destroy();
    }
})();
```

#### REST API 

```javascript
// Please refer our REST API docs for more information 
// https://developer.adobe.com/document-services/docs/apis/#tag/Ocr

curl --location --request POST 'https://pdf-services.adobe.io/operation/ocr' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718"
}'
```

## OCR with specific language

You can perform OCR on files in other languages, including German,
French, Danish, and other languages. Refer to `OCRSupportedLocale` and
`OCRSupportedType` in the API docs for a list of supported OCR locales
and OCR types.

As shown in the OcrPDFWithOptions sample, when you make a PDF file
searchable, you specify both the locale (language) and the type. There
are two types which produce a different result:

-   One type ensures that text is searchable and selectable, but
    modifies the original image during the cleanup process (for example,
    deskews it) before placing an invisible text layer over it. This
    type removes unwanted artifacts and may result in a more readable
    document in some scenarios.
-   The second (EXACT) type, also overlays a searchable text layer over
    the original image, but in this case, the original image is
    unchanged. This type produces maximum fidelity to the original
    image.

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, REST API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java Dexec.mainClass=com.adobe.pdfservices.operation.samples.ocrpdf.OcrPDFWithOptions
 
  public class OcrPDFWithOptions {
    // Initialize the logger.
    private static final Logger LOGGER = LoggerFactory.getLogger(OcrPDFWithOptions.class);
 
    public static void main(String[] args) {
 
        try (InputStream inputStream = Files.newInputStream(new File("src/main/resources/ocrInput.pdf").toPath())) {
            // Initial setup, create credentials instance
            Credentials credentials = new ServicePrincipalCredentials(
                    System.getenv("PDF_SERVICES_CLIENT_ID"),
                    System.getenv("PDF_SERVICES_CLIENT_SECRET"));

            // Creates a PDF Services instance
            PDFServices pdfServices = new PDFServices(credentials);

            // Creates an asset(s) from source file(s) and upload
            Asset asset = pdfServices.upload(inputStream, PDFServicesMediaType.PDF.getMediaType());

            // Create parameters for the job
            OCRParams ocrParams = OCRParams.ocrParamsBuilder()
                    .withOCRLocale(OCRSupportedLocale.EN_US)
                    .withOCRType(OCRSupportedType.SEARCHABLE_IMAGE_EXACT)
                    .build();

            // Creates a new job instance
            OCRJob ocrJob = new OCRJob(asset).setParams(ocrParams);

            // Submit the job and gets the job result
            String location = pdfServices.submit(ocrJob);
            PDFServicesResponse<OCRResult> pdfServicesResponse = pdfServices.getJobResult(location, OCRResult.class);

            // Get content from the resulting asset(s)
            Asset resultAsset = pdfServicesResponse.getResult().getAsset();
            StreamAsset streamAsset = pdfServices.getContent(resultAsset);

            // Creates an output stream and copy stream asset's content to it
            Files.createDirectories(Paths.get("output/"));
            OutputStream outputStream = Files.newOutputStream(new File("output/ocrWithOptionsOutput.pdf").toPath());
            LOGGER.info("Saving asset at output/ocrWithOptionsOutput.pdf");
            IOUtils.copy(streamAsset.getInputStream(), outputStream); 
            outputStream.close();
        } catch (ServiceApiException | IOException | SDKException | ServiceUsageException ex) {
            LOGGER.error("Exception encountered while executing operation", ex);
        }
    }
  }
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd OcrPDFWithOptions
// dotnet run OcrPDFWithOptions.csproj

 namespace OcrPDFWithOptions
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
        OCROperation ocrOperation = OCROperation.CreateNew();
 
        // Set operation input from a source file.
        FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"ocrWithOptionsInput.pdf");
        ocrOperation.SetInput(sourceFileRef);
        // Build OCR options from supported locales and OCR-types and set them into the operation
        OCROptions ocrOptions = OCROptions.OCROptionsBuilder()
            .WithOcrLocale(OCRSupportedLocale.EN_US)
            .WithOcrType(OCRSupportedType.SEARCHABLE_IMAGE_EXACT)
            .Build();
        ocrOperation.SetOptions(ocrOptions);
 
        // Execute the operation.
        FileRef result = ocrOperation.Execute(executionContext);
 
        // Save the result to the specified location.
        result.SaveAs(Directory.GetCurrentDirectory() + "/output/ocrOperationWithOptionsOutput.pdf");
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
// node src/ocr/ocr-pdf-with-options.js

const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    OCRJob,
    OCRParams,
    OCRSupportedLocale,
    OCRSupportedType,
    OCRResult,
    SDKError,
    ServiceUsageError,
    ServiceApiError
} = require("@adobe/pdfservices-node-sdk");
const fs = require("fs");

(async () => {
    let readStream;
    try {
        // Initial setup, create credentials instance
        const credentials = new ServicePrincipalCredentials({
            clientId: process.env.PDF_SERVICES_CLIENT_ID,
            clientSecret: process.env.PDF_SERVICES_CLIENT_SECRET
        });

        // Creates a PDF Services instance
        const pdfServices = new PDFServices({credentials});

        // Creates an asset(s) from source file(s) and upload
        readStream = fs.createReadStream("./ocrInput.pdf");
        const inputAsset = await pdfServices.upload({
            readStream,
            mimeType: MimeType.PDF
        });

        // Create parameters for the job
        const params = new OCRParams({
            ocrLocale: OCRSupportedLocale.EN_US,
            ocrType: OCRSupportedType.SEARCHABLE_IMAGE_EXACT
        });

        // Creates a new job instance
        const job = new OCRJob({inputAsset, params});

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: OCRResult
        });

        // Get content from the resulting asset(s)
        const resultAsset = pdfServicesResponse.result.asset;
        const streamAsset = await pdfServices.getContent({asset: resultAsset});

        // Creates a write stream and copy stream asset's content to it
        const outputFilePath = "./ocrWithOptionsOutput.pdf";
        console.log(`Saving asset at ${outputFilePath}`);

        const writeStream = fs.createWriteStream(outputFilePath);
        streamAsset.readStream.pipe(writeStream);
    } catch (err) {
        if (err instanceof SDKError || err instanceof ServiceUsageError || err instanceof ServiceApiError) {
            console.log("Exception encountered while executing operation", err);
        } else {
            console.log("Exception encountered while executing operation", err);
        }
    } finally {
        readStream?.destroy();
    }
})();
```

#### REST API 

```javascript
// Please refer our REST API docs for more information 
// https://developer.adobe.com/document-services/docs/apis/#tag/Ocr

curl --location --request POST 'https://pdf-services.adobe.io/operation/ocr' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "ce8fe9da-99f2-4d01-999e-42b9ce22ec5f",
    "ocrLang": "en-US"
}'
```
