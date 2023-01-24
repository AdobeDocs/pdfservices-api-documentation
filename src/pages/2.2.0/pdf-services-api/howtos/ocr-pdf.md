---
title: OCR PDF | How Tos | PDF Services API | Adobe PDF Services
---
# OCR PDF

## Text recognition (OCR)

Optical character recognition (OCR) converts images to text so that you
and your users can fully interact with the PDF file. After performing
OCR, the PDF may be fully editable and searchable. The input format must
be `application/pdf`.

This sample defaults to the en-us locale. For other languages, see [OCR with explicit language.](#ocr-with-explicit-language)

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.ocrpdf.OcrPDF
 
 public class OcrPDF {
 
  // Initialize the logger.
  private static final Logger LOGGER = LoggerFactory.getLogger(OcrPDF.class);
 
  public static void main(String[] args) {
 
   try {
 
    // Initial setup, create credentials instance.
    Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
      .fromFile("pdfservices-api-credentials.json")
      .build();
 
    //Create an ExecutionContext using credentials and create a new operation instance.
    ExecutionContext executionContext = ExecutionContext.create(credentials);
    OCROperation ocrOperation = OCROperation.createNew();
 
    // Set operation input from a source file.
    FileRef source = FileRef.createFromLocalFile("src/main/resources/ocrInput.pdf");
    ocrOperation.setInput(source);
 
    // Execute the operation
    FileRef result = ocrOperation.execute(executionContext);
 
    // Save the result at the specified location
    result.saveAs("output/ocrOutput.pdf");
 
   } catch (ServiceApiException | IOException | SdkException | ServiceUsageException ex) {
    LOGGER.error("Exception encountered while executing operation", ex);
   }
  }
 }
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd OcrPDF/
// dotnet run OcrPDF.csproj

 namespace OcrPDF
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
         Credentials credentials = Credentials.ServiceAccountCredentialsBuilder()
                 .FromFile(Directory.GetCurrentDirectory() + "/pdfservices-api-credentials.json")
                 .Build();

         //Create an ExecutionContext using credentials and create a new operation instance.
         ExecutionContext executionContext = ExecutionContext.Create(credentials);
         OCROperation ocrOperation = OCROperation.CreateNew();

         // Set operation input from a source file.
         FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"ocrInput.pdf");
         ocrOperation.SetInput(sourceFileRef);

         // Execute the operation.
         FileRef result = ocrOperation.Execute(executionContext);

         // Save the result to the specified location.
         result.SaveAs(Directory.GetCurrentDirectory() + "/output/ocrOperationOutput.pdf");
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
// node src/ocr/ocr-pdf.js

 const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');

 try {
   // Initial setup, create credentials instance.
   const credentials =  PDFServicesSdk.Credentials
       .serviceAccountCredentialsBuilder()
       .fromFile("pdfservices-api-credentials.json")
       .build();

   // Create an ExecutionContext using credentials and create a new operation instance.
   const executionContext = PDFServicesSdk.ExecutionContext.create(credentials),
       ocrOperation = PDFServicesSdk.OCR.Operation.createNew();

   // Set operation input from a source file.
   const input = PDFServicesSdk.FileRef.createFromLocalFile('resources/ocrInput.pdf');
   ocrOperation.setInput(input);

   // Execute the operation and Save the result to the specified location.
   ocrOperation.execute(executionContext)
       .then(result => result.saveAsFile('output/ocrOutput.pdf'))
       .catch(err => {
           if(err instanceof PDFServicesSdk.Error.ServiceApiError
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
// https://documentcloud.adobe.com/document-services/index.html#post-ocr

curl --location --request POST 'https://cpf-ue1.adobe.io/ops/:create?respondWith=%7B%22reltype%22%3A%20%22http%3A%2F%2Fns.adobe.com%2Frel%2Fprimary%22%7D' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--header 'Accept: application/json, text/plain, */*' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Prefer: respond-async,wait=0' \
--form 'contentAnalyzerRequests="{
	\"cpf:inputs\": {
		\"documentIn\": {
			\"cpf:location\": \"InputFile0\",
			\"dc:format\": \"application/pdf\"
		}
	},
	\"cpf:engine\": {
		\"repo:assetId\": \"urn:aaid:cpf:Service-7e6a5d2b6bb141d7832398076914a07b\"
	},
	\"cpf:outputs\": {
		\"documentOut\": {
			\"cpf:location\": \"multipartLabelOut\",
			\"dc:format\": \"application/pdf\"
		}
	}
}"' \
--form 'InputFile0=@"{{Placeholder for input file (absolute path)}}"'
```

## OCR with explicit language

You can perform OCR on files in other languages, including German,
French, Danish, and other languages. Refer to `OCRSupportedLocale` and
`OCRSupportedType` in the API docs for a list of supported OCR locales
and OCR types.

As shown in the OcrPDFWithOptions sample, when you make a PDF file
searchable, you specify both the locale (language) and the type. There
are two types which produce a different result:

-   One type ensures that text is searchable and selectable, but
    modifies the original image during the cleanup process (for example,
    deskews it) before placing an invisible text layer over it. This
    type removes unwanted artifacts and may result in a more readable
    document in some scenarios.
-   The second (EXACT) type, also overlays a searchable text layer over
    the original image, but in this case, the original image is
    unchanged. This type produces maximum fidelity to the original
    image.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java Dexec.mainClass=com.adobe.pdfservices.operation.samples.ocrpdf.OcrPDFWithOptions
 
  public class OcrPDFWithOptions {
 
    // Initialize the logger.
    private static final Logger LOGGER = LoggerFactory.getLogger(OcrPDFWithOptions.class);
 
    public static void main(String[] args) {
 
        try {
 
            // Initial setup, create credentials instance.
            Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
                    .fromFile("pdfservices-api-credentials.json")
                    .build();
 
            //Create an ExecutionContext using credentials and create a new operation instance.
            ExecutionContext executionContext = ExecutionContext.create(credentials);
            OCROperation ocrOperation = OCROperation.createNew();
 
            // Set operation input from a source file.
            FileRef source = FileRef.createFromLocalFile("src/main/resources/ocrInput.pdf");
            ocrOperation.setInput(source);
 
            // Build OCR options from supported locales and OCR-types and set them into the operation
            OCROptions ocrOptions = OCROptions.ocrOptionsBuilder()
                    .withOCRLocale(OCRSupportedLocale.EN_US)
                    .withOCRType(OCRSupportedType.SEARCHABLE_IMAGE_EXACT)
                    .build();
            ocrOperation.setOptions(ocrOptions);
 
            // Execute the operation
            FileRef result = ocrOperation.execute(executionContext);
 
            // Save the result at the specified location
            result.saveAs("output/ocrWithOptionsOutput.pdf");
 
        } catch (ServiceApiException | IOException | SdkException | ServiceUsageException ex) {
            LOGGER.error("Exception encountered while executing operation", ex);
        }
    }
  }
```

#### .NET

```javascript
// Get the samples from https://www.adobe.com/go/pdftoolsapi_net_samples
// Run the sample:
// cd OcrPDFWithOptions
// dotnet run OcrPDFWithOptions.csproj

 namespace OcrPDFWithOptions
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
        Credentials credentials = Credentials.ServiceAccountCredentialsBuilder()
                .FromFile(Directory.GetCurrentDirectory() + "/pdfservices-api-credentials.json")
                .Build();
 
        //Create an ExecutionContext using credentials and create a new operation instance.
        ExecutionContext executionContext = ExecutionContext.Create(credentials);
        OCROperation ocrOperation = OCROperation.CreateNew();
 
        // Set operation input from a source file.
        FileRef sourceFileRef = FileRef.CreateFromLocalFile(@"ocrWithOptionsInput.pdf");
        ocrOperation.SetInput(sourceFileRef);
        // Build OCR options from supported locales and OCR-types and set them into the operation
        OCROptions ocrOptions = OCROptions.OCROptionsBuilder()
            .WithOcrLocale(OCRSupportedLocale.EN_US)
            .WithOcrType(OCRSupportedType.SEARCHABLE_IMAGE_EXACT)
            .Build();
        ocrOperation.SetOptions(ocrOptions);
 
        // Execute the operation.
        FileRef result = ocrOperation.Execute(executionContext);
 
        // Save the result to the specified location.
        result.SaveAs(Directory.GetCurrentDirectory() + "/output/ocrOperationWithOptionsOutput.pdf");
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
// node src/ocr/ocr-pdf-with-options.js

  const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
 
  try {
    // Initial setup, create credentials instance.
    const credentials =  PDFServicesSdk.Credentials
        .serviceAccountCredentialsBuilder()
        .fromFile("pdfservices-api-credentials.json")
        .build();
 
    //Create an ExecutionContext using credentials and create a new operation instance.
    const executionContext = PDFServicesSdk.ExecutionContext.create(credentials),
        ocrOperation = PDFServicesSdk.OCR.Operation.createNew();
 
    // Set operation input from a source file.
    const input = PDFServicesSdk.FileRef.createFromLocalFile('resources/ocrInput.pdf');
    ocrOperation.setInput(input);
 
    // Provide any custom configuration options for the operation.
    const options = new PDFServicesSdk.OCR.options.OCROptions.Builder()
        .withOcrType(PDFServicesSdk.OCR.options.OCRSupportedType.SEARCHABLE_IMAGE_EXACT)
        .withOcrLang(PDFServicesSdk.OCR.options.OCRSupportedLocale.EN_US)
        .build();
    ocrOperation.setOptions(options);
 
    // Execute the operation and Save the result to the specified location.
    ocrOperation.execute(executionContext)
        .then(result => result.saveAsFile('output/ocrWithOptionsOutput.pdf'))
        .catch(err => {
            if(err instanceof PDFServicesSdk.Error.ServiceApiError
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
// https://documentcloud.adobe.com/document-services/index.html#post-ocr

curl --location --request POST 'https://cpf-ue1.adobe.io/ops/:create?respondWith=%7B%22reltype%22%3A%20%22http%3A%2F%2Fns.adobe.com%2Frel%2Fprimary%22%7D' \
--header 'Authorization: Bearer {{Placeholder for token}}' \
--header 'Accept: application/json, text/plain, */*' \
--header 'x-api-key: {{Placeholder for client_id}}' \
--header 'Prefer: respond-async,wait=0' \
--form 'contentAnalyzerRequests="{
	\"cpf:inputs\": {
		\"params\": {
			\"cpf:inline\": {
				\"ocrLang\": \"en-US\",
				\"ocrType\": \"searchable_image\"
			}
		},
		\"documentIn\": {
			\"cpf:location\": \"InputFile0\",
			\"dc:format\": \"application/pdf\"
		}
	},
	\"cpf:engine\": {
		\"repo:assetId\": \"urn:aaid:cpf:Service-7e6a5d2b6bb141d7832398076914a07b\"
	},
	\"cpf:outputs\": {
		\"documentOut\": {
			\"cpf:location\": \"multipartLabelOut\",
			\"dc:format\": \"application/pdf\"
		}
	}
}"' \
--form 'InputFile0=@"{{Placeholder for input file (absolute path)}}"'
```
