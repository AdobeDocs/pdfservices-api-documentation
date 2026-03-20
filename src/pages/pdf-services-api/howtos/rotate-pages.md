---
title: Rotate Pages | How Tos | PDF Services API | Adobe PDF Services
---
# Rotate Pages

Rotate a page in an existing document.

## REST API

See our public API Reference for [Rotate Pages.](../../../apis/#tag/Page-Manipulation)

## Rotate Pages in PDF

The rotate pages operation selectively rotates pages in PDF file. For
example, you can change portrait view to landscape view.

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, REST API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.rotatepages.RotatePDFPages
 
  public class RotatePDFPages {
 
    // Initialize the logger.
    private static final Logger LOGGER = LoggerFactory.getLogger(RotatePDFPages.class);
 
    public static void main(String[] args) {
        try (InputStream inputStream = Files.newInputStream(new File("src/main/resources/rotatePagesInput.pdf").toPath())) {
            // Initial setup, create credentials instance
            Credentials credentials = new ServicePrincipalCredentials(
                    System.getenv("PDF_SERVICES_CLIENT_ID"),
                    System.getenv("PDF_SERVICES_CLIENT_SECRET"));

            // Creates a PDF Services instance
            PDFServices pdfServices = new PDFServices(credentials);

            // Creates an asset(s) from source file(s) and upload
            Asset asset = pdfServices.upload(inputStream, PDFServicesMediaType.PDF.getMediaType());

            // First set of page ranges for rotating the specified pages of the input PDF file.
            PageRanges firstPageRange = getFirstPageRangeForRotation();

            // Second set of page ranges for rotating the specified pages of the input PDF file.
            PageRanges secondPageRange = getSecondPageRangeForRotation();

            // Create parameters for the job
            RotatePagesParams rotatePagesParams = RotatePagesParams.rotatePagesParamsBuilder()
                    .withAngleToRotatePagesBy(Angle._90, firstPageRange)
                    .withAngleToRotatePagesBy(Angle._180, secondPageRange)
                    .build();

            // Creates a new job instance
            RotatePagesJob rotatePagesJob = new RotatePagesJob(asset, rotatePagesParams);

            // Submit the job and gets the job result
            String location = pdfServices.submit(rotatePagesJob);
            PDFServicesResponse<RotatePagesResult> pdfServicesResponse = pdfServices.getJobResult(location, RotatePagesResult.class);

            // Get content from the resulting asset(s)
            Asset resultAsset = pdfServicesResponse.getResult().getAsset();
            StreamAsset streamAsset = pdfServices.getContent(resultAsset);

            // Creates an output stream and copy stream asset's content to it
            Files.createDirectories(Paths.get("output/"));
            OutputStream outputStream = Files.newOutputStream(new File("output/rotatePagesOutput.pdf").toPath());
            LOGGER.info("Saving asset at output/rotatePagesOutput.pdf");
            IOUtils.copy(streamAsset.getInputStream(), outputStream);
            outputStream.close();
        } catch (IOException | ServiceApiException | SDKException | ServiceUsageException e) {
            LOGGER.error("Exception encountered while executing operation", e);
        }
    }
 
    private static PageRanges getFirstPageRangeForRotation() {
        // Specify pages for rotation
        PageRanges firstPageRange = new PageRanges();
        // Add page 1
        firstPageRange.addSinglePage(1);

        // Add pages 3 to 4
        firstPageRange.addRange(3, 4);
        return firstPageRange;
    }
 
    private static PageRanges getSecondPageRangeForRotation() {
        // Specify pages for rotation
        PageRanges secondPageRange = new PageRanges();
        // Add page 2
        secondPageRange.addSinglePage(2);

        return secondPageRange;
    }
  }
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd RotatePDFPages/
// dotnet run RotatePDFPages.csproj


namespace RotatePDFPages
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
                // Initial setup, create credentials instance
                ICredentials credentials = new ServicePrincipalCredentials(
                    Environment.GetEnvironmentVariable("PDF_SERVICES_CLIENT_ID"),
                    Environment.GetEnvironmentVariable("PDF_SERVICES_CLIENT_SECRET"));

                // Creates a PDF Services instance
                PDFServices pdfServices = new PDFServices(credentials);

                // Creates an asset from source file and upload
                using Stream inputStream = File.OpenRead(@"rotatePagesInput.pdf");
                IAsset asset = pdfServices.Upload(inputStream, PDFServicesMediaType.PDF.GetMIMETypeValue());

                // Sets angle by 90 degrees (in clockwise direction) for rotating the specified pages of
                // the input PDF file.
                PageRanges firstPageRange = GetFirstPageRangeForRotation();

                // Sets angle by 180 degrees (in clockwise direction) for rotating the specified pages of
                // the input PDF file.
                PageRanges secondPageRange = GetSecondPageRangeForRotation();

                // Create parameters for the job
                RotatePagesParams rotatePagesParams = RotatePagesParams.RotatePagesParamsBuilder()
                    .withAngleToRotatePagesBy(Angle._90, firstPageRange)
                    .withAngleToRotatePagesBy(Angle._180, secondPageRange)
                    .Build();

                // Creates a new job instance
                RotatePagesJob rotatePagesJob = new RotatePagesJob(asset, rotatePagesParams);

                // Submits the job and gets the job result
                String location = pdfServices.Submit(rotatePagesJob);
                PDFServicesResponse<RotatePagesResult> pdfServicesResponse =
                    pdfServices.GetJobResult<RotatePagesResult>(location, typeof(RotatePagesResult));

                // Get content from the resulting asset(s)
                IAsset resultAsset = pdfServicesResponse.Result.Asset;
                StreamAsset streamAsset = pdfServices.GetContent(resultAsset);

                // Creating output streams and copying stream asset's content to it
                String outputFilePath = "/output/rotatePagesOutput.pdf";
                new FileInfo(Directory.GetCurrentDirectory() + outputFilePath).Directory.Create();
                Stream outputStream = File.OpenWrite(Directory.GetCurrentDirectory() + outputFilePath);
                streamAsset.Stream.CopyTo(outputStream);
                outputStream.Close();
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

        private static PageRanges GetFirstPageRangeForRotation()
        {
            // Specify pages for rotation.
            PageRanges firstPageRange = new PageRanges();
            // Add page 1.
            firstPageRange.AddSinglePage(1);

            // Add pages 3 to 4.
            firstPageRange.AddRange(3, 4);
            return firstPageRange;
        }

        private static PageRanges GetSecondPageRangeForRotation()
        {
            // Specify pages for rotation.
            PageRanges secondPageRange = new PageRanges();
            // Add page 2.
            secondPageRange.AddSinglePage(2);

            return secondPageRange;
        }

        // Generates a string containing a directory structure and file name for the output file.
        private static String CreateOutputFilePath()
        {
            String timeStamp = DateTime.Now.ToString("yyyy'-'MM'-'dd'T'HH'-'mm'-'ss");
            return ("/output/rotate" + timeStamp + ".pdf");
        }
    }
}
```

#### Node JS

```javascript
// Get the samples from http://www.adobe.com/go/pdftoolsapi_node_sample
// Run the sample:
// node src/rotatepages/rotate-pdf-pages.js

const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    PageRanges,
    RotatePagesParams,
    Angle,
    RotatePagesJob,
    RotatePagesResult,
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
        readStream = fs.createReadStream("./rotatePagesInput.pdf");
        const inputAsset = await pdfServices.upload({
            readStream,
            mimeType: MimeType.PDF
        });

        // First set of page ranges for rotating the specified pages of the input PDF file
        const firstPageRange = getFirstPageRangeForRotation();

        // Second set of page ranges for rotating the specified pages of the input PDF file
        const secondPageRange = getSecondPageRangeForRotation();

        // Create parameters for the job
        const params = new RotatePagesParams()
            .setAngleToRotatePagesBy(Angle._90, firstPageRange)
            .setAngleToRotatePagesBy(Angle._180, secondPageRange);

        // Creates a new job instance
        const job = new RotatePagesJob({inputAsset, params});

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: RotatePagesResult
        });

        // Get content from the resulting asset(s)
        const resultAsset = pdfServicesResponse.result.asset;
        const streamAsset = await pdfServices.getContent({asset: resultAsset});

        // Creates a write stream and copy stream asset's content to it
        const outputFilePath = "./rotatePagesOutput.pdf";
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

function getFirstPageRangeForRotation() {
    // Specify pages for rotation.
    const firstPageRange = new PageRanges();
    // Add page 1.
    firstPageRange.addSinglePage(1);
    // Add pages 3 to 4.
    firstPageRange.addRange(3, 4);
    return firstPageRange;
}

function getSecondPageRangeForRotation() {
    // Specify pages for rotation.
    const secondPageRange = new PageRanges();
    // Add page 2.
    secondPageRange.addSinglePage(2);
    return secondPageRange;
}
```

#### Python 

```python
# Get the samples from https://github.com/adobe/pdfservices-python-sdk-samples
# Run the sample:
# python src/rotatepages/rotate_pdf_pages.py

# Initialize the logger
logging.basicConfig(level=logging.INFO)

class RotatePDFPages:
    def __init__(self):
        try:
            file = open('rotatePagesInput.pdf', 'rb')
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
            input_asset = pdf_services.upload(input_stream=input_stream, mime_type=PDFServicesMediaType.PDF)

            # First set of page ranges for rotating the specified pages of the input PDF file.
            first_page_range: PageRanges = self.get_first_page_range_for_rotation()

            # Second set of page ranges for rotating the specified pages of the input PDF file.
            second_page_range: PageRanges = self.get_second_page_range_for_rotation()

            # Create parameters for the job
            rotate_pages_params = RotatePagesParams()
            rotate_pages_params.add_angle_to_rotate_for_page_ranges(angle=Angle.ANGLE_90, page_ranges=first_page_range)
            rotate_pages_params.add_angle_to_rotate_for_page_ranges(angle=Angle.ANGLE_180, page_ranges=second_page_range)

            # Creates a new job instance
            reorder_pages_job = RotatePagesJob(input_asset=input_asset, rotate_pages_params=rotate_pages_params)

            # Submit the job and gets the job result
            location = pdf_services.submit(reorder_pages_job)
            pdf_services_response = pdf_services.get_job_result(location, RotatePagesResult)

            # Get content from the resulting asset(s)
            result_asset: CloudAsset = pdf_services_response.get_result().get_asset()
            stream_asset: StreamAsset = pdf_services.get_content(result_asset)

            # Creates an output stream and copy stream asset's content to it
            output_file_path = 'rotatePagesOutput.pdf'
            with open(output_file_path, "wb") as file:
                file.write(stream_asset.get_input_stream())

        except (ServiceApiException, ServiceUsageException, SdkException) as e:
            logging.exception(f'Exception encountered while executing operation: {e}')

    @staticmethod
    def get_first_page_range_for_rotation() -> PageRanges:
        # Specify pages for rotation
        first_page_range = PageRanges()
        # Add page 1
        first_page_range.add_single_page(1)
        # Add pages 3 to 4
        first_page_range.add_range(3, 4)
        return first_page_range

    @staticmethod
    def get_second_page_range_for_rotation() -> PageRanges:
        # Specify pages for rotation
        second_page_range = PageRanges()
        # Add page 2
        second_page_range.add_single_page(2)
        return second_page_range


if __name__ == "__main__":
    RotatePDFPages()

```

#### REST API 

```javascript
// Please refer our REST API docs for more information 
// https://developer.adobe.com/document-services/docs/apis/#tag/Page-Manipulation

curl --location --request POST 'https://pdf-services.adobe.io/operation/pagemanipulation' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718f",
    "pageActions": [
        {
            "rotate": {
                "angle": 90,
                "pageRanges": [
                    {
                        "start": 1
                    }
                ]
            }
        },
        {
            "rotate": {
                "angle": 180,
                "pageRanges": [
                    {
                        "start": 2,
                        "end": 2
                    }
                ]
            }
        }
    ]
}'
```
