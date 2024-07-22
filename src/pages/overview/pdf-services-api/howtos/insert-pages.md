---
title: Insert Pages | How Tos | PDF Services API | Adobe PDF Services
---
# Insert Pages

Insert one or more pages into an existing document

## REST API 

See our public API Reference for [Insert Pages](../../../apis/#tag/Combine-PDF)

## Insert Pages in PDF

The insert operation inserts additional pages from different PDFs into
an existing PDF.

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, REST API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.insertpages.InsertPDFPages
 
    public class InsertPDFPages {
  
     // Initialize the logger.
     private static final Logger LOGGER = LoggerFactory.getLogger(InsertPDFPages.class);
  
     public static void main(String[] args) {
         try (InputStream baseInputStream = Files.newInputStream(new File("src/main/resources/baseInput.pdf").toPath());
              InputStream firstInputStreamToInsert = Files.newInputStream(new File("src/main/resources/firstFileToInsertInput.pdf").toPath());
              InputStream secondInputStreamToInsert = Files.newInputStream(new File("src/main/resources/secondFileToInsertInput.pdf").toPath())) {
            // Initial setup, create credentials instance
            Credentials credentials = new ServicePrincipalCredentials(
                    System.getenv("PDF_SERVICES_CLIENT_ID"),
                    System.getenv("PDF_SERVICES_CLIENT_SECRET"));

            // Creates a PDF Services instance
            PDFServices pdfServices = new PDFServices(credentials);

            // Creates an asset(s) from source file(s) and upload
            Asset baseAsset = pdfServices.upload(baseInputStream, PDFServicesMediaType.PDF.getMediaType());
            Asset firstAssetToInsert = pdfServices.upload(firstInputStreamToInsert, PDFServicesMediaType.PDF.getMediaType());
            Asset secondAssetToInsert = pdfServices.upload(secondInputStreamToInsert, PDFServicesMediaType.PDF.getMediaType());

            PageRanges pageRanges = getPageRangeForFirstFile();

            // Create parameters for the job
            InsertPagesParams insertPagesParams = InsertPagesParams.insertPagesParamsBuilder(baseAsset)
                    .addPagesToInsertAt(firstAssetToInsert, pageRanges, 2) // Add the first asset as input to the params, along with its page ranges and base page
                    .addPagesToInsertAt(secondAssetToInsert, 3) // Add the seccond asset as input to the params, along with base page
                    .build();

            // Creates a new job instance
            InsertPagesPDFJob insertPagesJob = new InsertPagesPDFJob(insertPagesParams);

            // Submit the job and gets the job result
            String location = pdfServices.submit(insertPagesJob);
            PDFServicesResponse<InsertPagesResult> pdfServicesResponse = pdfServices.getJobResult(location, InsertPagesResult.class);

            // Get content from the resulting asset(s)
            Asset resultAsset = pdfServicesResponse.getResult().getAsset();
            StreamAsset streamAsset = pdfServices.getContent(resultAsset);

            // Creates an output stream and copy stream asset's content to it
            Files.createDirectories(Paths.get("output/"));
            OutputStream outputStream = Files.newOutputStream(new File("output/insertPagesOutput.pdf").toPath());
            LOGGER.info("Saving asset at output/insertPagesOutput.pdf");
            IOUtils.copy(streamAsset.getInputStream(), outputStream);
            outputStream.close();
         } catch (IOException | ServiceApiException | SDKException | ServiceUsageException e) {
             LOGGER.error("Exception encountered while executing operation", e);
         }
     }
  
     private static PageRanges getPageRangeForFirstFile() {
         // Specify which pages of the first file are to be inserted in the base file
         PageRanges pageRanges = new PageRanges();
         // Add pages 1 to 3
         pageRanges.addRange(1, 3);
  
         // Add page 4.
         pageRanges.addSinglePage(4);
  
         return pageRanges;
     }
   }
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd InsertPDFPages/
// dotnet run InsertPDFPages.csproj


namespace InsertPDFPages
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
                using Stream baseInputStream = File.OpenRead(@"baseInput.pdf");
                using Stream firstInputStream = File.OpenRead(@"firstFileToInsertInput.pdf");
                using Stream secondInputStream = File.OpenRead(@"secondFileToInsertInput.pdf");
                IAsset baseAsset = pdfServices.Upload(baseInputStream, PDFServicesMediaType.PDF.GetMIMETypeValue());
                IAsset firstAssetToInsert =
                    pdfServices.Upload(firstInputStream, PDFServicesMediaType.PDF.GetMIMETypeValue());
                IAsset secondAssetToInsert =
                    pdfServices.Upload(secondInputStream, PDFServicesMediaType.PDF.GetMIMETypeValue());

                PageRanges pageRanges = GetPageRangeForFirstFile();

                // Create parameters for the job
                InsertPagesParams insertPagesParams = InsertPagesParams.InsertPagesParamsBuilder(baseAsset)
                    .AddPagesToInsertAt(firstAssetToInsert, pageRanges, 2)
                    .AddPagesToInsertAt(secondAssetToInsert, 3)
                    .Build();

                // Creates a new job instance
                InsertPagesPDFJob insertPagesPDFJob = new InsertPagesPDFJob(insertPagesParams);

                // Submits the job and gets the job result
                String location = pdfServices.Submit(insertPagesPDFJob);
                PDFServicesResponse<InsertPagesResult> pdfServicesResponse =
                    pdfServices.GetJobResult<InsertPagesResult>(location, typeof(InsertPagesResult));

                // Get content from the resulting asset(s)
                IAsset resultAsset = pdfServicesResponse.Result.Asset;
                StreamAsset streamAsset = pdfServices.GetContent(resultAsset);

                // Creating output streams and copying stream asset's content to it
                String outputFilePath = "/output/insertPagesOutput.pdf";
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

        private static PageRanges GetPageRangeForFirstFile()
        {
            // Specify which pages of the first file are to be inserted in the base file.
            PageRanges pageRanges = new PageRanges();
            // Add pages 1 to 3.
            pageRanges.AddRange(1, 3);

            // Add page 4.
            pageRanges.AddSinglePage(4);

            return pageRanges;
        }

        static void ConfigureLogging()
        {
            ILoggerRepository logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
            XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));
        }

        // Generates a string containing a directory structure and file name for the output file.
        private static string CreateOutputFilePath()
        {
            String timeStamp = DateTime.Now.ToString("yyyy'-'MM'-'dd'T'HH'-'mm'-'ss");
            return ("/output/insert" + timeStamp + ".pdf");
        }
    }
}

```

#### Node JS

```javascript
// Get the samples from http://www.adobe.com/go/pdftoolsapi_node_sample
// Run the sample:
// node src/insertpages/insert-pdf-pages.js

const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    PageRanges,
    InsertPagesParams,
    InsertPagesJob,
    InsertPagesResult,
    SDKError,
    ServiceUsageError,
    ServiceApiError
} = require("@adobe/pdfservices-node-sdk");
const fs = require("fs");

(async () => {
    let baseReadStream;
    let firstReadStreamToInsert;
    let secondReadStreamToInsert;
    try {
        // Initial setup, create credentials instance
        const credentials = new ServicePrincipalCredentials({
            clientId: process.env.PDF_SERVICES_CLIENT_ID,
            clientSecret: process.env.PDF_SERVICES_CLIENT_SECRET
        });

        // Creates a PDF Services instance
        const pdfServices = new PDFServices({credentials});

        // Creates an asset(s) from source file(s) and upload
        baseReadStream = fs.createReadStream("./baseInput.pdf");
        firstReadStreamToInsert = fs.createReadStream("./firstFileToInsertInput.pdf");
        secondReadStreamToInsert = fs.createReadStream("./secondFileToInsertInput.pdf");
        const [baseAsset, firstAssetToInsert, secondAssetToInsert] = await pdfServices.uploadAssets({
            streamAssets: [{
                readStream: baseReadStream,
                mimeType: MimeType.PDF
            }, {
                readStream: firstReadStreamToInsert,
                mimeType: MimeType.PDF
            }, {
                readStream: secondReadStreamToInsert,
                mimeType: MimeType.PDF
            }]
        });

        // Create parameters for the job
        const params = new InsertPagesParams(baseAsset)
            // Add the first asset as input to the params, along with its page ranges and base page
            .addPagesToInsertAt({
                inputAsset: firstAssetToInsert,
                pageRanges: getPageRangesForFirstFile(),
                basePage: 2
            })
            // Add the second asset as input to the params, along with base page
            .addPagesToInsertAt({
                inputAsset: secondAssetToInsert,
                basePage: 3
            });

        // Create a new job instance
        const job = new InsertPagesJob({params});

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: InsertPagesResult
        });

        // Get content from the resulting asset(s)
        const resultAsset = pdfServicesResponse.result.asset;
        const streamAsset = await pdfServices.getContent({asset: resultAsset});

        // Creates an output stream and copy result asset's content to it
        const outputFilePath = "./insertPagesOutput.pdf";
        console.log(`Saving asset at ${outputFilePath}`);

        const outputStream = fs.createWriteStream(outputFilePath);
        streamAsset.readStream.pipe(outputStream);
    } catch (err) {
        if (err instanceof SDKError || err instanceof ServiceUsageError || err instanceof ServiceApiError) {
            console.log("Exception encountered while executing operation", err);
        } else {
            console.log("Exception encountered while executing operation", err);
        }
    } finally {
        baseReadStream?.destroy();
        firstReadStreamToInsert?.destroy();
        secondReadStreamToInsert?.destroy();
    }
})();
```

#### Python

```python
# Get the samples from https://github.com/adobe/pdfservices-python-sdk-samples
# Run the sample:
# python src/insertpages/insert_pdf_pages.py

# Initialize the logger
logging.basicConfig(level=logging.INFO)

class InsertPDFPages:
    def __init__(self):
        try:
            base_file = open('baseInput.pdf', 'rb')
            base_input_stream = base_file.read()
            base_file.close()

            first_file_to_insert = open('firstFileToInsertInput.pdf', 'rb')
            first_input_stream_to_insert = first_file_to_insert.read()
            first_file_to_insert.close()

            second_file_to_insert = open('secondFileToInsertInput.pdf', 'rb')
            second_input_stream_to_insert = second_file_to_insert.read()
            second_file_to_insert.close()

            # Initial setup, create credentials instance
            credentials = ServicePrincipalCredentials(
                client_id=os.getenv('PDF_SERVICES_CLIENT_ID'),
                client_secret=os.getenv('PDF_SERVICES_CLIENT_SECRET')
            )

            # Creates a PDF Services instance
            pdf_services = PDFServices(credentials=credentials)

            # Creates an asset(s) from source file(s) and upload
            base_asset = pdf_services.upload(input_stream=base_input_stream,
                                             mime_type=PDFServicesMediaType.PDF)
            first_asset_to_insert = pdf_services.upload(input_stream=first_input_stream_to_insert,
                                                        mime_type=PDFServicesMediaType.PDF)
            second_asset_to_insert = pdf_services.upload(input_stream=second_input_stream_to_insert,
                                                         mime_type=PDFServicesMediaType.PDF)

            page_ranges = self.get_page_range_for_first_file()

            # Create parameters for the job
            insert_pages_params = InsertPagesParams(base_asset=base_asset)

            # Add the first asset as input to the params, along with its page ranges and base page
            insert_pages_params.add_pages_to_insert(input_asset=first_asset_to_insert, page_ranges=page_ranges, base_page=2)

            # Add the second asset as input to the params, along with base page
            insert_pages_params.add_pages_to_insert(input_asset=second_asset_to_insert, base_page=3)

            # Creates a new job instance
            insert_pages_job = InsertPagesJob(insert_pages_params=insert_pages_params)

            # Submit the job and gets the job result
            location = pdf_services.submit(insert_pages_job)
            pdf_services_response = pdf_services.get_job_result(location, InsertPagesResult)

            # Get content from the resulting asset(s)
            result_asset: CloudAsset = pdf_services_response.get_result().get_asset()
            stream_asset: StreamAsset = pdf_services.get_content(result_asset)

            # Creates an output stream and copy stream asset's content to it
            output_file_path = "insertpagesOutput.pdf"
            with open(output_file_path, "wb") as file:
                file.write(stream_asset.get_input_stream())

        except (ServiceApiException, ServiceUsageException, SdkException) as e:
            logging.exception(f'Exception encountered while executing operation: {e}')

    @staticmethod
    def get_page_range_for_first_file() -> PageRanges:
        # Specify which pages of the first file are to be included in the combined file
        page_ranges_for_first_file = PageRanges()
        # Add pages 1 to 3
        page_ranges_for_first_file.add_range(1, 3)
        # Add single page 1
        page_ranges_for_first_file.add_single_page(1)
        return page_ranges_for_first_file


if __name__ == "__main__":
    InsertPDFPages()


```


#### REST API 

```javascript
// Please refer our REST API docs for more information 
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
                    "start": 1,
                    "end": 1
                }
            ]
        },
        {
            "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718",
            "pageRanges": [
                {
                    "start": 4
                }
            ]
        },
        {
            "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718",
            "pageRanges": [
                {
                    "start": 1
                }
            ]
        },
        {
            "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718",
            "pageRanges": [
                {
                    "start": 2
                }
            ]
        }
    ]
}'
```
