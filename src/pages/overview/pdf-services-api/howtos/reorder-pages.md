---
title: Reorder Pages | How Tos | PDF Services API | Adobe PDF Services
---
# Reorder Pages

Reorder the pages of a PDF file to reorganize.

## REST API

See our public API Reference for [Reorder Pages](../../../apis/#tag/Combine-PDF)

## Reorder Pages in PDF

The reorder pages operation moves pages from one location to another in
a PDF file.

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, REST API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.reorderpages.ReorderPDFPages
 
 public class ReorderPDFPages {

   // Initialize the logger.
   private static final Logger LOGGER = LoggerFactory.getLogger(ReorderPDFPages.class);

   public static void main(String[] args) {
       try (InputStream inputStream = Files.newInputStream(new File("src/main/resources/reorderPagesInput.pdf").toPath())) {
            // Initial setup, create credentials instance
            Credentials credentials = new ServicePrincipalCredentials(
                    System.getenv("PDF_SERVICES_CLIENT_ID"),
                    System.getenv("PDF_SERVICES_CLIENT_SECRET"));

            // Creates a PDF Services instance
            PDFServices pdfServices = new PDFServices(credentials);

            // Creates an asset(s) from source file(s) and upload
            Asset asset = pdfServices.upload(inputStream, PDFServicesMediaType.PDF.getMediaType());

            PageRanges pagesToReorder = getPageRangeForReorder();

            // Create parameters for the job
            ReorderPagesParams reorderPagesParams = ReorderPagesParams
                    .reorderPagesParamsBuilder(asset, pagesToReorder) // Add the asset as input to the params, along with its page order
                    .build();

            // Creates a new job instance
            ReorderPagesPDFJob reorderPagesPDFJob = new ReorderPagesPDFJob(reorderPagesParams);

            // Submit the job and gets the job result
            String location = pdfServices.submit(reorderPagesPDFJob);
            PDFServicesResponse<ReorderPagesResult> pdfServicesResponse = pdfServices.getJobResult(location, ReorderPagesResult.class);

            // Get content from the resulting asset(s)
            Asset resultAsset = pdfServicesResponse.getResult().getAsset();
            StreamAsset streamAsset = pdfServices.getContent(resultAsset);

            // Creates an output stream and copy stream asset's content to it
            Files.createDirectories(Paths.get("output/"));
            OutputStream outputStream = Files.newOutputStream(new File("output/reorderPagesOutput.pdf").toPath());
            LOGGER.info("Saving asset at output/reorderPagesOutput.pdf");
            IOUtils.copy(streamAsset.getInputStream(), outputStream);
            outputStream.close();
       } catch (IOException | ServiceApiException | SDKException | ServiceUsageException e) {
           LOGGER.error("Exception encountered while executing operation", e);
       }
   }

   private static PageRanges getPageRangeForReorder() {
       // Specify order of the pages for an output document
        PageRanges pageRanges = new PageRanges();
        // Add pages 3 to 4
        pageRanges.addRange(3, 4);

        // Add page 1
        pageRanges.addSinglePage(1);

        return pageRanges;
   }
 }
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd ReorderPages/
// dotnet run ReorderPDFPages.csproj

 namespace ReorderPDFPages
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
               // Initial setup, create credentials instance.
               Credentials credentials = Credentials.ServicePrincipalCredentialsBuilder()
                    .WithClientId("PDF_SERVICES_CLIENT_ID")
                    .WithClientSecret("PDF_SERVICES_CLIENT_SECRET")
                    .Build();

               // Create an ExecutionContext using credentials.
               ExecutionContext executionContext = ExecutionContext.Create(credentials);

               // Create a new operation instance
               ReorderPagesOperation reorderPagesOperation = ReorderPagesOperation.CreateNew();

               // Set operation input from a source file, along with specifying the order of the pages for
               // rearranging the pages in a PDF file.
               FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"reorderPagesInput.pdf");
               reorderPagesOperation.SetInput(sourceFileRef);
               PageRanges pageRanges = GetPageRangeForReorder();
               reorderPagesOperation.SetPagesOrder(pageRanges);

               // Execute the operation.
               FileRef result = reorderPagesOperation.Execute(executionContext);

               // Save the result to the specified location.
               result.SaveAs(Directory.GetCurrentDirectory() + "/output/reorderPagesOutput.pdf");
           }
           catch (ServiceUsageException ex)
           {
               log.Error("Exception encountered while executing operation", ex);
           }
           // Catch more errors here . . .
       }

       private static PageRanges GetPageRangeForReorder()
       {
           // Specify order of the pages for an output document.
           PageRanges pageRanges = new PageRanges();
           // Add pages 3 to 4.
           pageRanges.AddRange(3, 4);

           // Add page 1.
           pageRanges.AddSinglePage(1);

           return pageRanges;
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
// node src/reorderpages/reorder-pdf-pages.js

const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    PageRanges,
    ReorderPagesParams,
    ReorderPagesJob,
    ReorderPagesResult,
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
        readStream = fs.createReadStream("./reorderPagesInput.pdf");
        const inputAsset = await pdfServices.upload({
            readStream,
            mimeType: MimeType.PDF
        });

        // Create parameters for the job
        // Add the asset as input to the params, along with its page order
        const params = new ReorderPagesParams({
            asset: inputAsset,
            pageRanges: getPageRangeForReorder()
        });

        // Creates a new job instance
        const job = new ReorderPagesJob({params});

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: ReorderPagesResult
        });

        // Get content from the resulting asset(s)
        const resultAsset = pdfServicesResponse.result.asset;
        const streamAsset = await pdfServices.getContent({asset: resultAsset});

        // Creates an output stream and copy result asset's content to it
        const outputFilePath = "./reorderPagesOutput.pdf";
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

function getPageRangeForReorder() {
    // Specify order of the pages for an output document
    const pageRanges = new PageRanges();
    // Add pages 3 to 4
    pageRanges.addRange(3, 4);
    // Add page 1
    pageRanges.addSinglePage(1);
    return pageRanges;
}
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
                    "start": 3,
                    "end": 3
                },
                {
                    "start": 1,
                    "end": 1
                },
                {
                    "start": 4,
                    "end": 4
                }
            ]
        }
    ]
}'
```
