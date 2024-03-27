---
title: Combine PDF | How Tos | PDF Services API | Adobe PDF Services
---
# Combine PDF Files

Combine two or more documents into a single PDF file

## Rest API

See our public API Reference for [Combine PDF](../../../apis/#tag/Combine-PDF)

## Combine Files

This sample combines up to 20 PDF files into a single PDF file.

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

#### Java

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.combinepdf.CombinePDF
 
 public class CombinePDF {

   // Initialize the logger.
   private static final Logger LOGGER = LoggerFactory.getLogger(CombinePDF.class);

   public static void main(String[] args) {
     try (InputStream inputStream1 = Files.newInputStream(new File("src/main/resources/combineFilesInput1.pdf").toPath());
          InputStream inputStream2 = Files.newInputStream(new File("src/main/resources/combineFilesInput2.pdf").toPath())) {
        // Initial setup, create credentials instance
        Credentials credentials = new ServicePrincipalCredentials(
            System.getenv("PDF_SERVICES_CLIENT_ID"),
            System.getenv("PDF_SERVICES_CLIENT_SECRET"));
    
        // Creates a PDF Services instance
        PDFServices pdfServices = new PDFServices(credentials);
    
        // Creates an asset(s) from source file(s) and upload
        List<StreamAsset> streamAssets = new ArrayList<>();
        streamAssets.add(new StreamAsset(inputStream1, PDFServicesMediaType.PDF.getMediaType()));
        streamAssets.add(new StreamAsset(inputStream2, PDFServicesMediaType.PDF.getMediaType()));
        List<Asset> assets = pdfServices.uploadAssets(streamAssets);
    
        // Create parameters for the job
        CombinePDFParams combinePDFParams = CombinePDFParams.combinePDFParamsBuilder()
            .addAsset(assets.get(0))
            .addAsset(assets.get(1))
            .build();
    
        // Creates a new job instance
        CombinePDFJob combinePDFJob = new CombinePDFJob(combinePDFParams);
    
        // Submit the job and gets the job result
        String location = pdfServices.submit(combinePDFJob);
        PDFServicesResponse<CombinePDFResult> pdfServicesResponse = pdfServices.getJobResult(location, CombinePDFResult.class);
    
        // Get content from the resulting asset(s)
        Asset resultAsset = pdfServicesResponse.getResult().getAsset();
        StreamAsset streamAsset = pdfServices.getContent(resultAsset);
    
        // Creates an output stream and copy stream asset's content to it
        Files.createDirectories(Paths.get("output/"));
        OutputStream outputStream = Files.newOutputStream(new File("output/combineFilesOutput.pdf").toPath());
        LOGGER.info("Saving asset at output/combineFilesOutput.pdf");
        IOUtils.copy(streamAsset.getInputStream(), outputStream);
        outputStream.close();
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
// cd CombinePDF/
// dotnet run CombinePDF.csproj

 namespace CombinePDF
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

         //Create an ExecutionContext using credentials and create a new operation instance.
         ExecutionContext executionContext = ExecutionContext.Create(credentials);
         CombineFilesOperation combineFilesOperation = CombineFilesOperation.CreateNew();

         // Add operation input from source files.
         FileRef combineSource1 = FileRef.CreateFromLocalFile(@"combineFilesInput1.pdf");
         FileRef combineSource2 = FileRef.CreateFromLocalFile(@"combineFilesInput2.pdf");
         combineFilesOperation.AddInput(combineSource1);
         combineFilesOperation.AddInput(combineSource2);

         // Execute the operation.
         FileRef result = combineFilesOperation.Execute(executionContext);

         // Save the result to the specified location.
         result.SaveAs(Directory.GetCurrentDirectory() + "/output/combineFilesOutput.pdf");

       }
       catch (ServiceUsageException ex)
       {
         log.Error("Exception encountered while executing operation", ex);
       }
       // Catch more errors here. . .
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
// node src/combinepdf/combine-pdf.js

const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    CombinePDFJob,
    CombinePDFParams,
    CombinePDFResult,
    SDKError,
    ServiceUsageError,
    ServiceApiError
} = require("@adobe/pdfservices-node-sdk");
const fs = require("fs");

(async () => {
    let readStream1;
    let readStream2;
    try {
        // Initial setup, create credentials instance
        const credentials = new ServicePrincipalCredentials({
            clientId: process.env.PDF_SERVICES_CLIENT_ID,
            clientSecret: process.env.PDF_SERVICES_CLIENT_SECRET
        });

        // Creates a PDF Services instance
        const pdfServices = new PDFServices({credentials});

        // Creates an asset(s) from source file(s) and upload
        readStream1 = fs.createReadStream("./combineFilesInput1.pdf");
        readStream2 = fs.createReadStream("./combineFilesInput2.pdf");
        const [inputAsset1, inputAsset2] = await pdfServices.uploadAssets({
            streamAssets: [{
                readStream: readStream1,
                mimeType: MimeType.PDF
            }, {
                readStream: readStream2,
                mimeType: MimeType.PDF
            }]
        });

        // Create parameters for the job
        const params = new CombinePDFParams()
            .addAsset(inputAsset1)
            .addAsset(inputAsset2);

        // Create a new job instance
        const job = new CombinePDFJob({params});

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: CombinePDFResult
        });

        // Get content from the resulting asset(s)
        const resultAsset = pdfServicesResponse.result.asset;
        const streamAsset = await pdfServices.getContent({asset: resultAsset});

        // Creates an output stream and copy result asset's content to it
        const outputFilePath = "./combineFilesOutput.pdf";
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
        readStream1?.destroy();
        readStream2?.destroy();
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
            "assetID": "urn:aaid:AS:UE1:23c30ee0-2c4d-46d6-87f2-087832fca718"
        },
        {
            "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718"
        }
    ]
}'

// Legacy API can be found here
// https://documentcloud.adobe.com/document-services/index.html#post-combinePDF
```

## Combine pages from multiple files

This combine sample combines specific pages from up to 20 different PDF
files into a single PDF file. Optional arguments allow specifying page
ranges for each file to combine in the output file.

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.combinepdf.CombinePDFWithPageRanges
 
 public class CombinePDFWithPageRanges {
 
    // Initialize the logger.
    private static final Logger LOGGER = LoggerFactory.getLogger(CombinePDFWithPageRanges.class);
 
    public static void main(String[] args) {
 
      try (InputStream inputStream1 = Files.newInputStream(new File("src/main/resources/combineFileWithPageRangeInput1.pdf").toPath());
           InputStream inputStream2 = Files.newInputStream(new File("src/main/resources/combineFileWithPageRangeInput2.pdf").toPath())) { 
         // Initial setup, create credentials instance
        Credentials credentials = new ServicePrincipalCredentials(
                System.getenv("PDF_SERVICES_CLIENT_ID"),
                System.getenv("PDF_SERVICES_CLIENT_SECRET"));

        // Creates a PDF Services instance
        PDFServices pdfServices = new PDFServices(credentials);

        // Creates an asset(s) from source file(s) and upload
        List<StreamAsset> streamAssets = new ArrayList<>();
        streamAssets.add(new StreamAsset(inputStream1, PDFServicesMediaType.PDF.getMediaType()));
        streamAssets.add(new StreamAsset(inputStream2, PDFServicesMediaType.PDF.getMediaType()));
        List<Asset> assets = pdfServices.uploadAssets(streamAssets);

        PageRanges pageRangesForFirstFile = getPageRangeForFirstFile();
        PageRanges pageRangesForSecondFile = getPageRangeForSecondFile();

        // Create parameters for the job
        CombinePDFParams combinePDFParams = CombinePDFParams.combinePDFParamsBuilder()
                .addAsset(assets.get(0), pageRangesForFirstFile) // Add the first asset as input to the params, along with its page ranges
                .addAsset(assets.get(1), pageRangesForSecondFile) // Add the second asset as input to the params, along with its page ranges
                .build();

        // Creates a new job instance
        CombinePDFJob combinePDFJob = new CombinePDFJob(combinePDFParams);

        // Submit the job and gets the job result
        String location = pdfServices.submit(combinePDFJob);
        PDFServicesResponse<CombinePDFResult> pdfServicesResponse = pdfServices.getJobResult(location, CombinePDFResult.class);

        // Get content from the resulting asset(s)
        Asset resultAsset = pdfServicesResponse.getResult().getAsset();
        StreamAsset streamAsset = pdfServices.getContent(resultAsset);

        // Creates an output stream and copy stream asset's content to it
        Files.createDirectories(Paths.get("output/"));
        OutputStream outputStream = Files.newOutputStream(new File("output/combineFilesWithPageOptionsOutput.pdf").toPath());
        LOGGER.info("Saving asset at output/combineFilesWithPageOptionsOutput.pdf");
        IOUtils.copy(streamAsset.getInputStream(), outputStream);
        outputStream.close();
      } catch (ServiceApiException | IOException | SDKException | ServiceUsageException ex) {
        LOGGER.error("Exception encountered while executing operation", ex);
      }
    }
 
     private static PageRanges getPageRangeForSecondFile() {
        // Specify which pages of the second file are to be included in the combined file
        PageRanges pageRangesForSecondFile = new PageRanges();
        // Add all pages including and after page 3
        pageRangesForSecondFile.addAllFrom(3);
        return pageRangesForSecondFile;
    }
    
    private static PageRanges getPageRangeForFirstFile() {
        // Specify which pages of the first file are to be included in the combined file
        PageRanges pageRangesForFirstFile = new PageRanges();
        // Add page 1
        pageRangesForFirstFile.addSinglePage(1);
        // Add page 2
        pageRangesForFirstFile.addSinglePage(2);
        // Add pages 3 to 4
        pageRangesForFirstFile.addRange(3, 4);
        return pageRangesForFirstFile;
    }
  }
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd CombinePDFWithPageRanges/
// dotnet run CombinePDFWithPageRanges.csproj

  namespace CombinePDFWithPageRanges
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
 
          //Create an ExecutionContext using credentials and create a new operation instance.
          ExecutionContext executionContext = ExecutionContext.Create(credentials);
          CombineFilesOperation combineFilesOperation = CombineFilesOperation.CreateNew();
 
          // Create a FileRef instance from a local file.
          FileRef firstFileToCombine = FileRef.CreateFromLocalFile(@"combineFileWithPageRangeInput1.pdf");
          PageRanges pageRangesForFirstFile = GetPageRangeForFirstFile();
          // Add the first file as input to the operation, along with its page range.
          combineFilesOperation.AddInput(firstFileToCombine, pageRangesForFirstFile);
 
          // Create a second FileRef instance using a local file.
          FileRef secondFileToCombine = FileRef.CreateFromLocalFile(@"combineFileWithPageRangeInput2.pdf");
          PageRanges pageRangesForSecondFile = GetPageRangeForSecondFile();
          // Add the second file as input to the operation, along with its page range.
          combineFilesOperation.AddInput(secondFileToCombine, pageRangesForSecondFile);
 
          // Execute the operation.
          FileRef result = combineFilesOperation.Execute(executionContext);
 
          // Save the result to the specified location.
          result.SaveAs(Directory.GetCurrentDirectory() + "/output/combineFilesOutput.pdf");
 
        }
        catch (ServiceUsageException ex)
        {
          log.Error("Exception encountered while executing operation", ex);
        }
        // Catch more errors here. . .
      }
 
      private static PageRanges GetPageRangeForSecondFile()
      {
        // Specify which pages of the second file are to be included in the combined file.
        PageRanges pageRangesForSecondFile = new PageRanges();
        // Add all pages including and after page 5.
        pageRangesForSecondFile.AddAllFrom(5);
        return pageRangesForSecondFile;
      }
 
      private static PageRanges GetPageRangeForFirstFile()
      {
        // Specify which pages of the first file are to be included in the combined file.
        PageRanges pageRangesForFirstFile = new PageRanges();
        // Add page 2.
        pageRangesForFirstFile.AddSinglePage(2);
        // Add page 3.
        pageRangesForFirstFile.AddSinglePage(3);
        // Add pages 5 to 7.
        pageRangesForFirstFile.AddRange(5, 7);
        return pageRangesForFirstFile;
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
// node src/combinepdf/combine-pdf-with-page-ranges.js

const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    CombinePDFParams,
    CombinePDFJob,
    CombinePDFResult,
    PageRanges,
    SDKError,
    ServiceUsageError,
    ServiceApiError
} = require("@adobe/pdfservices-node-sdk");
const fs = require("fs");

(async () => {
    let readStream1;
    let readStream2;
    try {
        // Initial setup, create credentials instance
        const credentials = new ServicePrincipalCredentials({
            clientId: process.env.PDF_SERVICES_CLIENT_ID,
            clientSecret: process.env.PDF_SERVICES_CLIENT_SECRET
        });

        // Creates a PDF Services instance
        const pdfServices = new PDFServices({credentials});

        // Creates an asset(s) from source file(s) and upload
        readStream1 = fs.createReadStream("./combineFilesInput1.pdf");
        readStream2 = fs.createReadStream("./combineFilesInput2.pdf");
        const [inputAsset1, inputAsset2] = await pdfServices.uploadAssets({
            streamAssets: [{
                readStream: readStream1,
                mimeType: MimeType.PDF
            }, {
                readStream: readStream2,
                mimeType: MimeType.PDF
            }]
        });

        // Create a CombinePDFParams instance
        const params = new CombinePDFParams()
            .addAsset(inputAsset1, getPageRangesForFirstFile())
            .addAsset(inputAsset2, getPageRangesForSecondFile());

        // Create a new job instance
        const job = new CombinePDFJob({params});

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: CombinePDFResult
        });

        // Get content from the resulting asset(s)
        const resultAsset = pdfServicesResponse.result.asset;
        const streamAsset = await pdfServices.getContent({asset: resultAsset});

        // Creates an output stream and copy result asset's content to it
        const outputFilePath = "./combineFilesOutput.pdf";
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
        readStream1?.destroy();
        readStream2?.destroy();
    }
})();

const getPageRangesForFirstFile = () => {
    // Specify which pages of the first file are to be included in the combined file.
    const pageRangesForFirstFile = new PageRanges();
    // Add page 1.
    pageRangesForFirstFile.addSinglePage(1);
    // Add page 2.
    pageRangesForFirstFile.addSinglePage(2);
    // Add pages 3 to 4.
    pageRangesForFirstFile.addRange(3, 4);
    return pageRangesForFirstFile;
};

const getPageRangesForSecondFile = () => {
    // Specify which pages of the second file are to be included in the combined file.
    const pageRangesForSecondFile = new PageRanges();
    // Add all pages including and after page 3.
    pageRangesForSecondFile.addAllFrom(3);
    return pageRangesForSecondFile;
};
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
            "assetID": "urn:aaid:AS:UE1:23c30ee0-2c4d-46d6-87f2-087832fca718",
            "pageRanges": [
                {
                    "start": 1,
                    "end": 3
                }
            ]
        },
        {
            "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718",
            "pageRanges": [
                {
                    "start": 2,
                    "end": 4
                }
            ]
        }
    ]
}'

// Legacy API can be found here 
// https://documentcloud.adobe.com/document-services/index.html#post-combinePDF
```
