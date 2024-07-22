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

<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, REST API" /> 

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
                // Initial setup, create credentials instance
                ICredentials credentials = new ServicePrincipalCredentials(
                    Environment.GetEnvironmentVariable("PDF_SERVICES_CLIENT_ID"),
                    Environment.GetEnvironmentVariable("PDF_SERVICES_CLIENT_SECRET"));

                // Creates a PDF Services instance
                PDFServices pdfServices = new PDFServices(credentials);

                // Creates an asset(s) from source file(s) and upload
                using Stream inputStream = File.OpenRead(@"pdfPropertiesInput.pdf");
                IAsset asset = pdfServices.Upload(inputStream, PDFServicesMediaType.PDF.GetMIMETypeValue());

                // Create parameters for the job
                PDFPropertiesParams pdfPropertiesParams = PDFPropertiesParams.PDFPropertiesParamsBuilder()
                    .IncludePageLevelProperties()
                    .Build();

                // Creates a new job instance
                PDFPropertiesJob pdfPropertiesJob = new PDFPropertiesJob(asset);
                pdfPropertiesJob.SetParams(pdfPropertiesParams);

                // Submits the job and gets the job result
                String location = pdfServices.Submit(pdfPropertiesJob);
                PDFServicesResponse<PDFPropertiesResult> pdfServicesResponse =
                    pdfServices.GetJobResult<PDFPropertiesResult>(location, typeof(PDFPropertiesResult));

                PDFProperties pdfProperties = pdfServicesResponse.Result.PDFProperties;

                // Fetch the requisite properties of the specified PDF.
                Console.WriteLine("The resultant PDF Properties are: " + pdfProperties.ToString());
            }
            catch (ServiceUsageException ex)
            {
                log.Error("Exception encountered while executing operation", ex);
            }
            catch (ServiceApiException ex)
            {
                log.Error("Exception encountered while executing operation", ex);
            }
            catch (SDKException ex)
            {
                log.Error("Exception encountered while executing operation", ex);
            }
            catch (IOException ex)
            {
                log.Error("Exception encountered while executing operation", ex);
            }
            catch (Exception ex)
            {
                log.Error("Exception encountered while executing operation", ex);
            }
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

#### Python

```python
# Get the samples from https://www.github.com/adobe/pdfservices-sdk-python-samples
# Run the sample:
# python src/pdfproperties/get_pdf_properties.py

# Initialize the logger
logging.basicConfig(level=logging.INFO)

class GetPDFProperties:
    def __init__(self):
        try:
            file = open('pdfPropertiesInput.pdf', 'rb')
            input_stream = file.read()
            file.close()

            # Initial setup, create credentials instance
            credentials = ServicePrincipalCredentials(
                client_id=os.getenv('PDF_SERVICES_CLIENT_ID'),
                client_secret=os.getenv('PDF_SERVICES_CLIENT_SECRET')
            )

            # Creates a PDF Services instance
            pdf_services = PDFServices(credentials=credentials)

            # Creates an asset(s) from source file(s) and upload
            input_asset = pdf_services.upload(input_stream=input_stream,
                                              mime_type=PDFServicesMediaType.PDF)

            pdf_properties_params = PDFPropertiesParams(include_page_level_properties=True)

            # Creates a new job instance
            pdf_properties_job = PDFPropertiesJob(input_asset=input_asset, pdf_properties_params=pdf_properties_params)

            # Submit the job and gets the job result
            location = pdf_services.submit(pdf_properties_job)
            pdf_services_response = pdf_services.get_job_result(location, PDFPropertiesResult)

            pdf_properties_result = pdf_services_response.get_result()

            # Fetch the requisite properties of the specified PDF.
            print("Size of the specified PDF file:"
                  + str(pdf_properties_result.get_pdf_properties_dict().get("document").get("file_size")))
            print("Version of the specified PDF file:"
                  + str(pdf_properties_result.get_pdf_properties_dict().get("document").get("pdf_version")))
            print("Page count of the specified PDF file:"
                  + str(pdf_properties_result.get_pdf_properties_dict().get("document").get("page_count")))

        except (ServiceApiException, ServiceUsageException, SdkException) as e:
            logging.exception(f'Exception encountered while executing operation: {e}')


if __name__ == '__main__':
    GetPDFProperties()
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
