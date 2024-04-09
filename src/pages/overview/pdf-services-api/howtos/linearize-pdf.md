---
title: Linearize PDF | How Tos | PDF Services API | Adobe PDF Services
---
# Linearize PDFs

Optimize PDFs for quick viewing on the web, especially for mobile clients. Linearization allows your end users to view large PDF documents incrementally so that they can view pages much faster in lower bandwidth conditions.

## REST API 

See our public API Reference for [Linearize PDF](../../../apis/#tag/Linearize-PDF)

## Linearize PDF

Linearizing a PDF creates a web-optimized PDF file which supports
incremental access in network environments.

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, REST API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.linearizepdf.LinearizePDF
 
     public class LinearizePDF {
       // Initialize the logger.
       private static final Logger LOGGER = LoggerFactory.getLogger(LinearizePDF.class);
    
       public static void main(String[] args) {
    
           try (InputStream inputStream = Files.newInputStream(new File("src/main/resources/linearizePDFInput.pdf").toPath())) {
                // Initial setup, create credentials instance
                Credentials credentials = new ServicePrincipalCredentials(
                        System.getenv("PDF_SERVICES_CLIENT_ID"),
                        System.getenv("PDF_SERVICES_CLIENT_SECRET"));
    
                // Creates a PDF Services instance
                PDFServices pdfServices = new PDFServices(credentials);
    
                // Creates an asset(s) from source file(s) and upload
                Asset asset = pdfServices.upload(inputStream, PDFServicesMediaType.PDF.getMediaType());
    
                // Creates a new job instance
                LinearizePDFJob linearizePDFJob = new LinearizePDFJob(asset);
    
                // Submit the job and gets the job result
                String location = pdfServices.submit(linearizePDFJob);
                PDFServicesResponse<LinearizePDFResult> pdfServicesResponse = pdfServices.getJobResult(location, LinearizePDFResult.class);
    
                // Get content from the resulting asset(s)
                Asset resultAsset = pdfServicesResponse.getResult().getAsset();
                StreamAsset streamAsset = pdfServices.getContent(resultAsset);
    
                // Creates an output stream and copy stream asset's content to it
                Files.createDirectories(Paths.get("output/"));
                OutputStream outputStream = Files.newOutputStream(new File("output/linearizePDFOutput.pdf").toPath());
                LOGGER.info("Saving asset at output/linearizePDFOutput.pdf");
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
// cd LinearizePDF/
// dotnet run LinearizePDF.csproj

 namespace LinearizePDF
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

               // Create an ExecutionContext using credentials and create a new operation instance.
               ExecutionContext executionContext = ExecutionContext.Create(credentials);
               LinearizePDFOperation linearizePDFOperation = LinearizePDFOperation.CreateNew();

               // Set operation input from a source file.
               FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"linearizePDFInput.pdf");
               linearizePDFOperation.SetInput(sourceFileRef);

               // Execute the operation.
               FileRef result = linearizePDFOperation.Execute(executionContext);

               // Save the result to the specified location.
               result.SaveAs(Directory.GetCurrentDirectory() + "/output/linearizePDFOutput.pdf");
           }
           catch (ServiceUsageException ex)
           {
               log.Error("Exception encountered while executing operation", ex);
           }
           // Catch more errors here . . .
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
// node src/linearizepdf/linearize-pdf.js

const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    LinearizePDFJob,
    LinearizePDFResult,
    SDKError,
    ServiceUsageError,
    ServiceApiError
} = require("@dcloud/pdfservices-node-sdk");
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
        readStream = fs.createReadStream("./linearizePDFInput.pdf");
        const inputAsset = await pdfServices.upload({
            readStream,
            mimeType: MimeType.PDF
        });

        // Creates a new job instance
        const job = new LinearizePDFJob({inputAsset});

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: LinearizePDFResult
        });

        // Get content from the resulting asset(s)
        const resultAsset = pdfServicesResponse.result.asset;
        const streamAsset = await pdfServices.getContent({asset: resultAsset});

        // Creates an output stream and copy stream asset's content to it
        const outputFilePath = "./linearizePDFOutput.pdf";
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

#### REST API 

```javascript
// Please refer our REST API docs for more information 
// https://developer.adobe.com/document-services/docs/apis/#tag/Linearize-PDF

curl --location --request POST 'https://pdf-services.adobe.io/operation/linearizepdf' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718"
}'
```
