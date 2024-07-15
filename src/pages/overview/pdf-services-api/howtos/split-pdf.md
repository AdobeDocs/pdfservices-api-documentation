---
title: Split PDF | How Tos | PDF Services API | Adobe PDF Services
---
# Split PDF

Split a PDF document into multiple smaller documents by simply specifying either the number of files, pages per file, or page ranges.

## REST API 

See our public API Reference for [Split PDF](../../../apis/#tag/Split-PDF).

## Split PDF by number of pages

This operation splits a PDF into multiple smaller documents. Simply use
the page count to specify the maximum number of pages of each output
file.

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, REST API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.splitpdf.SplitPDFByNumberOfPages
 
   public class SplitPDFByNumberOfPages {
  
     // Initialize the logger.
     private static final Logger LOGGER = LoggerFactory.getLogger(SplitPDFByNumberOfPages.class);
  
     public static void main(String[] args) {
         try (InputStream inputStream = Files.newInputStream(new File("src/main/resources/splitPDFInput.pdf").toPath())) {
            // Initial setup, create credentials instance
            Credentials credentials = new ServicePrincipalCredentials(
                    System.getenv("PDF_SERVICES_CLIENT_ID"),
                    System.getenv("PDF_SERVICES_CLIENT_SECRET"));

            // Creates a PDF Services instance
            PDFServices pdfServices = new PDFServices(credentials);

            // Creates an asset(s) from source file(s) and upload
            Asset asset = pdfServices.upload(inputStream, PDFServicesMediaType.PDF.getMediaType());

            // Create parameters for the job
            SplitPDFParams splitPDFParams = new SplitPDFParams();
            // Sets the maximum number of pages each of the output files can have
            splitPDFParams.setPageCount(2);

            // Creates a new job instance
            SplitPDFJob splitPDFJob = new SplitPDFJob(asset, splitPDFParams);

            // Submit the job and gets the job result
            String location = pdfServices.submit(splitPDFJob);
            PDFServicesResponse<SplitPDFResult> pdfServicesResponse = pdfServices.getJobResult(location, SplitPDFResult.class);

            // Get content from the resulting asset(s)
            List<Asset> resultAssets = pdfServicesResponse.getResult().getAssets();
            
            Files.createDirectories(Paths.get("output/"));
            int index = 0;
            for (Asset resultAsset : resultAssets) {
                StreamAsset streamAsset = pdfServices.getContent(resultAsset);

                // Creates an output stream and copy stream asset's content to it
                OutputStream outputStream = Files.newOutputStream(new File("output/SplitPDFByNumberOfPagesOutput_" + index + ".pdf").toPath());
                LOGGER.info("Saving asset at output/SplitPDFByNumberOfPagesOutput_" + index + ".pdf");
                IOUtils.copy(streamAsset.getInputStream(), outputStream);
                outputStream.close();
                index++;
            }
         } catch (IOException| ServiceApiException | SDKException | ServiceUsageException e) {
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
                // Initial setup, create credentials instance
                ICredentials credentials = new ServicePrincipalCredentials(
                    Environment.GetEnvironmentVariable("PDF_SERVICES_CLIENT_ID"),
                    Environment.GetEnvironmentVariable("PDF_SERVICES_CLIENT_SECRET"));

                // Creates a PDF Services instance
                PDFServices pdfServices = new PDFServices(credentials);

                // Creates an asset(s) from source file(s) and upload
                using Stream inputStream = File.OpenRead(@"splitPDFInput.pdf");
                IAsset asset = pdfServices.Upload(inputStream, PDFServicesMediaType.PDF.GetMIMETypeValue());

                // Create parameters for the job
                SplitPDFParams splitPDFParams = new SplitPDFParams();
                splitPDFParams.SetPageCount(2);

                // Creates a new job instance
                SplitPDFJob splitPDFJob = new SplitPDFJob(asset, splitPDFParams);

                // Submits the job and gets the job result
                String location = pdfServices.Submit(splitPDFJob);
                PDFServicesResponse<SplitPDFResult> pdfServicesResponse =
                    pdfServices.GetJobResult<SplitPDFResult>(location, typeof(SplitPDFResult));
                List<IAsset> resultAssets = pdfServicesResponse.Result.Assets;

                // Save the result to the specified location.
                int index = 0;
                foreach (IAsset resultAsset in resultAssets)
                {
                    // Get content from the resulting asset(s)
                    StreamAsset streamAsset = pdfServices.GetContent(resultAsset);
                    Stream outputStream =
                        File.OpenWrite(Directory.GetCurrentDirectory() + "/output/SplitPDFByNumberOfPagesOutput_" + index + ".pdf");
                    streamAsset.Stream.CopyTo(outputStream);
                    outputStream.Close();
                    index++;
                }
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
// node src/splitpdf/split-pdf-by-number-of-pages.js

const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    SplitPDFParams,
    SplitPDFJob,
    SplitPDFResult,
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
        readStream = fs.createReadStream("./splitPDFInput.pdf")
        const inputAsset = await pdfServices.upload({
            readStream,
            mimeType: MimeType.PDF
        });

        // Create parameters for the job
        const params = new SplitPDFParams({
            pageCount: 2
        });

        // Creates a new job instance
        const job = new SplitPDFJob({inputAsset, params});

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: SplitPDFResult
        });

        // Get content from the resulting asset(s)
        const resultAssets = pdfServicesResponse.result.assets;

        for (let i = 0; i < resultAssets.length; i++) {
            const streamAsset = await pdfServices.getContent({asset: resultAssets[i]});

            // Creates an output stream and copy stream asset's content to it
            const _outputFilePath = "./SplitPDFByNumberOfPagesOutput_" + i + ".pdf";
            console.log(`Saving asset at ${_outputFilePath}`);

            const writeStream = fs.createWriteStream(_outputFilePath);
            streamAsset.readStream.pipe(writeStream);
        }
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
# Get the samples from https://github.com/adobe/pdfservices-python-sdk-samples
# Run the sample:
# python src/splitpdf/split_pdf_by_number_of_pages.py

# Initialize the logger
logging.basicConfig(level=logging.INFO)

class SplitPDFByNumberOfPages:
    def __init__(self):
        try:

            file = open('splitPDFInput.pdf', 'rb')
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

            # Create parameters for the job
            split_pdf_params = SplitPDFParams(page_count=2)

            # Creates a new job instance
            split_pdf_job = SplitPDFJob(input_asset, split_pdf_params)

            # Submit the job and gets the job result
            location = pdf_services.submit(split_pdf_job)
            pdf_services_response = pdf_services.get_job_result(location, SplitPDFResult)

            # Get content from the resulting asset(s)
            result_assets = pdf_services_response.get_result().get_assets()

            # Creates an output stream and copy stream asset's content to it
            output_file_path = 'SplitPDFByNumberOfPagesOutput.pdf'

            for i, result_asset in enumerate(result_assets):
                stream_asset: StreamAsset = pdf_services.get_content(result_asset)
                with open(f"{output_file_path}_{i}.pdf", "wb") as file:
                    file.write(stream_asset.get_input_stream())

        except (ServiceApiException, ServiceUsageException, SdkException) as e:
            logging.exception(f'Exception encountered while executing operation: {e}')


if __name__ == "__main__":
    SplitPDFByNumberOfPages()
```

#### REST API

```javascript
// Please refer our REST API docs for more information 
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
```

## Split PDF by page ranges

As an alternative to creating smaller PDFs with a set number of pages,
you can split PDFs into multiple smaller documents by specifying page
ranges where each page range corresponds to a single output file.

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, REST API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.splitpdf.SplitPDFByPageRanges
 
    public class SplitPDFByPageRanges {
   
      // Initialize the logger.
      private static final Logger LOGGER = LoggerFactory.getLogger(SplitPDFByPageRanges.class);
   
      public static void main(String[] args) {
          try (InputStream inputStream = Files.newInputStream(new File("src/main/resources/splitPDFInput.pdf").toPath())) {
            // Initial setup, create credentials instance
            Credentials credentials = new ServicePrincipalCredentials(
                    System.getenv("PDF_SERVICES_CLIENT_ID"),
                    System.getenv("PDF_SERVICES_CLIENT_SECRET"));

            // Creates a PDF Services instance
            PDFServices pdfServices = new PDFServices(credentials);

            // Creates an asset(s) from source file(s) and upload
            Asset asset = pdfServices.upload(inputStream, PDFServicesMediaType.PDF.getMediaType());

            // Specify page ranges to split PDF
            PageRanges pageRanges = getPageRanges();

            // Create parameters for the job
            SplitPDFParams splitPDFParams = new SplitPDFParams();
            // Set the page ranges where each page range corresponds to a single output file
            splitPDFParams.setPageRanges(pageRanges);

            // Creates a new job instance
            SplitPDFJob splitPDFJob = new SplitPDFJob(asset, splitPDFParams);

            // Submit the job and gets the job result
            String location = pdfServices.submit(splitPDFJob);
            PDFServicesResponse<SplitPDFResult> pdfServicesResponse = pdfServices.getJobResult(location, SplitPDFResult.class);

            // Get content from the resulting asset(s)
            List<Asset> resultAssets = pdfServicesResponse.getResult().getAssets();
            
            Files.createDirectories(Paths.get("output/"));
            int index = 0;
            for (Asset resultAsset : resultAssets) {
                StreamAsset streamAsset = pdfServices.getContent(resultAsset);

                // Creates an output stream and copy stream asset's content to it
                OutputStream outputStream = Files.newOutputStream(new File("output/SplitPDFByPageRangesOutput_" + index + ".pdf").toPath());
                LOGGER.info("Saving asset at output/SplitPDFByPageRangesOutput_" + index + ".pdf");
                IOUtils.copy(streamAsset.getInputStream(), outputStream);
                outputStream.close();
                index++;
            }
          } catch (IOException | ServiceApiException | SDKException | ServiceUsageException e) {
              LOGGER.error("Exception encountered while executing operation", e);
          }
      }
   
      private static PageRanges getPageRanges() {
        // Specify page ranges
        PageRanges pageRanges = new PageRanges();
        // Add page 1
        pageRanges.addSinglePage(1);

        // Add pages 3 to 4
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
                // Initial setup, create credentials instance
                ICredentials credentials = new ServicePrincipalCredentials(
                    Environment.GetEnvironmentVariable("PDF_SERVICES_CLIENT_ID"),
                    Environment.GetEnvironmentVariable("PDF_SERVICES_CLIENT_SECRET"));

                // Creates a PDF Services instance
                PDFServices pdfServices = new PDFServices(credentials);

                // Creates an asset(s) from source file(s) and upload
                using Stream inputStream = File.OpenRead(@"splitPDFInput.pdf");
                IAsset asset = pdfServices.Upload(inputStream, PDFServicesMediaType.PDF.GetMIMETypeValue());

                // Set the page ranges where each page range corresponds to a single output file.
                PageRanges pageRanges = GetPageRanges();

                // Create parameters for the job
                SplitPDFParams splitPDFParams = new SplitPDFParams();
                splitPDFParams.SetPageRanges(pageRanges);

                // Creates a new job instance
                SplitPDFJob splitPDFJob = new SplitPDFJob(asset, splitPDFParams);

                // Submits the job and gets the job result
                String location = pdfServices.Submit(splitPDFJob);
                PDFServicesResponse<SplitPDFResult> pdfServicesResponse =
                    pdfServices.GetJobResult<SplitPDFResult>(location, typeof(SplitPDFResult));
                List<IAsset> resultAssets = pdfServicesResponse.Result.Assets;

                // Save the result to the specified location.
                int index = 0;
                foreach (IAsset resultAsset in resultAssets)
                {
                    // Get content from the resulting asset(s)
                    StreamAsset streamAsset = pdfServices.GetContent(resultAsset);
                    Stream outputStream =
                        File.OpenWrite(Directory.GetCurrentDirectory() + "/output/SplitPDFByPageRangesOutput_" + index + ".pdf");
                    streamAsset.Stream.CopyTo(outputStream);
                    outputStream.Close();
                    index++;
                }
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

const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    SplitPDFParams,
    SplitPDFJob,
    SplitPDFResult,
    PageRanges,
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
        readStream = fs.createReadStream("./splitPDFInput.pdf")
        const inputAsset = await pdfServices.upload({
            readStream,
            mimeType: MimeType.PDF
        });

        // Create the page ranges where each page range corresponds to a single output file
        const pageRanges = getPageRanges();

        // Create parameters for the job
        const params = new SplitPDFParams({pageRanges});

        // Creates a new job instance
        const job = new SplitPDFJob({inputAsset, params});

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: SplitPDFResult
        });

        // Get content from the resulting asset(s)
        const resultAssets = pdfServicesResponse.result.assets;

        for (let i = 0; i < resultAssets.length; i++) {
            const streamAsset = await pdfServices.getContent({asset: resultAssets[i]});

            // Creates an output stream and copy stream asset's content to it
            const _outputFilePath = "./SplitPDFByPageRangesOutput_" + i + ".pdf";
            console.log(`Saving asset at ${_outputFilePath}`);

            const writeStream = fs.createWriteStream(_outputFilePath);
            streamAsset.readStream.pipe(writeStream);
        }
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

const getPageRanges = () => {
    // Specify pages ranges.
    const pageRanges = new PageRanges();
    // Add page 1.
    pageRanges.addSinglePage(1);
    // Add pages 3 to 4.
    pageRanges.addRange(3, 4);
    return pageRanges;
};
```


#### Python

```python
# Get the samples from https://github.com/adobe/pdfservices-python-sdk-samples
# Run the sample:
# python src/splitpdf/split_pdf_by_page_ranges.py

# Initialize the logger
logging.basicConfig(level=logging.INFO)

class SplitPDFByPageRanges:
    def __init__(self):
        try:
            file = open('splitPDFInput.pdf', 'rb')
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

            page_ranges = self.get_page_ranges()

            # Create parameters for the job
            split_pdf_params = SplitPDFParams(page_ranges=page_ranges)

            # Creates a new job instance
            split_pdf_job = SplitPDFJob(input_asset, split_pdf_params)

            # Submit the job and gets the job result
            location = pdf_services.submit(split_pdf_job)
            pdf_services_response = pdf_services.get_job_result(location, SplitPDFResult)

            # Get content from the resulting asset(s)
            result_assets = pdf_services_response.get_result().get_assets()

            # Creates an output stream and copy stream asset's content to it
            output_file_path = 'splitPDFByPageRangesOutput.pdf'

            for i, result_asset in enumerate(result_assets):
                stream_asset: StreamAsset = pdf_services.get_content(result_asset)
                with open(f"{output_file_path}_{i}.pdf", "wb") as file:
                    file.write(stream_asset.get_input_stream())

        except (ServiceApiException, ServiceUsageException, SdkException) as e:
            logging.exception(f'Exception encountered while executing operation: {e}')

    @staticmethod
    def get_page_ranges() -> PageRanges:
        # Specify page ranges
        page_ranges = PageRanges()
        # Add page 1
        page_ranges.add_single_page(1)
        # Add pages 3 to 4
        page_ranges.add_range(3, 4)
        return page_ranges


if __name__ == "__main__":
    SplitPDFByPageRanges()

```

#### REST API 

```javascript
// Please refer our REST API docs for more information 
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
```

## Split PDF into number of files

As an alternative to creating smaller PDFs by specifying a set number of
pages or a page range, you can split PDFs by file count. In this case,
the operation creates the specified number of files with each containing
an identical number of pages (if possible).

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, REST API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.splitpdf.SplitPDFIntoNumberOfFiles
 
     public class SplitPDFIntoNumberOfFiles {
    
       // Initialize the logger.
       private static final Logger LOGGER = LoggerFactory.getLogger(SplitPDFIntoNumberOfFiles.class);
    
       public static void main(String[] args) {
           try (InputStream inputStream = Files.newInputStream(new File("src/main/resources/splitPDFInput.pdf").toPath())) {
                // Initial setup, create credentials instance
                Credentials credentials = new ServicePrincipalCredentials(
                        System.getenv("PDF_SERVICES_CLIENT_ID"),
                        System.getenv("PDF_SERVICES_CLIENT_SECRET"));
    
                // Creates a PDF Services instance
                PDFServices pdfServices = new PDFServices(credentials);
    
                // Creates an asset(s) from source file(s) and upload
                Asset asset = pdfServices.upload(inputStream, PDFServicesMediaType.PDF.getMediaType());
    
                // Create parameters for the job
                SplitPDFParams splitPDFParams = new SplitPDFParams();
                // Sets the number of documents to split the input PDF file into
                splitPDFParams.setFileCount(2);
    
                // Creates a new job instance
                SplitPDFJob splitPDFJob = new SplitPDFJob(asset, splitPDFParams);
    
                // Submit the job and gets the job result
                String location = pdfServices.submit(splitPDFJob);
                PDFServicesResponse<SplitPDFResult> pdfServicesResponse = pdfServices.getJobResult(location, SplitPDFResult.class);
    
                // Get content from the resulting asset(s)
                List<Asset> resultAssets = pdfServicesResponse.getResult().getAssets();
                
                Files.createDirectories(Paths.get("output/"));
                int index = 0;
                for (Asset resultAsset : resultAssets) {
                    StreamAsset streamAsset = pdfServices.getContent(resultAsset);
    
                    // Creates an output stream and copy stream asset's content to it
                    OutputStream outputStream = Files.newOutputStream(new File("output/SplitPDFIntoNumberOfFilesOutput_" + index + ".pdf").toPath());
                    LOGGER.info("Saving asset at output/SplitPDFIntoNumberOfFilesOutput_" + index + ".pdf");
                    IOUtils.copy(streamAsset.getInputStream(), outputStream);
                    outputStream.close();
                    index++;
                }
           } catch (IOException | ServiceApiException | SDKException | ServiceUsageException e) {
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
                // Initial setup, create credentials instance
                ICredentials credentials = new ServicePrincipalCredentials(
                    Environment.GetEnvironmentVariable("PDF_SERVICES_CLIENT_ID"),
                    Environment.GetEnvironmentVariable("PDF_SERVICES_CLIENT_SECRET"));

                // Creates a PDF Services instance
                PDFServices pdfServices = new PDFServices(credentials);

                // Creates an asset(s) from source file(s) and upload
                using Stream inputStream = File.OpenRead(@"splitPDFInput.pdf");
                IAsset asset = pdfServices.Upload(inputStream, PDFServicesMediaType.PDF.GetMIMETypeValue());

                // Create parameters for the job
                SplitPDFParams splitPDFParams = new SplitPDFParams();
                splitPDFParams.SetFileCount(2);

                // Creates a new job instance
                SplitPDFJob splitPDFJob = new SplitPDFJob(asset, splitPDFParams);

                // Submits the job and gets the job result
                String location = pdfServices.Submit(splitPDFJob);
                PDFServicesResponse<SplitPDFResult> pdfServicesResponse =
                    pdfServices.GetJobResult<SplitPDFResult>(location, typeof(SplitPDFResult));
                List<IAsset> resultAssets = pdfServicesResponse.Result.Assets;

                // Save the result to the specified location.
                int index = 0;
                foreach (IAsset resultAsset in resultAssets)
                {
                    // Get content from the resulting asset(s)
                    StreamAsset streamAsset = pdfServices.GetContent(resultAsset);
                    Stream outputStream =
                        File.OpenWrite(Directory.GetCurrentDirectory() + "/output/SplitPDFIntoNumberOfFilesOutput_" + index + ".pdf");
                    streamAsset.Stream.CopyTo(outputStream);
                    outputStream.Close();
                    index++;
                }
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
// node src/splitpdf/split-pdf-into-number-of-files.js

const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    SplitPDFParams,
    SplitPDFJob,
    SplitPDFResult,
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
        readStream = fs.createReadStream("./splitPDFInput.pdf")
        const inputAsset = await pdfServices.upload({
            readStream,
            mimeType: MimeType.PDF
        });

        // Create parameters for the job
        const params = new SplitPDFParams({
            fileCount: 2
        });

        // Creates a new job instance
        const job = new SplitPDFJob({inputAsset, params});

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: SplitPDFResult
        });

        // Get content from the resulting asset(s)
        const resultAssets = pdfServicesResponse.result.assets;

        for (let i = 0; i < resultAssets.length; i++) {
            const streamAsset = await pdfServices.getContent({asset: resultAssets[i]});

            // Creates an output stream and copy stream asset's content to it
            const _outputFilePath = "./SplitPDFIntoNumberOfFilesOutput_" + i + ".pdf";
            console.log(`Saving asset at ${_outputFilePath}`);

            const writeStream = fs.createWriteStream(_outputFilePath);
            streamAsset.readStream.pipe(writeStream);
        }
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
# Get the samples from https://github.com/adobe/pdfservices-python-sdk-samples
# Run the sample:
# python src/splitpdf/split_pdf_into_number_of_files.py

# Initialize the logger
logging.basicConfig(level=logging.INFO)

class SplitPDFIntoNumberOfFiles:
    def __init__(self):
        try:
            file = open('splitPDFInput.pdf', 'rb')
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

            # Create parameters for the job
            split_pdf_params = SplitPDFParams(file_count=2)

            # Creates a new job instance
            split_pdf_job = SplitPDFJob(input_asset, split_pdf_params)

            # Submit the job and gets the job result
            location = pdf_services.submit(split_pdf_job)
            pdf_services_response = pdf_services.get_job_result(location, SplitPDFResult)

            # Get content from the resulting asset(s)
            result_assets = pdf_services_response.get_result().get_assets()

            # Creates an output stream and copy stream asset's content to it
            output_file_path = 'splitPDFIntoNumberOfFilesOutput.pdf'

            for i, result_asset in enumerate(result_assets):
                stream_asset: StreamAsset = pdf_services.get_content(result_asset)
                with open(f"{output_file_path}_{i}.pdf", "wb") as file:
                    file.write(stream_asset.get_input_stream())

        except (ServiceApiException, ServiceUsageException, SdkException) as e:
            logging.exception(f'Exception encountered while executing operation: {e}')


if __name__ == "__main__":
    SplitPDFIntoNumberOfFiles()

```

#### REST API 

```javascript
// Please refer our REST API docs for more information 
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
```
