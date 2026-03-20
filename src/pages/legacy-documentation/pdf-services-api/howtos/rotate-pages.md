---
title: Rotate Pages | How Tos | PDF Services API | Adobe PDF Services
---
# Rotate Pages

Rotate a page in an existing document.

## Rest API

See our public API Reference for [Rotate Pages.](../../../apis/#tag/Page-Manipulation)

## Rotate Pages in PDF

The rotate pages operation selectively rotates pages in PDF file. For
example, you can change portrait view to landscape view.

Please refer the [API usage guide](../api-usage.md) to understand how to use our APIs.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.rotatepages.RotatePDFPages
 
  public class RotatePDFPages {
 
    // Initialize the logger.
    private static final Logger LOGGER = LoggerFactory.getLogger(RotatePDFPages.class);
 
    public static void main(String[] args) {
        try {
            // Initial setup, create credentials instance.
           Credentials credentials = Credentials.servicePrincipalCredentialsBuilder()
                    .withClientId("PDF_SERVICES_CLIENT_ID")
                    .withClientSecret("PDF_SERVICES_CLIENT_SECRET")
                    .build();
 
            // Create an ExecutionContext using credentials and create a new operation instance.
            ExecutionContext executionContext = ExecutionContext.create(credentials);
            RotatePagesOperation rotatePagesOperation = RotatePagesOperation.createNew();
 
            // Set operation input from a source file.
            FileRef source = FileRef.createFromLocalFile("src/main/resources/rotatePagesInput.pdf");
            rotatePagesOperation.setInput(source);
 
            // Sets angle by 90 degrees (in clockwise direction) for rotating the specified pages of
            // the input PDF file.
            PageRanges firstPageRange = getFirstPageRangeForRotation();
            rotatePagesOperation.setAngleToRotatePagesBy(Angle._90, firstPageRange);
 
            // Sets angle by 180 degrees (in clockwise direction) for rotating the specified pages of
            // the input PDF file.
            PageRanges secondPageRange = getSecondPageRangeForRotation();
            rotatePagesOperation.setAngleToRotatePagesBy(Angle._180, secondPageRange);
 
            // Execute the operation.
            FileRef result = rotatePagesOperation.execute(executionContext);
 
            // Save the result to the specified location.
            result.saveAs("output/rotatePagesOutput.pdf");
 
        } catch (IOException | ServiceApiException | SdkException | ServiceUsageException e) {
            LOGGER.error("Exception encountered while executing operation", e);
        }
    }
 
    private static PageRanges getFirstPageRangeForRotation() {
        // Specify pages for rotation.
        PageRanges firstPageRange = new PageRanges();
        // Add page 1.
        firstPageRange.addSinglePage(1);
 
        // Add pages 3 to 4.
        firstPageRange.addRange(3, 4);
        return firstPageRange;
    }
 
    private static PageRanges getSecondPageRangeForRotation() {
        // Specify pages for rotation.
        PageRanges secondPageRange = new PageRanges();
        // Add page 2.
        secondPageRange.addSinglePage(2);
 
        return secondPageRange;
    }
  }
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd RotatePDFPages/
// dotnet run RotatePDFPages.csproj

  namespace RotatePDFPages
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
                RotatePagesOperation rotatePagesOperation = RotatePagesOperation.CreateNew();
 
                // Set operation input from a source file.
                FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"rotatePagesInput.pdf");
                rotatePagesOperation.SetInput(sourceFileRef);
 
                // Sets angle by 90 degrees (in clockwise direction) for rotating the specified pages of
                // the input PDF file.
                PageRanges firstPageRange = GetFirstPageRangeForRotation();
                rotatePagesOperation.SetAngleToRotatePagesBy(Angle._90, firstPageRange);
 
                // Sets angle by 180 degrees (in clockwise direction) for rotating the specified pages of
                // the input PDF file.
                PageRanges secondPageRange = GetSecondPageRangeForRotation();
                rotatePagesOperation.SetAngleToRotatePagesBy(Angle._180, secondPageRange);
 
                // Execute the operation.
                FileRef result = rotatePagesOperation.Execute(executionContext);
 
                // Save the result to the specified location.
                result.SaveAs(Directory.GetCurrentDirectory() + "/output/rotatePagesOutput.pdf");
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
 
        private static PageRanges GetFirstPageRangeForRotation()
        {
            // Specify pages for rotation.
            PageRanges firstPageRange = new PageRanges();
            // Add page 1.
            firstPageRange.AddSinglePage(1);
 
            // Add pages 3 to 4.
            firstPageRange.AddRange(3, 4);
            return firstPageRange;
        }
 
        private static PageRanges GetSecondPageRangeForRotation()
        {
            // Specify pages for rotation.
            PageRanges secondPageRange = new PageRanges();
            // Add page 2.
            secondPageRange.AddSinglePage(2);
 
            return secondPageRange;
        }
    }
  }
```

#### Node JS

```javascript
// Get the samples from http://www.adobe.com/go/pdftoolsapi_node_sample
// Run the sample:
// node src/rotatepages/rotate-pdf-pages.js

  const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
 
  const getFirstPageRangeForRotation = () => {
    // Specify pages for rotation.
    const firstPageRange = new PDFServicesSdk.PageRanges();
    // Add page 1.
    firstPageRange.addSinglePage(1);
 
    // Add pages 3 to 4.
    firstPageRange.addPageRange(3, 4);
 
    return firstPageRange;
  };
 
  const getSecondPageRangeForRotation = () => {
    // Specify pages for rotation.
    const secondPageRange = new PDFServicesSdk.PageRanges();
    // Add page 2.
    secondPageRange.addSinglePage(2);
 
    return secondPageRange;
  };
 
  try {
    // Initial setup, create credentials instance.
      const credentials =  PDFServicesSdk.Credentials
          .servicePrincipalCredentialsBuilder()
          .withClientId("PDF_SERVICES_CLIENT_ID")
          .withClientSecret("PDF_SERVICES_CLIENT_SECRET")
          .build();
 
    // Create an ExecutionContext using credentials and create a new operation instance.
    const executionContext = PDFServicesSdk.ExecutionContext.create(credentials),
        rotatePagesOperation = PDFServicesSdk.RotatePages.Operation.createNew();
 
    // Set operation input from a source file.
    const input = PDFServicesSdk.FileRef.createFromLocalFile('resources/rotatePagesInput.pdf');
    rotatePagesOperation.setInput(input);
 
    // Sets angle by 90 degrees (in clockwise direction) for rotating the specified pages of
    // the input PDF file.
    const firstPageRange = getFirstPageRangeForRotation();
    rotatePagesOperation.setAngleToRotatePagesBy(PDFServicesSdk.RotatePages.Angle._90, firstPageRange);
 
    // Sets angle by 180 degrees (in clockwise direction) for rotating the specified pages of
    // the input PDF file.
    const secondPageRange = getSecondPageRangeForRotation();
    rotatePagesOperation.setAngleToRotatePagesBy(PDFServicesSdk.RotatePages.Angle._180,secondPageRange);
 
    // Execute the operation and Save the result to the specified location.
    rotatePagesOperation.execute(executionContext)
        .then(result => result.saveAsFile('output/rotatePagesOutput.pdf'))
        .catch(err => {
            if (err instanceof PDFServicesSdk.Error.ServiceApiError
                || err instanceof PDFServicesSdk.Error.ServiceUsageError) {
                console.log('Exception encountered while executing operation', err);
            } else {
                console.log('Exception encountered while executing operation', err);
            }
        });
  } catch (err) {
    console.log('Exception encountered while executing operation', err);
  }
```

#### Rest API 

```javascript
// Please refer our Rest API docs for more information 
// https://developer.adobe.com/document-services/docs/apis/#tag/Page-Manipulation

curl --location --request POST 'https://pdf-services.adobe.io/operation/pagemanipulation' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--data-raw '{
    "assetID": "urn:aaid:AS:UE1:23c30ee0-2e4d-46d6-87f2-087832fca718f",
    "pageActions": [
        {
            "rotate": {
                "angle": 90,
                "pageRanges": [
                    {
                        "start": 1
                    }
                ]
            }
        },
        {
            "rotate": {
                "angle": 180,
                "pageRanges": [
                    {
                        "start": 2,
                        "end": 2
                    }
                ]
            }
        }
    ]
}'

// Legacy API can be found here 
// https://documentcloud.adobe.com/document-services/index.html#post-pageManipulation
```
