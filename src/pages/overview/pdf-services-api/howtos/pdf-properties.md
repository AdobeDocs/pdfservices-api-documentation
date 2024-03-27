---
title: PDF Properties | How Tos | PDF Services API | Adobe PDF Services
---
# Get PDF Properties

Use this service to get the metadata properties of a PDF. Metadata including page count, PDF version, file size, compliance levels, font info, permissions and more are provided in JSON format for easy processing.

This data can be used to: check if a document is fully text searchable (OCR), understand the e-signature certificate info, find out compliance levels (e.g., PDF/A and PDF/UA), assess file size before compressing, check permissions related to copy, edit, printing, encryption, and much more.

## REST API 

See our public API Reference for [PDF Properties](../../../apis/#tag/PDF-Properties).

### Fetch PDF Properties

The sample below fetches the properties of an input PDF.

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, REST API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.pdfproperties.GetPDFProperties

  public class GetPDFProperties {

    // Initialize the logger.
    private static final Logger LOGGER = LoggerFactory.getLogger(GetPDFProperties.class);

    public static void main(String[] args) {

      try (InputStream inputStream = Files.newInputStream(new File("src/main/resources/pdfPropertiesInput.pdf").toPath())) {
        // Initial setup, create credentials instance
        Credentials credentials = new ServicePrincipalCredentials(
                System.getenv("PDF_SERVICES_CLIENT_ID"),
                System.getenv("PDF_SERVICES_CLIENT_SECRET"));

        // Creates a PDF Services instance
        PDFServices pdfServices = new PDFServices(credentials);

        // Creates an asset(s) from source file(s) and upload
        Asset asset = pdfServices.upload(inputStream, PDFServicesMediaType.PDF.getMediaType());

        // Create parameters for the job
        PDFPropertiesParams pdfPropertiesParams = PDFPropertiesParams.pdfPropertiesParamsBuilder()
                .includePageLevelProperties()
                .build();

        // Creates a new job instance
        PDFPropertiesJob pdfPropertiesJob = new PDFPropertiesJob(asset)
                .setParams(pdfPropertiesParams);

        // Submit the job and gets the job result
        String location = pdfServices.submit(pdfPropertiesJob);
        PDFServicesResponse<PDFPropertiesResult> pdfServicesResponse = pdfServices.getJobResult(location, PDFPropertiesResult.class);

        PDFProperties pdfProperties = pdfServicesResponse.getResult().getPdfProperties();
        
        // Fetch the requisite properties of the specified PDF.
        LOGGER.info("Size of the specified PDF file: {}", pdfProperties.getDocument().getFileSize());
        LOGGER.info("Version of the specified PDF file: {}", pdfProperties.getDocument().getPDFVersion());
        LOGGER.info("Page count of the specified PDF file: {}", pdfProperties.getDocument().getPageCount());
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
// cd PDFPropertiesAsJSONObject/
// dotnet run GetPDFProperties.csproj

namespace GetPDFProperties
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
            PDFPropertiesOperation pdfPropertiesOperation = PDFPropertiesOperation.CreateNew();

            // Provide an input FileRef for the operation
            FileRef source = FileRef.CreateFromLocalFile(@"pdfPropertiesInput.pdf");
            pdfPropertiesOperation.SetInput(source);

            // Build PDF Properties options to include page level properties and set them into the operation
            PDFPropertiesOptions pdfPropertiesOptions = PDFPropertiesOptions.PDFPropertiesOptionsBuilder()
            .IncludePageLevelProperties(true)
            .Build();
            pdfPropertiesOperation.SetOptions(pdfPropertiesOptions);

            // Execute the operation ang get properties of the PDF in PDFProperties object.
            PDFProperties pdfProperties = pdfPropertiesOperation.Execute(executionContext);
            Console.WriteLine("The resultant PDF Properties are: " + result.ToString());

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
// node src/pdfproperties/get-pdf-properties.js

const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    PDFPropertiesParams,
    PDFPropertiesJob,
    PDFPropertiesResult,
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
        readStream = fs.createReadStream("./pdfPropertiesInput.pdf");
        const inputAsset = await pdfServices.upload({
            readStream,
            mimeType: MimeType.PDF
        });

        // Create parameters for the job
        const params = new PDFPropertiesParams({
            includePageLevelProperties: true
        });

        // Creates a new job instance
        const job = new PDFPropertiesJob({inputAsset, params});

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: PDFPropertiesResult
        });

        const pdfProperties = pdfServicesResponse.result.pdfProperties;

        // Fetch the requisite properties of the specified PDF.
        console.log(`Size of the specified PDF file: ${pdfProperties.document.fileSize}`);
        console.log(`Version of the specified PDF file: ${pdfProperties.document.pdfVersion}`);
        console.log(`Page count of the specified PDF file: ${pdfProperties.document.pageCount}`);
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
// https://developer.adobe.com/document-services/docs/apis/#tag/PDF-Properties

curl --location --request POST 'https://pdf-services.adobe.io/operation/pdfproperties' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718",
    "pageLevel": false
}'
```
