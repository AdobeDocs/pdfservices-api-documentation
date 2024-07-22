---
title: Create PDF | How Tos | PDF Services API | Adobe PDF Services
---
# Create PDF

Create PDFs from a variety of formats, including static and dynamic HTML; Microsoft Word, PowerPoint, and Excel; as well as text, image, Zip, and URL. Support for HTML to PDF, DOC to PDF, DOCX to PDF, PPT to PDF, PPTX to PDF, XLS to PDF, XLSX to PDF, TXT to PDF, RTF to PDF, BMP to PDF, JPEG to PDF, GIF to PDF, TIFF to PDF, PNG to PDF

## REST API

See our public API Reference for :
- [Create PDF from Office formats](../../../apis/#tag/Create-PDF)
- [Create PDF from HTML](../../../apis/#tag/Html-To-PDF)

## Create a PDF

Use the sample below to create PDFs from Microsoft Office documents
(Word, Excel and PowerPoint) and other [supported file
formats](https://developer.adobe.com/document-services/docs/apis/#tag/Create-PDF).
While the example shows .docx file conversion, the SDK supports the
following formats:

-   Microsoft Word (DOC, DOCX)
-   Microsoft PowerPoint (PPT, PPTX)
-   Microsoft Excel (XLS, XLSX)
-   Text (TXT, RTF)
-   Image (BMP, JPEG, GIF, TIFF, PNG)

<InlineAlert slots="text"/>

If a Microsoft Word/PowerPoint input file has an embedded TrueType font, the output pdf will also contain the same embedded TrueType font.
For more information, refer [Benefits of embedding custom fonts](https://support.microsoft.com/en-us/office/benefits-of-embedding-custom-fonts-cb3982aa-ea76-4323-b008-86670f222dbc#OfficeVersion=Windows).

<InlineAlert slots="text"/>

We do not support HTML to PDF conversion for requests containing urls where:<br/>1. The URL Scheme is not HTTPS.<br/>2. The hostname resolves to a non-routable IP address. This encompasses scenarios where redirects lead to non-routable IP addresses as well.

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, REST API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.createpdf.CreatePDFFromDOCX

public class CreatePDFFromDOCX {

    // Initialize the logger. 
    private static final Logger LOGGER = LoggerFactory.getLogger(CreatePDFFromDOCX.class);

    public static void main(String[] args) {

        try (InputStream inputStream = Files.newInputStream(new File("src/main/resources/createPDFInput.docx").toPath())) {
            // Initial setup, create credentials instance
            Credentials credentials = new ServicePrincipalCredentials(
                    System.getenv("PDF_SERVICES_CLIENT_ID"),
                    System.getenv("PDF_SERVICES_CLIENT_SECRET"));

            // Creates a PDF Services instance
            PDFServices pdfServices = new PDFServices(credentials);

            // Creates an asset(s) from source file(s) and upload
            Asset asset = pdfServices.upload(inputStream, PDFServicesMediaType.DOCX.getMediaType());

            // Creates a new job instance
            CreatePDFJob createPDFJob = new CreatePDFJob(asset);

            // Submit the job and gets the job result
            String location = pdfServices.submit(createPDFJob);
            PDFServicesResponse<CreatePDFResult> pdfServicesResponse = pdfServices.getJobResult(location, CreatePDFResult.class);

            // Get content from the resulting asset(s)
            Asset resultAsset = pdfServicesResponse.getResult().getAsset();
            StreamAsset streamAsset = pdfServices.getContent(resultAsset);

            // Creates an output stream and copy stream asset's content to it
            File.createDirectories(Paths.get("output/"));
            OutputStream outputStream = Files.newOutputStream(new File("output/createPDFFromDOCX.pdf").toPath());
            LOGGER.info("Saving asset at output/createPDFFromDOCX.pdf");
            IOUtils.copy(streamAsset.getInputStream(), outputStream);
            outputStream.close();
        } catch (ServiceApiException | IOException | SDKException | ServiceUsageException ex) {
            LOGGER.error("Exception encountered while executing the operation", ex);
        }
    }
}
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd CreatePDFFromDocx/
// dotnet run CreatePDFFromDocx.csproj

namespace CreatePDFFromDocx
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
                using Stream inputStream = File.OpenRead(@"createPdfInput.docx");
                IAsset asset = pdfServices.Upload(inputStream, PDFServicesMediaType.DOCX.GetMIMETypeValue());

                // Creates a new job instance
                CreatePDFJob createPDFJob = new CreatePDFJob(asset);

                // Submits the job and gets the job result
                String location = pdfServices.Submit(createPDFJob);
                PDFServicesResponse<CreatePDFResult> pdfServicesResponse =
                    pdfServices.GetJobResult<CreatePDFResult>(location, typeof(CreatePDFResult));

                // Get content from the resulting asset(s)
                IAsset resultAsset = pdfServicesResponse.Result.Asset;
                StreamAsset streamAsset = pdfServices.GetContent(resultAsset);

                // Creating output streams and copying stream asset's content to it
                String outputFilePath = "/output/createPdfOutput.pdf";
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
    }
}
```

#### Node JS

```javascript
// Get the samples from http://www.adobe.com/go/pdftoolsapi_node_sample
// Run the sample:
// node src/createpdf/create-pdf-from-docx.js 

const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    CreatePDFJob,
    CreatePDFResult,
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
        readStream = fs.createReadStream("./createPDFInput.docx");
        const inputAsset = await pdfServices.upload({
            readStream,
            mimeType: MimeType.DOCX
        });

        // Creates a new job instance
        const job = new CreatePDFJob({inputAsset});

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: CreatePDFResult
        });

        // Get content from the resulting asset(s)
        const resultAsset = pdfServicesResponse.result.asset;
        const streamAsset = await pdfServices.getContent({asset: resultAsset});

        // Creates an output stream and copy result asset's content to it
        const outputFilePath = "./createPDFFromDOCX.pdf";
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
# python src/createpdf/create_pdf_from_docx.py

# Initialize the logger
logging.basicConfig(level=logging.INFO)

class CreatePDFFromDOCX:
    def __init__(self):
        try:
            file = open('./createPDFInput.docx', 'rb')
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
            input_asset = pdf_services.upload(input_stream=input_stream, mime_type=PDFServicesMediaType.DOCX)

            # Creates a new job instance
            create_pdf_job = CreatePDFJob(input_asset)

            # Submit the job and gets the job result
            location = pdf_services.submit(create_pdf_job)
            pdf_services_response = pdf_services.get_job_result(location, CreatePDFResult)

            # Get content from the resulting asset(s)
            result_asset: CloudAsset = pdf_services_response.get_result().get_asset()
            stream_asset: StreamAsset = pdf_services.get_content(result_asset)

            # Creates an output stream and copy stream asset's content to it
            output_file_path = 'output/CreatePDFFromDOCX.pdf'
            with open(output_file_path, "wb") as file:
                file.write(stream_asset.get_input_stream())

        except (ServiceApiException, ServiceUsageException, SdkException) as e:
            logging.exception(f'Exception encountered while executing operation: {e}')

if __name__ == "__main__":
    CreatePDFFromDOCX()
```

#### REST API

```javascript
// Please refer our REST API docs for more information 
// https://developer.adobe.com/document-services/docs/apis/#tag/Create-PDF

curl --location --request POST 'https://pdf-services.adobe.io/operation/createpdf' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718"
}'
```

## Create PDF with DocumentLanguage

Use the sample below to create PDFs with supported documentLanguage from
Microsoft Office documents (Word, Excel and PowerPoint). The example
shows .docx file conversion with english as the language of the input
file, the SDK supports the following formats:

-   Microsoft Word (DOC, DOCX)
-   Microsoft PowerPoint (PPT, PPTX)
-   Microsoft Excel (XLS, XLSX)
-   Text (TXT, RTF)

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, REST API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.createpdf.CreatePDFFromDOCXWithOptions

public class CreatePDFFromDOCXWithOptions {

      // Initialize the logger.
      private static final Logger LOGGER = LoggerFactory.getLogger(CreatePDFFromDOCXWithOptions.class);

      public static void main(String[] args) {

        try (InputStream inputStream = Files.newInputStream(new File("src/main/resources/createPDFInput.docx").toPath())) {
            // Initial setup, create credentials instance
            Credentials credentials = new ServicePrincipalCredentials(
                    System.getenv("PDF_SERVICES_CLIENT_ID"),
                    System.getenv("PDF_SERVICES_CLIENT_SECRET"));
    
            // Creates a PDF Services instance
            PDFServices pdfServices = new PDFServices(credentials);
    
            // Creates an asset(s) from source file(s) and upload
            Asset asset = pdfServices.upload(inputStream, PDFServicesMediaType.DOCX.getMediaType());
    
            // Create parameters for the job
            CreatePDFParams createPDFWordParams = CreatePDFParams.wordParamsBuilder().
                    withDocumentLanguage(DocumentLanguage.EN_US).
                    build();
    
            // Creates a new job instance
            CreatePDFJob createPDFJob = new CreatePDFJob(asset)
                    .setParams(createPDFWordParams);
    
            // Submit the job and gets the job result
            String location = pdfServices.submit(createPDFJob);
            PDFServicesResponse<CreatePDFResult> pdfServicesResponse = pdfServices.getJobResult(location, CreatePDFResult.class);
    
            // Get content from the resulting asset(s)
            Asset resultAsset = pdfServicesResponse.getResult().getAsset();
            StreamAsset streamAsset = pdfServices.getContent(resultAsset);
    
            // Creates an output stream and copy stream asset's content to it
            File.createDirectories(Paths.get("output/"));
            OutputStream outputStream = Files.newOutputStream(new File("output/createPDFFromDOCXWithOptionsOutput.pdf").toPath());
            LOGGER.info("Saving asset at output/createPDFFromDOCXWithOptionsOutput.pdf");
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
// cd CreatePDFFromDocxWithOptions/
// dotnet run CreatePDFFromDocxWithOptions.csproj

namespace CreatePDFFromDocxWithOptions
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
                using Stream inputStream = File.OpenRead(@"createPdfInput.docx");
                IAsset asset = pdfServices.Upload(inputStream, PDFServicesMediaType.DOCX.GetMIMETypeValue());

                // Create parameters for the job
                CreatePDFParams createPDFParams = CreatePDFParams.WordParamsBuilder()
                    .WithDocumentLanguage(DocumentLanguage.EN_US)
                    .Build();

                // Creates a new job instance
                CreatePDFJob createPDFJob = new CreatePDFJob(asset).SetParams(createPDFParams);

                // Submits the job and gets the job result
                String location = pdfServices.Submit(createPDFJob);
                PDFServicesResponse<CreatePDFResult> pdfServicesResponse =
                    pdfServices.GetJobResult<CreatePDFResult>(location, typeof(CreatePDFResult));

                // Get content from the resulting asset(s)
                IAsset resultAsset = pdfServicesResponse.Result.Asset;
                StreamAsset streamAsset = pdfServices.GetContent(resultAsset);

                // Creating output streams and copying stream asset's content to it
                String outputFilePath = "/output/createPDFFromDOCXWithOptionsOutput.pdf";
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
    }
}
```

#### Node JS

```javascript
// Get the samples from http://www.adobe.com/go/pdftoolsapi_node_sample
// Run the sample:
// node src/createpdf/create-pdf-from-docx-with-options.js

const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    CreatePDFJob,
    CreatePDFParams,
    CreatePDFResult,
    DocumentLanguage,
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
        readStream = fs.createReadStream("./createPDFInput.docx");
        const inputAsset = await pdfServices.upload({
            readStream,
            mimeType: MimeType.DOCX
        });

        // Create parameters for the job
        const params = new CreatePDFParams({
            documentLanguage: DocumentLanguage.EN_US
        });

        // Creates a new job instance
        const job = new CreatePDFJob({inputAsset, params});

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: CreatePDFResult
        });

        // Get content from the resulting asset(s)
        const resultAsset = pdfServicesResponse.result.asset;
        const streamAsset = await pdfServices.getContent({asset: resultAsset});

        // Creates an output stream and copy result asset's content to it
        const outputFilePath = "./createPDFFromDOCXWithOptionsOutput.pdf";
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
# python src/createpdf/create_pdf_from_docx_with_options.py

# Initialize the logger
logging.basicConfig(level=logging.INFO)

class CreatePDFFromDOCXWithOptions:
    def __init__(self):

        try:
            file = open('./createPDFInput.docx', 'rb')
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
            input_asset = pdf_services.upload(input_stream=input_stream, mime_type=PDFServicesMediaType.DOCX)

            # Create parameters for the job
            create_pdf_params = CreatePDFFromWordParams(document_language=DocumentLanguage.EN_US)

            # Creates a new job instance
            create_pdf_job = CreatePDFJob(input_asset=input_asset, create_pdf_params=create_pdf_params)

            # Submit the job and gets the job result
            location = pdf_services.submit(create_pdf_job)
            pdf_services_response = pdf_services.get_job_result(location, CreatePDFResult)

            # Get content from the resulting asset(s)
            result_asset: CloudAsset = pdf_services_response.get_result().get_asset()
            stream_asset: StreamAsset = pdf_services.get_content(result_asset)

            # Creates an output stream and copy stream asset's content to it
            output_file_path = 'output/CreatePDFFromDOCXWithOptions.pdf'
            with open(output_file_path, "wb") as file:
                file.write(stream_asset.get_input_stream())

        except (ServiceApiException, ServiceUsageException, SdkException) as e:
            logging.exception(f'Exception encountered while executing operation: {e}')

if __name__ == "__main__":
    CreatePDFFromDOCXWithOptions()
```

#### REST API

```javascript
// Please refer our REST API docs for more information 
// https://developer.adobe.com/document-services/docs/apis/#tag/Create-PDF

curl --location --request POST 'https://pdf-services.adobe.io/operation/createpdf' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718",
    "documentLanguage": "en-US"
}'
```

## Create a PDF from static HTML

The sample below creates a PDF file from a static HTML file. The file
must be local. Since HTML/web pages typically contain external assets,
the input file must be a zip file containing an index.html at the top
level of the archive as well as any dependencies such as images, css
files, and so on.

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, REST API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.htmltopdf.StaticHTMLToPDF

public class StaticHTMLToPDF {

  // Initialize the logger.
  private static final Logger LOGGER = LoggerFactory.getLogger(StaticHTMLToPDF.class);

  public static void main(String[] args) {

    try (InputStream inputStream = Files.newInputStream(new File("src/main/resources/createPDFFromStaticHtmlInput.zip").toPath())) {
       // Initial setup, create credentials instance
       Credentials credentials = new ServicePrincipalCredentials(
               System.getenv("PDF_SERVICES_CLIENT_ID"),
               System.getenv("PDF_SERVICES_CLIENT_SECRET"));

       // Creates a PDF Services instance
       PDFServices pdfServices = new PDFServices(credentials);

       // Creates an asset(s) from source file(s) and upload
       Asset asset = pdfServices.upload(inputStream, PDFServicesMediaType.ZIP.getMediaType());

       // Create parameters for the job
       HTMLToPDFParams htmlToPDFParams = getHTMLToPDFParams();

       // Creates a new job instance
       HTMLToPDFJob htmLtoPDFJob = new HTMLToPDFJob(asset)
               .setParams(htmlToPDFParams);

       // Submit the job and gets the job result
       String location = pdfServices.submit(htmLtoPDFJob);
       PDFServicesResponse<HTMLToPDFResult> pdfServicesResponse = pdfServices.getJobResult(location, HTMLToPDFResult.class);

       // Get content from the resulting asset(s)
       Asset resultAsset = pdfServicesResponse.getResult().getAsset();
       StreamAsset streamAsset = pdfServices.getContent(resultAsset);

       // Creates an output stream and copy stream asset's content to it
       File.createDirectories(Paths.get("output/"));
       OutputStream outputStream = Files.newOutputStream(new File("output/staticHTMLToPDFOutput.pdf").toPath());
       LOGGER.info("Saving asset at output/staticHTMLToPDFOutput.pdf");
       IOUtils.copy(streamAsset.getInputStream(), outputStream);
       outputStream.close();
    } catch (ServiceApiException | IOException | SDKException | ServiceUsageException ex) {
       LOGGER.error("Exception encountered while executing operation", ex);
    }
  }
   private static HTMLToPDFParams getHTMLToPDFParams() {
       // Define the page layout, in this case an 8 x 11.5 inch page (effectively portrait orientation)
       PageLayout pageLayout = new PageLayout();
       pageLayout.setPageSize(8, 11.5);

       return new HTMLToPDFParams.Builder()
           .includeHeaderFooter(true).withPageLayout(pageLayout)
           .build();
   }
}
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd StaticHTMLToPDF/
// dotnet run StaticHTMLToPDF.csproj

namespace StaticHTMLToPDF
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
                using Stream inputStream = File.OpenRead(@"createPDFFromStaticHtmlInput.zip");
                IAsset asset = pdfServices.Upload(inputStream, PDFServicesMediaType.ZIP.GetMIMETypeValue());

                // Create parameters for the job
                HTMLToPDFParams htmlToPDFParams = GetHTMLToPDFParams();

                // Creates a new job instance
                HTMLToPDFJob htmlToPDFJob = new HTMLToPDFJob(asset).SetParams(htmlToPDFParams);

                // Submits the job and gets the job result
                String location = pdfServices.Submit(htmlToPDFJob);
                PDFServicesResponse<HTMLToPDFResult> pdfServicesResponse =
                    pdfServices.GetJobResult<HTMLToPDFResult>(location, typeof(HTMLToPDFResult));

                // Get content from the resulting asset(s)
                IAsset resultAsset = pdfServicesResponse.Result.Asset;
                StreamAsset streamAsset = pdfServices.GetContent(resultAsset);

                // Creating output streams and copying stream asset's content to it
                String outputFilePath = "/output/createPdfFromStaticHtmlOutput.pdf";
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

        private static HTMLToPDFParams GetHTMLToPDFParams()
        {
            // Define the page layout, in this case an 8 x 11.5 inch page (effectively portrait orientation).
            PageLayout pageLayout = new PageLayout();
            pageLayout.SetPageSize(8, 11.5);

            // Set the desired HTML-to-PDF conversion options.
            HTMLToPDFParams htmlToPDFParams = HTMLToPDFParams.HTMLToPDFParamsBuilder()
                .IncludeHeaderFooter(true)
                .WithPageLayout(pageLayout)
                .Build();
            return htmlToPDFParams;
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
// node src/htmltopdf/static-html-to-pdf.js

const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    PageLayout,
    HTMLToPDFParams,
    HTMLToPDFResult,
    HTMLToPDFJob,
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
        readStream = fs.createReadStream("./createPDFFromStaticHtmlInput.zip");
        const inputAsset = await pdfServices.upload({
            readStream,
            mimeType: MimeType.ZIP
        });

        // Create parameters for the job
        const params = getHTMLToPDFParams();

        // Creates a new job instance
        const job = new HTMLToPDFJob({inputAsset, params});

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: HTMLToPDFResult
        });

        // Get content from the resulting asset(s)
        const resultAsset = pdfServicesResponse.result.asset;
        const streamAsset = await pdfServices.getContent({asset: resultAsset});

        // Creates an output stream and copy result asset's content to it
        const outputFilePath = "createPdfFromStaticHtmlOutput.pdf";
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

function getHTMLToPDFParams() {
    // Define the page layout, in this case an 8 x 11.5 inch page (effectively portrait orientation)
    const pageLayout = new PageLayout({
        pageHeight: 11.5,
        pageWidth: 8
    });

    return new HTMLToPDFParams({
        pageLayout,
        includeHeaderFooter: true,
    });
}
```

#### Python

```python
# Get the samples https://github.com/adobe/pdfservices-python-sdk-samples
# Run the sample:
# python src/htmltopdf/static_html_to_pdf.py

# Initialize the logger
logging.basicConfig(level=logging.INFO)

class StaticHTMLtoPDF:
    def __init__(self):
        try:
            file = open('./createPDFFromStaticHtmlInput.zip', 'rb')
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
            input_asset = pdf_services.upload(input_stream=input_stream, mime_type=PDFServicesMediaType.ZIP)

            # Create parameters for the job
            html_to_pdf_params = self.get_html_to_pdf_params()

            # Creates a new job instance
            html_to_pdf_job = HTMLtoPDFJob(input_asset=input_asset, html_to_pdf_params=html_to_pdf_params)

            # Submit the job and gets the job result
            location = pdf_services.submit(html_to_pdf_job)
            pdf_services_response = pdf_services.get_job_result(location, HTMLtoPDFResult)

            # Get content from the resulting asset(s)
            result_asset: CloudAsset = pdf_services_response.get_result().get_asset()
            stream_asset: StreamAsset = pdf_services.get_content(result_asset)

            # Creates an output stream and copy stream asset's content to it
            output_file_path = 'output/StaticHTMLToPDF.pdf'
            with open(output_file_path, "wb") as file:
                file.write(stream_asset.get_input_stream())

        except (ServiceApiException, ServiceUsageException, SdkException) as e:
            logging.exception(f'Exception encountered while executing operation: {e}')

    @staticmethod
    def get_html_to_pdf_params() -> HTMLtoPDFParams:
        # Define the page layout, in this case an 8 x 11.5 inch page (effectively portrait orientation)
        page_layout = PageLayout(page_height=11.5, page_width=8)
        return HTMLtoPDFParams(page_layout=page_layout, include_header_footer=True)

if __name__ == "__main__":
    StaticHTMLtoPDF()

```

#### REST API

```javascript
// Please refer our REST API docs for more information 
// https://developer.adobe.com/document-services/docs/apis/#tag/Html-To-PDF

curl --location --request POST 'https://pdf-services.adobe.io/operation/htmltopdf' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718",
    "json": "{}",
    "includeHeaderFooter": true,
    "pageLayout": {
        "pageWidth": 11,
        "pageHeight": 8.5
    }
}'
```

## Create a PDF from static HTML with inline CSS

The sample below creates a PDF file from a static HTML file with inline CSS. The file must be local.

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, REST API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.htmltopdf.HTMLWithInlineCSSToPDF

   public class HTMLWithInlineCSSToPDF {

    // Initialize the logger.
    private static final Logger LOGGER = LoggerFactory.getLogger(HTMLWithInlineCSSToPDF.class);

    public static void main(String[] args) {
      try (InputStream inputStream = Files.newInputStream(new File("src/main/resources/createPDFFromHTMLWithInlineCSSInput.html").toPath())) {
        // Initial setup, create credentials instance
        Credentials credentials = new ServicePrincipalCredentials(
                System.getenv("PDF_SERVICES_CLIENT_ID"),
                System.getenv("PDF_SERVICES_CLIENT_SECRET"));

        // Creates a PDF Services instance
        PDFServices pdfServices = new PDFServices(credentials);

        // Creates an asset(s) from source file(s) and upload
        Asset asset = pdfServices.upload(inputStream, PDFServicesMediaType.HTML.getMediaType());

        // Create parameters for the job
        HTMLToPDFParams htmlToPDFParams = getHTMLToPDFParams();

        // Creates a new job instance
        HTMLToPDFJob htmLtoPDFJob = new HTMLToPDFJob(asset)
                .setParams(htmlToPDFParams);

        // Submit the job and gets the job result
        String location = pdfServices.submit(htmLtoPDFJob);
        PDFServicesResponse<HTMLToPDFResult> pdfServicesResponse = pdfServices.getJobResult(location, HTMLToPDFResult.class);

        // Get content from the resulting asset(s)
        Asset resultAsset = pdfServicesResponse.getResult().getAsset();
        StreamAsset streamAsset = pdfServices.getContent(resultAsset);

        // Creates an output stream and copy stream asset's content to it
        File.createDirectories(Paths.get("output/"));
        OutputStream outputStream = Files.newOutputStream(new File("output/htmlWithInlineCSSToPDFOutput.pdf").toPath());
        LOGGER.info("Saving asset at output/htmlWithInlineCSSToPDFOutput.pdf");
        IOUtils.copy(streamAsset.getInputStream(), outputStream);
        outputStream.close();
      } catch (ServiceApiException | IOException | SDKException | ServiceUsageException ex) {
        LOGGER.error("Exception encountered while executing operation", ex);
      }
    }

    private static HTMLToPDFParams getHTMLToPDFParams() {
      // Define the page layout, in this case an 8 x 11.5 inch page (effectively portrait orientation)
      PageLayout pageLayout = new PageLayout();
      pageLayout.setPageSize(20, 25);

      return new HTMLToPDFParams.Builder()
          .includeHeaderFooter(true).withPageLayout(pageLayout)
          .build();
    }
}
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd HTMLWithInlineCSSToPDF/
// dotnet run HTMLWithInlineCSSToPDF.csproj

namespace HTMLWithInlineCSSToPDF
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
                using Stream inputStream = File.OpenRead(@"createPDFFromHTMLWithInlineCSSInput.html");
                IAsset asset = pdfServices.Upload(inputStream, PDFServicesMediaType.HTML.GetMIMETypeValue());

                // Create parameters for the job
                HTMLToPDFParams htmlToPDFParams = GetHTMLToPDFParams();

                // Creates a new job instance
                HTMLToPDFJob htmlToPDFJob = new HTMLToPDFJob(asset).SetParams(htmlToPDFParams);

                // Submits the job and gets the job result
                String location = pdfServices.Submit(htmlToPDFJob);
                PDFServicesResponse<HTMLToPDFResult> pdfServicesResponse =
                    pdfServices.GetJobResult<HTMLToPDFResult>(location, typeof(HTMLToPDFResult));

                // Get content from the resulting asset(s)
                IAsset resultAsset = pdfServicesResponse.Result.Asset;
                StreamAsset streamAsset = pdfServices.GetContent(resultAsset);

                // Creating output streams and copying stream asset's content to it
                String outputFilePath = "/output/createPDFFromHTMLWithInlineCSSOutput.pdf";
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

        private static HTMLToPDFParams GetHTMLToPDFParams()
        {
            // Define the page layout, in this case an 20 x 25 inch page (effectively portrait orientation).
            PageLayout pageLayout = new PageLayout();
            pageLayout.SetPageSize(20, 25);

            // Set the desired HTML-to-PDF conversion options.
            HTMLToPDFParams htmlToPDFParams = HTMLToPDFParams.HTMLToPDFParamsBuilder()
                .IncludeHeaderFooter(true)
                .WithPageLayout(pageLayout)
                .Build();
            return htmlToPDFParams;
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
// node src/htmltopdf/html-with-inline-css-to-pdf.js

const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    HTMLToPDFJob,
    HTMLToPDFResult,
    PageLayout,
    HTMLToPDFParams,
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
        readStream = fs.createReadStream("./createPDFFromHTMLWithInlineCSSInput.html");
        const inputAsset = await pdfServices.upload({
            readStream,
            mimeType: MimeType.HTML
        });

        // Create parameters for the job
        const params = getHTMLToPDFParams();

        // Creates a new job instance
        const job = new HTMLToPDFJob({inputAsset, params});

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: HTMLToPDFResult
        });

        // Get content from the resulting asset(s)
        const resultAsset = pdfServicesResponse.result.asset;
        const streamAsset = await pdfServices.getContent({asset: resultAsset});

        // Creates an output stream and copy result asset's content to it
        const outputFilePath = "./createPDFFromHTMLWithInlineCSSOutput.pdf";
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

function getHTMLToPDFParams() {
    // Define the page layout, in this case an 20 x 25 inch page (effectively portrait orientation)
    const pageLayout = new PageLayout({
        pageHeight: 25,
        pageWidth: 20
    });

    return new HTMLToPDFParams({
        pageLayout,
        includeHeaderFooter: true,
    });
}
```

#### Python

```python
# Get the samples https://github.com/adobe/pdfservices-python-sdk-samples
# Run the sample:
# python src/htmltopdf/html_with_inline_css_to_pdf.py

# Initialize the logger
logging.basicConfig(level=logging.INFO)

class HTMLWithInlineCSSToPDF:
    def __init__(self):
        try:
            file = open('./createPDFFromHTMLWithInlineCSSInput.html', 'rb')
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
            input_asset = pdf_services.upload(input_stream=input_stream, mime_type=PDFServicesMediaType.HTML)

            # Create parameters for the job
            html_to_pdf_params = self.get_html_to_pdf_params()

            # Creates a new job instance
            html_to_pdf_job = HTMLtoPDFJob(input_asset=input_asset, html_to_pdf_params=html_to_pdf_params)

            # Submit the job and gets the job result
            location = pdf_services.submit(html_to_pdf_job)
            pdf_services_response = pdf_services.get_job_result(location, HTMLtoPDFResult)

            # Get content from the resulting asset(s)
            result_asset: CloudAsset = pdf_services_response.get_result().get_asset()
            stream_asset: StreamAsset = pdf_services.get_content(result_asset)

            # Creates an output stream and copy stream asset's content to it
            output_file_path = 'output/HTMLWithInlineCSSToPDF.pdf'
            with open(output_file_path, "wb") as file:
                file.write(stream_asset.get_input_stream())

        except (ServiceApiException, ServiceUsageException, SdkException) as e:
            logging.exception(f'Exception encountered while executing operation: {e}')

    @staticmethod
    def get_html_to_pdf_params() -> HTMLtoPDFParams:
        # Define the page layout, in this case an 20 x 25 inch page (effectively portrait orientation)
        page_layout = PageLayout(page_height=25, page_width=20)
        return HTMLtoPDFParams(page_layout=page_layout, include_header_footer=True)


if __name__ == "__main__":
    HTMLWithInlineCSSToPDF()

```

#### REST API

```javascript
// Please refer our REST API docs for more information 
// https://developer.adobe.com/document-services/docs/apis/#tag/Html-To-PDF

curl --location --request POST 'https://pdf-services.adobe.io/operation/htmltopdf' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718",
    "json": "{}",
    "includeHeaderFooter": true,
    "pageLayout": {
        "pageWidth": 11,
        "pageHeight": 8.5
    }
}'
```

## Create a PDF File From HTML specified via URL

The sample below creates a PDF file from a HTML file specified via URL.

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, REST API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.htmltopdf.HTMLToPDFFromURL

  public class HTMLToPDFFromURL {

    // Initialize the logger.
    private static final Logger LOGGER = LoggerFactory.getLogger(HTMLToPDFFromURL.class);

    public static void main(String[] args) {

      try {
        // Initial setup, create credentials instance
        Credentials credentials = new ServicePrincipalCredentials(
                System.getenv("PDF_SERVICES_CLIENT_ID"),
                System.getenv("PDF_SERVICES_CLIENT_SECRET"));

        // Creates a PDF Services instance
        PDFServices pdfServices = new PDFServices(credentials);

        String htmlURL = "<HTML URL>";

        // Create parameters for the job
        HTMLToPDFParams htmlToPDFParams = getHTMLToPDFParams();

        // Creates a new job instance
        HTMLToPDFJob htmLtoPDFJob = new HTMLToPDFJob(htmlURL)
                .setParams(htmlToPDFParams);

        // Submit the job and gets the job result
        String location = pdfServices.submit(htmLtoPDFJob);
        PDFServicesResponse<HTMLToPDFResult> pdfServicesResponse = pdfServices.getJobResult(location, HTMLToPDFResult.class);

        // Get content from the resulting asset(s)
        Asset resultAsset = pdfServicesResponse.getResult().getAsset();
        StreamAsset streamAsset = pdfServices.getContent(resultAsset);

        // Creates an output stream and copy stream asset's content to it
        File.createDirectories(Paths.get("output/"));
        OutputStream outputStream = Files.newOutputStream(new File("output/htmlToPDFFromURLOutput.pdf").toPath());
        LOGGER.info("Saving asset at output/htmlToPDFFromURLOutput.pdf");
        IOUtils.copy(streamAsset.getInputStream(), outputStream);
      } catch (ServiceApiException | IOException | SDKException | ServiceUsageException ex) {
        LOGGER.error("Exception encountered while executing operation", ex);
      }
    }

    private static HTMLToPDFParams getHTMLToPDFParams() {
      // Define the page layout, in this case an 8 x 11.5 inch page (effectively portrait orientation)
      PageLayout pageLayout = new PageLayout();
      pageLayout.setPageSize(20, 25);

      return new HTMLToPDFParams.Builder()
              .includeHeaderFooter(true).withPageLayout(pageLayout)
              .build();
    }
}
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd HTMLToPDFFromURL/
// dotnet run HTMLToPDFFromURL.csproj

namespace HTMLToPDFFromURL
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

                String htmlURL = "https://www.adobe.io";

                // Create parameters for the job
                HTMLToPDFParams htmlToPDFParams = GetHTMLToPDFParams();

                // Creates a new job instance
                HTMLToPDFJob htmlToPDFJob = new HTMLToPDFJob(htmlURL).SetParams(htmlToPDFParams);

                // Submits the job and gets the job result
                String location = pdfServices.Submit(htmlToPDFJob);
                PDFServicesResponse<HTMLToPDFResult> pdfServicesResponse =
                    pdfServices.GetJobResult<HTMLToPDFResult>(location, typeof(HTMLToPDFResult));

                // Get content from the resulting asset(s)
                IAsset resultAsset = pdfServicesResponse.Result.Asset;
                StreamAsset streamAsset = pdfServices.GetContent(resultAsset);

                // Creating output streams and copying stream asset's content to it
                String outputFilePath = "/output/createPdfFromURLOutput.pdf";
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

        private static HTMLToPDFParams GetHTMLToPDFParams()
        {
            // Define the page layout, in this case an 20 x 25 inch page (effectively portrait orientation).
            PageLayout pageLayout = new PageLayout();
            pageLayout.SetPageSize(20, 25);

            // Set the desired HTML-to-PDF conversion options.
            HTMLToPDFParams htmlToPDFParams = HTMLToPDFParams.HTMLToPDFParamsBuilder()
                .IncludeHeaderFooter(true)
                .WithPageLayout(pageLayout)
                .Build();
            return htmlToPDFParams;
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
// node src/htmltopdf/html-to-pdf-from-url.js

const {
    ServicePrincipalCredentials,
    PDFServices,
    PageLayout,
    HTMLToPDFParams,
    HTMLToPDFResult,
    HTMLToPDFJob,
    SDKError,
    ServiceUsageError,
    ServiceApiError
} = require("@adobe/pdfservices-node-sdk");
const fs = require("fs");

(async () => {
    try {
        // Initial setup, create credentials instance
        const credentials = new ServicePrincipalCredentials({
            clientId: process.env.PDF_SERVICES_CLIENT_ID,
            clientSecret: process.env.PDF_SERVICES_CLIENT_SECRET
        });

        // Creates a PDF Services instance
        const pdfServices = new PDFServices({credentials});

        const inputURL = "<HTML_URL>";

        // Create parameters for the job
        const params = getHTMLToPDFParams();

        // Creates a new job instance
        const job = new HTMLToPDFJob({inputURL, params});

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: HTMLToPDFResult
        });

        // Get content from the resulting asset(s)
        const resultAsset = pdfServicesResponse.result.asset;
        const streamAsset = await pdfServices.getContent({asset: resultAsset});

        // Creates an output stream and copy result asset's content to it
        const outputFilePath = "./createPDFFromHTMLURL.pdf";
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

function getHTMLToPDFParams() {
    // Define the page layout, in this case an 8 x 11.5 inch page (effectively portrait orientation)
    const pageLayout = new PageLayout({
        pageHeight: 11.5,
        pageWidth: 8
    });

    return new HTMLToPDFParams({
        includeHeaderFooter: true,
        pageLayout
    });
}
```

#### Python

```python
# Get the samples https://github.com/adobe/pdfservices-python-sdk-samples
# Run the sample:
# python src/htmltopdf/html_to_pdf_from_url.py

# Initialize the logger
logging.basicConfig(level=logging.INFO)

class HTMLtoPDFFromURL:
    def __init__(self):
        try:
            # Initial setup, create credentials instance
            credentials = ServicePrincipalCredentials(
                client_id=os.getenv('PDF_SERVICES_CLIENT_ID'),
                client_secret=os.getenv('PDF_SERVICES_CLIENT_SECRET')
            )

            # Creates a PDF Services instance
            pdf_services = PDFServices(credentials=credentials)

            html_url = "<HTML URL>"

            # Create parameters for the job
            html_to_pdf_params = self.get_html_to_pdf_params()

            # Creates a new job instance
            html_to_pdf_job = HTMLtoPDFJob(input_url=html_url, html_to_pdf_params=html_to_pdf_params)

            # Submit the job and gets the job result
            location = pdf_services.submit(html_to_pdf_job)
            pdf_services_response = pdf_services.get_job_result(location, HTMLtoPDFResult)

            # Get content from the resulting asset(s)
            result_asset: CloudAsset = pdf_services_response.get_result().get_asset()
            stream_asset: StreamAsset = pdf_services.get_content(result_asset)

            # Creates an output stream and copy stream asset's content to it
            output_file_path = 'output/HTMLToPDFFromURL.pdf'
            with open(output_file_path, "wb") as file:
                file.write(stream_asset.get_input_stream())

        except (ServiceApiException, ServiceUsageException, SdkException) as e:
            logging.exception(f'Exception encountered while executing operation: {e}')

    @staticmethod
    def get_html_to_pdf_params() -> HTMLtoPDFParams:
        # Define the page layout
        page_layout = PageLayout(page_height=25, page_width=20)
        return HTMLtoPDFParams(page_layout=page_layout, include_header_footer=True)


if __name__ == "__main__":
    HTMLtoPDFFromURL()

```

#### REST API

```javascript
// Please refer our REST API docs for more information 
// https://developer.adobe.com/document-services/docs/apis/#tag/Html-To-PDF

curl --location --request POST 'https://pdf-services.adobe.io/operation/htmltopdf' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "inputUrl": "https://developer.adobe.com/document-services/homepage",
    "json": "{}",
    "includeHeaderFooter": true,
    "pageLayout": {
        "pageWidth": 11,
        "pageHeight": 8.5
    }
}'
```

## Create a PDF from dynamic HTML

To support workflows with dynamic data, `DynamicHTMLToPDF`
creates PDFs from dynamic HTML. It's a common scenario for enterprise to
provide end users with an HTML template with form fields. This API
allows you to capture the users unique data entries and then save it as
PDF. Collected data is stored in a JSON file, and the source HTML file
must include `<script src='./json.js' type='text/javascript'></script>`.
Refer to the API docs for usage.

The sample `DynamicHTMLToPDF` converts a zip file, containing
the input HTML file and its resources, along with the input data to a
PDF file. The input data is used by the JavaScript in the HTML file to
manipulate the HTML DOM, thus effectively updating the source HTML file.
This mechanism can be used to provide data to the template HTML
dynamically prior to PDF conversion.

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, REST API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.htmltopdf.DynamicHTMLToPDF
 public class DynamicHTMLToPDF {

   // Initialize the logger.
   private static final Logger LOGGER = LoggerFactory.getLogger(DynamicHTMLToPDF.class);

   public static void main(String[] args) {

     try (InputStream inputStream = Files.newInputStream(new File("src/main/resources/createPDFFromDynamicHtmlInput.zip").toPath())) {
        // Initial setup, create credentials instance
        Credentials credentials = new ServicePrincipalCredentials(
                System.getenv("PDF_SERVICES_CLIENT_ID"),
                System.getenv("PDF_SERVICES_CLIENT_SECRET"));

        // Creates a PDF Services instance
        PDFServices pdfServices = new PDFServices(credentials);

        // Creates an asset(s) from source file(s) and upload
        Asset asset = pdfServices.upload(inputStream, PDFServicesMediaType.ZIP.getMediaType());

        // Create parameters for the job
        HTMLToPDFParams htmlToPDFParams = getHTMLToPDFParams();

        // Creates a new job instance
        HTMLToPDFJob htmLtoPDFJob = new HTMLToPDFJob(asset)
                .setParams(htmlToPDFParams);

        // Submit the job and gets the job result
        String location = pdfServices.submit(htmLtoPDFJob);
        PDFServicesResponse<HTMLToPDFResult> pdfServicesResponse = pdfServices.getJobResult(location, HTMLToPDFResult.class);

        // Get content from the resulting asset(s)
        Asset resultAsset = pdfServicesResponse.getResult().getAsset();
        StreamAsset streamAsset = pdfServices.getContent(resultAsset);

        // Creates an output stream and copy stream asset's content to it
        File.createDirectories(Paths.get("output/"));
        OutputStream outputStream = Files.newOutputStream(new File("output/dynamicHTMLToPDFOutput.pdf").toPath());
        LOGGER.info("Saving asset at output/dynamicHTMLToPDFOutput.pdf");
        IOUtils.copy(streamAsset.getInputStream(), outputStream);
        outputStream.close();
     } catch (ServiceApiException | IOException | SDKException | ServiceUsageException ex) {
       LOGGER.error("Exception encountered while executing operation", ex);
     }
   }
   
   private static HTMLToPDFParams getHTMLToPDFParams() {
     // Define the page layout, in this case an 8 x 11.5 inch page (effectively portrait orientation)
     PageLayout pageLayout = new PageLayout();
     pageLayout.setPageSize(8, 11.5);

     // Sets the dataToMerge field that needs to be populated in the HTML before its conversion
     JSONObject dataToMerge = new JSONObject();
     dataToMerge.put("title","Create, Convert PDFs and More!");
     dataToMerge.put("sub_title","Easily integrate PDF actions within your document workflows.");

     return new HTMLToPDFParams.Builder()
             .includeHeaderFooter(true).withPageLayout(pageLayout).withDataToMerge(dataToMerge)
             .build();
   }
}
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd DynamicHTMLToPDF/
// dotnet run DynamicHTMLToPDF.csproj

namespace DynamicHTMLToPDF
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
                using Stream inputStream = File.OpenRead(@"createPDFFromDynamicHtmlInput.zip");
                IAsset asset = pdfServices.Upload(inputStream, PDFServicesMediaType.ZIP.GetMIMETypeValue());

                // Create parameters for the job
                HTMLToPDFParams htmlToPDFParams = GetHTMLToPDFParams();

                // Creates a new job instance
                HTMLToPDFJob htmlToPDFJob = new HTMLToPDFJob(asset).SetParams(htmlToPDFParams);

                // Submits the job and gets the job result
                String location = pdfServices.Submit(htmlToPDFJob);
                PDFServicesResponse<HTMLToPDFResult> pdfServicesResponse =
                    pdfServices.GetJobResult<HTMLToPDFResult>(location, typeof(HTMLToPDFResult));

                // Get content from the resulting asset(s)
                IAsset resultAsset = pdfServicesResponse.Result.Asset;
                StreamAsset streamAsset = pdfServices.GetContent(resultAsset);

                // Creating output streams and copying stream asset's content to it
                String outputFilePath = "/output/createPdfFromDynamicHtmlOutput.pdf";
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

        private static HTMLToPDFParams GetHTMLToPDFParams()
        {
            // Define the page layout, in this case an 8 x 11.5 inch page (effectively portrait orientation).
            PageLayout pageLayout = new PageLayout();
            pageLayout.SetPageSize(8, 11.5);

            //Set the dataToMerge field that needs to be populated in the HTML before its conversion
            JObject dataToMerge = new JObject
            {
                { "title", "Create, Convert PDFs and More!" },
                { "sub_title", "Easily integrate PDF actions within your document workflows." }
            };

            // Set the desired HTML-to-PDF conversion options.
            HTMLToPDFParams htmlToPDFParams = HTMLToPDFParams.HTMLToPDFParamsBuilder()
                .IncludeHeaderFooter(true)
                .WithPageLayout(pageLayout)
                .WithDataToMerge(dataToMerge)
                .Build();
            return htmlToPDFParams;
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
// node src/htmltopdf/dynamic-html-to-pdf.js

const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    PageLayout,
    HTMLToPDFParams,
    HTMLToPDFResult,
    HTMLToPDFJob,
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
        readStream = fs.createReadStream("./createPDFFromDynamicHtmlInput.zip");
        const inputAsset = await pdfServices.upload({
            readStream,
            mimeType: MimeType.ZIP
        });

        // Create parameters for the job
        const params = getHTMLToPDFParams();

        // Creates a new job instance
        const job = new HTMLToPDFJob({inputAsset, params});

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: HTMLToPDFResult
        });

        // Get content from the resulting asset(s)
        const resultAsset = pdfServicesResponse.result.asset;
        const streamAsset = await pdfServices.getContent({asset: resultAsset});

        // Creates an output stream and copy result asset's content to it
        const outputFilePath = "./createPDFFromDynamicHtmlOutput.pdf";
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

function getHTMLToPDFParams() {
    // Define the page layout, in this case an 8 x 11.5 inch page (effectively portrait orientation)
    const pageLayout = new PageLayout({
        pageHeight: 11.5,
        pageWidth: 8
    });

    // Set the dataToMerge field that needs to be populated in the HTML before its conversion
    const dataToMerge = {
        "title": "Create, Convert PDFs and More!",
        "sub_title": "Easily integrate PDF actions within your document workflows."
    };

    return new HTMLToPDFParams({
        pageLayout,
        dataToMerge,
        includeHeaderFooter: true,
    });
}
```

#### Python

```python
# Get the samples https://github.com/adobe/pdfservices-python-sdk-samples
# Run the sample:
# python src/htmltopdf/dynamic_html_to_pdf.py

# Initialize the logger
logging.basicConfig(level=logging.INFO)

class DynamicHTMLToPDF:
    def __init__(self):
        try:
            file = open('./createPDFFromDynamicHtmlInput.zip', 'rb')
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
            input_asset = pdf_services.upload(input_stream=input_stream, mime_type=PDFServicesMediaType.ZIP)

            # Create parameters for the job
            html_to_pdf_params = self.get_html_to_pdf_params()

            # Creates a new job instance
            html_to_pdf_job = HTMLtoPDFJob(input_asset=input_asset, html_to_pdf_params=html_to_pdf_params)

            # Submit the job and gets the job result
            location = pdf_services.submit(html_to_pdf_job)
            pdf_services_response = pdf_services.get_job_result(location, HTMLtoPDFResult)

            # Get content from the resulting asset(s)
            result_asset: CloudAsset = pdf_services_response.get_result().get_asset()
            stream_asset: StreamAsset = pdf_services.get_content(result_asset)

            # Creates an output stream and copy stream asset's content to it
            output_file_path = 'output/DynamicHTMLToPDF.pdf'
            with open(output_file_path, "wb") as file:
                file.write(stream_asset.get_input_stream())

        except (ServiceApiException, ServiceUsageException, SdkException) as e:
            logging.exception(f'Exception encountered while executing operation: {e}')

    @staticmethod
    def get_html_to_pdf_params() -> HTMLtoPDFParams:
        # Define the page layout, in this case an 8 x 11.5 inch page (effectively portrait orientation)
        page_layout = PageLayout(page_height=11.5, page_width=8)
        # Sets the dataToMerge field that needs to be populated in the HTML before its conversion
        data_to_merge = {
            "title": "Create, Convert PDFs and More!",
            "sub_title": "Easily integrate PDF actions within your document workflows."
        }
        return HTMLtoPDFParams(page_layout=page_layout, json=json.dumps(data_to_merge))


if __name__ == "__main__":
    DynamicHTMLToPDF()
```

#### REST API 

```javascript
// Please refer our REST API docs for more information 
// https://developer.adobe.com/document-services/docs/apis/#tag/Html-To-PDF

curl --location --request POST 'https://pdf-services.adobe.io/operation/htmltopdf' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718",
    "json": "{}",
    "includeHeaderFooter": true,
    "pageLayout": {
        "pageWidth": 11,
        "pageHeight": 8.5
    }
}'
```
