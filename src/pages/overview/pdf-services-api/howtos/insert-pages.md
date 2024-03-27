---
title: Insert Pages | How Tos | PDF Services API | Adobe PDF Services
---
# Insert Pages

Insert one or more pages into an existing document

## Rest API 

See our public API Reference for [Insert Pages](../../../apis/#tag/Combine-PDF)

## Insert Pages in PDF

The insert operation inserts additional pages from different PDFs into
an existing PDF.

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

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
                // Initial setup, create credentials instance.
                Credentials credentials = Credentials.ServicePrincipalCredentialsBuilder()
                    .WithClientId("PDF_SERVICES_CLIENT_ID")
                    .WithClientSecret("PDF_SERVICES_CLIENT_SECRET")
                    .Build();
 
                // Create an ExecutionContext using credentials.
                ExecutionContext executionContext = ExecutionContext.Create(credentials);
 
                // Create a new operation instance
                InsertPagesOperation insertPagesOperation = InsertPagesOperation.CreateNew();
 
                // Set operation base input from a source file.
                FileRef baseSourceFile = FileRef.CreateFromLocalFile(@"baseInput.pdf");
                insertPagesOperation.SetBaseInput(baseSourceFile);
 
                // Create a FileRef instance using a local file.
                FileRef firstFileToInsert = FileRef.CreateFromLocalFile(@"firstFileToInsertInput.pdf");
                PageRanges pageRanges = GetPageRangeForFirstFile();
 
                // Adds the pages (specified by the page ranges) of the input PDF file to be inserted at
                // the specified page of the base PDF file.
                insertPagesOperation.AddPagesToInsertAt(firstFileToInsert, pageRanges, 2);
 
                // Create a FileRef instance using a local file.
                FileRef secondFileToInsert = FileRef.CreateFromLocalFile(@"secondFileToInsertInput.pdf");
 
                // Adds all the pages of the input PDF file to be inserted at the specified page of the
                // base PDF file.
                insertPagesOperation.AddPagesToInsertAt(secondFileToInsert, 3);
 
                // Execute the operation.
                FileRef result = insertPagesOperation.Execute(executionContext);
 
                // Save the result to the specified location.
                result.SaveAs(Directory.GetCurrentDirectory() + "/output/insertPagesOutput.pdf");
            }
            catch (ServiceUsageException ex)
            {
                log.Error("Exception encountered while executing operation", ex);
            // Catch more errors here . . .
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

#### Rest API 

```javascript
// Please refer our Rest API docs for more information 
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

// Legacy API can be found here 
// https://documentcloud.adobe.com/document-services/index.html#post-combinePDF
```
