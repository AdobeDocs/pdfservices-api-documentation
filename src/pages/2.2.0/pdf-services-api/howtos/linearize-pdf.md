---
title: Linearize PDF | How Tos | PDF Services API | Adobe PDF Services
---
# Linearize PDFs

## Linearize PDF

Linearizing a PDF creates a web-optimized PDF file which supports
incremental access in network environments.

<CodeBlock slots="heading, code" repeat="4" languages="Java, .NET, Node JS, Rest API" /> 

#### Java

```javascript 
// Get the samples from https://www.adobe.com/go/pdftoolsapi_java_samples
// Run the sample:
// mvn -f pom.xml exec:java -Dexec.mainClass=com.adobe.pdfservices.operation.samples.linearizepdf.LinearizePDF
 
     public class LinearizePDF {
       // Initialize the logger.
       private static final Logger LOGGER = LoggerFactory.getLogger(LinearizePDF.class);
    
       public static void main(String[] args) {
    
           try {
               // Initial setup, create credentials instance.
               Credentials credentials = Credentials.serviceAccountCredentialsBuilder()
                       .fromFile("pdfservices-api-credentials.json")
                       .build();
    
               // Create an ExecutionContext using credentials and create a new operation instance.
               ExecutionContext executionContext = ExecutionContext.create(credentials);
               LinearizePDFOperation linearizePDFOperation = LinearizePDFOperation.createNew();
    
               // Set operation input from a source file.
               FileRef source = FileRef.createFromLocalFile("src/main/resources/linearizePDFInput.pdf");
               linearizePDFOperation.setInput(source);
    
               // Execute the operation
               FileRef result = linearizePDFOperation.execute(executionContext);
    
               // Save the result at the specified location
               result.saveAs("output/linearizePDFOutput.pdf");
    
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
               Credentials credentials = Credentials.ServiceAccountCredentialsBuilder()
                               .FromFile(Directory.GetCurrentDirectory() + "/pdfservices-api-credentials.json")
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

   const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
  
   try {
     // Initial setup, create credentials instance.
     const credentials =  PDFServicesSdk.Credentials
         .serviceAccountCredentialsBuilder()
         .fromFile("pdfservices-api-credentials.json")
         .build();
  
     // Create an ExecutionContext using credentials and create a new operation instance.
     const executionContext = PDFServicesSdk.ExecutionContext.create(credentials),
         linearizePDF = PDFServicesSdk.LinearizePDF,
         linearizePDFOperation = linearizePDF.Operation.createNew();
  
     // Set operation input from a source file.
     const input = PDFServicesSdk.FileRef.createFromLocalFile('resources/linearizePDFInput.pdf');
     linearizePDFOperation.setInput(input);
  
     // Execute the operation and Save the result to the specified location.
     linearizePDFOperation.execute(executionContext)
         .then(result => result.saveAsFile('output/linearizePDFOutput.pdf'))
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
// https://documentcloud.adobe.com/document-services/index.html#post-linearizePDF

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
		\"repo:assetId\": \"urn:aaid:cpf:Service-e4d5f0b75e5d43ea9eaa187860772d27\"
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
