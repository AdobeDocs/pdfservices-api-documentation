---
title: PDF to Markdown | Adobe PDF Services
description: Learn about the PDF to Markdown service that converts PDF documents into well-formatted llm-friendly Markdown text.
---

# PDF to Markdown

The PDF to Markdown API (included with the PDF Services API) is a cloud-based web service that automatically converts PDF documents – native or scanned – into well-formatted llm-friendly Markdown text. This service preserves the document's structure and formatting while converting it into a format that's widely used for LLM flows, content authoring and documentation.

## Structured Information Output Format

The output of a PDF to Markdown operation includes:

- A primary `.md` file containing the converted Markdown content

### Output Structure

The following is a summary of key elements in the converted Markdown:

#### Elements

Ordered list of semantic elements converted from the PDF document, preserving the natural reading order and document structure. The conversion handles:

- Text content with proper Markdown syntax
- Document hierarchy and structure
- Inline formatting and emphasis
- Links and references
- Images and figures
- Tables and complex layouts

#### Content Types

The API processes various content types as follows:

##### Text Elements

- **Headings**: Converted to appropriate Markdown heading levels (H1-H6)
- **Paragraphs**: Preserved with proper spacing and formatting
- **Lists**: Both ordered and unordered lists with proper nesting
- **Text Emphasis**: Bold, italic, and other text formatting
- **Links**: Preserved with proper Markdown link syntax

##### Images and Figures

- Provided as base64-embedded images in the Markdown output
- Referenced correctly in the Markdown output
- Original quality preserved
- Proper alt text and captions maintained

##### Tables

- Converted to Markdown table syntax
- Column alignment preserved
- Cell content formatting maintained
- Complex table structures supported

#### Element Types and Paths

The API recognizes and converts the following structural elements:

| Category  | Element Type      | Description                                               |
| --------- | ----------------- | --------------------------------------------------------- |
| Aside     | Aside             | Content which is not part of regular content flow         |
| Figure    | Figure            | Non-reflowable constructs like graphs, images, flowcharts |
| Footnote  | Footnote          | Footnote                                                  |
| Headings  | H, H1, H2, etc    | Heading levels                                            |
| List      | L, Li, Lbl, Lbody | List and list item elements                               |
| Paragraph | P, ParagraphSpan  | Paragraphs and paragraph segments                         |
| Reference | Reference         | Links                                                     |
| Section   | Sect              | Logical section of the document                           |
| StyleSpan | StyleSpan         | Styling variations within text                            |
| Table     | Table, TD, TH, TR | Table elements                                            |
| Title     | Title             | Document title                                            |

### Reading Order

The reading order in the output Markdown maintains:

- Natural document flow
- Proper content hierarchy
- Column-based layouts
- Page transitions
- Inline elements and references

## Use Cases

The PDF to Markdown API is particularly valuable for:

- LLM-friendly content ingestion and prompt creation
- Training/Fine-tuning LLM with PDFs
- Content migration from PDF to documentation platforms
- Legacy document conversion
- Content repurposing for modern documentation systems
- Integration with Markdown-based workflows
- Automated document processing pipelines
- Searchable internal knowledge repositories

## API Limitations

### File Constraints

- **File Size**: Maximum of 100MB per file
- **Page Count**:
  - Non-scanned PDFs: Up to 400 pages
  - Scanned PDFs: Up to 150 pages
- **Page Dimensions**: Between 6" and 17.5" in either dimension

### Processing Limits

- **Rate Limits**: Maximum 25 requests per minute
- **Language Support**: Optimized for English, supports other Latin-based languages
- **OCR Quality**: Dependent on scan quality (minimum 200 DPI recommended)

### Document Requirements

- Files must be unprotected or allow content copying
- No support for:
  - Hidden objects (JavaScript, OCG)
  - XFA and fillable forms
  - Complex annotations
  - CAD drawings or vector art
  - Password-protected content

## REST API

See our public API Reference for [PDF to Markdown API](../../../apis/#tag/PDF-To-Markdown).

## Convert PDF to Markdown

The sample below extracts text element information from a PDF document and returns a Markdown file.

Please refer the [API usage guide](./api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, REST API" />

#### Java

```javascript
// Get the samples from https://github.com/adobe/pdfservices-java-sdk-samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.pdftomarkdown.PDFToMarkdown

public class PDFToMarkdown {
    // Initialize the logger.
    private static final Logger LOGGER = LoggerFactory.getLogger(PDFToMarkdown.class);

    public static void main(String[] args) {

        try (InputStream inputStream = Files.newInputStream(new File("src/main/resources/pdfToMarkdownInput.pdf").toPath())) {
            // Initial setup, create credentials instance
            Credentials credentials = new ServicePrincipalCredentials(
                    System.getenv("PDF_SERVICES_CLIENT_ID"),
                    System.getenv("PDF_SERVICES_CLIENT_SECRET"));

            // Creates a PDF Services instance
            PDFServices pdfServices = new PDFServices(credentials);

            // Creates an asset from source file and upload
            Asset asset = pdfServices.upload(inputStream, PDFServicesMediaType.PDF.getMediaType());

            // Creates a new job instance
            PDFToMarkdownJob pdfToMarkdownJob = new PDFToMarkdownJob(asset);

            // Submit the job and gets the job result
            String location = pdfServices.submit(pdfToMarkdownJob);
            PDFServicesResponse<PDFToMarkdownResult> pdfServicesResponse = pdfServices.getJobResult(location, PDFToMarkdownResult.class);

            // Get content from the resulting asset
            Asset resultAsset = pdfServicesResponse.getResult().getAsset();
            StreamAsset streamAsset = pdfServices.getContent(resultAsset);

            // Creates an output stream and copy stream asset's content to it
            Files.createDirectories(Paths.get("output/"));
            String outputFilePath = "output/pdfToMarkdownOutput.zip";
            LOGGER.info(String.format("Saving asset at %s", outputFilePath));
            OutputStream outputStream = Files.newOutputStream(new File(outputFilePath).toPath());
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
// Get the samples from https://github.com/adobe/PDFServices.NET.SDK.Samples
// Run the sample:
// cd PDFToMarkdown/
// dotnet run PDFToMarkdown.csproj

namespace PDFToMarkdown
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
                using Stream inputStream = File.OpenRead(@"pdfToMarkdownInput.pdf");
                IAsset asset = pdfServices.Upload(inputStream, PDFServicesMediaType.PDF.GetMIMETypeValue());

                // Creates a new job instance
                PDFToMarkdownJob pdfToMarkdownJob = new PDFToMarkdownJob(asset);

                // Submits the job and gets the job result
                String location = pdfServices.Submit(pdfToMarkdownJob);
                PDFServicesResponse<PDFToMarkdownResult> pdfServicesResponse =
                    pdfServices.GetJobResult<PDFToMarkdownResult>(location, typeof(PDFToMarkdownResult));

                // Get content from the resulting asset
                IAsset resultAsset = pdfServicesResponse.Result.Asset;
                StreamAsset streamAsset = pdfServices.GetContent(resultAsset);

                // Creating output streams and copying stream asset's content to it
                String outputFilePath = "/output/pdfToMarkdownOutput.zip";
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
// Get the samples from https://github.com/adobe/pdfservices-node-sdk-samples
// Run the sample:
// node src/pdftomarkdown/pdf-to-markdown.js

const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    PDFToMarkdownJob,
    PDFToMarkdownResult,
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

        // Creates an asset from source file and upload
        readStream = fs.createReadStream("./pdfToMarkdownInput.pdf");
        const inputAsset = await pdfServices.upload({
            readStream,
            mimeType: MimeType.PDF
        });

        // Creates a new job instance
        const job = new PDFToMarkdownJob({inputAsset});

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: PDFToMarkdownResult
        });

        // Get content from the resulting asset
        const resultAsset = pdfServicesResponse.result.asset;
        const streamAsset = await pdfServices.getContent({asset: resultAsset});

        // Creates an output stream and copy stream asset's content to it
        const outputFilePath = "./pdfToMarkdownOutput.zip";
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
# python src/pdftomarkdown/pdf_to_markdown.py

# Initialize the logger
logging.basicConfig(level=logging.INFO)

class PDFToMarkdown:
    def __init__(self):
        try:
            file = open('./pdfToMarkdownInput.pdf', 'rb')
            input_stream = file.read()
            file.close()

            # Initial setup, create credentials instance
            credentials = ServicePrincipalCredentials(
                client_id=os.getenv('PDF_SERVICES_CLIENT_ID'),
                client_secret=os.getenv('PDF_SERVICES_CLIENT_SECRET')
            )

            # Creates a PDF Services instance
            pdf_services = PDFServices(credentials=credentials)

            # Creates an asset from source file and upload
            input_asset = pdf_services.upload(input_stream=input_stream,
                                              mime_type=PDFServicesMediaType.PDF)

            # Creates a new job instance
            pdf_to_markdown_job = PDFToMarkdownJob(input_asset=input_asset)

            # Submit the job and gets the job result
            location = pdf_services.submit(pdf_to_markdown_job)
            pdf_services_response = pdf_services.get_job_result(location, PDFToMarkdownResult)

            # Get content from the resulting asset
            result_asset: CloudAsset = pdf_services_response.get_result().get_asset()
            stream_asset: StreamAsset = pdf_services.get_content(result_asset)

            # Creates an output stream and copy stream asset's content to it
            output_file_path = 'output/PDFToMarkdown.zip'
            with open(output_file_path, "wb") as file:
                file.write(stream_asset.get_input_stream())

        except (ServiceApiException, ServiceUsageException, SdkException) as e:
            logging.exception(f'Exception encountered while executing operation: {e}')

if __name__ == "__main__":
    PDFToMarkdown()
```

#### REST API

```javascript
// Please refer our REST API docs for more information 
// https://developer.adobe.com/document-services/docs/apis/#tag/PDF-To-Markdown

curl --location --request POST 'https://pdf-services.adobe.io/operation/pdftomarkdown' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718"
}'
```

## Convert PDF to Markdown with Options

The sample below extracts text element information from a PDF document and returns a Markdown file with the `getFigures` option enabled to extract figures and images in base64 format.

Please refer the [API usage guide](./api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, REST API" />

#### Java

```javascript
// Get the samples from https://github.com/adobe/pdfservices-java-sdk-samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.pdftomarkdown.PDFToMarkdownWithOptions

public class PDFToMarkdownWithOptions {
    // Initialize the logger.
    private static final Logger LOGGER = LoggerFactory.getLogger(PDFToMarkdownWithOptions.class);

    public static void main(String[] args) {

        try (InputStream inputStream = Files.newInputStream(new File("src/main/resources/pdfToMarkdownInput.pdf").toPath())) {
            // Initial setup, create credentials instance
            Credentials credentials = new ServicePrincipalCredentials(
                    System.getenv("PDF_SERVICES_CLIENT_ID"),
                    System.getenv("PDF_SERVICES_CLIENT_SECRET"));

            // Creates a PDF Services instance
            PDFServices pdfServices = new PDFServices(credentials);

            // Creates an asset from source file and upload
            Asset asset = pdfServices.upload(inputStream, PDFServicesMediaType.PDF.getMediaType());

            // Create parameters for the job
            PDFToMarkdownParams pdfToMarkdownParams = PDFToMarkdownParams.pdfToMarkdownParamsBuilder()
                    .withGetFigures(true)
                    .build();

            // Creates a new job instance
            PDFToMarkdownJob pdfToMarkdownJob = new PDFToMarkdownJob(asset).setParams(pdfToMarkdownParams);

            // Submit the job and gets the job result
            String location = pdfServices.submit(pdfToMarkdownJob);
            PDFServicesResponse<PDFToMarkdownResult> pdfServicesResponse = pdfServices.getJobResult(location, PDFToMarkdownResult.class);

            // Get content from the resulting asset
            Asset resultAsset = pdfServicesResponse.getResult().getAsset();
            StreamAsset streamAsset = pdfServices.getContent(resultAsset);

            // Creates an output stream and copy stream asset's content to it
            Files.createDirectories(Paths.get("output/"));
            String outputFilePath = "output/pdfToMarkdownWithOptionsOutput.zip";
            LOGGER.info(String.format("Saving asset at %s", outputFilePath));
            OutputStream outputStream = Files.newOutputStream(new File(outputFilePath).toPath());
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
// Get the samples from https://github.com/adobe/PDFServices.NET.SDK.Samples
// Run the sample:
// cd PDFToMarkdown/
// dotnet run PDFToMarkdownWithOptions.csproj

namespace PDFToMarkdownWithOptions
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
                using Stream inputStream = File.OpenRead(@"pdfToMarkdownInput.pdf");
                IAsset asset = pdfServices.Upload(inputStream, PDFServicesMediaType.PDF.GetMIMETypeValue());

                // Create parameters for the job
                PDFToMarkdownParams pdfToMarkdownParams = PDFToMarkdownParams.PDFToMarkdownParamsBuilder()
                    .WithGetFigures(true)
                    .Build();

                // Creates a new job instance
                PDFToMarkdownJob pdfToMarkdownJob = new PDFToMarkdownJob(asset).SetParams(pdfToMarkdownParams);

                // Submits the job and gets the job result
                String location = pdfServices.Submit(pdfToMarkdownJob);
                PDFServicesResponse<PDFToMarkdownResult> pdfServicesResponse =
                    pdfServices.GetJobResult<PDFToMarkdownResult>(location, typeof(PDFToMarkdownResult));

                // Get content from the resulting asset
                IAsset resultAsset = pdfServicesResponse.Result.Asset;
                StreamAsset streamAsset = pdfServices.GetContent(resultAsset);

                // Creating output streams and copying stream asset's content to it
                String outputFilePath = "/output/pdfToMarkdownWithOptionsOutput.zip";
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
// Get the samples from https://github.com/adobe/pdfservices-node-sdk-samples
// Run the sample:
// node src/pdftomarkdown/pdf-to-markdown-with-options.js

const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    PDFToMarkdownJob,
    PDFToMarkdownParams,
    PDFToMarkdownResult,
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

        // Creates an asset from source file and upload
        readStream = fs.createReadStream("./pdfToMarkdownInput.pdf");
        const inputAsset = await pdfServices.upload({
            readStream,
            mimeType: MimeType.PDF
        });

        // Create parameters for the job
        const params = new PDFToMarkdownParams({
            getFigures: true
        });

        // Creates a new job instance
        const job = new PDFToMarkdownJob({inputAsset, params});

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: PDFToMarkdownResult
        });

        // Get content from the resulting asset
        const resultAsset = pdfServicesResponse.result.asset;
        const streamAsset = await pdfServices.getContent({asset: resultAsset});

        // Creates an output stream and copy stream asset's content to it
        const outputFilePath = "./pdfToMarkdownWithOptionsOutput.zip";
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
# python src/pdftomarkdown/pdf_to_markdown_with_options.py

# Initialize the logger
logging.basicConfig(level=logging.INFO)

class PDFToMarkdownWithOptions:
    def __init__(self):
        try:
            file = open('./pdfToMarkdownInput.pdf', 'rb')
            input_stream = file.read()
            file.close()

            # Initial setup, create credentials instance
            credentials = ServicePrincipalCredentials(
                client_id=os.getenv('PDF_SERVICES_CLIENT_ID'),
                client_secret=os.getenv('PDF_SERVICES_CLIENT_SECRET')
            )

            # Creates a PDF Services instance
            pdf_services = PDFServices(credentials=credentials)

            # Creates an asset from source file and upload
            input_asset = pdf_services.upload(input_stream=input_stream,
                                              mime_type=PDFServicesMediaType.PDF)

            # Create parameters for the job with figures extraction enabled
            pdf_to_markdown_params = PDFToMarkdownParams(get_figures=True)

            # Creates a new job instance
            pdf_to_markdown_job = PDFToMarkdownJob(input_asset=input_asset,
                                                   pdf_to_markdown_params=pdf_to_markdown_params)

            # Submit the job and gets the job result
            location = pdf_services.submit(pdf_to_markdown_job)
            pdf_services_response = pdf_services.get_job_result(location, PDFToMarkdownResult)

            # Get content from the resulting asset
            result_asset: CloudAsset = pdf_services_response.get_result().get_asset()
            stream_asset: StreamAsset = pdf_services.get_content(result_asset)

            # Creates an output stream and copy stream asset's content to it
            output_file_path = 'output/PDFToMarkdownWithOptions.zip'
            with open(output_file_path, "wb") as file:
                file.write(stream_asset.get_input_stream())

        except (ServiceApiException, ServiceUsageException, SdkException) as e:
            logging.exception(f'Exception encountered while executing operation: {e}')

if __name__ == "__main__":
    PDFToMarkdownWithOptions()
```

#### REST API

```javascript
// Please refer our REST API docs for more information 
// https://developer.adobe.com/document-services/docs/apis/#tag/PDF-To-Markdown

curl --location --request POST 'https://pdf-services.adobe.io/operation/pdftomarkdown' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718",
    "getFigures": true
}'
```
