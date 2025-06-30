---
title: PDF Accessibility Checker | How Tos | PDF Services API | Adobe PDF Services
---
# PDF Accessibility Checker

The Accessibility Checker API verifies if PDF files meet the machine-verifiable requirements of PDF/UA and WCAG 2.0. It generates a report summarizing the findings of the accessibility checks. Additional human remediation may be required to ensure the reading order of elements is correct and that alternative text tags properly convey the meaning of images. The report contains links to documentation that assists in manually fixing problems using Adobe Acrobat Pro.

## API Parameters

### Input Document

A PDF document for which accessibility is to be checked.

### Page start (_pageStart_)

This parameter specifies the starting page for the accessibility check. If "pageStart" is not provided, the first page is considered the default start page. It should be greater than or equal to 1.

### Page end (_pageEnd_)

This parameter specifies the ending page for the accessibility check. If "pageEnd" is not provided, the last page is considered the default end page. It should be greater than or equal to 1.

## REST API

See our public API Reference for the [PDF Accessibility Checker API](../../../apis/#tag/PDF-Accessibility-Checker).

## Check accessibility for input PDF

The sample below performs an accessibility check operation on a given PDF.

Please refer to the [API usage guide](../gettingstarted.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, REST API" />

#### Java

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.pdfaccessibilitychecker.PDFAccessibilityChecker
public class PDFAccessibilityChecker {

    private static final Logger LOGGER = LoggerFactory.getLogger(PDFAccessibilityChecker.class);

    public static void main(String[] args) {

        try (
            InputStream inputStream = Files
            .newInputStream(new File("src/main/resources/accessibilityCheckerInput.pdf")
                .toPath())) {
            // Initial setup, create credentials instance
            Credentials credentials = new ServicePrincipalCredentials(System.getenv("PDF_SERVICES_CLIENT_ID"),
                System.getenv("PDF_SERVICES_CLIENT_SECRET"));
        
            // Creates a PDF Services instance
            PDFServices pdfServices = new PDFServices(credentials);
        
            // Creates an asset(s) from source file(s) and upload
            Asset asset = pdfServices.upload(inputStream, PDFServicesMediaType.PDF.getMediaType());

            // Creates a new job instance
            PDFAccessibilityCheckerJob pdfAccessibilityCheckerJob = new PDFAccessibilityCheckerJob(asset);
            
            // Submit the job and gets the job result
            String location = pdfServices.submit(PDFAccessibilityCheckerJob);
            PDFServicesResponse<PDFAccessibilityCheckerResult> pdfServicesResponse = pdfServices
                .getJobResult(location, PDFAccessibilityCheckerResult.class);
        
            // Get content from the resulting asset(s)
            Asset resultAsset = pdfServicesResponse.getResult().getAsset();
            StreamAsset streamAsset = pdfServices.getContent(resultAsset);
        
            Asset report = pdfServicesResponse.getResult().getReport();
            StreamAsset streamAssetReport = pdfServices.getContent(report);
            
            String outputFilePath = "/output/pdfAccessibilityCheckerOutput.pdf";
            String outputFilePathReport = "/output/pdfAccessibilityCheckerReport.json";
            
            LOGGER.info(String.format("Saving asset at %s", outputFilePath));
            LOGGER.info(String.format("Saving report at %s", outputFilePathReport));
            
            new FileInfo(Directory.GetCurrentDirectory() + outputFilePath).Directory.Create();
            new FileInfo(Directory.GetCurrentDirectory() + outputFilePathReport).Directory.Create();
            
            OutputStream outputStreamReport = Files.newOutputStream(new File(outputFilePath).toPath());
            OutputStream outputStreamReport = Files.newOutputStream(new File(outputFilePathReport).toPath());
            
            IOUtils.copy(streamAsset.getInputStream(), outputStream);
            IOUtils.copy(streamAssetReport.getInputStream(), outputStreamReport);
            
            outputStream.close();
            outputStreamReport.close();
        } catch (ServiceApiException | IOException | SDKException | ServiceUsageException ex) {
            System.out.println("Exception encountered while executing operation: "+ ex);
        }
    }
}
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd PDFAccessibilityChecker/
// dotnet run PDFAccessibilityChecker.csproj
namespace PDFAccessibilityChecker
{
    public class Program {
        private static readonly ILog log = LogManager.GetLogger(typeof (Program));

        static void Main() {
            //Configure the logging
            ConfigureLogging();
            try {
                // Initial setup, create credentials instance
                ICredentials credentials = new ServicePrincipalCredentials(
                    Environment.GetEnvironmentVariable("PDF_SERVICES_CLIENT_ID"),
                    Environment.GetEnvironmentVariable("PDF_SERVICES_CLIENT_SECRET"));

                // Creates a PDF Services instance
                PDFServices pdfServices = new PDFServices(credentials);

                // Creates an asset(s) from source file(s) and upload
                using Stream inputStream = File.OpenRead(@"checkerPDFInput.pdf");
                IAsset inputDocumentAsset = pdfServices.Upload(inputStream, PDFServicesMediaType.PDF.GetMIMETypeValue());

                // Create the PDF Accessibility Checker job instance
                PDFAccessibilityCheckerJob pdfAccessibilityCheckerJob = new PDFAccessibilityCheckerJob(inputDocumentAsset);

                // Submits the job and gets the job result
                String location = pdfServices.Submit(pdfAccessibilityCheckerJob);
                PDFServicesResponse <PDFAccessibilityCheckerResult> pdfServicesResponse = 
                    pdfServices.GetJobResult <PDFAccessibilityCheckerResult> (location, typeof (PDFAccessibilityCheckerResult));

                // Get content from the resulting asset(s)
                IAsset outputAsset = pdfServicesResponse.Result.Asset;
                StreamAsset streamAsset = pdfServices.GetContent(outputAsset);

                IAsset outputReportAsset = pdfServicesResponse.Result.Report;
                StreamAsset streamReportAsset = pdfServices.GetContent(outputReportAsset);

                // Creating output streams and copying stream asset's content to it
                String outputPdfPath = '/output/accessibilityChecker.pdf';
                new FileInfo(Directory.GetCurrentDirectory() + outputPdfPath).Directory.Create();
                Stream outputStream = File.OpenWrite(Directory.GetCurrentDirectory() + outputPdfPath);
                streamAsset.Stream.CopyTo(outputStream);
                outputStream.Close();

                String outputJSONPath = '/output/accessibilityChecker.json';
                new FileInfo(Directory.GetCurrentDirectory() + outputJSONPath).Directory.Create();
                Stream outputJSONStream = File.OpenWrite(Directory.GetCurrentDirectory() + outputJSONPath);
                streamReportAsset.Stream.CopyTo(outputJSONStream);
                outputStream.Close();
            } catch (ServiceUsageException ex) {
                log.Error("Exception encountered while executing operation", ex);
            } catch (ServiceApiException ex) {
                log.Error("Exception encountered while executing operation", ex);
            } catch (SDKException ex) {
                log.Error("Exception encountered while executing operation", ex);
            } catch (IOException ex) {
                log.Error("Exception encountered while executing operation", ex);
            } catch (Exception ex) {
                log.Error("Exception encountered while executing operation", ex);
            }
        }

        static void ConfigureLogging() {
            ILoggerRepository
            logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
            XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));
        }
    }
}
```

#### Node JS

```javascript
// Get the samples from https://github.com/adobe/pdfservices-node-sdk-samples
// Run the sample:
// node src/pdfaccessibilitychecker/pdf-accessibility-checker.js
const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    SDKError,
    ServiceUsageError,
    ServiceApiError,
    PDFAccessibilityCheckerJob,
    PDFAccessibilityCheckerResult
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
        readStream = fs.createReadStream("resources/accessibilityCheckerInput.pdf");
        const inputAsset = await pdfServices.upload({
            readStream,
            mimeType: MimeType.PDF
        });

        // Create a new job instance
        const job = new PDFAccessibilityCheckerJob({inputAsset});

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: PDFAccessibilityCheckerResult
        });

        // Get content from the resulting asset(s)
        const resultAsset = pdfServicesResponse.result.asset;
        const streamAsset = await pdfServices.getContent({asset: resultAsset});

        const resultAssetReport = pdfServicesResponse.result.report;
        const streamAssetReport = await pdfServices.getContent({asset: resultAssetReport});

        // Creates an output stream and copy result asset's content to it
        const outputFilePath = "output/PDFAccessibilityChecker.pdf"
        const outputFilePathReport = "output/PDFAccessibilityChecker.json"
        console.log(`Saving asset at ${outputFilePath}`);
        console.log(`Saving asset at ${outputFilePathReport}`);

        let writeStream = fs.createWriteStream(outputFilePath);
        streamAsset.readStream.pipe(writeStream);
        writeStream = fs.createWriteStream(outputFilePathReport);
        streamAssetReport.readStream.pipe(writeStream);
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

```javascript
# Get the samples from https://github.com/adobe/pdfservices-python-sdk-samples
# Run the sample:
# python src/PDFAccessibilityChecker/pdf_accessibility_checker.py

class PDFAccessibilityChecker:
    def __init__(self):
        try:
            pdf_file = open("src/resources/CheckerPDFInput.pdf", 'rb')
            input_stream = pdf_file.read()
            pdf_file.close()
            
            # Initial setup, create credentials instance
            credentials = ServicePrincipalCredentials(
                client_id=os.getenv('PDF_SERVICES_CLIENT_ID'),
                client_secret=os.getenv('PDF_SERVICES_CLIENT_SECRET'))
            
            # Creates a PDF Services instance
            pdf_services = PDFServices(credentials=credentials)
            
            # Creates an asset(s) from source file(s) and upload
            input_asset = pdf_services.upload(input_stream=input_stream, mime_type=PDFServicesMediaType.PDF)
    
            # Creates a new job instance
            pdf_accessibility_checker_job = PDFAccessibilityCheckerJob(input_asset=input_asset)
            
            # Submit the job and gets the job result
            location = pdf_services.submit(pdf_accessibility_checker_job)
            pdf_services_response = pdf_services.get_job_result(location, PDFAccessibilityCheckerResult)
            
            # Get content from the resulting asset(s)
            result_asset: CloudAsset = pdf_services_response.get_result().get_asset()
            stream_asset: StreamAsset = pdf_services.get_content(result_asset)
            
            report_asset: CloudAsset = pdf_services_response.get_result().get_report()
            stream_report: StreamAsset = pdf_services.get_content(report_asset)
            
            output_file_path = 'output/accessibilitychecker.pdf'
            with open(output_file_path, "wb") as file:
                file.write(stream_asset.get_input_stream())
            
            output_file_path_json = 'output/accessibilitychecker.json'
            with open(output_file_path_json, "wb") as file:
                file.write(stream_report.get_input_stream())
        
        except (ServiceApiException, ServiceUsageException, SdkException) as e:
            logging.exception(f'Exception encountered while executing operation: {e}')
        
        
    if __name__ == "__main__":
        PDFAccessibilityChecker()
```

#### REST API

```javascript
curl --location --request POST 'https://pdf-services.adobe.io/operation/accessibilitychecker' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:54cbf87f-d7f5-4918-8e4b-9f1878678e68"
}'
```


## Check accessibility for specified pages

The sample below performs an accessibility check operation for specified pages of a given PDF.

Please refer to the [API usage guide](../gettingstarted.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="5" languages="Java, .NET, Node JS, Python, REST API" />

#### Java

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.pdfaccessibilitychecker.PDFAccessibilityCheckerWithOptions
public class PDFAccessibilityCheckerWithOptions {

    private static final Logger LOGGER = LoggerFactory.getLogger(PDFAccessibilityCheckerWithOptions.class);

    public static void main(String[] args) {

        try (
            InputStream inputStream = Files
            .newInputStream(new File("src/main/resources/accessibilityCheckerInput.pdf")
                .toPath())) {
            // Initial setup, create credentials instance
            Credentials credentials = new ServicePrincipalCredentials(System.getenv("PDF_SERVICES_CLIENT_ID"),
                System.getenv("PDF_SERVICES_CLIENT_SECRET"));
        
            // Creates a PDF Services instance
            PDFServices pdfServices = new PDFServices(credentials);
        
            // Creates an asset(s) from source file(s) and upload
            Asset asset = pdfServices.upload(inputStream, PDFServicesMediaType.PDF.getMediaType());

            // Creates parameters for the job
            PDFAccessibilityCheckerParams pdfAccessibilityCheckerParams = PDFAccessibilityCheckerParams
                .pdfAccessibilityCheckerParamsBuilder().withPageStart(1).withPageEnd(5).build();
        
            // Creates a new job instance
            PDFAccessibilityCheckerJob pdfAccessibilityCheckerJob = new PDFAccessibilityCheckerJob(asset)
                .setParams(pdfAccessibilityCheckerParams);
            
            // Submit the job and gets the job result
            String location = pdfServices.submit(PDFAccessibilityCheckerJob);
            PDFServicesResponse<PDFAccessibilityCheckerResult> pdfServicesResponse = pdfServices
                .getJobResult(location, PDFAccessibilityCheckerResult.class);
        
            // Get content from the resulting asset(s)
            Asset resultAsset = pdfServicesResponse.getResult().getAsset();
            StreamAsset streamAsset = pdfServices.getContent(resultAsset);
        
            Asset report = pdfServicesResponse.getResult().getReport();
            StreamAsset streamAssetReport = pdfServices.getContent(report);
            
            String outputFilePath = "/output/pdfAccessibilityCheckerOutput.pdf";
            String outputFilePathReport = "/output/pdfAccessibilityCheckerReport.json";
            
            LOGGER.info(String.format("Saving asset at %s", outputFilePath));
            LOGGER.info(String.format("Saving report at %s", outputFilePathReport));
            
            new FileInfo(Directory.GetCurrentDirectory() + outputFilePath).Directory.Create();
            new FileInfo(Directory.GetCurrentDirectory() + outputFilePathReport).Directory.Create();
            
            OutputStream outputStreamReport = Files.newOutputStream(new File(outputFilePath).toPath());
            OutputStream outputStreamReport = Files.newOutputStream(new File(outputFilePathReport).toPath());
            
            IOUtils.copy(streamAsset.getInputStream(), outputStream);
            IOUtils.copy(streamAssetReport.getInputStream(), outputStreamReport);
            
            outputStream.close();
            outputStreamReport.close();
        } catch (ServiceApiException | IOException | SDKException | ServiceUsageException ex) {
            System.out.println("Exception encountered while executing operation: "+ ex);
        }
    }
}
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd PDFAccessibilityCheckerWithOptions/
// dotnet run PDFAccessibilityCheckerWithOptions.csproj
namespace PDFAccessibilityCheckerWithOptions
{
    public class Program {
        private static readonly ILog log = LogManager.GetLogger(typeof (Program));

        static void Main() {
            //Configure the logging
            ConfigureLogging();
            try {
                // Initial setup, create credentials instance
                ICredentials credentials = new ServicePrincipalCredentials(
                    Environment.GetEnvironmentVariable("PDF_SERVICES_CLIENT_ID"),
                    Environment.GetEnvironmentVariable("PDF_SERVICES_CLIENT_SECRET"));

                // Creates a PDF Services instance
                PDFServices pdfServices = new PDFServices(credentials);

                // Creates an asset(s) from source file(s) and upload
                using Stream inputStream = File.OpenRead(@"checkerPDFInput.pdf");
                IAsset inputDocumentAsset = pdfServices.Upload(inputStream, PDFServicesMediaType.PDF.GetMIMETypeValue());

                // Set up PDF Accessibility Checker parameters
                PDFAccessibilityCheckerParams pdfAccessibilityCheckerParams = PDFAccessibilityCheckerParams
                    .PDFAccessibilityCheckerParamsBuilder()
                    .WithPageStart(1)
                    .WithPageEnd(5)
                    .Build();

                // Create the PDF Accessibility Checker job instance
                PDFAccessibilityCheckerJob pdfAccessibilityCheckerJob =
                    new PDFAccessibilityCheckerJob(inputDocumentAsset).SetParams(pdfAccessibilityCheckerParams);

                // Submits the job and gets the job result
                String location = pdfServices.Submit(pdfAccessibilityCheckerJob);
                PDFServicesResponse <PDFAccessibilityCheckerResult> pdfServicesResponse = 
                    pdfServices.GetJobResult <PDFAccessibilityCheckerResult> (location, typeof (PDFAccessibilityCheckerResult));

                // Get content from the resulting asset(s)
                IAsset outputAsset = pdfServicesResponse.Result.Asset;
                StreamAsset streamAsset = pdfServices.GetContent(outputAsset);

                IAsset outputReportAsset = pdfServicesResponse.Result.Report;
                StreamAsset streamReportAsset = pdfServices.GetContent(outputReportAsset);

                // Creating output streams and copying stream asset's content to it
                String outputPdfPath = '/output/accessibilityChecker.pdf';
                new FileInfo(Directory.GetCurrentDirectory() + outputPdfPath).Directory.Create();
                Stream outputStream = File.OpenWrite(Directory.GetCurrentDirectory() + outputPdfPath);
                streamAsset.Stream.CopyTo(outputStream);
                outputStream.Close();

                String outputJSONPath = '/output/accessibilityChecker.json';
                new FileInfo(Directory.GetCurrentDirectory() + outputJSONPath).Directory.Create();
                Stream outputJSONStream = File.OpenWrite(Directory.GetCurrentDirectory() + outputJSONPath);
                streamReportAsset.Stream.CopyTo(outputJSONStream);
                outputStream.Close();
            } catch (ServiceUsageException ex) {
                log.Error("Exception encountered while executing operation", ex);
            } catch (ServiceApiException ex) {
                log.Error("Exception encountered while executing operation", ex);
            } catch (SDKException ex) {
                log.Error("Exception encountered while executing operation", ex);
            } catch (IOException ex) {
                log.Error("Exception encountered while executing operation", ex);
            } catch (Exception ex) {
                log.Error("Exception encountered while executing operation", ex);
            }
        }

        static void ConfigureLogging() {
            ILoggerRepository
            logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
            XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));
        }
    }
}
```

#### Node JS

```javascript
// Get the samples from https://github.com/adobe/pdfservices-node-sdk-samples
// Run the sample:
// node src/pdfaccessibilitychecker/pdf-accessibility-checker-with-options.js
const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    SDKError,
    ServiceUsageError,
    ServiceApiError,
    PDFAccessibilityCheckerJob,
    PDFAccessibilityCheckerResult
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
        readStream = fs.createReadStream("resources/accessibilityCheckerInput.pdf");
        const inputAsset = await pdfServices.upload({
            readStream,
            mimeType: MimeType.PDF
        });

        // Create parameters for the job
        const params = new PDFAccessibilityCheckerParams({pageStart:1, pageEnd:5});

        // Create a new job instance
        const job = new PDFAccessibilityCheckerJob({inputAsset, params});

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: PDFAccessibilityCheckerResult
        });

        // Get content from the resulting asset(s)
        const resultAsset = pdfServicesResponse.result.asset;
        const streamAsset = await pdfServices.getContent({asset: resultAsset});

        const resultAssetReport = pdfServicesResponse.result.report;
        const streamAssetReport = await pdfServices.getContent({asset: resultAssetReport});

        // Creates an output stream and copy result asset's content to it
        const outputFilePath = "output/PDFAccessibilityChecker.pdf"
        const outputFilePathReport = "output/PDFAccessibilityChecker.json"
        console.log(`Saving asset at ${outputFilePath}`);
        console.log(`Saving asset at ${outputFilePathReport}`);

        let writeStream = fs.createWriteStream(outputFilePath);
        streamAsset.readStream.pipe(writeStream);
        writeStream = fs.createWriteStream(outputFilePathReport);
        streamAssetReport.readStream.pipe(writeStream);
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

```javascript
# Get the samples from https://github.com/adobe/pdfservices-python-sdk-samples
# Run the sample:
# python src/PDFAccessibilityChecker/pdf_accessibility_checker.py

class PDFAccessibilityChecker:
    def __init__(self):
        try:
            pdf_file = open("src/resources/CheckerPDFInput.pdf", 'rb')
            input_stream = pdf_file.read()
            pdf_file.close()
            
            # Initial setup, create credentials instance
            credentials = ServicePrincipalCredentials(
                client_id=os.getenv('PDF_SERVICES_CLIENT_ID'),
                client_secret=os.getenv('PDF_SERVICES_CLIENT_SECRET'))
            
            # Creates a PDF Services instance
            pdf_services = PDFServices(credentials=credentials)
            
            # Creates an asset(s) from source file(s) and upload
            input_asset = pdf_services.upload(input_stream=input_stream, mime_type=PDFServicesMediaType.PDF)
            
            # Create parameters for the job
            pdf_accessibility_checker_params = PDFAccessibilityCheckerParams(page_start=1, page_end=5)
            
            # Creates a new job instance
            pdf_accessibility_checker_job = PDFAccessibilityCheckerJob(input_asset=input_asset,
                pdf_accessibility_checker_params=pdf_accessibility_checker_params)
            
            # Submit the job and gets the job result
            location = pdf_services.submit(pdf_accessibility_checker_job)
            pdf_services_response = pdf_services.get_job_result(location, PDFAccessibilityCheckerResult)
            
            # Get content from the resulting asset(s)
            result_asset: CloudAsset = pdf_services_response.get_result().get_asset()
            stream_asset: StreamAsset = pdf_services.get_content(result_asset)
            
            report_asset: CloudAsset = pdf_services_response.get_result().get_report()
            stream_report: StreamAsset = pdf_services.get_content(report_asset)
            
            output_file_path = 'output/accessibilitychecker.pdf'
            with open(output_file_path, "wb") as file:
                file.write(stream_asset.get_input_stream())
            
            output_file_path_json = 'output/accessibilitychecker.json'
            with open(output_file_path_json, "wb") as file:
                file.write(stream_report.get_input_stream())
        
        except (ServiceApiException, ServiceUsageException, SdkException) as e:
            logging.exception(f'Exception encountered while executing operation: {e}')
        
    
    if __name__ == "__main__":
        PDFAccessibilityChecker()
```

#### REST API

```javascript
curl --location --request POST 'https://pdf-services.adobe.io/operation/accessibilitychecker' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:54cbf87f-d7f5-4918-8e4b-9f1878678e68",
    "pageStart":1,
    "pageEnd":5
}'
```
