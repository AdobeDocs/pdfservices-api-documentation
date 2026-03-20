---
title: Export PDF | How Tos | PDF Services API | Adobe PDF Services
---
# Export PDF

Export a source PDF file into doc, docx, jpeg, png, pptx, rtf, xlsx.

## REST API 

See our public API Reference for : 
- [Export PDF to Office format or text files](../../../apis/#tag/Export-PDF)
- [Export PDF to Images](../../../apis/#tag/PDF-To-Images)

## Export a PDF

The sample below converts a PDF file into a number of [supported
formats](https://developer.adobe.com/document-services/docs/apis/#tag/Export-PDF)
such as:

-   Microsoft Office file formats
-   Text files

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, REST API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.exportpdf.ExportPDFToDOCX

public class ExportPDFToDOCX {

   // Initialize the logger.
   private static final Logger LOGGER = LoggerFactory.getLogger(ExportPDFToDOCX.class);

   public static void main(String[] args) {

     try (InputStream inputStream = Files.newInputStream(new File("src/main/resources/exportPDFInput.pdf").toPath())) {
        // Initial setup, create credentials instance
        Credentials credentials = new ServicePrincipalCredentials(
                System.getenv("PDF_SERVICES_CLIENT_ID"),
                System.getenv("PDF_SERVICES_CLIENT_SECRET"));

        // Creates a PDF Services instance
        PDFServices pdfServices = new PDFServices(credentials);

        // Creates an asset(s) from source file(s) and upload
        Asset asset = pdfServices.upload(inputStream, PDFServicesMediaType.PDF.getMediaType());

        // Create parameters for the job
        ExportPDFParams exportPDFParams = ExportPDFParams.exportPDFParamsBuilder(ExportPDFTargetFormat.DOCX)
                .build();

        // Creates a new job instance
        ExportPDFJob exportPDFJob = new ExportPDFJob(asset, exportPDFParams);

        // Submit the job and gets the job result
        String location = pdfServices.submit(exportPDFJob);
        PDFServicesResponse<ExportPDFResult> pdfServicesResponse = pdfServices.getJobResult(location, ExportPDFResult.class);

        // Get content from the resulting asset(s)
        Asset resultAsset = pdfServicesResponse.getResult().getAsset();
        StreamAsset streamAsset = pdfServices.getContent(resultAsset);

        // Creates an output stream and copy stream asset's content to it
        Files.createDirectories(Paths.get("output/"));
        OutputStream outputStream = Files.newOutputStream(new File("output/exportPdfOutput.docx").toPath());
        LOGGER.info("Saving asset at output/exportPdfOutput.docx");
        IOUtils.copy(streamAsset.getInputStream(), outputStream);
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
                // Initial setup, create credentials instance
                ICredentials credentials = new ServicePrincipalCredentials(
                    Environment.GetEnvironmentVariable("PDF_SERVICES_CLIENT_ID"),
                    Environment.GetEnvironmentVariable("PDF_SERVICES_CLIENT_SECRET"));

                // Creates a PDF Services instance
                PDFServices pdfServices = new PDFServices(credentials);

                // Creates an asset from source file and upload
                using Stream inputStream = File.OpenRead(@"exportPdfInput.pdf");
                IAsset asset = pdfServices.Upload(inputStream, PDFServicesMediaType.PDF.GetMIMETypeValue());

                // Create parameters for the job
                ExportPDFParams exportPDFParams = ExportPDFParams.ExportPDFParamsBuilder(ExportPDFTargetFormat.DOCX)
                    .Build();

                // Creates a new job instance
                ExportPDFJob exportPDFJob = new ExportPDFJob(asset, exportPDFParams);

                // Submits the job and gets the job result
                String location = pdfServices.Submit(exportPDFJob);
                PDFServicesResponse<ExportPDFResult> pdfServicesResponse =
                    pdfServices.GetJobResult<ExportPDFResult>(location, typeof(ExportPDFResult));

                // Get content from the resulting asset(s)
                IAsset resultAsset = pdfServicesResponse.Result.Asset;
                StreamAsset streamAsset = pdfServices.GetContent(resultAsset);

                // Creating output streams and copying stream asset's content to it
                Stream outputStream = File.OpenWrite(Directory.GetCurrentDirectory() + "/output/exportPdfOutput.docx");
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
    }
}
```

#### Node JS

```javascript
// Get the samples from http://www.adobe.com/go/pdftoolsapi_node_sample
// Run the sample:
// node src/exportpdf/export-pdf-to-docx.js

const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    ExportPDFJob,
    ExportPDFParams,
    ExportPDFTargetFormat,
    ExportPDFResult,
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
        readStream = fs.createReadStream("./exportPDFInput.pdf");
        const inputAsset = await pdfServices.upload({
            readStream,
            mimeType: MimeType.PDF
        });

        // Create parameters for the job
        const params = new ExportPDFParams({
            targetFormat: ExportPDFTargetFormat.DOCX
        });

        // Creates a new job instance
        const job = new ExportPDFJob({inputAsset, params});

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: ExportPDFResult
        });

        // Get content from the resulting asset(s)
        const resultAsset = pdfServicesResponse.result.asset;
        const streamAsset = await pdfServices.getContent({asset: resultAsset});

        // Creates an output stream and copy stream asset's content to it
        const outputFilePath = "./exportPDFToDOCXOutput.docx";
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
        readStream?.destroy();
    }
})();
```

#### Python

```python
# Get the samples https://github.com/adobe/pdfservices-python-sdk-samples
# Run the sample:
# python src/exportpdf/export_pdf_to_docx.py

# Initialize the logger
logging.basicConfig(level=logging.INFO)

class ExportPDFToDOCX:
    def __init__(self):
        try:
            file = open('./exportPDFInput.pdf', 'rb')
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

            # Create parameters for the job
            export_pdf_params = ExportPDFParams(target_format=ExportPDFTargetFormat.DOCX)

            # Creates a new job instance
            export_pdf_job = ExportPDFJob(input_asset=input_asset, export_pdf_params=export_pdf_params)

            # Submit the job and gets the job result
            location = pdf_services.submit(export_pdf_job)
            pdf_services_response = pdf_services.get_job_result(location, ExportPDFResult)

            # Get content from the resulting asset(s)
            result_asset: CloudAsset = pdf_services_response.get_result().get_asset()
            stream_asset: StreamAsset = pdf_services.get_content(result_asset)

            # Creates an output stream and copy stream asset's content to it
            output_file_path = 'output/ExportPDFToDOCX.docx'
            with open(output_file_path, "wb") as file:
                file.write(stream_asset.get_input_stream())

        except (ServiceApiException, ServiceUsageException, SdkException) as e:
            logging.exception(f'Exception encountered while executing operation: {e}')

if __name__ == "__main__":
    ExportPDFToDOCX()
```

#### REST API 

```javascript
// Please refer our REST API docs for more information 
// https://developer.adobe.com/document-services/docs/apis/#tag/Export-PDF

curl --location --request POST 'https://pdf-services.adobe.io/operation/exportpdf' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718",
    "targetFormat": "docx"
}'
```

## Export a PDF file to a DOCX file (apply OCR on the PDF file)

The sample below converts a PDF file into a number of [supported
formats](https://developer.adobe.com/document-services/docs/apis/#tag/Export-PDF)
such as:

-   Microsoft Office file formats
-   Text files

OCR processing is also performed on the input PDF file to extract text from images in the document.

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, REST API" />

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.exportpdf.ExportPDFToDOCXWithOCROption

public class ExportPDFToDOCXWithOCROption {

    // Initialize the logger.
    private static final Logger LOGGER = LoggerFactory.getLogger(ExportPDFToDOCXWithOCROption.class);

    public static void main(String[] args) {

        try (InputStream inputStream = Files.newInputStream(new File("src/main/resources/exportPDFInput.pdf").toPath())) {
            // Initial setup, create credentials instance
            Credentials credentials = new ServicePrincipalCredentials(
                    System.getenv("PDF_SERVICES_CLIENT_ID"),
                    System.getenv("PDF_SERVICES_CLIENT_SECRET"));

            // Creates a PDF Services instance
            PDFServices pdfServices = new PDFServices(credentials);

            // Creates an asset(s) from source file(s) and upload
            Asset asset = pdfServices.upload(inputStream, PDFServicesMediaType.PDF.getMediaType());

            // Create parameters for the job
            ExportPDFParams exportPDFParams = ExportPDFParams.exportPDFParamsBuilder(ExportPDFTargetFormat.DOCX)
                    .withExportOCRLocale(ExportOCRLocale.EN_US)
                    .build();

            // Creates a new job instance
            ExportPDFJob exportPDFJob = new ExportPDFJob(asset, exportPDFParams);

            // Submit the job and gets the job result
            String location = pdfServices.submit(exportPDFJob);
            PDFServicesResponse<ExportPDFResult> pdfServicesResponse = pdfServices.getJobResult(location, ExportPDFResult.class);

            // Get content from the resulting asset(s)
            Asset resultAsset = pdfServicesResponse.getResult().getAsset();
            StreamAsset streamAsset = pdfServices.getContent(resultAsset);

            // Creates an output stream and copy stream asset's content to it
            Files.createDirectories(Paths.get("output/"));
            OutputStream outputStream = Files.newOutputStream(new File("output/exportPDFWithOCROptionsOutput.docx").toPath());
            LOGGER.info("Saving asset at output/exportPDFWithOCROptionsOutput.docx");
            IOUtils.copy(streamAsset.getInputStream(), outputStream);
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
                // Initial setup, create credentials instance
                ICredentials credentials = new ServicePrincipalCredentials(
                    Environment.GetEnvironmentVariable("PDF_SERVICES_CLIENT_ID"),
                    Environment.GetEnvironmentVariable("PDF_SERVICES_CLIENT_SECRET"));

                // Creates a PDF Services instance
                PDFServices pdfServices = new PDFServices(credentials);

                // Creates an asset from source file and upload
                using Stream inputStream = File.OpenRead(@"exportPdfInput.pdf");
                IAsset asset = pdfServices.Upload(inputStream, PDFServicesMediaType.PDF.GetMIMETypeValue());

                // Create parameters for the job
                ExportPDFParams exportPDFParams = ExportPDFParams.ExportPDFParamsBuilder(ExportPDFTargetFormat.DOCX)
                    .WithExportOCRLocale(ExportOCRLocale.EN_US)
                    .Build();

                // Creates a new job instance
                ExportPDFJob exportPDFJob = new ExportPDFJob(asset, exportPDFParams);

                // Submits the job and gets the job result
                String location = pdfServices.Submit(exportPDFJob);
                PDFServicesResponse<ExportPDFResult> pdfServicesResponse =
                    pdfServices.GetJobResult<ExportPDFResult>(location, typeof(ExportPDFResult));

                // Get content from the resulting asset(s)
                IAsset resultAsset = pdfServicesResponse.Result.Asset;
                StreamAsset streamAsset = pdfServices.GetContent(resultAsset);

                // Creating output streams and copying stream asset's content to it
                Stream outputStream = File.OpenWrite(Directory.GetCurrentDirectory() + "/output/ExportPDFToDOCXWithOCROption.docx");
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
    }
}
```

#### Node JS

```javascript
// Get the samples from http://www.adobe.com/go/pdftoolsapi_node_sample
// Run the sample:
// node src/exportpdf/export-docx-to-pdf-with-ocr-options.js

const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    ExportPDFParams,
    ExportPDFTargetFormat,
    ExportOCRLocale,
    ExportPDFJob,
    ExportPDFResult,
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
        readStream = fs.createReadStream("./exportPDFInput.pdf");
        const inputAsset = await pdfServices.upload({
            readStream,
            mimeType: MimeType.PDF
        });

        // Create parameters for the job
        const params = new ExportPDFParams({
            targetFormat: ExportPDFTargetFormat.DOCX,
            ocrLocale: ExportOCRLocale.EN_US
        });

        // Creates a new job instance
        const job = new ExportPDFJob({inputAsset, params});

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: ExportPDFResult
        });

        // Get content from the resulting asset(s)
        const resultAsset = pdfServicesResponse.result.asset;
        const streamAsset = await pdfServices.getContent({asset: resultAsset});

        // Creates an output stream and copy stream asset's content to it
        const outputFilePath = "./ExportPDFToDOCXWithOCROption.docx";
        console.log(`Saving asset at ${outputFilePath}`);

        const outputStream = fs.createWriteStream(outputFilePath);
        streamAsset.readStream.pipe(outputStream);
    } catch (err) {
        if (err instanceof SDKError || err instanceof ServiceUsageError || err instanceof ServiceApiError) {
            console.log("Exception encountered while executing operation", err);
        } else {
            console.log("Exception encountered while executing operation", err);
        }
    }
})();
```

#### Python

```python
# Get the samples https://github.com/adobe/pdfservices-python-sdk-samples
# Run the sample:
# python src/exportpdf/export_pdf_to_docx_with_ocr_option.py

# Initialize the logger
logging.basicConfig(level=logging.INFO)

class ExportPDFToDOCXWithOCROption:
    def __init__(self):
        try:
            file = open('./exportPDFInput.pdf', 'rb')
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

            # Create parameters for the job
            export_pdf_params = ExportPDFParams(target_format=ExportPDFTargetFormat.DOCX, ocr_lang=ExportOCRLocale.EN_US)

            # Creates a new job instance
            export_pdf_job = ExportPDFJob(input_asset=input_asset, export_pdf_params=export_pdf_params)

            # Submit the job and gets the job result
            location = pdf_services.submit(export_pdf_job)
            pdf_services_response = pdf_services.get_job_result(location, ExportPDFResult)

            # Get content from the resulting asset(s)
            result_asset: CloudAsset = pdf_services_response.get_result().get_asset()
            stream_asset: StreamAsset = pdf_services.get_content(result_asset)

            # Creates an output stream and copy stream asset's content to it
            output_file_path = 'output/ExportPDFToDOCXWithOCROption.docx'
            with open(output_file_path, "wb") as file:
                file.write(stream_asset.get_input_stream())

        except (ServiceApiException, ServiceUsageException, SdkException) as e:
            logging.exception(f'Exception encountered while executing operation: {e}')

if __name__ == "__main__":
    ExportPDFToDOCXWithOCROption()
```

#### REST API

```javascript
// Please refer our REST API docs for more information 
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
```

## Export a PDF to images

The sample below converts a PDF file's pages to a list of JPEG images. 
Each image file name ends with "\_\<unpadded\_page\_index\_number\>". For example, a PDF file with 15
pages will generate 15 image files. The first file's name ends with
"\_1" and the last file's name ends with "\_15".

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, REST API" />

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.exportpdftoimages.ExportPDFToJPEG

 public class ExportPDFToJPEG {

   // Initialize the logger.
   private static final Logger LOGGER = LoggerFactory.getLogger(ExportPDFToJPEG.class);

   public static void main(String[] args) {
     try (InputStream inputStream = Files.newInputStream(new File("src/main/resources/exportPDFToImageInput.pdf").toPath())) {
        // Initial setup, create credentials instance
        Credentials credentials = new ServicePrincipalCredentials(
                System.getenv("PDF_SERVICES_CLIENT_ID"),
                System.getenv("PDF_SERVICES_CLIENT_SECRET"));

        // Creates a PDF Services instance
        PDFServices pdfServices = new PDFServices(credentials);

        // Creates an asset(s) from source file(s) and upload
        Asset asset = pdfServices.upload(inputStream, PDFServicesMediaType.PDF.getMediaType());

        // Create parameters for the job
        ExportPDFToImagesParams exportPDFToImagesParams = ExportPDFToImagesParams.exportPDFToImagesParamsBuilder(
                        ExportPDFToImagesTargetFormat.JPEG, ExportPDFToImagesOutputType.LIST_OF_PAGE_IMAGES).build();

        // Creates a new job instance
        ExportPDFToImagesJob exportPDFToImagesJob = new ExportPDFToImagesJob(asset, exportPDFToImagesParams);

        // Submit the job and gets the job result
        String location = pdfServices.submit(exportPDFToImagesJob);
        PDFServicesResponse<ExportPDFToImagesResult> pdfServicesResponse = pdfServices.getJobResult(location, ExportPDFToImagesResult.class);

        // Get content from the resulting asset(s)
        List<Asset> resultAssets = pdfServicesResponse.getResult().getAssets();
        
        Files.createDirectories(Paths.get("output/"));
        int index = 0;
        for(Asset resultAsset : resultAssets) {
            StreamAsset streamAsset = pdfServices.getContent(resultAsset);

            // Creates an output stream and copy stream asset's content to it
            OutputStream outputStream = Files.newOutputStream(new File("output/exportPDFToImagesOutput_" + index + ".jpeg").toPath());
            LOGGER.info("Saving asset at output/exportPDFToImagesOutput_" + index + ".jpeg");
            IOUtils.copy(streamAsset.getInputStream(), outputStream);
            index++;
        }
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
                // Initial setup, create credentials instance
                ICredentials credentials = new ServicePrincipalCredentials(
                    Environment.GetEnvironmentVariable("PDF_SERVICES_CLIENT_ID"),
                    Environment.GetEnvironmentVariable("PDF_SERVICES_CLIENT_SECRET"));

                // Creates a PDF Services instance
                PDFServices pdfServices = new PDFServices(credentials);

                // Creates an asset from source file and upload
                using Stream inputStream = File.OpenRead(@"exportPDFToImagesInput.pdf");
                IAsset asset = pdfServices.Upload(inputStream, PDFServicesMediaType.PDF.GetMIMETypeValue());

                // Create parameters for the job
                ExportPDFToImagesParams exportPDFToImagesParams = ExportPDFToImagesParams
                    .ExportPDFToImagesParamsBuilder(ExportPDFToImagesTargetFormat.JPEG,
                        ExportPDFToImagesOutputType.LIST_OF_PAGE_IMAGES)
                    .Build();

                // Creates a new job instance
                ExportPDFToImagesJob exportPDFToImagesJob = new ExportPDFToImagesJob(asset, exportPDFToImagesParams);

                // Submits the job and gets the job result
                String location = pdfServices.Submit(exportPDFToImagesJob);
                PDFServicesResponse<ExportPDFToImagesResult> pdfServicesResponse =
                    pdfServices.GetJobResult<ExportPDFToImagesResult>(location, typeof(ExportPDFToImagesResult));
                List<IAsset> resultAssets = pdfServicesResponse.Result.Assets;

                // Save the result to the specified location.
                int index = 0;
                foreach (IAsset resultAsset in resultAssets)
                {
                    // Get content from the resulting asset(s)
                    StreamAsset streamAsset = pdfServices.GetContent(resultAsset);
                    Stream outputStream =
                        File.OpenWrite(Directory.GetCurrentDirectory() + "/output/exportPDFToImagesOutput_" + index + ".jpeg");
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
// node src/exportpdftoimages/export-pdf-to-jpeg.js

const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    ExportPDFToImagesJob,
    ExportPDFToImagesTargetFormat,
    ExportPDFToImagesOutputType,
    ExportPDFToImagesParams,
    ExportPDFToImagesResult,
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
        readStream = fs.createReadStream("./exportPDFToImageInput.pdf");
        const inputAsset = await pdfServices.upload({
            readStream,
            mimeType: MimeType.PDF
        });

        // Create parameters for the job
        const params = new ExportPDFToImagesParams({
            targetFormat: ExportPDFToImagesTargetFormat.JPEG,
            outputType: ExportPDFToImagesOutputType.LIST_OF_PAGE_IMAGES
        });

        // Creates a new job instance
        const job = new ExportPDFToImagesJob({inputAsset, params});

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: ExportPDFToImagesResult
        });

        // Get content from the resulting asset(s)
        const resultAssets = pdfServicesResponse.result.assets;

        for (let i = 0; i < resultAssets.length; i++) {
            const _outputFilePath = "./exportPDFToImageOutput_${i}.jpeg";
            console.log(`Saving asset at ${_outputFilePath}`);

            const streamAsset = await pdfServices.getContent({asset: resultAssets[i]});

            // Creates an output stream and copy stream asset's content to it
            const outputStream = fs.createWriteStream(_outputFilePath);
            streamAsset.readStream.pipe(outputStream);
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
# Get the samples https://github.com/adobe/pdfservices-python-sdk-samples
# Run the sample:
# python python src/exportpdftoimages/export_pdf_to_jpeg.py

# Initialize the logger
logging.basicConfig(level=logging.INFO)

class ExportPDFtoJPEG:
    def __init__(self):
        try:
            file = open('./exportPDFToImageInput.pdf', 'rb')
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

            # Create parameters for the job
            export_pdf_to_images_params = ExportPDFtoImagesParams(
                export_pdf_to_images_target_format=ExportPDFToImagesTargetFormat.JPEG,
                export_pdf_to_images_output_type=ExportPDFToImagesOutputType.LIST_OF_PAGE_IMAGES
            )

            # Creates a new job instance
            export_pdf_to_images_job = ExportPDFtoImagesJob(
                input_asset=input_asset,
                export_pdf_to_images_params=export_pdf_to_images_params
            )

            # Submit the job and gets the job result
            location = pdf_services.submit(export_pdf_to_images_job)
            pdf_services_response = pdf_services.get_job_result(location, ExportPDFtoImagesResult)

            # Get content from the resulting asset(s)
            result_assets = pdf_services_response.get_result().get_assets()

            output_file_path = 'output/ExportPDFToImages'

            for(asset_index, asset) in enumerate(result_assets):
                save_output_file_path = f"{output_file_path}_{asset_index}.jpeg"
                stream_asset: StreamAsset = pdf_services.get_content(asset)
                # Creates an output stream and copy stream asset's content to it
                with open(save_output_file_path, "wb") as file:
                    file.write(stream_asset.get_input_stream())

        except (ServiceApiException, ServiceUsageException, SdkException) as e:
            logging.exception(f'Exception encountered while executing operation: {e}')

if __name__ == "__main__":
    ExportPDFtoJPEG()
```

#### REST API 

```javascript
// Please refer our REST API docs for more information 
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
```

## Export a PDF to zip of page images

The sample below converts a PDF file to one or more jpeg or png images. The resulting file is a ZIP archive containing one image per page of the source PDF file.

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, REST API" />

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.exportpdftoimages.ExportPDFToJPEGZip

  public class ExportPDFToJPEGZip {

    // Initialize the logger.
    private static final Logger LOGGER = LoggerFactory.getLogger(ExportPDFToJPEGZip.class);

    public static void main(String[] args) {
      try (InputStream inputStream = Files.newInputStream(new File("src/main/resources/exportPDFToImagesInput.pdf").toPath())) {
        // Initial setup, create credentials instance
        Credentials credentials = new ServicePrincipalCredentials(
                System.getenv("PDF_SERVICES_CLIENT_ID"),
                System.getenv("PDF_SERVICES_CLIENT_SECRET"));

        // Creates a PDF Services instance
        PDFServices pdfServices = new PDFServices(credentials);

        // Creates an asset(s) from source file(s) and upload
        Asset asset = pdfServices.upload(inputStream, PDFServicesMediaType.PDF.getMediaType());

        // Create parameters for the job
        ExportPDFToImagesParams exportPDFToImagesParams = ExportPDFToImagesParams.exportPDFToImagesParamsBuilder(
                        ExportPDFToImagesTargetFormat.JPEG, ExportPDFToImagesOutputType.ZIP_OF_PAGE_IMAGES).build();

        // Creates a new job instance
        ExportPDFToImagesJob exportPDFToImagesJob = new ExportPDFToImagesJob(asset, exportPDFToImagesParams);

        // Submit the job and gets the job result
        String location = pdfServices.submit(exportPDFToImagesJob);
        PDFServicesResponse<ExportPDFToImagesResult> pdfServicesResponse = pdfServices.getJobResult(location, ExportPDFToImagesResult.class);

        // Get content from the resulting asset(s)
        List<Asset> resultAssets = pdfServicesResponse.getResult().getAssets();
        StreamAsset streamAsset = pdfServices.getContent(resultAssets.get(0));

        LOGGER.info("Media type of the received asset is "+ streamAsset.getMimeType());

        // Creates an output stream and copy stream asset's content to it
        Files.createDirectories(Paths.get("output/"));
        OutputStream outputStream = Files.newOutputStream(new File("output/exportPDFToJPEGOutput.zip").toPath());
        LOGGER.info("Saving asset at output/exportPDFToJPEGOutput.zip");
        IOUtils.copy(streamAsset.getInputStream(), outputStream);
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
// cd ExportPDFToJPEGZip/
// dotnet run ExportPDFToJPEGZip.csproj

namespace ExportPDFToJPEGZip
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

                // Creates an asset from source file and upload
                using Stream inputStream = File.OpenRead(@"exportPdfToImageInput.pdf");
                IAsset asset = pdfServices.Upload(inputStream, PDFServicesMediaType.PDF.GetMIMETypeValue());

                // Create parameters for the job
                ExportPDFToImagesParams exportPDFToImagesParams = ExportPDFToImagesParams
                    .ExportPDFToImagesParamsBuilder(ExportPDFToImagesTargetFormat.JPEG,
                        ExportPDFToImagesOutputType.ZIP_OF_PAGE_IMAGES)
                    .Build();

                // Creates a new job instance
                ExportPDFToImagesJob exportPDFToImagesJob = new ExportPDFToImagesJob(asset, exportPDFToImagesParams);

                // Submits the job and gets the job result
                String location = pdfServices.Submit(exportPDFToImagesJob);
                PDFServicesResponse<ExportPDFToImagesResult> pdfServicesResponse =
                    pdfServices.GetJobResult<ExportPDFToImagesResult>(location, typeof(ExportPDFToImagesResult));

                // Get content from the resulting asset(s)
                List<IAsset> resultAssets = pdfServicesResponse.Result.Assets;
                StreamAsset streamAsset = pdfServices.GetContent(resultAssets[0]);

                // Creating output streams and copying stream asset's content to it
                Stream outputStream = File.OpenWrite(Directory.GetCurrentDirectory() + "/output/exportPDFToJPEGOutput.zip");
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
    }
}
```

#### Node JS

```javascript
// Get the samples from http://www.adobe.com/go/pdftoolsapi_node_sample
// Run the sample:
// node src/exportpdftoimages/export-pdf-to-jpeg-zip.js

const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    ExportPDFToImagesParams,
    ExportPDFToImagesTargetFormat,
    ExportPDFToImagesOutputType,
    ExportPDFToImagesJob,
    ExportPDFToImagesResult,
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
        readStream = fs.createReadStream("./exportPDFToImageInput.pdf");
        const inputAsset = await pdfServices.upload({
            readStream,
            mimeType: MimeType.PDF
        });

        // Create parameters for the job
        const params = new ExportPDFToImagesParams({
            targetFormat: ExportPDFToImagesTargetFormat.JPEG,
            outputType: ExportPDFToImagesOutputType.ZIP_OF_PAGE_IMAGES
        });

        // Creates a new job instance
        const job = new ExportPDFToImagesJob({inputAsset, params});

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: ExportPDFToImagesResult
        });

        // Get content from the resulting asset(s)
        const resultAsset = pdfServicesResponse.result.assets;
        const streamAsset = await pdfServices.getContent({asset: resultAsset[0]});

        // Creates an output stream and copy stream asset's content to it
        const outputFilePath = "./exportPDFToJPEGOutput.zip";
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
        readStream?.destroy();
    }
})();
```

#### Python

```python
# Get the samples https://github.com/adobe/pdfservices-python-sdk-samples
# Run the sample:
# python src/exportpdftoimages/export_pdf_to_jpeg_zip.py

# Initialize the logger
logging.basicConfig(level=logging.INFO)

class ExportPDFToJPEGZip:
    def __init__(self):
        try:
            file = open('./exportPDFToImageInput.pdf', 'rb')
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

            # Create parameters for the job
            export_pdf_to_images_params = ExportPDFtoImagesParams(
                export_pdf_to_images_target_format=ExportPDFToImagesTargetFormat.JPEG,
                export_pdf_to_images_output_type=ExportPDFToImagesOutputType.ZIP_OF_PAGE_IMAGES
            )

            # Creates a new job instance
            export_pdf_to_images_job = ExportPDFtoImagesJob(
                input_asset=input_asset,
                export_pdf_to_images_params=export_pdf_to_images_params
            )

            # Submit the job and gets the job result
            location = pdf_services.submit(export_pdf_to_images_job)
            pdf_services_response = pdf_services.get_job_result(location, ExportPDFtoImagesResult)

            # Get content from the resulting asset(s)
            result_assets = pdf_services_response.get_result().get_assets()
            stream_asset: StreamAsset = pdf_services.get_content(result_assets[0])

            output_file_path = 'output/ExportPDFToJPEGZip.zip'

            # Creates an output stream and copy stream asset's content to it
            with open(output_file_path, "wb") as file:
                file.write(stream_asset.get_input_stream())

        except (ServiceApiException, ServiceUsageException, SdkException) as e:
            logging.exception(f'Exception encountered while executing operation: {e}')

if __name__ == "__main__":
    ExportPDFToJPEGZip()
```

#### REST API 

```javascript
// Please refer our REST API docs for more information 
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
```
