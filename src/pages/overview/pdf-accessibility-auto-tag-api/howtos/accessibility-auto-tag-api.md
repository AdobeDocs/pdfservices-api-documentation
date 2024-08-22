---
title: Accessibility API | How Tos | PDF Accessibility Auto-Tag API | Adobe PDF Services
---
# PDF Accessibility Auto-Tag API

## API Output Format

The output of the PDF Accessibility Auto-Tag API contains the following:

- The tagged PDF file.
- A report in XLSX format, if the report generation was enabled. This report provides information related to the tags found in the original document, if any, and the auto-tagged document.

## API limitations

<br />

- **File size:** Files up to a maximum of 100 MB are supported.
- **Number of Pages:** Non-scanned PDFs up to 200 pages and scanned PDFs up to 100 pages are supported, however limits may be lower for files with a large number of tables.
- **Rate limits:** Keep request rate below 25 requests per minute.
- **Page Size:** The API supports standard page sizes not more than 17.5” or less than 6” in either dimension.
- **Hidden Objects:** PDF files that contain content that is not visible on the page like JavaScript, OCG (optional content groups), etc are not supported. Files that contain such hidden information may fail to process. For such cases, [removing hidden content](https://helpx.adobe.com/acrobat/using/removing-sensitive-content-pdfs.html) prior to processing files again may return a successful result.
- **Language:** The API is currently optimized for English language content. Files containing content in French, German, Spanish, Danish, Dutch, Norwegian (Bokmal), Galician, Catalan, Finnish, Italian, Swedish, Portuguese, and Romanian should return good results most of the time. Files containing content in Afrikaans, Bosnian, Croatian, Czech, Hungarian, Indonesian, Malay, Polish, Russian, Serbian, Turkish, Hindi, Marathi and other similar languages should return good results often. Non-English files may have issues with non-English punctuation. OCR is configured for English content.
- **OCR and Scan quality:** The quality of text extracted from scanned files is dependent on the clarity of content in the input file and is currently configured for English content. Conditions like skewed pages, shadowing, obscured or overlapping fonts, and page resolution less than 200 DPI can all result in lower quality text output.
- **Form fields:** Files containing XFA and other fillable form elements are not supported.
- **Unprotected files:** The API supports files that are unprotected or where security restrictions allow editing of content. Files that are secured and do not allow editing of content will not be processed. If the password of a protected PDF is known, the permissions of the file can be modified using the PDF Services API as shown [here](../../pdf-services-api/howtos/remove-protection.md).
- **Annotations:** Content in PDF files containing annotations such as highlights and sticky notes will be processed, but annotations that obscure text could impact output quality. Text within annotations will not be included in the output.
- **PDF Producers:** The PDF Accessibility Auto-Tag API is designed to add tags to PDF to make it easier to make the file accessible. Files created from applications that produce other types of content like illustrations, CAD drawings or other types of vector art may not return high quality results.
- **PDF Collections:** PDFs that are made from a collection of files including PDF Portfolios are not currently supported.

## Error codes

| Scenario                      | Error code                    | Error message                                                                                  |
| ----------------------------- | ----------------------------- |------------------------------------------------------------------------------------------------|
| Unknown error/ failure	    | ERROR                         | Unexpected error                                                                               |
| Timeout	                    | TIMEOUT		                | Unexpected error: Processing timeout                                                           |
| Disqualified	                | DISQUALIFIED		            | File is not suitable for conversion                                                            |
| Unsupported XFA file	        | DISQUALIFIED_XFA	        	| File is not suitable for conversion: File contains an XFA form                                 |
| Page limit violation	        | DISQUALIFIED_PAGE_LIMIT		| File is not suitable for conversion: File exceeds page limit                                   |
| Scan page limit violation	    | DISQUALIFIED_SCAN_PAGE_LIMIT	| File is not suitable for conversion: Scanned file exceeds page limit                           |
| File size violation	        | DISQUALIFIED_FILE_SIZE		| File is not suitable for conversion: File exceeds size limit                                   |
| Encryption permission	        | DISQUALIFIED_PERMISSIONS		| File is not suitable for conversion: File permissions do not allow conversion                  |
| Complex file	                | DISQUALIFIED_COMPLEX_FILE		| File is not suitable for conversion: File content is too complex                               |
| Unsupported language	        | DISQUALIFIED_LANGUAGE		    | File is not suitable for conversion: File content language is unsupported                      |
| Bad PDF	                    | BAD_PDF		                | The PDF file is damaged or its content is too complex                                          |
| Bad PDF file type	            | BAD_PDF_FILE_TYPE		        | The input file is not a PDF file                                                               |
| Damaged input file	        | BAD_PDF_DAMAGED		        | The input file is damaged                                                                      |
| Complex table	                | BAD_PDF_COMPLEX_TABLE		    | The input file contains a table that is too complex to process                                 |
| Complex content	            | BAD_PDF_COMPLEX_INPUT		    | The input file contains content that is too complex to process                                 |
| Unsupported font	            | BAD_PDF_UNSUPPORTED_FONT		| The input file contains font data that is corrupted or not supported                           |
| Large PDF file	            | BAD_PDF_LARGE_FILE		    | The input file size exceeds the maximum allowed                                                |
| Protected PDF	                | PROTECTED_PDF		            | PDF is encrypted or password-protected                                                         |
| Empty or corrupted input	    | BAD_INPUT		                | Input is corrupted or empty                                                                    |
| Invalid input parameters	    | BAD_INPUT_PARAMS		        | Invalid input parameters                                                                       |
| User not enrolled to allowed Atlas plans | INVALID_PLAN_CODE | Unauthorized to execute this operation. User is not enrolled to plans allowed for the service  | 

## REST API 

See our public API Reference for [PDF Accessibility Auto-Tag API](../../../apis/#tag/PDF-Accessibility-Auto-Tag).

## Generate tagged PDF from a PDF

The sample below generates a tagged PDF from a PDF.

Please refer to the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, REST API" /> 

#### Java

```javascript
// Get the samples from https://github.com/adobe/pdfservices-java-sdk-samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.autotagpdf.AutotagPDF

public class AutotagPDF {
    // Initialize the logger.
    private static final Logger LOGGER = LoggerFactory.getLogger(AutotagPDF.class);

    public static void main(String[] args) {

        try (InputStream inputStream = Files.newInputStream(new File("src/main/resources/autotagPDFInput.pdf").toPath())) {
            // Initial setup, create credentials instance
            Credentials credentials = new ServicePrincipalCredentials(
                System.getenv("PDF_SERVICES_CLIENT_ID"),
                System.getenv("PDF_SERVICES_CLIENT_SECRET"));
        
            // Creates a PDF Services instance
            PDFServices pdfServices = new PDFServices(credentials);
        
            // Creates an asset(s) from source file(s) and upload
            Asset asset = pdfServices.upload(inputStream, PDFServicesMediaType.PDF.getMediaType());
        
            // Creates a new job instance
            AutotagPDFJob autotagPDFJob = new AutotagPDFJob(asset);
        
            // Submit the job and gets the job result
            String location = pdfServices.submit(autotagPDFJob);
            PDFServicesResponse<AutotagPDFResult> pdfServicesResponse = pdfServices.getJobResult(location, AutotagPDFResult.class);
        
            // Get content from the resulting asset(s)
            Asset resultAsset = pdfServicesResponse.getResult().getTaggedPDF();
            StreamAsset streamAsset = pdfServices.getContent(resultAsset);
        
            // Creates an output stream and copy stream asset's content to it
            Files.createDirectories(Paths.get("output/"));
            OutputStream outputStream = Files.newOutputStream(new File("output/autotagPDFOutput.pdf").toPath());
            LOGGER.info("Saving asset at output/autotagPDFOutput.pdf");
            IOUtils.copy(streamAsset.getInputStream(), outputStream);
            outputStream.close();
        } catch (ServiceApiException | IOException | SDKException | ServiceUsageException ex) {
            LOGGER.error("Exception encountered while executing operation", ex);
        }
    }
```

#### .NET

```javascript
// Get the samples from https://github.com/adobe/PDFServices.NET.SDK.Samples
// Run the sample:
// cd AutotagPDF/
// dotnet run AutotagPDF.csproj


namespace AutotagPDF
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

                // Creates an asset(s) from source file(s) and upload
                using Stream inputStream = File.OpenRead(@"autotagPdfInput.pdf");
                IAsset asset = pdfServices.Upload(inputStream, PDFServicesMediaType.PDF.GetMIMETypeValue());

                // Creates a new job instance
                AutotagPDFJob autotagPDFJob = new AutotagPDFJob(asset);

                // Submits the job and gets the job result
                String location = pdfServices.Submit(autotagPDFJob);
                PDFServicesResponse<AutotagPDFResult> pdfServicesResponse =
                    pdfServices.GetJobResult<AutotagPDFResult>(location, typeof(AutotagPDFResult));

                // Get content from the resulting asset(s)
                IAsset resultAsset = pdfServicesResponse.Result.TaggedPDF;
                StreamAsset streamAsset = pdfServices.GetContent(resultAsset);

                // Creating output streams and copying stream asset's content to it
                String outputFilePath = "/output/autotagPDFOutput.pdf";
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
// node src/autotagpdf/autotag-pdf.js

const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    AutotagPDFJob,
    AutotagPDFResult,
    SDKError,
    ServiceUsageError,
    ServiceApiError,
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
        readStream = fs.createReadStream("./autotagPDFInput.pdf");
        const inputAsset = await pdfServices.upload({
            readStream,
            mimeType: MimeType.PDF
        });

        // Creates a new job instance
        const job = new AutotagPDFJob({inputAsset});

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: AutotagPDFResult
        });

        // Get content from the resulting asset(s)
        const resultAsset = pdfServicesResponse.result.taggedPDF;
        const streamAsset = await pdfServices.getContent({asset: resultAsset});

        // Creates an output stream and copy stream asset's content to it
        const outputFilePath = "./autotag-tagged.pdf";
        console.log(`Saving asset at ${outputFilePath}`);

        let writeStream = fs.createWriteStream(outputFilePath);
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

#### Python

```python
# Get the samples from https://github.com/adobe/pdfservices-python-sdk-samples
# Run the sample:
# python src/autotagpdf/autotag_pdf.py

# Initialize the logger
logging.basicConfig(level=logging.INFO)

class AutoTagPDF:
    def __init__(self):
        try:
            file = open('autotagPDFInput.pdf', 'rb')
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

            # Creates a new job instance
            autotag_pdf_job = AutotagPDFJob(input_asset)

            # Submit the job and gets the job result
            location = pdf_services.submit(autotag_pdf_job)
            pdf_services_response = pdf_services.get_job_result(location, AutotagPDFResult)

            # Get content from the resulting asset(s)
            result_asset: CloudAsset = pdf_services_response.get_result().get_tagged_pdf()
            stream_asset: StreamAsset = pdf_services.get_content(result_asset)

            # Creates an output stream and copy stream asset's content to it
            output_file_path = 'autoTagPDFOutput.pdf'
            with open(output_file_path, "wb") as file:
                file.write(stream_asset.get_input_stream())

        except (ServiceApiException, ServiceUsageException, SdkException) as e:
            logging.exception(f'Exception encountered while executing operation: {e}')


if __name__ == "__main__":
    AutoTagPDF()

```

#### REST API 

```javascript
// Please refer our REST API docs for more information 
// https://developer.adobe.com/document-services/docs/apis/#tag/PDF-Accessibility-Auto-Tag

curl --location --request POST 'https://pdf-services.adobe.io/operation/autotag' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718"
}'
```

## Generate tagged PDF by setting options with command line arguments

The sample below generates a tagged PDF by setting options through command line arguments.

Here is a sample list of command line arguments and their description:
- --input < input file path >
- --output < output file path >
- --report { If this argument is present then the output will be generated with the report }
- --shift_headings { If this argument is present then the headings will be shifted in the output PDF file }


<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Python" /> 

#### Java

```javascript
// Get the samples from https://github.com/adobe/pdfservices-java-sdk-samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.autotagpdf.AutotagPDFParamaterised

public class AutotagPDFParameterised {

    private static final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(AutotagPDFParameterised.class);

    public static void main(String[] args) {
        LOGGER.info("--input " + getInputFilePathFromCmdArgs(args));
        LOGGER.info("--output " + getOutputFilePathFromCmdArgs(args));
        LOGGER.info("--report " + getGenerateReportFromCmdArgs(args));
        LOGGER.info("--shift_headings " + getShiftHeadingsFromCmdArgs(args));
        
        try (InputStream inputStream = Files.newInputStream(new File(getInputFilePathFromCmdArgs(args)).toPath())) {
            // Initial setup, create credentials instance
            Credentials credentials = new ServicePrincipalCredentials(
                System.getenv("PDF_SERVICES_CLIENT_ID"),
                System.getenv("PDF_SERVICES_CLIENT_SECRET"));
        
            // Creates a PDF Services instance
            PDFServices pdfServices = new PDFServices(credentials);
        
            // Creates an asset(s) from source file(s) and upload
            Asset asset = pdfServices.upload(inputStream, PDFServicesMediaType.PDF.getMediaType());
        
            // Create parameters for the job
            AutotagPDFParams autotagPDFParams = getOptionsFromCmdArgs(args);
        
            // Creates a new job instance
            AutotagPDFJob autotagPDFJob = new AutotagPDFJob(asset)
                .setParams(autotagPDFParams);
        
            // Submit the job and gets the job result
            String location = pdfServices.submit(autotagPDFJob);
            PDFServicesResponse<AutotagPDFResult> pdfServicesResponse = pdfServices.getJobResult(location, AutotagPDFResult.class);
        
            // Get content from the resulting asset(s)
            Asset resultAsset = pdfServicesResponse.getResult().getTaggedPDF();
            Asset resultAssetReport = pdfServicesResponse.getResult().getReport();
            StreamAsset streamAsset = pdfServices.getContent(resultAsset);
            StreamAsset streamAssetReport = (autotagPDFParams != null && autotagPDFParams.isGenerateReport()) ?
                pdfServices.getContent(resultAssetReport) : null;
        
            // Creating output streams and copying stream assets' content to it
            Files.createDirectories(Paths.get("output/"));
            String outputPath = getOutputFilePathFromCmdArgs(args);
            OutputStream outputStream = Files.newOutputStream(new File(outputPath + "autotagPDFInput-tagged.pdf").toPath());
            LOGGER.info("Saving asset at " + outputPath + "autotagPDFInput-tagged.pdf");
            IOUtils.copy(streamAsset.getInputStream(), outputStream);
            if(streamAssetReport != null) {
                OutputStream outputStreamReport = Files.newOutputStream(new File(outputPath + "autotagPDFInput-report.xlsx").toPath());
                LOGGER.info("Saving asset at " + outputPath + "autotagPDFInput-report.xlsx");
                IOUtils.copy(streamAssetReport.getInputStream(), outputStreamReport);
                outputStreamReport.close();
            }
        } catch (ServiceApiException | IOException | SDKException | ServiceUsageException e) {
            LOGGER.error("Exception encountered while executing operation", e);
        }
    }

    private static AutotagPDFParams getOptionsFromCmdArgs(String[] args) {
        Boolean generateReport = getGenerateReportFromCmdArgs(args);
        Boolean shiftHeadings = getShiftHeadingsFromCmdArgs(args);
        AutotagPDFParams.Builder autotagPDFParamsBuilder = AutotagPDFParams.autotagPDFParamsBuilder();
    
        if (generateReport)
            autotagPDFParamsBuilder.generateReport();
        if (shiftHeadings)
            autotagPDFParamsBuilder.shiftHeadings();
    
        return autotagPDFParamsBuilder.build();
    }
    
    private static Boolean getShiftHeadingsFromCmdArgs(String[] args) {
        return Arrays.asList(args).contains("--shift_headings");
    }
    
    private static Boolean getGenerateReportFromCmdArgs(String[] args) {
        return Arrays.asList(args).contains("--report");
    }
    
    private static String getInputFilePathFromCmdArgs(String[] args) {
        String inputFilePath = "src/main/resources/autotagPDFInput.pdf";
        int inputFilePathIndex = Arrays.asList(args).indexOf("--input");
        if (inputFilePathIndex >= 0 && inputFilePathIndex < args.length - 1) {
            inputFilePath = args[inputFilePathIndex + 1];
        } else
            LOGGER.info("input file not specified, using default value : autotagPDFInput.pdf");
    
        return inputFilePath;
    }
    
    private static String getOutputFilePathFromCmdArgs(String[] args) {
        String outputFilePath = "output/AutotagPDFParameterised/";
        int outputFilePathIndex = Arrays.asList(args).indexOf("--output");
        if (outputFilePathIndex >= 0 && outputFilePathIndex < args.length - 1) {
            outputFilePath = args[outputFilePathIndex + 1];
        } else
            LOGGER.info("output path not specified, using default value : " + outputFilePath);
    
        return outputFilePath;
    }
}

```

### .NET 

```javascript

// Get the samples from https://github.com/adobe/PDFServices.NET.SDK.Samples
// Run the sample:
// cd AutotagPDFParameterised/
// dotnet run AutotagPDFParameterised.csproj

namespace AutotagPDFParameterised
{
    class Program
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(Program));

        private static AutotagPDFParams GetParamsFromCmdArgs(String[] args)
        {
            Boolean generateReport = GetGenerateReportFromCmdArgs(args);
            Boolean shiftHeadings = GetShiftHeadingsFromCmdArgs(args);

            AutotagPDFParams.Builder builder = AutotagPDFParams.AutotagPDFParamsBuilder();

            if (generateReport) builder.GenerateReport();
            if (shiftHeadings) builder.ShiftHeadings();

            return builder.Build();
        }

        private static Boolean GetShiftHeadingsFromCmdArgs(String[] args)
        {
            return Array.Exists(args, element => element == "--shift_headings");
        }

        private static Boolean GetGenerateReportFromCmdArgs(String[] args)
        {
            return Array.Exists(args, element => element == "--report");
        }

        private static String GetInputFilePathFromCmdArgs(String[] args)
        {
            String inputFilePath = @"autotagPdfInput.pdf";
            int inputFilePathIndex = Array.IndexOf(args, "--input");
            if (inputFilePathIndex >= 0 && inputFilePathIndex < args.Length - 1)
            {
                inputFilePath = args[inputFilePathIndex + 1];
            }
            else
                log.Info("input file not specified, using default value : autotagPdfInput.pdf");

            return inputFilePath;
        }

        private static String GetOutputFilePathFromCmdArgs(String[] args)
        {
            String outputFilePath = Directory.GetCurrentDirectory() + "/output/";
            int outputFilePathIndex = Array.IndexOf(args, "--output");
            if (outputFilePathIndex >= 0 && outputFilePathIndex < args.Length - 1)
            {
                outputFilePath = args[outputFilePathIndex + 1];
            }
            else
                log.Info("output path not specified, using default value : /output/");

            return outputFilePath;
        }

        static void Main(String[] args)
        {
            // Configure the logging
            ConfigureLogging();

            log.Info("--input " + GetInputFilePathFromCmdArgs(args));
            log.Info("--output " + GetOutputFilePathFromCmdArgs(args));
            log.Info("--report " + GetGenerateReportFromCmdArgs(args));
            log.Info("--shift_headings " + GetShiftHeadingsFromCmdArgs(args));

            try
            {
                // Initial setup, create credentials instance
                ICredentials credentials = new ServicePrincipalCredentials(
                    Environment.GetEnvironmentVariable("PDF_SERVICES_CLIENT_ID"),
                    Environment.GetEnvironmentVariable("PDF_SERVICES_CLIENT_SECRET"));

                // Creates a PDF Services instance
                PDFServices pdfServices = new PDFServices(credentials);

                // Creates an asset(s) from source file(s) and upload
                using Stream inputStream = File.OpenRead(GetInputFilePathFromCmdArgs(args));
                IAsset asset = pdfServices.Upload(inputStream, PDFServicesMediaType.PDF.GetMIMETypeValue());

                // Create parameters for the job
                AutotagPDFParams autotagPDFParams = GetParamsFromCmdArgs(args);

                // Creates a new job instance
                AutotagPDFJob autotagPDFJob = new AutotagPDFJob(asset).SetParams(autotagPDFParams);

                // Submits the job and gets the job result
                String location = pdfServices.Submit(autotagPDFJob);
                PDFServicesResponse<AutotagPDFResult> pdfServicesResponse =
                    pdfServices.GetJobResult<AutotagPDFResult>(location, typeof(AutotagPDFResult));

                // Get content from the resulting asset(s)
                IAsset resultAsset = pdfServicesResponse.Result.TaggedPDF;
                StreamAsset streamAsset = pdfServices.GetContent(resultAsset);

                // Creating output streams and copying stream asset's content to it
                String outputPath = GetOutputFilePathFromCmdArgs(args);
                Stream outputStream = File.OpenWrite(outputPath + "autotagPDFInput-tagged.pdf");
                streamAsset.Stream.CopyTo(outputStream);
                outputStream.Close();

                if (autotagPDFParams != null && autotagPDFParams.IsGenerateReport)
                {
                    // Get content from the resulting asset(s)
                    IAsset resultAssetReport = pdfServicesResponse.Result.Report;
                    StreamAsset streamAssetReport = pdfServices.GetContent(resultAssetReport);

                    // Creating output streams and copying stream asset's content to it
                    Stream outputStreamReport =
                        File.OpenWrite(outputPath + "autotagPDFInput-report.xlsx");
                    streamAssetReport.Stream.CopyTo(outputStreamReport);
                    outputStreamReport.Close();
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
// Get the samples from https://github.com/adobe/pdfservices-node-sdk-samples
// Run the sample:
// node src/autotag/autoag-pdf-parameterised.js

const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    AutotagPDFParams,
    AutotagPDFJob,
    AutotagPDFResult,
    SDKError,
    ServiceUsageError,
    ServiceApiError
} = require("@adobe/pdfservices-node-sdk");
const fs = require("fs");
const args = process.argv;

(async () => {
    let readStream;
    try {
        console.log("--input " + getInputFilePathFromCmdArgs(args));
        console.log("--output " + getOutputFilePathFromCmdArgs(args));
        console.log("--report " + getGenerateReportFromCmdArgs(args));
        console.log("--shift_headings " + getShiftHeadingsFromCmdArgs(args));

        // Initial setup, create credentials instance
        const credentials = new ServicePrincipalCredentials({
            clientId: process.env.PDF_SERVICES_CLIENT_ID,
            clientSecret: process.env.PDF_SERVICES_CLIENT_SECRET
        });

        // Creates a PDF Services instance
        const pdfServices = new PDFServices({credentials});

        // Creates an asset(s) from source file(s) and upload
        readStream = fs.createReadStream(getInputFilePathFromCmdArgs(args));
        const inputAsset = await pdfServices.upload({
            readStream,
            mimeType: MimeType.PDF
        });

        // Create parameters for the job
        const params = new AutotagPDFParams({
            generateReport: getGenerateReportFromCmdArgs(args),
            shiftHeadings: getShiftHeadingsFromCmdArgs(args)
        });

        // Creates a new job instance
        const job = new AutotagPDFJob({inputAsset, params});

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: AutotagPDFResult
        });

        // Get content from the resulting asset(s)
        const resultAsset = pdfServicesResponse.result.taggedPDF;
        const resultAssetReport = pdfServicesResponse.result.report;
        const streamAsset = await pdfServices.getContent({asset: resultAsset});
        const streamAssetReport = resultAssetReport
            ? await pdfServices.getContent({asset: resultAssetReport})
            : undefined;

        // Creates an output stream and copy stream asset's content to it
        const outputPath = getOutputFilePathFromCmdArgs(args);
        const outputFilePath = outputPath + "autotagPDFInput-tagged.pdf";
        console.log(`Saving asset at ${outputFilePath}`);

        const writeStream = fs.createWriteStream(outputFilePath);
        streamAsset.readStream.pipe(writeStream);
        if (resultAssetReport) {
            const outputFileReportPath = outputPath + "autotagPDFInput-report.xlsx";
            console.log(`Saving asset at ${outputFileReportPath}`);

            const writeStream = fs.createWriteStream(outputFileReportPath);
            streamAssetReport.readStream.pipe(writeStream);
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

function getInputFilePathFromCmdArgs(args) {
    let inputFilePath = "resources/autotagPdfInput.pdf";
    let inputFilePathIndex = args.indexOf("--input");
    if (inputFilePathIndex >= 0 && inputFilePathIndex < args.length - 1) {
        inputFilePath = args[inputFilePathIndex + 1];
    } else
        console.log("input file not specified, using default value : autotagPdfInput.pdf");
    return inputFilePath;
}

function getOutputFilePathFromCmdArgs(args) {
    let outputFilePath = "output/";
    let outputFilePathIndex = args.indexOf("--output");
    if (outputFilePathIndex >= 0 && outputFilePathIndex < args.length - 1) {
        outputFilePath = args[outputFilePathIndex + 1];
    } else {
        console.log("output path not specified, using default value :" + outputFilePath);
        fs.mkdirSync(outputFilePath, {recursive: true});
    }
    return outputFilePath;
}

function getGenerateReportFromCmdArgs(args) {
    return args.includes("--report");
}

function getShiftHeadingsFromCmdArgs(args) {
    return args.includes("--shift_headings");
}
```

#### Python

```python
# Get the samples from https://github.com/adobe/pdfservices-python-sdk-samples
# Run the sample:
# python src/autotagpdf/autotag_pdf_parameterised.py --report --shift_headings --input resources/autotagPdfInput.pdf --output output/

# Initialize the logger
logging.basicConfig(level=logging.INFO)

class AutotagPDFParameterised:
    _input_path: str
    _output_path: str
    _generate_report: bool
    _shift_headings: bool

    def __init__(self):
        pass

    def execute(self, *args: str) -> None:
        args = self.parse_args(*args)
        self._input_path = args.input if args.input else self.get_default_input_file_path()
        self._output_path = args.output if args.output else self.get_default_output_file_path()
        self._generate_report = args.report
        self._shift_headings = args.shift_headings

        self.autotag_pdf()

    def autotag_pdf(self):
        try:
            file = open(self._input_path, 'rb')
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
            autotag_pdf_params = self.get_autotag_pdf_options()

            # Creates a new job instance
            autotag_pdf_job = AutotagPDFJob(input_asset=input_asset,
                                            autotag_pdf_params=autotag_pdf_params)

            # Submit the job and gets the job result
            location = pdf_services.submit(autotag_pdf_job)
            pdf_services_response = pdf_services.get_job_result(location, AutotagPDFResult)

            # Get content from the resulting asset(s)
            result_asset: CloudAsset = pdf_services_response.get_result().get_tagged_pdf()
            stream_asset: StreamAsset = pdf_services.get_content(result_asset)

            # Create output directory if not present
            self.create_output_file_path(self._output_path)

            # Creates an output stream and copy stream asset's content to it
            with open(f'{self._output_path}/autotagPDFInput-tagged.pdf', "wb") as file:
                file.write(stream_asset.get_input_stream())

            if self._generate_report:
                result_asset_report: CloudAsset = pdf_services_response.get_result().get_report()
                stream_asset_report: StreamAsset = pdf_services.get_content(result_asset_report)
                with open(f'{self._output_path}/autotagPDFInput-report.xlsx', "wb") as file:
                    file.write(stream_asset_report.get_input_stream())

        except (ServiceApiException, ServiceUsageException, SdkException) as e:
            logging.exception(f'Exception encountered while executing operation: {e}')

    @staticmethod
    def parse_args(*args: str):
        if not args:
            args = sys.argv[1:]
        parser = argparse.ArgumentParser(description='Autotag PDF')

        parser.add_argument('--input', help='Input file path', type=Path, metavar='input')
        parser.add_argument('--output', help='Output path', type=Path, dest='output')
        parser.add_argument('--report', dest='report', action='store_true', help='Generate report(in XLSX format)',
                            default=False)
        parser.add_argument('--shift_headings', dest='shift_headings', action='store_true', help='Shift headings',
                            default=False)

        return parser.parse_args(args)

    @staticmethod
    def get_default_input_file_path() -> str:
        return 'autotagPdfInput.pdf'

    @staticmethod
    def get_default_output_file_path() -> str:
        now = datetime.now()
        time_stamp = now.strftime("%Y-%m-%dT%H-%M-%S")
        os.makedirs("output/AutotagPDFParameterised", exist_ok=True)
        return f"output/AutotagPDFParameterised/autotag-tagged{time_stamp}"

    @staticmethod
    def create_output_file_path(path) -> None:
        os.makedirs(path, exist_ok=True)

    def get_autotag_pdf_options(self) -> AutotagPDFParams:
        return AutotagPDFParams(
            shift_headings=self._shift_headings,
            generate_report=self._generate_report
        )


if __name__ == "__main__":
    autotag_pdf_parameterised = AutotagPDFParameterised()
    autotag_pdf_parameterised.execute()
```
